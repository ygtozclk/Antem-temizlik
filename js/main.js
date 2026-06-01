/* ==========================================================================
   ANTEM Kurumsal Temizlik – Main JavaScript
   ========================================================================== */

/* --------------------------------------------------------------------------
   Navbar — Mobile menu toggle
   -------------------------------------------------------------------------- */
(function () {
  var menuBtn    = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  window.closeMobileMenu = function () {
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  };

  document.addEventListener('click', function (e) {
    if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('open');
    }
  });
})();

/* --------------------------------------------------------------------------
   Navbar — Scroll state
   Adds .scrolled when user scrolls past 50px, strengthening the shadow.
   -------------------------------------------------------------------------- */
(function () {
  var header = document.getElementById('header');
  if (!header) return;

  function tick() {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', tick, { passive: true });
  tick();
})();

/* --------------------------------------------------------------------------
   Smooth scroll — all in-page anchor links
   -------------------------------------------------------------------------- */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* --------------------------------------------------------------------------
   Scroll-triggered reveal
   Reads data-delay (ms integer) from each [data-reveal] element,
   sets it as the --reveal-delay CSS custom property, then observes
   the element. The .is-visible class triggers the CSS transition.
   -------------------------------------------------------------------------- */
(function () {
  var els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  els.forEach(function (el) {
    var delay = el.dataset.delay || '0';
    el.style.setProperty('--reveal-delay', delay + 'ms');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold:   0.08,
    rootMargin:  '0px 0px -28px 0px'
  });

  els.forEach(function (el) { observer.observe(el); });
})();

/* --------------------------------------------------------------------------
   Counter animation
   Elements with data-counter="N" (integer) and optional
   data-counter-suffix="+" count up from 0 when they enter the viewport.
   -------------------------------------------------------------------------- */
(function () {
  var counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      var el       = entry.target;
      var end      = parseInt(el.dataset.counter, 10);
      var suffix   = el.dataset.counterSuffix || '';
      var duration = 1400;
      var startTs  = null;

      function step(ts) {
        if (!startTs) startTs = ts;
        var progress = Math.min((ts - startTs) / duration, 1);
        var eased    = 1 - Math.pow(1 - progress, 3); /* ease-out cubic */
        el.textContent = Math.round(eased * end) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach(function (el) { observer.observe(el); });
})();

/* --------------------------------------------------------------------------
   Quote Manager — localStorage-based quote list
   -------------------------------------------------------------------------- */
var QuoteManager = (function () {
  var KEY = 'antem_quote_list';

  function getList() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveList(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function addProduct(product) {
    var list = getList();
    if (!list.find(function (p) { return p.id === product.id; })) {
      list.push({
        id:           product.id,
        code:         product.code,
        name:         product.name,
        category:     product.category,
        categoryLabel: product.categoryLabel,
        image:        product.image,
        brand:        product.brand || '',
        unit:         product.unit || '',
        spec:         product.spec || '',
        qty:          '1',
        note:         ''
      });
      saveList(list);
    }
    updateBadges();
  }

  function removeProduct(id) {
    var list = getList().filter(function (p) { return p.id !== id; });
    saveList(list);
    updateBadges();
  }

  function updateProduct(id, field, value) {
    var list = getList();
    var item = list.find(function (p) { return p.id === id; });
    if (item) {
      item[field] = value;
      saveList(list);
    }
  }

  function isInList(id) {
    return !!getList().find(function (p) { return p.id === id; });
  }

  function count() {
    return getList().length;
  }

  function clearList() {
    saveList([]);
    updateBadges();
  }

  function updateBadges() {
    var n   = count();
    var els = document.querySelectorAll('[data-quote-count]');
    els.forEach(function (el) {
      el.textContent = n > 0 ? '(' + n + ')' : '';
    });
  }

  return {
    getList:       getList,
    addProduct:    addProduct,
    removeProduct: removeProduct,
    updateProduct: updateProduct,
    isInList:      isInList,
    count:         count,
    clearList:     clearList,
    updateBadges:  updateBadges
  };
})();

/* Init badges on every page load */
(function () {
  QuoteManager.updateBadges();
})();

/* --------------------------------------------------------------------------
   Catalog — Category tabs + search filter (static catalog pages only)
   Skipped when data-dynamic-catalog is present (katalog.html uses JSON).
   -------------------------------------------------------------------------- */
(function () {
  var searchInput = document.getElementById('catalog-search');
  var tabs        = document.querySelectorAll('[data-tab]');
  var cards       = document.querySelectorAll('.catalog-card[data-category]');
  var sections    = document.querySelectorAll('[data-cat-section]');
  var noResults   = document.getElementById('catalog-no-results');

  /* Skip on dynamic catalog page (cards loaded async from JSON) */
  if (document.getElementById('catalog-sections')) return;

  if (!searchInput && !tabs.length) return;

  var activeCategory = 'all';

  function filter() {
    var query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    var anyVisible = false;

    cards.forEach(function (card) {
      var name            = (card.dataset.name || '').toLowerCase();
      var cat             = card.dataset.category || '';
      var matchesSearch   = !query || name.indexOf(query) !== -1;
      var matchesCategory = activeCategory === 'all' || cat === activeCategory;
      var visible         = matchesSearch && matchesCategory;
      card.classList.toggle('search-hidden', !visible);
      if (visible) anyVisible = true;
    });

    sections.forEach(function (sec) {
      var secCards  = sec.querySelectorAll('.catalog-card');
      var allHidden = Array.prototype.every.call(secCards, function (c) {
        return c.classList.contains('search-hidden');
      });
      sec.classList.toggle('search-hidden', allHidden);
    });

    if (noResults) noResults.classList.toggle('visible', !anyVisible);
  }

  if (searchInput) {
    searchInput.addEventListener('input', filter);
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activeCategory = tab.dataset.tab;
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      filter();
    });
  });
})();
