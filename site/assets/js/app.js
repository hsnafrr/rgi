/* =========================================================================
   RGI — Application shell
   i18n · navigasi · slider · carousel · lightbox · template WhatsApp · form
   ========================================================================= */
(function () {
  'use strict';

  var D = window.RGI;
  var STORE_KEY = 'rgi-lang';
  var lang = 'id';
  var NL = String.fromCharCode(10);

  /* ---------------- utilities ---------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function L(obj) { return obj ? (obj[lang] != null ? obj[lang] : obj.id) : ''; }
  function T(key) {
    var dict = D.t[lang] || D.t.id;
    return dict[key] != null ? dict[key] : (D.t.id[key] != null ? D.t.id[key] : key);
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  var reducedMQ = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------- line icons (stroke, no emoji) ---------------- */
  var P = {
    building: '<path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M15 9h2a2 2 0 0 1 2 2v10"/><path d="M9 7h2M9 11h2M9 15h2"/>',
    home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
    ruler: '<path d="M15.5 2.5 21.5 8.5a1.5 1.5 0 0 1 0 2.1L10.6 21.5a1.5 1.5 0 0 1-2.1 0L2.5 15.5a1.5 1.5 0 0 1 0-2.1L13.4 2.5a1.5 1.5 0 0 1 2.1 0Z"/><path d="m8 10 2 2M11 7l2 2M5 13l2 2"/>',
    hammer: '<path d="m14 8-8.5 8.5a2.1 2.1 0 0 0 3 3L17 11"/><path d="m11 5 5-3 6 6-3 5-8-8Z"/>',
    road: '<path d="M4 21 7 3M20 21 17 3M12 4v3M12 11v3M12 18v3"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5.5-5.5 2 2-5.5 5.5-2Z"/>',
    shield: '<path d="M12 3 4.5 6v6c0 4.4 3.1 8.2 7.5 9 4.4-.8 7.5-4.6 7.5-9V6L12 3Z"/><path d="m9 12 2 2 4-4"/>',
    helmet: '<path d="M3.5 17h17a1 1 0 0 0 1-1v-1a8 8 0 0 0-4-6.9V6a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v2.1A8 8 0 0 0 2.5 15v1a1 1 0 0 0 1 1Z"/><path d="M2 20h20"/>',
    clipboard: '<rect x="7" y="4" width="10" height="3.5" rx="1"/><path d="M17 5.5h2A1.5 1.5 0 0 1 20.5 7v12A1.5 1.5 0 0 1 19 20.5H5A1.5 1.5 0 0 1 3.5 19V7A1.5 1.5 0 0 1 5 5.5h2"/><path d="m8.5 12.5 1.5 1.5 3-3"/><path d="M8.5 17h7"/>',
    fence: '<path d="M4 21V8l2-3 2 3v13M16 21V8l2-3 2 3v13"/><path d="M2 12h20M2 16.5h20"/><path d="M10 21V8l2-3 2 3v13"/>',
    badge: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h4"/>',
    scale: '<path d="M12 3v18M7 6h10"/><path d="m5 10-2.5 5h5L5 10ZM19 10l-2.5 5h5L19 10Z"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    minus: '<path d="M6 12h12"/>',
    arrow: '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/>',
    mapPin: '<path d="M20 10.5c0 5.3-8 12-8 12s-8-6.7-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10.5" r="2.8"/>',
    mail: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
    wa: '<path d="M3.5 20.5 5 16.2A8.4 8.4 0 1 1 8.2 19.3l-4.7 1.2Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-.2-1-1.7-.6-.9 1a5.6 5.6 0 0 1-2.1-2.1l1-.9-.6-1.7-1-.2c-.5 0-1 .4-1 1Z"/>',
    zoom: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/><path d="M10.5 8v5M8 10.5h5"/>',
    play: '<path d="M7 4.5v15l13-7.5-13-7.5Z"/>',
    close: '<path d="m5 5 14 14M19 5 5 19"/>',
    chevL: '<path d="m14.5 5-7 7 7 7"/>',
    chevR: '<path d="m9.5 5 7 7-7 7"/>',
    quote: '<path d="M9.5 5C6.5 6.5 5 9.5 5 13v6h6v-6H8c0-2.5.8-4.2 2.5-5.2L9.5 5ZM19 5c-3 1.5-4.5 4.5-4.5 8v6h6v-6h-3c0-2.5.8-4.2 2.5-5.2L19 5Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 8v4.5M12 16h.01"/>',
    drawing: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 8h18M8 21V8"/><path d="M12 12h5M12 16h5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    pause: '<path d="M9 5v14M15 5v14"/>',
    user: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/>'
  };
  function icon(name, cls) {
    var d = P[name] || P.check;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (cls ? ' class="' + cls + '"' : '') + '>' + d + '</svg>';
  }
  function iconFill(name) {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + (P[name] || '') + '</svg>';
  }
  window.rgiIcon = icon;

  /* ---------------- WhatsApp message builders ---------------- */
  function waService(s) {
    return {
      id: 'Kebutuhan: ' + s.title.id + '.' + NL +
          'Lokasi proyek: (isi kota/kecamatan)' + NL +
          'Luas / skala pekerjaan: (isi)' + NL +
          'Perkiraan mulai: (isi bulan/tahun)',
      en: 'Requirement: ' + s.title.en + '.' + NL +
          'Project location: (city/district)' + NL +
          'Area / scale of work: (fill in)' + NL +
          'Target start: (month/year)'
    };
  }
  function waProject(p) {
    return {
      id: 'Saya tertarik dengan gaya proyek "' + p.title.id + '" (' + p.location.id + ').' + NL +
          'Kebutuhan saya: (isi singkat)' + NL +
          'Lokasi lahan: (isi kota/kecamatan)' + NL +
          'Luas tanah / bangunan: (isi m2)',
      en: 'I am interested in the style of the "' + p.title.en + '" project (' + p.location.en + ').' + NL +
          'My requirement: (brief)' + NL +
          'Site location: (city/district)' + NL +
          'Land / building area: (m2)'
    };
  }
  function waHref(topic) { return D.company.waFor(topic, lang); }

  /* ---------------- renderers registry ---------------- */
  var renderers = [];
  function register(fn) { renderers.push(fn); }
  function renderAll() {
    for (var i = 0; i < renderers.length; i++) {
      try { renderers[i](); } catch (e) { if (window.console) console.warn('[rgi]', e); }
    }
  }
  function rendered() { document.dispatchEvent(new CustomEvent('rgi:rendered')); }

  /* ---------------- i18n ---------------- */
  function applyAttrs(root) {
    $$('[data-i18n-attr]', root).forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var bits = pair.split(':');
        if (bits.length === 2) el.setAttribute(bits[0].trim(), T(bits[1].trim()));
      });
    });
  }

  function applyStaticText() {
    $$('[data-i18n]').forEach(function (el) {
      el.textContent = T(el.getAttribute('data-i18n'));
    });
    applyAttrs(document);
    $$('[data-wa-link]').forEach(function (el) { el.href = D.company.waLink(lang); });
    document.documentElement.lang = lang;
    var titleKey = document.body.getAttribute('data-title-key');
    if (titleKey) {
      document.title = T(titleKey) + ' — ' + D.company.legalName;
    }
    $$('.lang__btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
  }

  function setLang(next, save) {
    lang = (next === 'en') ? 'en' : 'id';
    if (save !== false) { try { localStorage.setItem(STORE_KEY, lang); } catch (e) {} }
    applyStaticText();
    renderAll();
    document.dispatchEvent(new CustomEvent('rgi:lang', { detail: { lang: lang } }));
  }
  window.rgiLang = function () { return lang; };

  /* ---------------- header & navigation ---------------- */
  function initHeader() {
    var header = $('.header');
    if (header) {
      var stuck = false;
      var onScroll = function () {
        var next = window.scrollY > 8;
        if (next !== stuck) { stuck = next; header.classList.toggle('is-stuck', next); }
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* Menu titik tiga: tekan untuk membuka, tekan lagi untuk menutup.
       Juga tertutup lewat Escape, klik di luar, tombol Tutup, atau saat
       salah satu tautan dipilih. */
    var kebab = $('.kebab');
    var panel = $('.menu-panel');
    var scrim = $('[data-menu-scrim]');
    if (kebab && panel) {
      var isOpen = false;
      var openMenu = function (open) {
        if (open === isOpen) return;
        isOpen = open;
        kebab.setAttribute('aria-expanded', String(open));
        kebab.setAttribute('aria-label', T(open ? 'nav.closeMenu' : 'nav.sections'));
        document.body.classList.toggle('nav-open', open);
        if (open) {
          panel.hidden = false;
          if (scrim) scrim.hidden = false;
          requestAnimationFrame(function () {
            panel.classList.add('is-open');
            if (scrim) scrim.classList.add('is-open');
          });
          setTimeout(function () {
            panel.classList.add('is-open');
            if (scrim) scrim.classList.add('is-open');
          }, 30);
        } else {
          panel.classList.remove('is-open');
          if (scrim) scrim.classList.remove('is-open');
          setTimeout(function () {
            if (isOpen) return;
            panel.hidden = true;
            if (scrim) scrim.hidden = true;
          }, 280);
        }
      };
      window.rgiCloseMenu = function () { openMenu(false); };

      kebab.addEventListener('click', function (e) {
        e.stopPropagation();
        openMenu(!isOpen);
      });
      if (scrim) scrim.addEventListener('click', function () { openMenu(false); });
      $$('[data-menu-close]', panel).forEach(function (b) {
        b.addEventListener('click', function () { openMenu(false); kebab.focus(); });
      });
      $$('a', panel).forEach(function (a) {
        a.addEventListener('click', function () { openMenu(false); });
      });
      panel.addEventListener('click', function (e) { e.stopPropagation(); });
      document.addEventListener('click', function () { if (isOpen) openMenu(false); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen) { openMenu(false); kebab.focus(); }
      });
    }

    $$('.lang__btn').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
    });
  }

  /* ---------------- shared chrome ---------------- */
  function initChrome() {
    register(function () {
      $$('[data-company="address"]').forEach(function (e) { e.textContent = D.company.address; });
      $$('[data-company="hours"]').forEach(function (e) { e.textContent = L(D.company.hours); });
      $$('[data-company="wa"]').forEach(function (e) { e.textContent = D.company.waDisplay; });
      $$('[data-company="year"]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
      $$('[data-icon]').forEach(function (e) {
        if (!e.getAttribute('data-icon-done')) {
          e.innerHTML = icon(e.getAttribute('data-icon'));
          e.setAttribute('data-icon-done', '1');
        }
      });
    });
  }

  /* ---------------- pesan cepat WhatsApp ---------------- */
  function initQuick() {
    var el = $('[data-render="quick"]');
    if (!el) return;
    register(function () {
      el.innerHTML = D.quick.map(function (q) {
        return '<a class="quick__item" href="' + esc(waHref(q.msg)) + '" target="_blank" rel="noopener" ' +
          'data-reveal>' +
          '<span class="quick__ic">' + icon(q.icon) + '</span>' +
          '<span class="quick__txt"><span class="quick__t">' + esc(L(q.title)) + '</span>' +
          '<span class="quick__s">' + esc(L(q.sub)) + '</span></span>' +
          '<span class="quick__go">' + icon('arrow') + '</span></a>';
      }).join('');
      rendered();
    });
  }

  /* ---------------- services ---------------- */
  function initServices() {
    var grid = $('[data-render="services"]');
    if (!grid) return;
    var full = grid.getAttribute('data-full') === 'true';
    register(function () {
      grid.innerHTML = D.services.map(function (s, i) {
        var pts = full ? '<ul class="card__list">' + L(s.points).map(function (p) {
          return '<li>' + icon('check') + '<span>' + esc(p) + '</span></li>';
        }).join('') + '</ul>' : '';
        var foot = full
          ? '<div class="card__cta"><a class="btn btn--wa btn--sm" href="' + esc(waHref(waService(s))) +
            '" target="_blank" rel="noopener">' + icon('wa') + '<span>' + esc(T('cta.order')) + '</span></a></div>'
          : '<div class="card__foot"><span class="link-arrow">' + esc(T('cta.detail')) + icon('arrow') + '</span></div>';
        var tag = full ? 'article' : 'a';
        var attrs = full ? '' : ' href="layanan.html#' + s.slug + '"';
        return '<' + tag + attrs + ' class="card' + (full ? '' : ' card--link') + '" id="' + s.slug + '" data-reveal>' +
          '<div class="card__icon">' + icon(s.icon) + '</div>' +
          '<span class="card__index">' + pad(i + 1) + '</span>' +
          '<h3 class="h3 card__title">' + esc(L(s.title)) + '</h3>' +
          '<p class="card__body">' + esc(L(s.desc)) + '</p>' + pts + foot +
          '</' + tag + '>';
      }).join('');
      rendered();
    });
  }

  /* ---------------- SOP ---------------- */
  function initSOP() {
    var el = $('[data-render="sop"]');
    if (!el) return;
    register(function () {
      el.innerHTML = '<span class="sop__progress" aria-hidden="true"></span>' +
        D.sop.map(function (s, i) {
          return '<div class="sop__step" data-reveal>' +
            '<div class="sop__num">' + pad(i + 1) + '</div>' +
            '<h3>' + esc(L(s.title)) + '</h3>' +
            '<p>' + esc(L(s.desc)) + '</p>' +
            '<span class="sop__meta">' + esc(L(s.out)) + '</span>' +
            '</div>';
        }).join('');
      rendered();
    });
  }

  /* ---------------- comparison ---------------- */
  function initCompare() {
    var el = $('[data-render="compare"]');
    if (!el) return;
    register(function () {
      var head = '<div class="compare__row compare__row--head">' +
        '<div class="compare__cell compare__cell--label">' + esc(T('why.colAspect')) + '</div>' +
        '<div class="compare__cell compare__cell--them">' + esc(T('why.colThem')) + '</div>' +
        '<div class="compare__cell compare__cell--us">' + esc(T('why.colUs')) + '</div></div>';
      el.innerHTML = head + D.compare.map(function (r) {
        return '<div class="compare__row" data-reveal>' +
          '<div class="compare__cell compare__cell--label">' + esc(L(r.aspect)) + '</div>' +
          '<div class="compare__cell compare__cell--them" data-label="' + esc(T('why.colThem')) + '">' +
          icon('minus', 'compare__ic') + '<span>' + esc(L(r.them)) + '</span></div>' +
          '<div class="compare__cell compare__cell--us" data-label="' + esc(T('why.colUs')) + '">' +
          icon('check', 'compare__ic') + '<span>' + esc(L(r.us)) + '</span></div>' +
          '</div>';
      }).join('');
      rendered();
    });
  }

  /* ---------------- safety ---------------- */
  function initSafety() {
    var el = $('[data-render="safety"]');
    if (!el) return;
    register(function () {
      el.innerHTML = D.safety.map(function (s) {
        return '<div class="safety__item" data-reveal>' +
          '<div class="safety__ic">' + icon(s.icon) + '</div>' +
          '<h3>' + esc(L(s.title)) + '</h3>' +
          '<p>' + esc(L(s.desc)) + '</p></div>';
      }).join('');
      rendered();
    });
  }

  /* ---------------- legality ---------------- */
  function initLegal() {
    var el = $('[data-render="legal"]');
    if (!el) return;
    register(function () {
      el.innerHTML = D.legal.map(function (l) {
        var no = l.number
          ? '<span class="legal__no">' + esc(T('about.legalNumber')) + ': <b>' + esc(l.number) + '</b></span>'
          : '<span class="legal__no">' + esc(T('about.legalOnRequest')) + '</span>';
        return '<article class="legal" data-reveal>' +
          '<div class="legal__top"><span class="legal__code">' + esc(l.code) + '</span>' +
          '<span class="legal__badge">' + icon('badge') + esc(T('about.legalStatus')) + '</span></div>' +
          '<h3 class="legal__name">' + esc(L(l.name)) + '</h3>' +
          '<p class="legal__desc">' + esc(L(l.desc)) + '</p>' + no + '</article>';
      }).join('');
      rendered();
    });
  }

  /* ---------------- portfolio ---------------- */
  var portoFilter = 'all';
  function projectCard(p) {
    return '<button class="pcard" type="button" data-lb-group="' + p.slug + '" data-lb-index="0" ' +
      'data-cat="' + esc(p.slug) + '" data-reveal>' +
      '<span class="pcard__media">' +
      '<span class="tag tag--onmedia">' + esc(T('porto.note')) + '</span>' +
      '<span class="pcard__count">' + p.gallery.length + ' ' + esc(T('porto.photos')) + '</span>' +
      '<img src="assets/img/portfolio/' + p.cover + '-sm.webp" width="720" height="540" loading="lazy" ' +
      'decoding="async" alt="' + esc(L(p.title)) + '">' +
      '<span class="pcard__veil"></span>' +
      '<span class="pcard__hover"><span>' + icon('zoom') + esc(T('porto.open')) + '</span></span>' +
      '</span>' +
      '<span class="pcard__body"><span class="mcard__cat">' + esc(L(p.category)) + '</span>' +
      '<span class="h3">' + esc(L(p.title)) + '</span>' +
      '<span class="mcard__loc">' + icon('mapPin') + esc(L(p.location)) + '</span></span></button>';
  }

  function initProjects() {
    var grid = $('[data-render="projects"]');
    if (grid) {
      register(function () {
        grid.innerHTML = D.projects.map(projectCard).join('');
        rendered();
      });
    }

    var filters = $('[data-render="porto-filters"]');
    if (filters) {
      register(function () {
        var list = [{ slug: 'all', label: { id: T('porto.all'), en: T('porto.all') } }]
          .concat(D.projects.map(function (p) { return { slug: p.slug, label: p.title }; }));
        filters.innerHTML = list.map(function (f) {
          return '<button class="filter" type="button" data-porto="' + f.slug + '" aria-pressed="' +
            (portoFilter === f.slug) + '">' + esc(L(f.label)) + '</button>';
        }).join('');
      });
      filters.addEventListener('click', function (e) {
        var b = e.target.closest('[data-porto]');
        if (!b) return;
        portoFilter = b.getAttribute('data-porto');
        $$('[data-porto]', filters).forEach(function (x) {
          x.setAttribute('aria-pressed', String(x.getAttribute('data-porto') === portoFilter));
        });
        $$('[data-project-section]').forEach(function (sec) {
          sec.hidden = portoFilter !== 'all' && sec.getAttribute('data-project-section') !== portoFilter;
        });
        $$('.pgrid .pcard').forEach(function (c) {
          c.classList.toggle('is-hidden',
            portoFilter !== 'all' && c.getAttribute('data-cat') !== portoFilter);
        });
        rendered();
      });
    }

    var full = $('[data-render="projects-full"]');
    if (full) {
      register(function () {
        full.innerHTML = D.projects.map(function (p, idx) {
          var shots = p.gallery.map(function (g, i) {
            return '<button class="gal__item" type="button" data-lb-group="' + p.slug + '" data-lb-index="' + i + '">' +
              '<img src="assets/img/portfolio/' + g.img + '-sm.webp" loading="lazy" decoding="async" ' +
              'alt="' + esc(L(g.cap)) + '">' +
              '<span class="gal__zoom">' + icon('zoom') + '</span>' +
              '<span class="gal__cap"><span class="gal__stage">' + esc(T('porto.note')) + '</span>' +
              '<span class="gal__title">' + esc(L(g.cap)) + '</span></span></button>';
          }).join('');
          return '<article class="section section--defer' + (idx % 2 ? ' section--alt' : '') +
            '" id="' + p.slug + '" data-project-section="' + p.slug + '">' +
            '<div class="container"><div class="head-row"><div class="section-head" data-reveal>' +
            '<p class="eyebrow">' + esc(L(p.category)) + '</p>' +
            '<h2 class="h2">' + esc(L(p.title)) + '</h2>' +
            '<p class="lead">' + esc(L(p.desc)) + '</p></div>' +
            '<div class="btn-row" data-reveal>' +
            '<span class="mcard__loc">' + icon('mapPin') + esc(L(p.location)) + '</span>' +
            '<a class="btn btn--wa btn--sm" href="' + esc(waHref(waProject(p))) + '" target="_blank" ' +
            'rel="noopener">' + icon('wa') + '<span>' + esc(T('cta.orderLike')) + '</span></a></div></div>' +
            '<div class="gal gal--wide">' + shots + '</div>' +
            '<p class="imgnote">' + esc(T('porto.noteFull')) + '</p></div></article>';
        }).join('');
        buildProjectLightboxes();
        rendered();
      });
    }
  }

  /* ---------------- library ---------------- */
  var libFilter = 'all';
  function stageLabel(key) {
    var s = D.stages.filter(function (x) { return x.key === key; })[0];
    return s ? L(s.label) : key;
  }

  function initLibrary() {
    var grid = $('[data-render="library"]');
    var bar = $('[data-render="library-filters"]');
    var vids = $('[data-render="videos"]');
    if (!grid && !vids) return;

    function applyFilter() {
      $$('[data-item-stage]').forEach(function (el) {
        var show = libFilter === 'all' || el.getAttribute('data-item-stage') === libFilter;
        el.classList.toggle('is-hidden', !show);
        if (el.classList.contains('vidcard')) el.style.display = show ? '' : 'none';
      });
      var empty = $('[data-library-empty]');
      if (empty) {
        var any = $$('[data-item-stage]').filter(function (e) {
          return !e.classList.contains('is-hidden') && e.style.display !== 'none';
        });
        empty.hidden = any.length > 0;
      }
      document.dispatchEvent(new CustomEvent('rgi:carousel-refresh'));
    }

    if (bar) {
      register(function () {
        var list = [{ key: 'all', label: { id: T('lib.all'), en: T('lib.all') } }].concat(D.stages);
        bar.innerHTML = list.map(function (s) {
          return '<button class="filter" type="button" data-stage="' + s.key + '" aria-pressed="' +
            (libFilter === s.key) + '">' + esc(L(s.label)) + '</button>';
        }).join('');
      });
      bar.addEventListener('click', function (e) {
        var b = e.target.closest('[data-stage]');
        if (!b) return;
        libFilter = b.getAttribute('data-stage');
        $$('[data-stage]', bar).forEach(function (x) {
          x.setAttribute('aria-pressed', String(x.getAttribute('data-stage') === libFilter));
        });
        applyFilter();
      });
    }

    if (grid) {
      register(function () {
        grid.innerHTML = D.library.map(function (it, i) {
          return '<button class="gal__item" type="button" data-lb-group="library" data-lb-index="' + i + '" ' +
            'data-item-stage="' + it.stage + '">' +
            '<img src="assets/img/library/' + it.img + '-sm.webp" loading="lazy" decoding="async" ' +
            'alt="' + esc(L(it.title)) + '">' +
            '<span class="gal__zoom">' + icon('zoom') + '</span>' +
            '<span class="gal__cap"><span class="gal__stage">' + esc(stageLabel(it.stage)) + '</span>' +
            '<span class="gal__title">' + esc(L(it.title)) + '</span>' +
            '<span class="gal__meta">' + esc(L(D.projectRef)) + '</span></span></button>';
        }).join('');
        lightboxes.library = D.library.map(function (it) {
          return {
            type: 'img', src: 'assets/img/library/' + it.img + '.webp',
            title: L(it.title), desc: L(it.desc) + ' · ' + L(D.projectRef)
          };
        });
        applyFilter();
        rendered();
      });
    }

    if (vids) {
      register(function () {
        vids.innerHTML = D.videos.map(function (v, i) {
          return '<button class="vidcard" type="button" data-lb-group="videos" data-lb-index="' + i + '" ' +
            'data-item-stage="' + v.stage + '">' +
            '<img src="' + esc(v.poster) + '" loading="lazy" decoding="async" alt="' + esc(L(v.title)) + '">' +
            '<span class="vidcard__shade"></span>' +
            '<span class="vidcard__n">' + pad(i + 1) + ' / ' + pad(D.videos.length) + '</span>' +
            '<span class="vidcard__dur">' + esc(v.dur) + '</span>' +
            '<span class="vidcard__play"><span>' + iconFill('play') + '</span></span>' +
            '<span class="vidcard__cap"><em>' + esc(stageLabel(v.stage)) + '</em>' +
            '<strong>' + esc(L(v.title)) + '</strong></span></button>';
        }).join('');
        lightboxes.videos = D.videos.map(function (v) {
          return { type: 'video', src: v.src, poster: v.poster, title: L(v.title), desc: L(v.desc) };
        });
        applyFilter();
        rendered();
      });
    }
  }

  /* =======================================================================
     CAROUSEL — rail bergulir: tombol kiri/kanan, titik, auto-slide
     ======================================================================= */
  function initCarousels() {
    $$('[data-carousel]').forEach(function (root) {
      if (root.__rgiCar) return;
      root.__rgiCar = true;

      var rail = $('.carousel__rail', root);
      if (!rail) return;
      var prev = $('[data-car-prev]', root);
      var next = $('[data-car-next]', root);
      var dots = $('[data-car-dots]', root);
      var delay = parseInt(root.getAttribute('data-carousel') || '5200', 10);
      var timer = null, paused = false, visible = false;

      function items() {
        return $$('.carousel__rail > *', root).filter(function (e) { return e.style.display !== 'none'; });
      }
      function step() {
        var it = items();
        if (it.length > 1) {
          var d = it[1].offsetLeft - it[0].offsetLeft;
          if (d > 0) return d;
        }
        return rail.clientWidth || 1;
      }
      function maxScroll() { return Math.max(0, rail.scrollWidth - rail.clientWidth); }
      function maxIndex() {
        var m = maxScroll();
        return m < 2 ? 0 : Math.ceil(m / step());
      }
      function index() {
        // Di ujung kanan, laporkan indeks maksimum supaya tombol "berikutnya"
        // benar-benar nonaktif walau sisa gulir kurang dari satu kartu.
        if (rail.scrollLeft >= maxScroll() - 2) return maxIndex();
        return Math.min(Math.round(rail.scrollLeft / step()), maxIndex());
      }
      /* Animasi gulir dibuat sendiri, bukan `behavior:'smooth'`:
         dukungannya tidak merata (Safari lama) dan tidak bisa dibatalkan. */
      var tween = null, guard = null;
      function animateTo(left) {
        if (tween) cancelAnimationFrame(tween);
        if (guard) clearTimeout(guard);
        if (reducedMQ.matches) { rail.scrollLeft = left; return; }
        var from = rail.scrollLeft, dist = left - from, t0 = 0, dur = 420, moved = false;
        rail.style.scrollSnapType = 'none';
        function done() {
          tween = null;
          rail.style.scrollSnapType = '';
          sync();
        }
        function tick(now) {
          moved = true;
          if (!t0) t0 = now;
          var k = Math.min(1, (now - t0) / dur);
          rail.scrollLeft = from + dist * (1 - Math.pow(1 - k, 3));
          if (k < 1) tween = requestAnimationFrame(tick); else done();
        }
        tween = requestAnimationFrame(tick);
        // Bila requestAnimationFrame tidak berjalan (tab latar), langsung lompat.
        guard = setTimeout(function () {
          if (!moved) { if (tween) cancelAnimationFrame(tween); rail.scrollLeft = left; done(); }
        }, 260);
      }
      function goTo(i) {
        // Dijepit dalam piksel: kartu terakhir tetap bisa dicapai walau sisa
        // ruang gulir lebih pendek daripada satu langkah kartu.
        animateTo(Math.min(Math.max(0, i) * step(), maxScroll()));
      }
      function sync() {
        var i = index(), m = maxIndex();
        if (prev) prev.disabled = i <= 0;
        if (next) next.disabled = i >= m;
        root.classList.toggle('is-static', m === 0);
        if (dots) {
          if (dots.children.length !== m + 1) {
            var html = '';
            for (var k = 0; k <= m; k++) {
              html += '<button class="carousel__dot" type="button" data-dot="' + k +
                '" aria-label="' + (k + 1) + '"></button>';
            }
            dots.innerHTML = html;
          }
          $$('[data-dot]', dots).forEach(function (d) {
            d.setAttribute('aria-current', String(+d.getAttribute('data-dot') === i));
          });
        }
      }
      function play() {
        stop();
        if (reducedMQ.matches || paused || document.hidden || !visible || maxIndex() < 1) return;
        timer = setInterval(function () {
          goTo(index() >= maxIndex() ? 0 : index() + 1);
        }, delay);
      }
      function stop() { if (timer) { clearInterval(timer); timer = null; } }

      if (prev) prev.addEventListener('click', function () { goTo(index() - 1); play(); });
      if (next) next.addEventListener('click', function () { goTo(index() + 1); play(); });
      if (dots) dots.addEventListener('click', function (e) {
        var d = e.target.closest('[data-dot]');
        if (d) { goTo(+d.getAttribute('data-dot')); play(); }
      });

      var raf = null;
      rail.addEventListener('scroll', function () {
        if (raf) return;
        raf = requestAnimationFrame(function () { raf = null; sync(); });
      }, { passive: true });

      ['pointerenter', 'focusin'].forEach(function (ev) {
        root.addEventListener(ev, function () { paused = true; stop(); });
      });
      ['pointerleave', 'focusout'].forEach(function (ev) {
        root.addEventListener(ev, function () { paused = false; play(); });
      });
      rail.addEventListener('touchstart', function () { paused = true; stop(); }, { passive: true });
      rail.addEventListener('touchend', function () {
        setTimeout(function () { paused = false; play(); }, 2500);
      }, { passive: true });
      document.addEventListener('visibilitychange', function () { document.hidden ? stop() : play(); });
      document.addEventListener('rgi:carousel-refresh', function () { sync(); play(); });
      window.addEventListener('resize', sync, { passive: true });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) {
          visible = en[0].isIntersecting;
          visible ? play() : stop();
        }, { threshold: 0.2 }).observe(root);
      } else { visible = true; play(); }

      sync();
    });
  }

  /* =======================================================================
     SLIDER GAMBAR KERJA (Denah) — auto-slide, tombol kiri/kanan, geser
     ======================================================================= */
  var sheetGroup = 'all';
  function initSheetSlider() {
    var root = $('[data-render="sheet-slider"]');
    if (!root) return;
    var tabs = $('[data-render="sheet-groups"]');
    var index = 0, paused = false, timer = null, onScreen = false;
    var DELAY = 7000;

    function visible() {
      return D.sheets.filter(function (s) { return sheetGroup === 'all' || s.group === sheetGroup; });
    }

    root.innerHTML =
      '<div class="slider__frame">' +
      '<div class="slider__viewport"><div class="slider__track" data-track></div></div>' +
      '<button class="slider__nav slider__nav--prev" type="button" data-prev ' +
      'data-i18n-attr="aria-label:lb.prev">' + icon('chevL') + '</button>' +
      '<button class="slider__nav slider__nav--next" type="button" data-next ' +
      'data-i18n-attr="aria-label:lb.next">' + icon('chevR') + '</button>' +
      '</div>' +
      '<div class="slider__cap"><span class="slider__title" data-title></span>' +
      '<span class="slider__scale" data-scale></span></div>' +
      '<p class="slider__desc" data-desc></p>' +
      '<div class="slider__bar"><i data-bar></i></div>' +
      '<div class="slider__foot"><span class="slider__count" data-count></span>' +
      '<button class="slider__toggle" type="button" data-toggle></button></div>' +
      '<div class="sheet-nav" data-thumbs role="group"></div>';

    function paintTrack() {
      var list = visible();
      $('[data-track]', root).innerHTML = list.map(function (s, i) {
        var near = Math.abs(i - index) <= 1;
        return '<button class="slider__slide" type="button" data-lb-group="sheets" data-lb-index="' + i + '" ' +
          'aria-label="' + esc(L(s.title)) + '" tabindex="' + (i === index ? '0' : '-1') + '">' +
          '<img ' + (near ? 'src' : 'data-src') + '="assets/img/teknis/' + s.file + '.webp" ' +
          'decoding="async" alt="' + esc(L(s.title)) + '"></button>';
      }).join('');
      $('[data-thumbs]', root).innerHTML = list.map(function (s, i) {
        return '<button class="sheet-thumb" type="button" data-sheet="' + i + '" aria-pressed="' +
          (i === index) + '"><img src="assets/img/teknis/' + s.file + '-sm.webp" loading="lazy" ' +
          'decoding="async" alt=""><em>' + esc(L(s.title)) + '</em></button>';
      }).join('');
      lightboxes.sheets = list.map(function (s) {
        return {
          type: 'img', src: 'assets/img/teknis/' + s.file + '.webp',
          title: L(s.title), desc: L(s.desc) + ' · ' + T('plan.scale') + ' ' + s.scale
        };
      });
    }

    function loadNear() {
      $$('.slider__slide', root).forEach(function (slide, i) {
        if (Math.abs(i - index) > 1) return;
        var img = $('img[data-src]', slide);
        if (img) { img.src = img.getAttribute('data-src'); img.removeAttribute('data-src'); }
      });
    }

    function restartBar() {
      var bar = $('[data-bar]', root);
      if (!bar) return;
      bar.classList.remove('is-running');
      void bar.offsetWidth;
      if (!paused && !reducedMQ.matches && onScreen) {
        bar.style.setProperty('--slide-ms', DELAY + 'ms');
        bar.classList.add('is-running');
      }
    }

    function paintState(animate) {
      var list = visible();
      if (!list.length) return;
      if (index >= list.length) index = 0;
      if (index < 0) index = list.length - 1;
      var s = list[index];
      var track = $('[data-track]', root);
      if (animate === false) track.classList.add('is-instant');
      track.style.transform = 'translate3d(' + (-index * 100) + '%,0,0)';
      if (animate === false) { void track.offsetWidth; track.classList.remove('is-instant'); }

      $$('.slider__slide', root).forEach(function (sl, i) {
        sl.setAttribute('tabindex', i === index ? '0' : '-1');
        sl.setAttribute('aria-hidden', String(i !== index));
      });
      $('[data-title]', root).textContent = L(s.title);
      $('[data-scale]', root).textContent = T('plan.scale') + ' ' + s.scale;
      $('[data-desc]', root).textContent = L(s.desc);
      $('[data-count]', root).textContent = pad(index + 1) + ' / ' + pad(list.length);
      $$('[data-sheet]', root).forEach(function (b) {
        b.setAttribute('aria-pressed', String(+b.getAttribute('data-sheet') === index));
      });
      var active = $('[data-sheet="' + index + '"]', root);
      if (active && active.scrollIntoView) {
        active.scrollIntoView({ block: 'nearest', inline: 'nearest',
          behavior: reducedMQ.matches ? 'auto' : 'smooth' });
      }
      loadNear();
      restartBar();
      document.dispatchEvent(new CustomEvent('rgi:sheet', { detail: { file: s.file, index: index } }));
    }

    function play() {
      stop();
      if (paused || reducedMQ.matches || document.hidden || !onScreen || visible().length < 2) return;
      timer = setTimeout(function () { index++; paintState(); play(); }, DELAY);
    }
    function stop() { if (timer) { clearTimeout(timer); timer = null; } }
    function go(d) { index += d; paintState(); play(); }
    function setPaused(v) {
      paused = v;
      root.classList.toggle('is-paused', v);
      var t = $('[data-toggle]', root);
      if (t) {
        t.innerHTML = (v ? iconFill('play') : icon('pause')) +
          '<span>' + esc(T(v ? 'plan.play' : 'plan.pause')) + '</span>';
      }
      if (v) stop(); else { restartBar(); play(); }
    }

    root.addEventListener('click', function (e) {
      if (e.target.closest('[data-prev]')) { go(-1); return; }
      if (e.target.closest('[data-next]')) { go(1); return; }
      if (e.target.closest('[data-toggle]')) { setPaused(!paused); return; }
      var th = e.target.closest('[data-sheet]');
      if (th) { index = +th.getAttribute('data-sheet'); paintState(); play(); }
    });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { go(1); e.preventDefault(); }
    });
    ['pointerenter', 'focusin'].forEach(function (ev) {
      root.addEventListener(ev, function () { if (!paused) stop(); });
    });
    ['pointerleave', 'focusout'].forEach(function (ev) {
      root.addEventListener(ev, function () { if (!paused) play(); });
    });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : play(); });

    /* geser dengan jari / tetikus */
    (function () {
      var x0 = 0, y0 = 0, dragging = false;
      root.addEventListener('pointerdown', function (e) {
        if (!e.target.closest('.slider__viewport') || e.button > 0) return;
        x0 = e.clientX; y0 = e.clientY; dragging = true; stop();
      }, { passive: true });
      root.addEventListener('pointerup', function (e) {
        if (!dragging) return;
        dragging = false;
        var dx = e.clientX - x0, dy = e.clientY - y0;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) { go(dx < 0 ? 1 : -1); }
        else play();
      });
      root.addEventListener('pointercancel', function () { dragging = false; play(); });
    })();

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (en) {
        onScreen = en[0].isIntersecting;
        if (onScreen) { restartBar(); play(); } else stop();
      }, { threshold: 0.2 }).observe(root);
    } else { onScreen = true; }

    if (tabs) {
      register(function () {
        tabs.innerHTML = D.sheetGroups.map(function (g) {
          return '<button class="filter" type="button" data-group="' + g.key + '" aria-pressed="' +
            (sheetGroup === g.key) + '">' + esc(L(g.label)) + '</button>';
        }).join('');
      });
      tabs.addEventListener('click', function (e) {
        var b = e.target.closest('[data-group]');
        if (!b) return;
        sheetGroup = b.getAttribute('data-group');
        index = 0;
        $$('[data-group]', tabs).forEach(function (x) {
          x.setAttribute('aria-pressed', String(x.getAttribute('data-group') === sheetGroup));
        });
        paintTrack(); paintState(false); play(); rendered();
      });
    }

    /* dipanggil dari stepper model 3D */
    window.rgiShowSheet = function (file) {
      var found = D.sheets.filter(function (s) { return s.file === file; })[0];
      if (!found) return;
      if (sheetGroup !== 'all' && found.group !== sheetGroup) {
        sheetGroup = 'all';
        if (tabs) $$('[data-group]', tabs).forEach(function (x) {
          x.setAttribute('aria-pressed', String(x.getAttribute('data-group') === 'all'));
        });
        paintTrack();
      }
      var list = visible(), i = -1;
      for (var k = 0; k < list.length; k++) { if (list[k].file === file) { i = k; break; } }
      if (i >= 0 && i !== index) { index = i; paintState(); play(); }
    };

    register(function () {
      paintTrack();
      paintState(false);
      setPaused(paused);
      applyAttrs(root);
      rendered();
    });
  }

  /* ---------------- tim ---------------- */
  function initTeam() {
    var ownerEl = $('[data-render="owner"]');
    var listEl = $('[data-render="team"]');
    if (!ownerEl && !listEl) return;

    if (ownerEl) {
      register(function () {
        var o = D.owner;
        ownerEl.innerHTML =
          '<div class="owner__media">' +
          '<span class="owner__badge">' + icon('badge') + esc(T('team.ownerLabel')) + '</span>' +
          '<img src="assets/img/tim/' + o.photo + '.webp" width="900" height="900" ' +
          'loading="lazy" decoding="async" alt="' + esc(o.name) + '"></div>' +
          '<div class="owner__body">' +
          '<p class="owner__role">' + esc(L(o.role)) + '</p>' +
          '<p class="owner__name">' + esc(o.name) + '</p>' +
          '<blockquote class="owner__quote">' + esc(L(o.quote)) + '</blockquote>' +
          '<p class="owner__bio">' + esc(L(o.bio)) + '</p></div>';
        rendered();
      });
    }

    if (listEl) {
      register(function () {
        listEl.innerHTML = D.team.map(function (m, i) {
          var media = m.photo
            ? '<span class="tcard__media"><span class="tcard__n">' + pad(i + 1) + '</span>' +
              '<img src="assets/img/tim/' + m.photo + '-sm.webp" width="400" height="533" ' +
              'loading="lazy" decoding="async" alt="' + esc(m.name) + '"></span>'
            : '<span class="tcard__media tcard__media--empty">' +
              '<span class="tcard__n">' + pad(i + 1) + '</span>' +
              icon('user') + '<span>' + esc(T('team.photoSoon')) + '</span></span>';
          return '<article class="tcard">' + media +
            '<span class="tcard__body">' +
            '<span class="tcard__role">' + esc(L(m.role)) + '</span>' +
            '<span class="tcard__name">' + esc(m.name) + '</span>' +
            '<span class="tcard__desc">' + esc(L(m.desc)) + '</span></span></article>';
        }).join('');
        rendered();
      });
    }
  }

  /* =======================================================================
     STEPPER TAHAP STRUKTUR 3D
     Tombol tahap tetap berfungsi walau model 3D belum/tidak termuat:
     gambar kerja di slider ikut berpindah.
     ======================================================================= */
  function initBlueprintSteps() {
    var list = $('[data-render="bp-steps"]');
    var host = $('[data-blueprint]');
    if (!host) return;                 // halaman tanpa model 3D
    var active = 0, userPicked = false;

    function paintHud() {
      if (!host) return;
      var st = D.bpStages[active];
      var n = $('[data-blueprint-stage]', host);
      var t = $('[data-blueprint-label]', host);
      var d = $('[data-blueprint-desc]', host);
      var sh = $('[data-blueprint-sheet]', host);
      if (n) n.textContent = pad(active + 1) + ' / ' + pad(D.bpStages.length);
      if (t) t.textContent = L(st.title);
      if (d) d.textContent = L(st.desc);
      if (sh) sh.innerHTML = icon('drawing') + esc(T('plan.sheetOf') + ' ' + L(st.title));
    }

    function setActive(i, silent) {
      active = Math.max(0, Math.min(i, D.bpStages.length - 1));
      if (list) {
        $$('[data-bp-step]', list).forEach(function (b) {
          b.setAttribute('aria-current', String(+b.getAttribute('data-bp-step') === active));
        });
      }
      paintHud();
      if (!silent && window.rgiShowSheet) window.rgiShowSheet(D.bpStages[active].sheet);
    }

    register(function () {
      if (!list) { paintHud(); return; }
      list.innerHTML = D.bpStages.map(function (st, i) {
        return '<button class="bp-step" type="button" data-bp-step="' + i + '" aria-current="' +
          (i === active) + '">' +
          '<span class="bp-step__n">' + pad(i + 1) + '</span>' +
          '<span><span class="bp-step__t">' + esc(L(st.title)) + '</span>' +
          '<span class="bp-step__e">' + esc(st.elev) + '</span></span></button>';
      }).join('');
      paintHud();
    });

    if (list) list.addEventListener('click', function (e) {
      var b = e.target.closest('[data-bp-step]');
      if (!b) return;
      var i = +b.getAttribute('data-bp-step');
      userPicked = true;
      setActive(i);
      document.dispatchEvent(new CustomEvent('rgi:bp-goto', { detail: { index: i } }));
    });

    // Model 3D memberi tahu tahap yang sedang tampil saat pengguna menggulir.
    document.addEventListener('rgi:bp-stage', function (e) {
      if (e.detail.index === active) return;
      setActive(e.detail.index, true);
    });

    // Bilah progres tipis di atas kanvas, mengikuti penyusunan struktur.
    document.addEventListener('rgi:bp-progress', function (e) {
      var bar = host && $('[data-bp-bar]', host);
      if (bar) bar.style.transform = 'scaleX(' + e.detail.p.toFixed(4) + ')';
    });

    // Model dimuat belakangan; kalau pengguna sudah memilih tahap, ulangi
    // perintahnya agar model langsung menampilkan tahap tersebut.
    document.addEventListener('rgi:bp-ready', function () {
      if (userPicked) {
        document.dispatchEvent(new CustomEvent('rgi:bp-goto', { detail: { index: active } }));
      }
    });
  }

  /* ---------------- lightbox ---------------- */
  var lightboxes = {};
  var lb = { el: null, group: null, index: 0, lastFocus: null };

  function buildProjectLightboxes() {
    D.projects.forEach(function (p) {
      lightboxes[p.slug] = p.gallery.map(function (g) {
        return {
          type: 'img', src: 'assets/img/portfolio/' + g.img + '.webp',
          title: L(g.cap), desc: L(p.title) + ' · ' + L(p.location) + ' · ' + T('porto.note')
        };
      });
    });
  }

  function initLightbox() {
    var el = document.createElement('div');
    el.className = 'lightbox';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.hidden = true;
    el.innerHTML =
      '<div class="lightbox__bar"><span class="lightbox__count" data-lb-count></span>' +
      '<button class="lb-btn" type="button" data-lb-close>' + icon('close') + '</button></div>' +
      '<div class="lightbox__stage" data-lb-stage>' +
      '<button class="lb-btn lightbox__nav lightbox__nav--prev" type="button" data-lb-prev>' + icon('chevL') + '</button>' +
      '<button class="lb-btn lightbox__nav lightbox__nav--next" type="button" data-lb-next>' + icon('chevR') + '</button>' +
      '</div><div class="lightbox__cap" data-lb-cap></div>';
    document.body.appendChild(el);
    lb.el = el;

    function paint() {
      var list = lightboxes[lb.group] || [];
      var m = list[lb.index];
      if (!m) return;
      var stage = $('[data-lb-stage]', el);
      $$('img,video', stage).forEach(function (n) { n.remove(); });
      var node;
      if (m.type === 'video') {
        node = document.createElement('video');
        node.src = m.src; node.poster = m.poster || ''; node.controls = true;
        node.playsInline = true; node.preload = 'metadata';
        node.setAttribute('controlsList', 'nodownload');
      } else {
        node = document.createElement('img');
        node.src = m.src; node.alt = m.title || '';
        node.decoding = 'async';
      }
      stage.insertBefore(node, stage.firstChild);
      $('[data-lb-cap]', el).innerHTML = '<strong>' + esc(m.title) + '</strong>' + esc(m.desc || '');
      $('[data-lb-count]', el).textContent = pad(lb.index + 1) + ' ' + T('lb.of') + ' ' + pad(list.length);
      var multi = list.length > 1;
      $('[data-lb-prev]', el).hidden = !multi;
      $('[data-lb-next]', el).hidden = !multi;
      $('[data-lb-close]', el).setAttribute('aria-label', T('lb.close'));
      $('[data-lb-prev]', el).setAttribute('aria-label', T('lb.prev'));
      $('[data-lb-next]', el).setAttribute('aria-label', T('lb.next'));
      el.setAttribute('aria-label', m.title || '');
      if (m.type === 'video') { var pr = node.play(); if (pr && pr.catch) pr.catch(function () {}); }
    }

    function open(group, index) {
      if (!lightboxes[group] || !lightboxes[group].length) return;
      lb.group = group; lb.index = index || 0; lb.lastFocus = document.activeElement;
      el.hidden = false;
      paint();
      requestAnimationFrame(function () { el.classList.add('is-open'); });
      setTimeout(function () { el.classList.add('is-open'); }, 30);
      document.body.style.overflow = 'hidden';
      $('[data-lb-close]', el).focus();
    }
    function close() {
      el.classList.remove('is-open');
      document.body.style.overflow = '';
      $$('video', el).forEach(function (v) { v.pause(); });
      setTimeout(function () { el.hidden = true; }, 280);
      if (lb.lastFocus && lb.lastFocus.focus) lb.lastFocus.focus();
    }
    function step(d) {
      var list = lightboxes[lb.group] || [];
      if (!list.length) return;
      $$('video', el).forEach(function (v) { v.pause(); });
      lb.index = (lb.index + d + list.length) % list.length;
      paint();
    }
    window.rgiLightboxRepaint = function () { if (!el.hidden) paint(); };

    $('[data-lb-close]', el).addEventListener('click', close);
    $('[data-lb-prev]', el).addEventListener('click', function () { step(-1); });
    $('[data-lb-next]', el).addEventListener('click', function () { step(1); });
    el.addEventListener('click', function (e) {
      if (e.target === el || e.target.classList.contains('lightbox__stage')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (el.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'Tab') {
        var f = $$('button:not([hidden]),video', el);
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('[data-lb-group]');
      if (!trigger) return;
      e.preventDefault();
      open(trigger.getAttribute('data-lb-group'), parseInt(trigger.getAttribute('data-lb-index') || '0', 10));
    });
  }

  /* ---------------- contact form -> WhatsApp ---------------- */
  function initForm() {
    var form = $('[data-form="consult"]');
    if (!form) return;
    var typeSel = $('#f-type', form);

    register(function () {
      if (!typeSel) return;
      var cur = typeSel.value;
      typeSel.innerHTML = '<option value="" disabled selected>' + esc(T('contact.fTypePh')) + '</option>' +
        D.services.map(function (s) {
          return '<option value="' + esc(L(s.title)) + '">' + esc(L(s.title)) + '</option>';
        }).join('');
      if (cur) {
        var match = $$('option', typeSel).filter(function (o) { return o.value === cur; })[0];
        if (match) typeSel.value = cur;
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, vals = {};
      [['f-name', true], ['f-contact', true], ['f-type', false], ['f-loc', false], ['f-msg', true]]
        .forEach(function (row) {
          var input = $('#' + row[0], form);
          if (!input) return;
          var wrap = input.closest('.field');
          var v = (input.value || '').trim();
          vals[row[0]] = v;
          if (row[1] && !v) { wrap.classList.add('has-error'); ok = false; }
          else wrap.classList.remove('has-error');
        });
      if (!ok) {
        var firstErr = $('.field.has-error input, .field.has-error textarea', form);
        if (firstErr) firstErr.focus();
        return;
      }
      var lines = [
        (lang === 'id' ? 'Nama' : 'Name') + ': ' + vals['f-name'],
        (lang === 'id' ? 'Kontak' : 'Contact') + ': ' + vals['f-contact']
      ];
      if (vals['f-type']) lines.push((lang === 'id' ? 'Jenis pekerjaan' : 'Type of work') + ': ' + vals['f-type']);
      if (vals['f-loc']) lines.push((lang === 'id' ? 'Lokasi' : 'Location') + ': ' + vals['f-loc']);
      lines.push('', (lang === 'id' ? 'Kebutuhan' : 'Requirements') + ':', vals['f-msg']);

      var okBox = $('[data-form-ok]', form);
      if (okBox) okBox.classList.add('is-visible');
      var body = lines.join(NL);
      window.open(D.company.waFor({ id: body, en: body }, lang), '_blank', 'noopener');
    });

    $$('input,textarea,select', form).forEach(function (i) {
      i.addEventListener('input', function () {
        var w = i.closest('.field');
        if (w) w.classList.remove('has-error');
      });
    });
  }

  /* ---------------- boot ---------------- */
  function boot() {
    document.documentElement.classList.remove('no-js');
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (saved === 'en' || saved === 'id') lang = saved;
    } catch (e) {}

    initHeader();
    initChrome();
    initQuick();
    initServices();
    initSOP();
    initCompare();
    initSafety();
    initLegal();
    initProjects();
    initTeam();
    initLibrary();
    initSheetSlider();
    initBlueprintSteps();
    initLightbox();
    initForm();
    buildProjectLightboxes();

    setLang(lang, false);
    initCarousels();
    document.addEventListener('rgi:rendered', initCarousels);
    document.addEventListener('rgi:lang', function () {
      if (window.rgiLightboxRepaint) window.rgiLightboxRepaint();
    });

    window.__rgiReady = true;
    document.dispatchEvent(new CustomEvent('rgi:ready'));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
