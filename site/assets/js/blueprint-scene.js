/* =========================================================================
   RGI — Model struktur 3D
   Wireframe struktur yang tersusun bertahap, memakai dimensi as-ke-as dari
   lembar Rencana Pondasi (satuan meter). Tahap aktif ditonjolkan, tahap yang
   sudah selesai diredupkan, agar tiap bagian terbaca jelas — bukan hanya
   bentuk akhirnya.
   ========================================================================= */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function init(host) {
  const D = window.RGI || {};
  const STAGES = D.bpStages || [];
  const N = 5;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  host.insertBefore(canvas, host.firstChild);

  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: true, powerPreference: 'low-power'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(host.clientWidth, host.clientHeight, false);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x1b1512, 44, 104);

  const camera = new THREE.PerspectiveCamera(38, host.clientWidth / host.clientHeight, 0.5, 220);
  camera.position.set(27.5, 17.5, 30);

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = Math.PI / 2.08;
  controls.rotateSpeed = 0.6;
  controls.autoRotate = !coarse && !reduced;   // hemat baterai di ponsel
  controls.autoRotateSpeed = 0.45;
  controls.target.set(0, 5.2, 0);
  ['pointerdown', 'touchstart'].forEach((ev) => {
    renderer.domElement.addEventListener(ev, () => { controls.autoRotate = false; }, { passive: true });
  });

  /* ---------------- grid struktur (meter, dari gambar kerja) ------------ */
  const W = 16.53, Dp = 14.69;
  const xs = [0, 4.20, 8.70, 12.08, 16.53].map(v => v - W / 2);
  const zs = [0, 3.14, 6.01, 9.68, 14.69].map(v => v - Dp / 2);
  const FLOORS = [
    { base: 0.00, top: 3.60 },
    { base: 3.60, top: 7.10 },
    { base: 7.10, top: 10.30 }
  ];
  const COL = 0.42, BEAM = 0.32;

  /* ---------------- pembantu geometri garis ---------------------------- */
  function boxEdges(out, cx, cy, cz, w, h, d) {
    const x0 = cx - w / 2, x1 = cx + w / 2;
    const y0 = cy - h / 2, y1 = cy + h / 2;
    const z0 = cz - d / 2, z1 = cz + d / 2;
    const v = [
      [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1],
      [x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]
    ];
    const e = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
    for (const [a, b] of e) out.push(...v[a], ...v[b]);
  }
  function rectOutline(out, y, w, d) {
    const x = w / 2, z = d / 2;
    const p = [[-x, y, -z], [x, y, -z], [x, y, z], [-x, y, z]];
    for (let i = 0; i < 4; i++) out.push(...p[i], ...p[(i + 1) % 4]);
  }
  function lines(points, color, maxOpacity, baseY) {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(points);
    if (baseY) for (let i = 1; i < arr.length; i += 3) arr[i] -= baseY;
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0 });
    const o = new THREE.LineSegments(g, m);
    o.userData.max = maxOpacity;
    return o;
  }
  function slab(y, color, maxOpacity, baseY) {
    const g = new THREE.PlaneGeometry(W - 0.6, Dp - 0.6);
    const m = new THREE.MeshBasicMaterial({
      color, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false
    });
    const mesh = new THREE.Mesh(g, m);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = y - (baseY || 0);
    mesh.userData.max = maxOpacity;
    return mesh;
  }

  /* ---------------- penyusunan tahap ----------------------------------- */
  const CLAY = 0xc0824e, GOLD = 0xd0a75a, OLIVE = 0x93a072, TAN = 0xd3c4ac;
  const stages = [];

  function makeStage(baseY, build) {
    const g = new THREE.Group();
    g.position.y = baseY;
    g.scale.y = 0.0001;
    build(g, baseY);
    scene.add(g);
    const parts = [];
    g.traverse(o => { if (o.material) parts.push(o); });
    stages.push({ group: g, parts });
  }

  /* 0 — Rencana Pondasi */
  makeStage(-1.30, (g, b) => {
    const foot = [], sloof = [];
    xs.forEach((x, ix) => zs.forEach((z, iz) => {
      const big = ix > 0 && ix < xs.length - 1 && iz > 0 && iz < zs.length - 1;
      const s = big ? 1.20 : 0.80;
      boxEdges(foot, x, -0.75, z, s, 0.35, s);
      boxEdges(foot, x, -0.30, z, COL * 0.9, 0.55, COL * 0.9);
    }));
    xs.forEach(x => { for (let i = 0; i < zs.length - 1; i++)
      boxEdges(sloof, x, 0, (zs[i] + zs[i + 1]) / 2, 0.25, 0.35, zs[i + 1] - zs[i]); });
    zs.forEach(z => { for (let i = 0; i < xs.length - 1; i++)
      boxEdges(sloof, (xs[i] + xs[i + 1]) / 2, 0, z, xs[i + 1] - xs[i], 0.35, 0.25); });
    g.add(lines(foot, OLIVE, 0.9, b));
    g.add(lines(sloof, GOLD, 0.95, b));
  });

  /* 1–3 — kolom, balok, pelat tiap lantai */
  FLOORS.forEach((f, idx) => {
    makeStage(f.base, (g, b) => {
      const cols = [], beams = [];
      const h = f.top - f.base;
      xs.forEach(x => zs.forEach(z => boxEdges(cols, x, f.base + h / 2, z, COL, h, COL)));
      xs.forEach(x => { for (let i = 0; i < zs.length - 1; i++)
        boxEdges(beams, x, f.top - BEAM / 2, (zs[i] + zs[i + 1]) / 2, 0.24, BEAM, zs[i + 1] - zs[i]); });
      zs.forEach(z => { for (let i = 0; i < xs.length - 1; i++)
        boxEdges(beams, (xs[i] + xs[i + 1]) / 2, f.top - BEAM / 2, z, xs[i + 1] - xs[i], BEAM, 0.24); });
      g.add(lines(cols, CLAY, 0.95, b));
      g.add(lines(beams, GOLD, 0.8, b));
      g.add(slab(f.top - BEAM, OLIVE, idx === 2 ? 0.06 : 0.08, b));
    });
  });

  /* 4 — struktur atap */
  makeStage(10.30, (g, b) => {
    const roof = [];
    const top = 10.30, ridge = 12.05;
    xs.forEach(x => zs.forEach(z => boxEdges(roof, x, top + 0.35, z, COL * 0.85, 0.7, COL * 0.85)));
    rectOutline(roof, top + 0.7, W + 0.9, Dp + 0.9);
    rectOutline(roof, ridge, W * 0.34, Dp * 0.34);
    const a = [(W + 0.9) / 2, (Dp + 0.9) / 2], r = [W * 0.17, Dp * 0.17];
    [[-1,-1],[1,-1],[1,1],[-1,1],[-1,0],[1,0],[0,-1],[0,1]].forEach(([sx, sz]) => {
      roof.push(sx * a[0], top + 0.7, sz * a[1], sx * r[0], ridge, sz * r[1]);
    });
    g.add(lines(roof, CLAY, 0.9, b));
  });

  /* ---------------- bidang tanah --------------------------------------- */
  const ground = new THREE.GridHelper(48, 24, 0x4a3d34, 0x342a24);
  ground.position.y = -1.32;
  ground.material.transparent = true;
  ground.material.opacity = 0.5;
  scene.add(ground);

  const site = lines([], TAN, 0.3, 0);
  {
    const pts = [];
    rectOutline(pts, -1.31, W + 2.4, Dp + 2.4);
    site.geometry.setAttribute('position',
      new THREE.BufferAttribute(new Float32Array(pts), 3));
    site.material.opacity = 0.3;
  }
  scene.add(site);

  /* ---------------- progres & tahap aktif ------------------------------ */
  let progress = 0, activeStage = -1, dirty = true, ready = false, gotoRequested = false;
  const DIM = 0.3;                 // tahap yang sudah selesai diredupkan
  const smooth = t => t * t * (3 - 2 * t);
  const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;

  function apply(p) {
    progress = clamp01(p);
    const span = 1 / N;
    const current = Math.min(N - 1, Math.floor(progress / span + 1e-6));

    stages.forEach((s, i) => {
      const local = clamp01((progress - i * span) / (span * 0.8));
      s.group.scale.y = Math.max(0.0001, smooth(local));
      const focus = i === current ? 1 : DIM;
      s.parts.forEach(o => {
        o.material.opacity = (o.userData.max || 0.8) * Math.min(1, local * 1.7) * focus;
      });
    });

    if (current !== activeStage) {
      activeStage = current;
      // Selama inisialisasi jangan menyiarkan tahap: pilihan pengguna yang
      // dibuat sebelum model termuat tidak boleh tertimpa kembali ke tahap 1.
      if (ready) {
        document.dispatchEvent(new CustomEvent('rgi:bp-stage', { detail: { index: current } }));
      }
    }
    dirty = true;
  }

  apply(0);

  /* Lompat ke tahap tertentu (ditekan dari stepper). */
  let anim = null;
  function goTo(i) {
    const target = (i + 0.5) / N;
    if (anim) cancelAnimationFrame(anim);
    if (reduced) { apply(target); return; }
    const from = progress, t0 = performance.now(), dur = 620;
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      apply(from + (target - from) * smooth(k));
      if (k < 1) anim = requestAnimationFrame(tick); else anim = null;
    };
    anim = requestAnimationFrame(tick);
  }
  document.addEventListener('rgi:bp-goto', (e) => { gotoRequested = true; goTo(e.detail.index); });

  /* Gulir menggerakkan penyusunan struktur. */
  if (window.gsap && window.ScrollTrigger && !reduced) {
    ScrollTrigger.create({
      trigger: host,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 0.6,
      onUpdate: (self) => { if (!anim) apply(self.progress); }
    });
    ScrollTrigger.refresh();
  } else {
    apply(1);
  }

  /* ---------------- render loop hemat daya ----------------------------- */
  let onScreen = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((e) => {
      onScreen = e[0].isIntersecting;
      if (onScreen) dirty = true;
    }, { rootMargin: '120px' }).observe(host);
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) dirty = true; });
  controls.addEventListener('change', () => { dirty = true; });

  renderer.setAnimationLoop(() => {
    if (!onScreen || document.hidden) return;
    if (controls.autoRotate) { controls.update(); dirty = true; }
    else if (controls.update()) dirty = true;
    if (!dirty) return;              // tidak ada perubahan: lewati render
    dirty = false;
    renderer.render(scene, camera);
  });

  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    dirty = true;
  }
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(host);
  else window.addEventListener('resize', resize);
  resize();

  ready = true;
  // Urutan penting: umumkan kesiapan lebih dulu supaya pilihan tahap yang
  // dibuat pengguna sebelum model termuat langsung dikirim ulang (sinkron).
  document.dispatchEvent(new CustomEvent('rgi:bp-ready'));
  // Baru samakan stepper dengan tahap yang tampil — hanya bila pengguna belum
  // memilih apa pun, agar HUD tidak berkedip kembali ke tahap 1.
  if (!gotoRequested) {
    document.dispatchEvent(new CustomEvent('rgi:bp-stage', { detail: { index: activeStage } }));
  }
}
