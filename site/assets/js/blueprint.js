/* =========================================================================
   RGI — Pemuat model struktur 3D.
   Three.js (±600 KB) baru diunduh ketika bagian model mendekati layar,
   sehingga pengunjung yang tidak sampai ke sana tidak menanggung biayanya.
   ========================================================================= */
const host = document.querySelector('[data-blueprint]');

if (host) {
  const loading = host.querySelector('[data-blueprint-loading]');
  const fallback = host.querySelector('[data-blueprint-fallback]');

  const supported = (function () {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext &&
        (c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) { return false; }
  })();

  if (!supported) {
    if (loading) loading.hidden = true;
    if (fallback) fallback.hidden = false;
  } else {
    let started = false;
    const boot = async () => {
      if (started) return;
      started = true;
      try {
        const mod = await import('./blueprint-scene.js');
        mod.default(host);
        if (loading) loading.hidden = true;
      } catch (e) {
        if (loading) loading.hidden = true;
        if (fallback) fallback.hidden = false;
        if (window.console) console.warn('[rgi] 3D:', e);
      }
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) { io.disconnect(); boot(); }
      }, { rootMargin: '500px 0px' });
      io.observe(host);
    } else {
      boot();
    }
    // Jika pengunjung menekan tombol tahap sebelum model termuat, muat sekarang.
    document.addEventListener('rgi:bp-goto', boot, { once: true });
  }
}
