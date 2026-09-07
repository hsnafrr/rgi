# Website Company Profile — PT RIV Group Indonesia

Situs statis 7 halaman, dwibahasa (Indonesia / English), tanpa proses build.

- **Live:** <https://rgi-phi.vercel.app>
- **Repo:** <https://github.com/hsnafrr/rgi> (branch `main`, root directory `site`)

---

## 1. Menjalankan secara lokal

Gunakan server yang disertakan — **jangan** `python -m http.server`:

```bash
python _source/serve.py
```

Lalu buka <http://localhost:5183>.

> **Kenapa tidak `http.server` bawaan?** Hero memutar video mengikuti gulir, dan
> itu hanya bekerja bila server mendukung **HTTP Range request**. `http.server`
> bawaan Python tidak mendukungnya, sehingga video tidak bisa di-*seek* dan hero
> jatuh ke mode putar biasa. `_source/serve.py` sudah mendukung Range; semua
> hosting sungguhan (Vercel, Netlify, Apache, nginx, cPanel) juga.

---

## 2. Struktur folder

```
site/
├─ index.html          Beranda: hero scroll-driven, foto utama, preview 3D, pesan cepat
├─ tentang.html        Tentang, visi-misi, TIM, legalitas
├─ layanan.html        Layanan + SOP proyek
├─ denah.html          Slider gambar kerja + model 3D 6 tahap + video live site
├─ library.html        Library proses pengerjaan (galeri + carousel video)
├─ portofolio.html     Portofolio proyek (filter + lightbox)
├─ kontak.html         Pesan cepat + formulir konsultasi + peta
├─ vercel.json, .vercelignore, robots.txt, sitemap.xml
├─ assets/
│  ├─ css/style.css           Seluruh sistem desain
│  ├─ js/data.js              ← SEMUA KONTEN & TERJEMAHAN ADA DI SINI
│  ├─ js/app.js               i18n, menu, slider, carousel, lightbox, form, tim
│  ├─ js/motion.js            Hero scroll-driven + animasi gulir (GSAP)
│  ├─ js/blueprint.js         Pemuat model 3D (menunda unduhan Three.js)
│  ├─ js/blueprint-scene.js   Model 3D: wireframe struktur → rumah jadi
│  ├─ img/                    brand · hero · portfolio · teknis · library · tim
│  └─ video/                  hero-scrub · hero-scrub-mobile · live-site-1,2,3,5
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
| **Kartu owner** (Muhammad Rivky) | `owner` |
| **Kartu tenaga ahli** (slider) | `team` |
| Enam layanan | `services` |
| Lima tahap SOP | `sop` |
| Tabel "Mengapa Memilih RGI" | `compare` |
| Empat poin K3 | `safety` |
| Proyek portofolio | `projects` |
| Foto library proses | `library` |
| Video live site | `videos` |
| Lembar gambar teknis (slider Denah) | `sheets` |
| Enam tahap model 3D | `bpStages` |
| Semua label antarmuka | `t.id` dan `t.en` |

Setiap teks ditulis berpasangan: `{ id: 'Bahasa Indonesia', en: 'English' }`.

### Menambah foto tim

1. Simpan dua ukuran di `assets/img/tim/`: `nama.webp` (720×960) dan
   `nama-sm.webp` (400×533).
2. Isi kolom `photo` pada entri yang bersangkutan di `data.js`:

```js
{ photo: 'kadzim', name: 'Sholeh Kadzim, S.Ars.', role: {...}, desc: {...} }
```

Selama `photo` masih `''`, kartunya tetap tampil dengan bingkai
*"Foto menyusul"* — jadi tata letak tidak berubah saat foto ditambahkan nanti.

> Peran Sholeh Kadzim saat ini diisi **"Arsitek"** (menyesuaikan gelar S.Ars.).
> Ganti di `data.js` bila jabatannya berbeda.

### Menampilkan nomor legalitas

Bawaannya kartu legalitas menampilkan *"Nomor registrasi tersedia atas permintaan"*.
Isi kolom `number` bila nomor resmi sudah boleh ditayangkan publik.

---

## 4. Template WhatsApp satu klik

Setiap tombol hijau membuka WhatsApp dengan pesan yang **sudah tersusun**;
pengunjung tinggal melengkapi bagian dalam tanda kurung lalu menekan kirim.

| Letak | Isi pesan |
|---|---|
| Bagian "Pesan Cepat" (6 halaman) | 6 template dari `data.js` → `quick` |
| Tombol di tiap kartu layanan | Otomatis menyebut nama layanan |
| Tombol di tiap proyek portofolio | Otomatis menyebut nama & lokasi proyek |
| Formulir konsultasi | Menyusun isian formulir menjadi pesan |
| Tombol mengambang | Sapaan konsultasi umum |

Baris pesan dipisah dengan `\n`. Ikon yang tersedia: `home`, `hammer`, `ruler`,
`file`, `mapPin`, `compass`, `building`, `road`, `shield`, `clipboard`,
`drawing`, `layers`, `user`.

---

## 5. Hero scroll-driven

Video "lahan kosong → rumah jadi" tidak diputar otomatis: **posisinya mengikuti
gulir**. Selama video berjalan tidak ada teks sama sekali; judul, tagline, dan
tombol baru muncul saat animasi mencapai akhir (ambang 88%).

Ada **dua berkas terpisah**:

| Berkas | Untuk | Ukuran | Catatan |
|---|---|---|---|
| `hero-scrub.mp4` | layar > 820 px | 1128×816, 24 fps, ±2,9 MB | keyframe tiap 4 frame |
| `hero-scrub-mobile.mp4` | layar ≤ 820 px | 640×1386 potret, 15 fps, ±1,4 MB | **setiap frame keyframe** |

Versi ponsel dibuat potret dengan pias gelap di atas–bawah, sehingga bangunan
duduk di paruh atas layar dan teks punya latar bersih di bawahnya. Karena setiap
frame adalah keyframe, setiap seek langsung ketemu tanpa mendekode frame antara —
inilah yang menghilangkan patah-patah saat di-scrub di ponsel. JS juga
membulatkan posisi seek ke batas frame supaya tidak ada dekode yang mubazir.

**Turun otomatis ke hero biasa** (video berputar, teks langsung tampil) bila:
server tidak mendukung Range · video gagal dimuat · pengguna memilih
*reduced motion* · perangkat memakai mode hemat data atau jaringan 2G.

Perintah encode ada di §9.

---

## 6. Menu titik tiga

Navigasi halaman ada di tombol **titik tiga** di kanan atas (semua ukuran layar).

- Tekan sekali untuk membuka; tombolnya berubah jadi silang.
- Tekan lagi untuk menutup — juga bisa lewat tombol **Tutup pilihan halaman**,
  tombol Escape, klik di luar panel, atau memilih salah satu halaman.
- Di desktop panel muncul sebagai dropdown kanan atas; di ponsel jadi lembar penuh.

---

## 7. Model struktur 3D (halaman Denah)

Enam tahap, dari pondasi sampai **rumah jadi berwarna**:

1. Rencana Pondasi · 2–4. Kolom & Balok Lantai 1–3 · 5. Struktur Atap ·
6. **Rumah Jadi** — dinding, atap limasan, bukaan berkaca, teras, carport,
   taman, dan kolam renang 3 × 7 m, memakai palet warna yang sama dengan situs.

Beranda memuat **preview ringkas** model yang sama (tanpa stepper), dengan
tautan ke halaman Denah untuk versi lengkapnya. Three.js tetap ditunda sampai
bagian itu mendekati layar, jadi pengunjung yang tidak menggulir sejauh itu
tidak menanggung unduhannya.

- Menggulir menyusun struktur bertahap; menekan tombol tahap melompat ke tahap itu
  **dan memindahkan gambar kerja di slider atas** ke lembar yang bersesuaian.
- Pilihan tahap yang ditekan pengguna tidak akan tergeser oleh perhitungan ulang
  tata letak (mis. saat ganti bahasa) — hanya gulir sungguhan yang mengembalikan
  kendali ke posisi gulir.
- Tahap yang sudah lewat diredupkan, tahap aktif ditonjolkan.

---

## 8. Bahasa

- Bawaan **Indonesia**; pilihan pengunjung disimpan di `localStorage`.
- Teks statis memakai `data-i18n="kunci"`; atribut memakai
  `data-i18n-attr="placeholder:kunci"`.
- Menambah teks baru: tulis kuncinya di `t.id` **dan** `t.en`.

---

## 9. Teknologi, performa & alat bantu

| Bagian | Pustaka | Sumber |
|---|---|---|
| Animasi gulir & hero scrub | GSAP 3.13 + ScrollTrigger | cdnjs (dengan SRI hash) |
| Model 3D | Three.js 0.170 | jsDelivr (import map) |
| Font | Source Serif 4 · Work Sans · JetBrains Mono | Google Fonts |

Tidak ada framework, bundler, atau `npm install`.

**Yang dijaga demi kelancaran di ponsel:**

- Three.js (±275 KB) baru diunduh saat bagian model 3D mendekati layar.
- Model 3D hanya me-*render* saat ada perubahan; berhenti total di luar layar
  atau saat tab tidak aktif. Rotasi otomatis mati di perangkat sentuh.
- Slider & carousel berhenti sendiri di luar layar, saat disentuh, di-hover,
  dan saat tab tidak aktif.
- Animasi hanya memakai `transform`/`opacity`.
- `backdrop-filter` dimatikan di layar ≤ 768 px; efek hover dimatikan di
  perangkat sentuh.
- `content-visibility:auto` sengaja **tidak** dipakai: tinggi seksi jadi
  perkiraan sampai dirender, sehingga anchor dan `scrollIntoView` mendarat di
  posisi salah dan tinggi halaman bergeser saat digulir.
- `prefers-reduced-motion` dihormati; bila GSAP gagal dimuat konten tetap tampil.

### Alat bantu

```bash
python _source/pages.py     # regenerasi 7 halaman (header/footer/menu)
python _source/serve.py     # server dev dengan dukungan HTTP Range
```

- `_source/build.py` — kerangka halaman (head, header, menu, footer)
- `_source/pages.py` — isi tiap halaman
- `_source/shots.ps1` — render screenshot penuh via Chromium headless (QA)

Menyunting `.html` langsung boleh — ingat generator akan menimpanya.

### Encode video hero

```bash
# desktop
ffmpeg -i sumber.mp4 -an -vf "fps=24" -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 28 -preset veryslow -x264-params "keyint=4:min-keyint=4:scenecut=0:bframes=0:ref=2" \
  -movflags +faststart assets/video/hero-scrub.mp4

# ponsel (potret, semua frame keyframe)
ffmpeg -i sumber.mp4 -an -vf "fps=15,scale=640:-2,pad=640:1386:0:240:0x241C18" \
  -c:v libx264 -profile:v main -pix_fmt yuv420p -crf 32 -preset veryslow \
  -x264-params "keyint=1:min-keyint=1:scenecut=0:bframes=0:ref=1" \
  -movflags +faststart assets/video/hero-scrub-mobile.mp4
```

---

## 10. Publikasi

Terhubung otomatis ke GitHub — cukup commit dan push:

```bash
cd "C:/Users/hasan/Downloads/RGI"
git add -A site
git commit -m "Perbarui konten situs"
git push origin main
```

Vercel membangun dan menerbitkan sendiri, biasanya di bawah satu menit.

### Menurunkan / menaikkan situs sementara

Situs bisa di-*pause* dari dashboard Vercel → Settings → **Pause Project**
(pengunjung mendapat 503, deployment tidak dihapus), lalu **Resume** untuk
menyalakannya kembali.

### Catatan cache

`vercel.json` sengaja **tidak** memakai `immutable` untuk CSS/JS karena nama
berkasnya tidak mengandung hash isi:

| Berkas | Cache |
|---|---|
| `/assets/css/*`, `/assets/js/*` | selalu divalidasi ulang (304 murah) |
| `/assets/img/*`, `/assets/video/*` | 30 hari + `stale-while-revalidate` |
| HTML | selalu divalidasi ulang |

Bila mengganti gambar/video **dengan nama yang sama**, pengunjung lama bisa
melihat versi lama sampai 30 hari. Cara aman: pakai nama berkas baru lalu
perbarui rujukannya di `data.js`.

### Bila memasang domain kustom

1. Tambahkan domain di dashboard Vercel → Settings → Domains.
2. Ganti `rgi-phi.vercel.app` di `robots.txt` dan `sitemap.xml`.
3. Commit dan push.
