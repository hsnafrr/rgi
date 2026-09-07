/* =========================================================================
   RGI — Gerak berbasis scroll (GSAP + ScrollTrigger)
   • Hero: video di-scrub oleh gulir; teks baru muncul setelah animasi selesai.
   • Seluruh animasi dilewati bila pengguna memilih prefers-reduced-motion.
   ========================================================================= */
(function () {
  'use strict';

  var html = document.documentElement;
  var hero = document.querySelector('[data-hero]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hero tetap harus tampil walau GSAP gagal dimuat / gerak dimatikan. */
  function heroStatic() {
    if (!hero) return;
    hero.classList.remove('hero--scroll', 'is-scrubbing');
    hero.classList.add('is-static');
    var v = hero.querySelector('video');
    if (v) {
      if (!v.src && v.dataset.src) v.src = v.dataset.src;
      v.loop = true;
      v.muted = true;
      if (!reduced) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    }
  }

  if (!window.gsap || !window.ScrollTrigger) {
    html.classList.add('motion-off');
    heroStatic();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  // URL bar ponsel yang muncul/hilang tidak boleh memicu refresh & lompatan.
  ScrollTrigger.config({ ignoreMobileResize: true });
  html.classList.add('motion-on');

  if (reduced) {
    html.classList.remove('motion-on');
    html.classList.add('motion-off');
    gsap.set('[data-reveal]', { opacity: 1, y: 0, clearProps: 'all' });
    heroStatic();
    return;
  }

  /* =====================================================================
     1. HERO — video di-scrub mengikuti gulir
     ===================================================================== */
  function heroScroll() {
    if (!hero) return;
    var video = hero.querySelector('video');
    var bar = hero.querySelector('[data-hero-bar]');
    if (!video) { heroStatic(); return; }

    var REVEAL = 0.88;          // ambang teks muncul (video praktis selesai)

    // Hemat kuota: pada mode Save-Data atau koneksi 2G, video 1–3 MB tidak
    // diunduh sama sekali — hero memakai poster dan teks langsung tampil.
    var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn && (conn.saveData === true ||
        /^(slow-)?2g$/.test(conn.effectiveType || ''))) {
      hero.classList.remove('hero--scroll');
      hero.classList.add('is-static');
      return;
    }

    var small = window.matchMedia('(max-width: 900px)').matches;
    var src = (small && video.dataset.srcSm) ? video.dataset.srcSm : video.dataset.src;
    if (!src) { heroStatic(); return; }

    var settled = false;
    var failTimer = setTimeout(function () { if (!settled) { settled = true; heroStatic(); } }, 6000);

    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.preload = 'auto';
    video.src = src;

    video.addEventListener('error', function () {
      if (!settled) { settled = true; clearTimeout(failTimer); heroStatic(); }
    });

    video.addEventListener('loadedmetadata', function () {
      if (settled) return;
      settled = true;
      clearTimeout(failTimer);

      var dur = video.duration;
      if (!isFinite(dur) || dur <= 0) { heroStatic(); return; }

      // iOS/Safari baru mengizinkan seek setelah video sempat diputar.
      var kick = video.play();
      if (kick && kick.then) {
        kick.then(function () { video.pause(); })
            .catch(function () { /* autoplay ditolak: seek biasanya tetap jalan */ });
      }

      // Server tanpa dukungan HTTP Range membuat video tidak bisa di-seek.
      // Uji dulu; bila gagal, hero jatuh ke mode putar-otomatis biasa.
      probeSeek(function (ok) {
        if (!ok) { heroStatic(); return; }
        bindScrub(dur);
      });
      return;
    }, { once: true });

    /* Server tanpa HTTP Range melaporkan seekable = [0,0]; browser menolak seek.
       Kita tunggu sebentar sampai rentang seekable mencakup durasi video. */
    function probeSeek(cb) {
      var dur = video.duration;
      var tries = 0;
      (function check() {
        var sk = video.seekable;
        if (sk.length && sk.end(sk.length - 1) >= Math.min(dur - 0.5, dur * 0.9)) return cb(true);
        if (++tries > 14) return cb(false);        // ~3,5 detik
        setTimeout(check, 250);
      })();
    }

    function bindScrub(dur) {
      try { video.currentTime = 0; } catch (e) {}

      var pending = null, want = 0, lastCls = '';
      function seek() {
        pending = null;
        var t = Math.min(want, dur - 0.05);
        if (Math.abs(video.currentTime - t) < 0.015) return;
        try { video.currentTime = t; } catch (e) {}
      }

      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          var p = self.progress;
          want = p * dur;
          if (pending === null) pending = requestAnimationFrame(seek);
          if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';

          var cls = p >= REVEAL ? 'rev' : (p > 0.015 ? 'scr' : '');
          if (cls !== lastCls) {
            lastCls = cls;
            hero.classList.toggle('is-revealed', cls === 'rev');
            hero.classList.toggle('is-scrubbing', cls === 'scr');
          }
        }
      });

      ScrollTrigger.refresh();
    }

    video.load();
  }

  /* =====================================================================
     2. Reveal berkelompok untuk elemen [data-reveal]
     ===================================================================== */
  function setupReveals() {
    var fresh = gsap.utils.toArray('[data-reveal]').filter(function (el) {
      return !el.__rgiRevealed;
    });
    if (!fresh.length) return;
    fresh.forEach(function (el) { el.__rgiRevealed = true; });
    gsap.set(fresh, { opacity: 0, y: 20 });

    ScrollTrigger.batch(fresh, {
      start: 'top 90%',
      once: true,
      interval: 0.09,
      batchMax: 8,
      onEnter: function (batch) {
        gsap.to(batch, {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          stagger: { each: 0.07, from: 'start' }, overwrite: true,
          onComplete: function () {
            // lepaskan properti agar tidak menahan layer komposit
            gsap.set(this.targets(), { clearProps: 'transform' });
          }
        });
      }
    });
  }

  /* =====================================================================
     3. Blueprint grid pada page-hero
     ===================================================================== */
  function pageHeroDrift() {
    var grid = document.querySelector('.page-hero__grid');
    if (!grid || window.innerWidth < 900) return;
    gsap.to(grid, {
      yPercent: 16, ease: 'none',
      scrollTrigger: { trigger: '.page-hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* =====================================================================
     4. Timeline SOP
     ===================================================================== */
  function sopTimeline() {
    var sop = document.querySelector('.sop');
    if (!sop || sop.__rgiSop) return;
    sop.__rgiSop = true;

    var steps = gsap.utils.toArray('.sop__step', sop);
    var bar = sop.querySelector('.sop__progress');
    if (!steps.length) return;

    if (bar) {
      gsap.fromTo(bar, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: sop, start: 'top 72%', end: 'bottom 72%', scrub: 0.6 }
      });
    }
    steps.forEach(function (step, i) {
      ScrollTrigger.create({
        trigger: step, start: 'top 78%', end: 'bottom 30%',
        onEnter: function () { step.classList.add('is-active'); },
        onEnterBack: function () { step.classList.add('is-active'); },
        onLeaveBack: function () { if (i > 0) step.classList.remove('is-active'); }
      });
    });
  }

  /* =====================================================================
     5. Penghitung angka
     ===================================================================== */
  function counters() {
    gsap.utils.toArray('[data-count]').forEach(function (el) {
      if (el.__rgiCount) return;
      el.__rgiCount = true;
      var end = parseFloat(el.getAttribute('data-count'));
      var obj = { v: 0 };
      gsap.to(obj, {
        v: end, duration: 1.3, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        onUpdate: function () { el.textContent = Math.round(obj.v); }
      });
    });
  }

  /* =====================================================================
     boot & refresh
     ===================================================================== */
  function refreshAll() {
    setupReveals();
    sopTimeline();
    counters();
    ScrollTrigger.refresh();
  }

  function start() {
    if (start.done) return;
    start.done = true;
    heroScroll();
    pageHeroDrift();
    refreshAll();
  }
  document.addEventListener('rgi:ready', start);
  if (window.__rgiReady) start();

  var pending;
  function debouncedRefresh() {
    clearTimeout(pending);
    pending = setTimeout(refreshAll, 70);
  }
  document.addEventListener('rgi:rendered', debouncedRefresh);
  document.addEventListener('rgi:lang', debouncedRefresh);

  /* Jaring pengaman: satu kali, bukan interval terus-menerus. */
  function rescue() {
    var vh = window.innerHeight;
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0 && +getComputedStyle(el).opacity < 0.02) {
        gsap.set(el, { opacity: 1, y: 0 });
      }
    });
  }
  setTimeout(rescue, 2500);
  window.addEventListener('load', function () { ScrollTrigger.refresh(); setTimeout(rescue, 400); });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  }
})();
