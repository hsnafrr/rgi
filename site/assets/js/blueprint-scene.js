/* =========================================================================
   RGI — Model struktur 3D
   Enam tahap: pondasi → kolom/balok lantai 1–3 → rangka atap → rumah jadi.
   Lima tahap pertama berupa wireframe struktur memakai dimensi as-ke-as dari
   lembar Rencana Pondasi (satuan meter). Tahap terakhir menampilkan bangunan
   utuh berwarna: dinding, atap limasan, bukaan, teras, carport, dan kolam
   renang 3 × 7 m — memakai palet warna yang sama dengan situs.
   ========================================================================= */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default function init(host) {
  const N = 6;                       // jumlah tahap
  const FINAL = N - 1;               // indeks tahap "rumah jadi"

  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  host.insertBefore(canvas, host.firstChild);

  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: true, powerPreference: 'low-power'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(host.clientWidth, host.clientHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x14100e, 58, 140);

  const camera = new THREE.PerspectiveCamera(36, host.clientWidth / host.clientHeight, 0.5, 300);
  camera.position.set(34, 21, 38);

  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.07;
  controls.enablePan = false;
  controls.enableZoom = false;
  controls.minPolarAngle = 0.42;
  controls.maxPolarAngle = Math.PI / 2.15;
  controls.rotateSpeed = 0.6;
  controls.autoRotate = !coarse && !reduced;
  controls.autoRotateSpeed = 0.45;
  controls.target.set(0.5, 4.6, 2.5);
  ['pointerdown', 'touchstart'].forEach((ev) => {
    renderer.domElement.addEventListener(ev, () => { controls.autoRotate = false; }, { passive: true });
  });

  /* ---------------- cahaya (hanya dipakai tahap "rumah jadi") ----------- */
  scene.add(new THREE.AmbientLight(0xfff4e6, 0.72));
  const hemi = new THREE.HemisphereLight(0xdfe9f2, 0x4a3b2e, 0.55);
  scene.add(hemi);
  const sun = new THREE.DirectionalLight(0xfff0d8, 1.15);
  sun.position.set(18, 24, 14);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0xbcd2e0, 0.35);
  fill.position.set(-16, 10, -12);
  scene.add(fill);

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
  const ROOF_BASE = 11.00, RIDGE = 12.60;

  /* ---------------- palet (selaras dengan situs) ----------------------- */
  const CLAY = 0xc0824e, GOLD = 0xd0a75a, OLIVE = 0x93a072, TAN = 0xd3c4ac;
  const PLASTER = 0xefe7da, PLASTER_2 = 0xdfd3c1, WOOD = 0xa9703f,
        ROOF_COL = 0x3b322c, GLASS = 0x27333a, GLOW = 0xf0c070,
        WATER = 0x5f93a3, GRASS = 0x6f7d55, DECK = 0x8a6a48, PAVE = 0x5a5148;

  /* ================= wireframe (tahap 0–4) ============================= */
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

  /* 0 — pondasi */
  makeStage(-1.30, (g, b) => {
    const foot = [], sloof = [];
    xs.forEach((x, ix) => zs.forEach((z, iz) => {
      const big = ix > 0 && ix < xs.length - 1 && iz > 0 && iz < zs.length - 1;
      const sz = big ? 1.20 : 0.80;
      boxEdges(foot, x, -0.75, z, sz, 0.35, sz);
      boxEdges(foot, x, -0.30, z, COL * 0.9, 0.55, COL * 0.9);
    }));
    xs.forEach(x => { for (let i = 0; i < zs.length - 1; i++)
      boxEdges(sloof, x, 0, (zs[i] + zs[i + 1]) / 2, 0.25, 0.35, zs[i + 1] - zs[i]); });
    zs.forEach(z => { for (let i = 0; i < xs.length - 1; i++)
      boxEdges(sloof, (xs[i] + xs[i + 1]) / 2, 0, z, xs[i + 1] - xs[i], 0.35, 0.25); });
    g.add(lines(foot, OLIVE, 0.9, b));
    g.add(lines(sloof, GOLD, 0.95, b));
  });

  /* 1–3 — kolom & balok tiap lantai */
  FLOORS.forEach((f) => {
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
    });
  });

  /* 4 — rangka atap */
  makeStage(10.30, (g, b) => {
    const roof = [];
    xs.forEach(x => zs.forEach(z => boxEdges(roof, x, 10.65, z, COL * 0.85, 0.7, COL * 0.85)));
    rectOutline(roof, ROOF_BASE, W + 1.6, Dp + 1.6);
    rectOutline(roof, RIDGE, W * 0.34, Dp * 0.34);
    const a = [(W + 1.6) / 2, (Dp + 1.6) / 2], r = [W * 0.17, Dp * 0.17];
    [[-1,-1],[1,-1],[1,1],[-1,1],[-1,0],[1,0],[0,-1],[0,1]].forEach(([sx, sz]) => {
      roof.push(sx * a[0], ROOF_BASE, sz * a[1], sx * r[0], RIDGE, sz * r[1]);
    });
    g.add(lines(roof, CLAY, 0.9, b));
  });

  /* ================= rumah jadi (tahap 5) ============================== */
  const house = new THREE.Group();
  house.visible = false;
  scene.add(house);
  const houseParts = [];

  function mat(color, opts) {
    const m = new THREE.MeshLambertMaterial(Object.assign(
      { color, transparent: true, opacity: 0 }, opts || {}));
    return m;
  }
  function box(w, h, d, color, x, y, z, opts) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, opts));
    m.position.set(x, y, z);
    house.add(m);
    houseParts.push(m);
    return m;
  }
  /* Bidang atap limasan dibangun dari empat trapesium + tutup punggungan. */
  function hipRoof(yBase, yRidge, w, d, rx, rz, color) {
    const a = w / 2, b = d / 2;
    const B = [[-a, yBase, -b], [a, yBase, -b], [a, yBase, b], [-a, yBase, b]];
    const R = [[-rx, yRidge, -rz], [rx, yRidge, -rz], [rx, yRidge, rz], [-rx, yRidge, rz]];
    const pos = [];
    const quad = (p0, p1, p2, p3) => {
      pos.push(...p0, ...p1, ...p2, ...p0, ...p2, ...p3);
    };
    quad(B[0], B[1], R[1], R[0]);
    quad(B[1], B[2], R[2], R[1]);
    quad(B[2], B[3], R[3], R[2]);
    quad(B[3], B[0], R[0], R[3]);
    quad(R[0], R[1], R[2], R[3]);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pos), 3));
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, mat(color, { side: THREE.DoubleSide }));
    house.add(m);
    houseParts.push(m);
    return m;
  }

  (function buildHouse() {
    const halfW = W / 2, halfD = Dp / 2;
    const WALL = 0.26;

    /* tanah & taman */
    box(W + 30, 0.3, Dp + 30, GRASS, 0, -1.45, 4);
    /* teras keliling / lantai dasar */
    box(W + 2.2, 0.35, Dp + 2.2, PLASTER_2, 0, -0.18, 0);

    /* dinding tiap lantai */
    FLOORS.forEach((f, idx) => {
      const h = f.top - f.base - 0.1;
      const cy = f.base + h / 2;
      const col = idx === 1 ? PLASTER_2 : PLASTER;
      box(W, h, WALL, col, 0, cy, -halfD + WALL / 2);          // belakang
      box(W, h, WALL, col, 0, cy, halfD - WALL / 2);           // depan
      box(WALL, h, Dp, col, -halfW + WALL / 2, cy, 0);         // kiri
      box(WALL, h, Dp, col, halfW - WALL / 2, cy, 0);          // kanan
      /* pelat lantai + tepian menggantung */
      box(W + 1.1, 0.3, Dp + 1.1, PLASTER_2, 0, f.top - 0.15, 0);

      /* bukaan kaca: deret jendela di sisi depan dan samping */
      const gw = 1.55, gh = Math.min(1.9, h - 1.0), gy = f.base + 1.05 + gh / 2;
      for (let i = -3; i <= 3; i++) {
        if (i === 0 && idx === 0) continue;                    // sisakan ruang pintu
        box(gw, gh, 0.12, GLASS, i * 2.15, gy, halfD - 0.02,
            { emissive: GLOW, emissiveIntensity: idx === 0 ? 0.3 : 0.22 });
      }
      for (let i = -2; i <= 2; i++) {
        box(0.12, gh, 1.5, GLASS, halfW - 0.02, gy, i * 2.5,
            { emissive: GLOW, emissiveIntensity: 0.2 });
        box(0.12, gh, 1.5, GLASS, -halfW + 0.02, gy, i * 2.5,
            { emissive: GLOW, emissiveIntensity: 0.14 });
      }
      /* garis balkon kayu di lantai 2 & 3 */
      if (idx > 0) {
        box(W + 1.1, 0.12, 0.14, WOOD, 0, f.base + 1.0, halfD + 0.5);
        box(W + 1.1, 0.12, 0.14, WOOD, 0, f.base + 0.62, halfD + 0.5);
      }
    });

    /* pintu utama + kanopi */
    box(2.0, 2.6, 0.16, WOOD, 0, 1.3, halfD + 0.03);
    box(3.6, 0.24, 1.8, PLASTER_2, 0, 2.95, halfD + 0.7);
    /* pilar teras */
    [-1.9, 1.9].forEach(x => box(0.34, 2.85, 0.34, PLASTER, x, 1.42, halfD + 1.35));

    /* atap limasan + lisplang */
    box(W + 1.9, 0.34, Dp + 1.9, PLASTER_2, 0, ROOF_BASE - 0.17, 0);
    hipRoof(ROOF_BASE, RIDGE, W + 1.7, Dp + 1.7, W * 0.17, Dp * 0.17, ROOF_COL);

    /* carport: pelat + atap datar */
    box(6.2, 0.22, 5.4, PAVE, halfW + 3.4, -0.9, 2.2);
    box(6.6, 0.26, 5.8, PLASTER_2, halfW + 3.4, 3.1, 2.2);
    [[-2.6, -2.3], [-2.6, 2.3], [2.6, -2.3], [2.6, 2.3]].forEach(([dx, dz]) =>
      box(0.3, 4.0, 0.3, PLASTER, halfW + 3.4 + dx, 1.1, 2.2 + dz));

    /* kolam renang 3 × 7 m, kedalaman 1,5 m — diletakkan di halaman depan
       kiri supaya terbaca dari sudut pandang kamera. */
    const px = 5.8, pz = halfD + 5.4;
    box(8.0, 0.3, 4.0, DECK, px, -0.95, pz);                     // dek keliling
    box(7.0, 1.5, 3.0, 0x27424a, px, -1.85, pz);                 // dinding kolam
    box(6.86, 0.08, 2.86, WATER, px, -1.06, pz,
        { emissive: 0x1d4a55, emissiveIntensity: 0.25 });        // muka air

    /* pagar depan rendah + gerbang kayu */
    box(W + 13, 0.9, 0.24, PLASTER_2, 0, -0.55, halfD + 8.2);
    box(5.0, 1.3, 0.3, WOOD, -4.2, -0.35, halfD + 8.2);

    /* jalur masuk */
    box(4.4, 0.16, 8.0, PAVE, -4.2, -1.2, halfD + 4.4);

    /* pepohonan sederhana sebagai skala */
    [[-halfW - 6.2, halfD + 2.4], [halfW + 7.4, -halfD - 2.0], [-halfW - 7.0, -halfD - 3.2]]
      .forEach(([tx, tz]) => {
        box(0.28, 2.2, 0.28, 0x6b533a, tx, 0.0, tz);
        const c = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 0), mat(0x64754e));
        c.position.set(tx, 2.1, tz);
        house.add(c); houseParts.push(c);
      });
  })();

  /* ---------------- bidang tanah untuk tahap wireframe ------------------ */
  const ground = new THREE.GridHelper(50, 25, 0x50423a, 0x352b25);
  ground.position.y = -1.32;
  ground.material.transparent = true;
  ground.material.opacity = 0.5;
  ground.userData.max = 0.5;
  scene.add(ground);

  /* ---------------- progres & tahap aktif ------------------------------ */
  let progress = 0, activeStage = -1, dirty = true, ready = false, gotoRequested = false;
  const DIM = 0.28;
  const smooth = t => t * t * (3 - 2 * t);
  const clamp01 = v => v < 0 ? 0 : v > 1 ? 1 : v;

  function apply(p) {
    progress = clamp01(p);
    const span = 1 / N;
    const current = Math.min(N - 1, Math.floor(progress / span + 1e-6));

    /* Seberapa jauh tahap "rumah jadi" sudah muncul (0..1). */
    const finalLocal = clamp01((progress - FINAL * span) / (span * 0.75));
    const finalEase = smooth(finalLocal);

    stages.forEach((s, i) => {
      const local = clamp01((progress - i * span) / (span * 0.8));
      s.group.scale.y = Math.max(0.0001, smooth(local));
      const focus = i === current ? 1 : DIM;
      /* Saat rumah jadi bermunculan, wireframe surut jadi garis bantu tipis. */
      const fade = 1 - finalEase * 0.88;
      s.parts.forEach(o => {
        o.material.opacity = (o.userData.max || 0.8) * Math.min(1, local * 1.7) * focus * fade;
      });
    });

    ground.material.opacity = 0.5 * (1 - finalEase * 0.55);

    house.visible = finalEase > 0.001;
    if (house.visible) {
      houseParts.forEach(o => { o.material.opacity = finalEase; });
      const s = 0.965 + 0.035 * finalEase;
      house.scale.setScalar(s);
    }

    if (current !== activeStage) {
      activeStage = current;
      if (ready) {
        document.dispatchEvent(new CustomEvent('rgi:bp-stage', { detail: { index: current } }));
      }
    }
    document.dispatchEvent(new CustomEvent('rgi:bp-progress', { detail: { p: progress } }));
    dirty = true;
  }

  apply(0);

  /* Lompat ke tahap tertentu (dari tombol stepper). */
  let anim = null, scrollTrig = null, pickProgress = null;
  function goTo(i) {
    // Kunci pilihan pengguna. ScrollTrigger.refresh() (mis. saat bahasa
    // diganti) memanggil onUpdate lagi dan akan menarik model kembali ke
    // tahap sesuai posisi gulir. Kunci hanya dilepas oleh gulir sungguhan.
    pickProgress = true;
    const target = (i + (i === FINAL ? 0.92 : 0.5)) / N;
    if (anim) cancelAnimationFrame(anim);
    if (reduced) { apply(target); return; }
    const from = progress, t0 = performance.now(), dur = 700;
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      apply(from + (target - from) * smooth(k));
      if (k < 1) anim = requestAnimationFrame(tick); else anim = null;
    };
    anim = requestAnimationFrame(tick);
  }
  document.addEventListener('rgi:bp-goto', (e) => { gotoRequested = true; goTo(e.detail.index); });
  /* Kendali dikembalikan ke posisi gulir hanya oleh masukan pengguna yang
     nyata. Peristiwa `scroll` saja tidak cukup: mengganti bahasa mengubah
     panjang teks, tinggi halaman bergeser, dan itu ikut memicu `scroll`
     sehingga pilihan tahap tadi akan terhapus tanpa pengguna berbuat apa pun. */
  ['wheel', 'touchmove', 'keydown'].forEach((ev) => {
    window.addEventListener(ev, () => { pickProgress = null; }, { passive: true });
  });

  /* Gulir menggerakkan penyusunan struktur. */
  if (window.gsap && window.ScrollTrigger && !reduced) {
    scrollTrig = ScrollTrigger.create({
      trigger: host,
      start: 'top 82%',
      end: 'bottom 18%',
      scrub: 0.6,
      onUpdate: (self) => {
        if (anim || pickProgress) return;
        apply(self.progress);
      }
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
    if (!dirty) return;
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
  document.dispatchEvent(new CustomEvent('rgi:bp-ready'));
  if (!gotoRequested) {
    document.dispatchEvent(new CustomEvent('rgi:bp-stage', { detail: { index: activeStage } }));
  }
}
