# Website Company Profile — PT RIV Group Indonesia (RGI)

Situs statis 7 halaman, dwibahasa (Indonesia / English), tanpa proses build.
Unggah isi folder ini ke hosting mana pun (Netlify, Vercel, cPanel, GitHub Pages).

---

## 1. Menjalankan secara lokal

Gunakan server yang disertakan — **jangan** `python -m http.server`:

```bash
python _source/serve.py
```

Lalu buka <http://localhost:5183>.

> **Penting.** Hero memutar video mengikuti gulir, dan itu hanya bisa bekerja bila
> server mendukung **HTTP Range request** (permintaan sebagian berkas).
> `python -m http.server` bawaan Python **tidak** mendukungnya, sehingga video
> tidak bisa di-*seek* dan hero jatuh ke mode putar biasa.
> `_source/serve.py` sudah mendukung Range. Semua hosting sungguhan
> (Netlify, Vercel, Apache, nginx, cPanel, GitHub Pages) mendukungnya secara bawaan —
> jadi ini hanya persoalan saat menguji di komputer sendiri.

---

## 2. Struktur folder

```
site/
├─ index.html          Beranda (hero scroll-driven)
├─ tentang.html        Tentang & Legalitas
├─ layanan.html        Layanan + SOP proyek
├─ denah.html          Slider gambar kerja + model struktur 3D + video live site
├─ library.html        Library proses pengerjaan (galeri + carousel video)
├─ portofolio.html     Portofolio proyek (filter + lightbox)
├─ kontak.html         Pesan cepat + formulir konsultasi + peta
├─ robots.txt, sitemap.xml
├─ assets/
│  ├─ css/style.css           Seluruh sistem desain
│  ├─ js/data.js              ← SEMUA KONTEN & TERJEMAHAN ADA DI SINI
│  ├─ js/app.js               i18n, navigasi, slider, carousel, lightbox, form
│  ├─ js/motion.js            Hero scroll-driven + animasi gulir (GSAP)
│  ├─ js/blueprint.js         Pemuat model 3D (menunda unduhan Three.js)
│  ├─ js/blueprint-scene.js   Model struktur 3D (Three.js)
│  ├─ img/                    brand · hero · portfolio · teknis · library
│  └─ video/                  hero-scrub · hero-scrub-sm · live-site-1..5
└─ _source/                   Generator halaman + server dev + alat QA
```

---

## 3. Cara mengubah konten

**Hampir semua teks ada di `assets/js/data.js`.** Tidak perlu menyentuh HTML.

| Yang ingin diubah | Bagian di `data.js` |
|---|---|
| Alamat, email, WhatsApp, jam operasional | `company` |
| Nomor NIB / NPWP / SBU / SIUJK | `legal` → isi kolom `number` |
| Tombol "Pesan Cepat" WhatsApp | `quick` |
| Enam layanan | `services` |
| Lima tahap SOP | `sop` |
| Tabel "Mengapa Memilih RGI" | `compare` |
| Empat poin K3 | `safety` |
| Proyek portofolio | `projects` |
| Foto library proses | `library` |
| Video live site | `videos` |
| Lembar gambar teknis (slider Denah) | `sheets` |
| Tahap model struktur 3D | `bpStages` |
| Semua label antarmuka | `t.id` dan `t.en` |

Setiap teks ditulis berpasangan:

```js
title: { id: 'Judul Bahasa Indonesia', en: 'English title' }
```

### Menampilkan nomor legalitas

Bawaannya kartu legalitas menampilkan *"Nomor registrasi tersedia atas permintaan"*.
Isi kolom `number` bila nomor resmi sudah boleh ditayangkan publik:

```js
{ code: 'NIB', number: '0123456789012', name: {...}, desc: {...} }
```

> Situs sengaja **tidak** menayangkan pindaian dokumen asli, karena dokumen
> tersebut memuat data pribadi pengurus perusahaan.

---

## 4. Template WhatsApp satu klik

Setiap tombol hijau membuka WhatsApp dengan pesan yang **sudah tersusun**;
pengunjung tinggal melengkapi bagian dalam tanda kurung lalu menekan kirim.

| Letak | Isi pesan |
|---|---|
| Bagian "Pesan Cepat" (Beranda, Layanan, Denah, Library, Portofolio, Kontak) | 6 template siap pakai dari `data.js` → `quick` |
| Tombol di tiap kartu layanan (halaman Layanan) | Otomatis menyebut nama layanan tersebut |
| Tombol di tiap proyek (halaman Portofolio) | Otomatis menyebut nama & lokasi proyek |
| Formulir konsultasi (halaman Kontak) | Menyusun isian formulir menjadi pesan |
| Tombol mengambang & tombol umum | Sapaan konsultasi umum |

Menambah template baru: tambahkan satu entri pada array `quick` di `data.js`.
Baris pesan dipisah dengan `\n`:

```js
{
  icon: 'home',
  title: { id: 'Judul tombol', en: 'Button label' },
  sub:   { id: 'Keterangan singkat', en: 'Short description' },
  msg:   { id: 'Kebutuhan: ...\nLokasi: (isi)', en: 'Requirement: ...\nLocation: (fill in)' }
}
```

Ikon yang tersedia: `home`, `hammer`, `ruler`, `file`, `mapPin`, `compass`,
`building`, `road`, `shield`, `clipboard`, `drawing`, `layers`.

---

## 5. Hero scroll-driven

Di Beranda, video "lahan kosong → rumah jadi" tidak diputar otomatis: **posisinya
mengikuti gulir**. Selama video berjalan tidak ada teks sama sekali; judul, tagline,
dan tombol baru muncul ketika animasi mencapai akhir (ambang 88%).

Cara kerja dan pengamannya:

- Video di-encode ulang dengan *keyframe* tiap 4 frame supaya seek terasa instan.
- Layar < 900 px memakai `hero-scrub-sm.mp4` (±1,3 MB), selebihnya
  `hero-scrub.mp4` (±2,9 MB).
- Panjang jalur gulir: 300 svh di desktop, 230 svh di ponsel.
- **Turun otomatis ke hero biasa** (video berputar, teks langsung tampil) bila:
  server tidak mendukung Range · video gagal dimuat · pengguna memilih
  *reduced motion* · perangkat memakai mode hemat data atau jaringan 2G.

Mengganti videonya: ganti kedua berkas di `assets/video/`, lalu perbarui
`assets/img/hero/hero-lahan.webp` (poster frame pertama).
Perintah encode yang dipakai ada di §8.

---

## 6. Bahasa

- Tombol `ID | EN` di pojok kanan atas setiap halaman.
- Bahasa bawaan **Indonesia**; pilihan pengunjung disimpan di `localStorage`.
- Teks statis memakai `data-i18n="kunci"`; atribut memakai
  `data-i18n-attr="placeholder:kunci"`.
- Menambah teks baru: tulis kuncinya di `t.id` **dan** `t.en`, lalu pasang
  `data-i18n="kunci"` pada elemennya.

---

## 7. Teknologi & perilaku

| Bagian | Pustaka | Sumber |
|---|---|---|
| Animasi gulir & hero scrub | GSAP 3.13 + ScrollTrigger | cdnjs (dengan SRI hash) |
| Model struktur 3D | Three.js 0.170 | jsDelivr (import map) |
| Font | Source Serif 4 · Work Sans · JetBrains Mono | Google Fonts |

Tidak ada framework, bundler, atau `npm install`.

**Yang sudah dijaga demi kelancaran di ponsel:**

- Three.js (±275 KB) **baru diunduh** saat bagian model 3D mendekati layar —
  halaman lain tidak menanggung biayanya sama sekali.
- Model 3D hanya me-*render* saat ada perubahan; berhenti total saat di luar
  layar atau tab tidak aktif. Rotasi otomatis dimatikan di perangkat sentuh.
- Slider dan carousel berhenti sendiri saat di luar layar, saat disentuh,
  saat di-hover, dan saat tab tidak aktif.
- Semua animasi memakai `transform`/`opacity` saja (tidak memicu reflow).
- `backdrop-filter` dimatikan di layar ≤ 768 px (mahal di ponsel kelas menengah).
- Efek hover dinonaktifkan pada perangkat sentuh (`@media (hover:none)`).
- Gambar `loading="lazy"` + WebP; video H.264 `+faststart`.
- `prefers-reduced-motion` dihormati di seluruh situs.
- Bila GSAP gagal dimuat, seluruh konten tetap tampil (tidak ada layar kosong).

---

## 8. Menyunting header / footer & alat bantu

Header, footer, `<head>`, dan tombol WhatsApp mengambang identik di 7 halaman.
Agar tetap sinkron, ketiganya dihasilkan oleh generator:

```bash
python _source/pages.py
```

- `_source/build.py` — kerangka halaman (head, header, footer, blok berulang)
- `_source/pages.py` — isi tiap halaman + daftar judul & deskripsi
- `_source/serve.py` — server dev dengan dukungan Range (§1)
- `_source/shots.ps1` — alat QA: render screenshot penuh via Chromium headless

Menyunting `.html` langsung juga boleh — hanya ingat bahwa menjalankan
generator akan menimpanya.

### Perintah encode video hero

```bash
ffmpeg -i sumber.mp4 -an -vf "fps=24" -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 28 -preset veryslow -x264-params "keyint=4:min-keyint=4:scenecut=0:bframes=0:ref=2" \
  -movflags +faststart assets/video/hero-scrub.mp4
```

`keyint=4` itulah yang membuat seek terasa instan. Untuk versi ponsel, tambahkan
`-vf "scale=676:-2,fps=24"` dan `-crf 29`, simpan sebagai `hero-scrub-sm.mp4`.

---

## 9. Sebelum publikasi

- [ ] Ganti `CONTOH-DOMAIN-ANDA.com` di `robots.txt` dan `sitemap.xml`.
- [ ] Isi nomor legalitas pada `data.js` bila sudah boleh ditayangkan.
- [ ] Ganti video live site & foto proses dengan dokumentasi terbaru.
- [ ] Periksa nomor WhatsApp `6285810845898` di `data.js` (`company.waNumber`).
- [ ] Pastikan hosting mendukung HTTP Range (hampir semua sudah; lihat §1).
- [ ] Folder `_source/` tidak dipakai saat runtime — boleh ikut diunggah atau tidak.

---

## 10. Publikasi ke Vercel

Situs ini statis murni — tanpa proses build. `vercel.json` dan `.vercelignore`
sudah disiapkan (cache aset 1 tahun, HTML selalu divalidasi ulang, header
keamanan dasar, folder `_source/` tidak ikut diunggah).

### Cara tercepat — satu perintah

```bash
cd "C:/Users/hasan/Downloads/RGI/site"
npx vercel --prod
```

Saat pertama kali dijalankan, Vercel CLI akan:
1. meminta login (membuka browser — pakai akun Vercel Anda);
2. bertanya `Set up and deploy?` → **Y**;
3. bertanya scope/tim → pilih **hsnafrr's projects**;
4. bertanya `Link to existing project?` → **N**;
5. bertanya nama proyek → ketik **rgi**;
6. bertanya direktori kode → tekan **Enter** (titik/`.`);
7. bertanya `Want to modify these settings?` → **N** (sudah diatur `vercel.json`).

Unggahan ±21 MB, sekitar satu menit. Setelah selesai CLI menampilkan URL
produksi, misalnya `https://rgi.vercel.app`.

Deploy berikutnya cukup `npx vercel --prod` lagi dari folder yang sama.

### Alternatif — otomatis lewat GitHub

Bila situs didorong ke sebuah repositori GitHub, Vercel dapat dihubungkan
sekali saja lalu setiap `git push` ke branch produksi otomatis ter-deploy.

### Setelah live

- [ ] Ganti `CONTOH-DOMAIN-ANDA.com` di `robots.txt` dan `sitemap.xml`
      dengan domain yang sebenarnya, lalu deploy ulang.
- [ ] Uji hero di HP: video harus mengikuti gulir (Vercel mendukung
      HTTP Range, jadi seharusnya langsung berfungsi).
- [ ] Pasang domain kustom di dashboard Vercel bila sudah ada.
