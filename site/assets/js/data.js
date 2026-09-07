/* =========================================================================
   RGI — Company data, bilingual content (ID / EN)
   Ubah isi file ini untuk memperbarui konten situs.
   Edit this file to update site content.
   ========================================================================= */
window.RGI = (function () {
  'use strict';

  /* ---------------------------------------------------------------------
     1. PROFIL PERUSAHAAN — ubah di sini saja
     --------------------------------------------------------------------- */
  const company = {
    legalName: 'PT RIV Group Indonesia',
    shortName: 'RGI',
    address: 'Jl. Dukuh VI No.6, RT.7/RW.2, Dukuh, Kec. Kramat Jati, Jakarta Timur, DKI Jakarta 13550',
    addressShort: 'Kramat Jati, Jakarta Timur',
    mapsQuery: 'Jl.+Dukuh+VI+No.6+RT.7/RW.2+Dukuh+Kramat+Jati+Jakarta+Timur+13550',
    emails: ['kreasikarya.estetika@gmail.com', 'rivkyofficial18@gmail.com'],
    waNumber: '6285810845898',
    waDisplay: '+62 858-1084-5898',
    hours: { id: 'Senin – Sabtu, 08.00 – 17.00 WIB', en: 'Monday – Saturday, 08:00 – 17:00 (GMT+7)' },
    waText: {
      id: 'Halo RGI, saya ingin berkonsultasi mengenai rencana proyek pembangunan saya.',
      en: 'Hello RGI, I would like to consult about my construction project plan.'
    }
  };

  company.waLink = function (lang) {
    return 'https://wa.me/' + company.waNumber + '?text=' +
      encodeURIComponent(company.waText[lang] || company.waText.id);
  };

  /* Membuat tautan WhatsApp dengan pesan siap kirim.
     `topic` = objek { id: '...', en: '...' } berisi baris kebutuhan. */
  company.waFor = function (topic, lang) {
    var L = (lang === 'en') ? 'en' : 'id';
    var head = L === 'en'
      ? 'Hello RGI, I would like to request a quote for the following.'
      : 'Halo RGI, saya ingin meminta penawaran untuk kebutuhan berikut.';
    var foot = L === 'en'
      ? 'Please advise on the next step. Thank you.'
      : 'Mohon informasi langkah selanjutnya. Terima kasih.';
    var body = topic ? (topic[L] || topic.id) : '';
    var msg = head + '\n\n' + body + '\n\n' + foot;
    return 'https://wa.me/' + company.waNumber + '?text=' + encodeURIComponent(msg);
  };

  /* ---------------------------------------------------------------------
     2. LEGALITAS
     Isi `number` bila nomor resmi sudah siap ditampilkan publik.
     Kosongkan ('') untuk menampilkan status "tersedia atas permintaan".
     --------------------------------------------------------------------- */
  const legal = [
    {
      code: 'NIB',
      number: '',
      name: { id: 'Nomor Induk Berusaha', en: 'Business Identification Number' },
      desc: {
        id: 'Identitas berusaha resmi yang diterbitkan melalui sistem OSS, menjadi dasar seluruh perizinan operasional perusahaan.',
        en: 'Official business identity issued through the OSS system, the basis for all of the company’s operational permits.'
      }
    },
    {
      code: 'NPWP',
      number: '',
      name: { id: 'NPWP Perusahaan', en: 'Corporate Tax ID' },
      desc: {
        id: 'Nomor Pokok Wajib Pajak badan usaha. Setiap penagihan dan pembayaran proyek tercatat resmi dan dapat difakturkan.',
        en: 'Corporate taxpayer number. Every project billing and payment is officially recorded and can be invoiced.'
      }
    },
    {
      code: 'SBU',
      number: '',
      name: { id: 'Sertifikat Badan Usaha', en: 'Business Entity Certificate' },
      desc: {
        id: 'Klasifikasi Bangunan Gedung dan Bangunan Sipil — bukti kompetensi teknis badan usaha di bidang jasa konstruksi.',
        en: 'Building & Civil Works classification — proof of the company’s technical competence in construction services.'
      }
    },
    {
      code: 'SIUJK',
      number: '',
      name: { id: 'Izin Usaha Jasa Konstruksi', en: 'Construction Services Business Licence' },
      desc: {
        id: 'Izin menjalankan usaha jasa konstruksi, syarat wajib untuk mengikat kontrak kerja konstruksi yang sah.',
        en: 'Licence to operate construction services — a mandatory requirement to enter into valid construction contracts.'
      }
    },
    {
      code: 'SKA / SKT',
      number: '',
      name: { id: 'Sertifikat Tenaga Ahli & Terampil', en: 'Expert & Skilled Personnel Certificates' },
      desc: {
        id: 'Tenaga ahli dan tenaga terampil bersertifikat yang menandatangani serta mengawasi pelaksanaan teknis di lapangan.',
        en: 'Certified experts and skilled personnel who sign off on and supervise technical execution on site.'
      }
    },
    {
      code: 'AKTA',
      number: '',
      name: { id: 'Akta Pendirian & SK Kemenkumham', en: 'Deed of Establishment & Ministry Decree' },
      desc: {
        id: 'Badan hukum perseroan terbatas yang disahkan Kementerian Hukum dan HAM Republik Indonesia.',
        en: 'Limited liability company legal entity ratified by the Indonesian Ministry of Law and Human Rights.'
      }
    }
  ];


  /* ---------------------------------------------------------------------
     2b. PESAN CEPAT — template WhatsApp satu klik.
     `msg` menjadi isi pesan; baris bertanda (isi ...) dilengkapi pengunjung.
     --------------------------------------------------------------------- */
  const quick = [
    {
      icon: 'home',
      title: { id: 'Bangun rumah baru', en: 'Build a new house' },
      sub: { id: 'Dari lahan kosong sampai serah terima', en: 'From bare land to handover' },
      msg: {
        id: 'Kebutuhan: Membangun rumah tinggal baru.\nLokasi lahan: (isi kota/kecamatan)\nLuas tanah: (isi m2)\nJumlah lantai: (isi)\nPerkiraan mulai: (isi bulan/tahun)',
        en: 'Requirement: Building a new house.\nSite location: (city/district)\nLand area: (m2)\nNumber of storeys: (fill in)\nTarget start: (month/year)'
      }
    },
    {
      icon: 'hammer',
      title: { id: 'Renovasi bangunan', en: 'Renovate a building' },
      sub: { id: 'Perombakan, tambah lantai, perkuatan struktur', en: 'Overhaul, add floors, strengthening' },
      msg: {
        id: 'Kebutuhan: Renovasi bangunan.\nJenis bangunan: (rumah/ruko/kantor)\nLokasi: (isi kota/kecamatan)\nYang ingin dikerjakan: (isi singkat)',
        en: 'Requirement: Building renovation.\nBuilding type: (house/shophouse/office)\nLocation: (city/district)\nScope of work: (brief)'
      }
    },
    {
      icon: 'ruler',
      title: { id: 'Interior fit-out', en: 'Interior fit-out' },
      sub: { id: 'Partisi, plafon, custom furniture', en: 'Partitions, ceilings, custom furniture' },
      msg: {
        id: 'Kebutuhan: Pengerjaan interior.\nJenis ruang: (rumah/kantor/kafe)\nLuas area: (isi m2)\nLokasi: (isi kota/kecamatan)',
        en: 'Requirement: Interior work.\nSpace type: (home/office/cafe)\nArea: (m2)\nLocation: (city/district)'
      }
    },
    {
      icon: 'file',
      title: { id: 'Minta estimasi RAB', en: 'Request a cost estimate' },
      sub: { id: 'Rincian anggaran per item pekerjaan', en: 'Budget itemised per work package' },
      msg: {
        id: 'Kebutuhan: Estimasi Rencana Anggaran Biaya (RAB).\nJenis pekerjaan: (isi)\nLuas bangunan: (isi m2)\nSudah punya gambar kerja: (sudah / belum)',
        en: 'Requirement: Cost estimate (RAB).\nType of work: (fill in)\nBuilding area: (m2)\nWorking drawings available: (yes / no)'
      }
    },
    {
      icon: 'mapPin',
      title: { id: 'Jadwalkan survei lokasi', en: 'Schedule a site survey' },
      sub: { id: 'Tim kami datang meninjau lahan', en: 'Our team visits and assesses the site' },
      msg: {
        id: 'Kebutuhan: Permohonan survei lokasi.\nAlamat lokasi: (isi alamat)\nHari/jam yang memungkinkan: (isi)',
        en: 'Requirement: Site survey request.\nSite address: (fill in)\nPreferred day/time: (fill in)'
      }
    },
    {
      icon: 'compass',
      title: { id: 'Design & Build (turnkey)', en: 'Design & Build (turnkey)' },
      sub: { id: 'Desain, izin, dan pelaksanaan satu pintu', en: 'Design, permits, and build in one contract' },
      msg: {
        id: 'Kebutuhan: Paket Design & Build (turnkey).\nJenis bangunan: (isi)\nLokasi: (isi kota/kecamatan)\nGambaran singkat: (isi)',
        en: 'Requirement: Design & Build (turnkey) package.\nBuilding type: (fill in)\nLocation: (city/district)\nBrief description: (fill in)'
      }
    }
  ];

  /* ---------------------------------------------------------------------
     2c. TAHAP MODEL STRUKTUR 3D
     `sheet` menautkan tiap tahap ke lembar gambar kerja di slider Denah.
     --------------------------------------------------------------------- */
  const bpStages = [
    {
      elev: '−1,30 → ±0,00 m', sheet: 'rencana-pondasi',
      title: { id: 'Rencana Pondasi', en: 'Foundation Plan' },
      desc: {
        id: 'Footplate 80×80 dan 120×120 dengan sloof menerus yang mengikat seluruh titik kolom.',
        en: '80×80 and 120×120 footplates with continuous tie beams locking every column point.'
      }
    },
    {
      elev: '±0,00 → +3,60 m', sheet: 'rencana-kolom-lt1',
      title: { id: 'Kolom & Balok Lantai 1', en: 'Ground Floor Columns & Beams' },
      desc: {
        id: 'Kolom lantai dasar berdiri di atas sloof, diikat balok pada elevasi +3,60 m.',
        en: 'Ground floor columns rise from the tie beams, locked by beams at +3.60 m.'
      }
    },
    {
      elev: '+3,60 → +7,10 m', sheet: 'rencana-kolom-lt2',
      title: { id: 'Kolom & Balok Lantai 2', en: 'Second Floor Columns & Beams' },
      desc: {
        id: 'Struktur lantai dua melanjutkan as kolom yang sama hingga elevasi +7,10 m.',
        en: 'The second floor continues the same column grid up to +7.10 m.'
      }
    },
    {
      elev: '+7,10 → +10,30 m', sheet: 'rencana-kolom-lt3',
      title: { id: 'Kolom & Balok Lantai 3', en: 'Third Floor Columns & Beams' },
      desc: {
        id: 'Lantai tiga menutup rangka utama bangunan pada elevasi +10,30 m.',
        en: 'The third floor completes the main frame at +10.30 m.'
      }
    },
    {
      elev: '+10,30 → +12,05 m', sheet: 'potongan-bb',
      title: { id: 'Struktur Atap', en: 'Roof Structure' },
      desc: {
        id: 'Rangka atap limasan bertumpu pada kolom pendek di atas balok ring.',
        en: 'The hipped roof frame sits on short columns above the ring beam.'
      }
    }
  ];


  /* ---------------------------------------------------------------------
     3. LAYANAN
     --------------------------------------------------------------------- */
  const services = [
    {
      slug: 'gedung-komersial', icon: 'building',
      title: { id: 'Konstruksi Gedung & Komersial', en: 'Building & Commercial Construction' },
      desc: {
        id: 'Pembangunan ruko, kantor, gudang, dan gedung komersial bertingkat dari struktur bawah hingga serah terima. Perhitungan struktur mengacu SNI dengan pengawasan mutu di setiap tahap pengecoran.',
        en: 'Shophouses, offices, warehouses, and multi-storey commercial buildings from substructure to handover. Structural calculations follow Indonesian National Standards with quality control at every casting stage.'
      },
      points: {
        id: ['Struktur beton bertulang & baja', 'Perhitungan mengacu SNI', 'Uji mutu beton per pengecoran'],
        en: ['Reinforced concrete & steel structures', 'Calculations per Indonesian standards', 'Concrete testing per pour']
      }
    },
    {
      slug: 'residensial', icon: 'home',
      title: { id: 'Hunian & Residensial Mewah', en: 'Luxury Residential' },
      desc: {
        id: 'Rumah tinggal, villa, dan hunian premium dengan detail arsitektur yang presisi. Mulai dari klasik Eropa hingga tropis modern, dikerjakan dengan material pilihan dan finishing rapi.',
        en: 'Homes, villas, and premium residences with precise architectural detailing. From European classical to modern tropical, built with selected materials and clean finishing.'
      },
      points: {
        id: ['Villa & rumah tinggal bertingkat', 'Detail arsitektur presisi', 'Material pilihan bergaransi'],
        en: ['Villas & multi-storey homes', 'Precise architectural detailing', 'Selected, warranted materials']
      }
    },
    {
      slug: 'interior', icon: 'ruler',
      title: { id: 'Interior Fit-Out', en: 'Interior Fit-Out' },
      desc: {
        id: 'Pengerjaan interior menyeluruh: partisi, plafon, lantai, custom furniture, hingga pencahayaan. Ruang dirancang agar fungsional sekaligus konsisten dengan konsep arsitekturnya.',
        en: 'End-to-end interior work: partitions, ceilings, flooring, custom furniture, and lighting. Spaces designed to be functional and consistent with the architectural concept.'
      },
      points: {
        id: ['Custom furniture & built-in', 'Plafon, partisi, & pencahayaan', 'Koordinasi MEP interior'],
        en: ['Custom & built-in furniture', 'Ceilings, partitions & lighting', 'Interior MEP coordination']
      }
    },
    {
      slug: 'renovasi', icon: 'hammer',
      title: { id: 'Renovasi & Restrukturisasi', en: 'Renovation & Restructuring' },
      desc: {
        id: 'Perombakan bangunan lama, penambahan lantai, hingga perkuatan struktur. Dimulai dari audit kondisi eksisting agar penanganan tepat sasaran dan bangunan kembali aman digunakan.',
        en: 'Overhauling existing buildings, adding floors, and strengthening structures. Starts with an audit of existing conditions so the work is targeted and the building is safe to use again.'
      },
      points: {
        id: ['Audit struktur eksisting', 'Penambahan lantai & perluasan', 'Perkuatan kolom & balok'],
        en: ['Existing structure audit', 'Floor additions & extensions', 'Column & beam strengthening']
      }
    },
    {
      slug: 'infrastruktur', icon: 'road',
      title: { id: 'Infrastruktur & Sipil', en: 'Infrastructure & Civil Works' },
      desc: {
        id: 'Pekerjaan sipil pendukung kawasan: jalan lingkungan, drainase, saluran, turap penahan tanah, dan pekerjaan tanah pada lahan berkontur.',
        en: 'Civil works that support a site: access roads, drainage, channels, retaining walls, and earthworks on contoured land.'
      },
      points: {
        id: ['Jalan lingkungan & perkerasan', 'Drainase & saluran air', 'Turap & penahan tanah'],
        en: ['Access roads & pavements', 'Drainage & waterways', 'Retaining walls & slope works']
      }
    },
    {
      slug: 'design-build', icon: 'compass',
      title: { id: 'Design & Build (Turnkey)', en: 'Design & Build (Turnkey)' },
      desc: {
        id: 'Satu kontrak, satu penanggung jawab: desain arsitektur, gambar kerja, RAB, perizinan, hingga pelaksanaan. Menghapus celah komunikasi antara perencana dan pelaksana.',
        en: 'One contract, one point of responsibility: architectural design, working drawings, cost estimates, permits, and execution. Removes the communication gap between designer and builder.'
      },
      points: {
        id: ['Desain & gambar kerja lengkap', 'RAB terbuka dan terperinci', 'Satu penanggung jawab proyek'],
        en: ['Complete design & working drawings', 'Open, itemised cost estimates', 'Single project accountability']
      }
    }
  ];

  /* ---------------------------------------------------------------------
     4. SOP PROYEK
     --------------------------------------------------------------------- */
  const sop = [
    {
      title: { id: 'Survei & Desain', en: 'Survey & Design' },
      desc: {
        id: 'Peninjauan lahan, pengukuran, dan pembahasan kebutuhan. Hasilnya berupa konsep desain serta gambar kerja awal.',
        en: 'Site visit, measurement, and requirement discussion. Produces the design concept and preliminary working drawings.'
      },
      out: { id: 'Output: Gambar konsep', en: 'Output: Concept drawings' }
    },
    {
      title: { id: 'Penyusunan RAB', en: 'Cost Estimate (RAB)' },
      desc: {
        id: 'Rencana Anggaran Biaya terperinci per item pekerjaan, volume, dan spesifikasi material — tanpa biaya tersembunyi.',
        en: 'A detailed budget broken down per work item, volume, and material specification — with no hidden costs.'
      },
      out: { id: 'Output: RAB terperinci', en: 'Output: Itemised budget' }
    },
    {
      title: { id: 'Kontrak & Persiapan K3', en: 'Contract & HSE Setup' },
      desc: {
        id: 'Penandatanganan kontrak kerja, penetapan jadwal, mobilisasi tim, serta penyiapan perangkat keselamatan kerja di lokasi.',
        en: 'Contract signing, schedule setting, team mobilisation, and preparation of on-site safety equipment.'
      },
      out: { id: 'Output: Kontrak & jadwal', en: 'Output: Contract & schedule' }
    },
    {
      title: { id: 'Eksekusi & Quality Control', en: 'Execution & Quality Control' },
      desc: {
        id: 'Pelaksanaan di lapangan dengan pengawasan mutu berkala dan laporan progres berkala kepada pemilik proyek.',
        en: 'On-site execution with periodic quality inspections and regular progress reports to the project owner.'
      },
      out: { id: 'Output: Laporan progres', en: 'Output: Progress reports' }
    },
    {
      title: { id: 'BAST & Masa Retensi', en: 'Handover & Retention' },
      desc: {
        id: 'Berita Acara Serah Terima disertai masa retensi 6–12 bulan untuk perbaikan bila ditemukan cacat pekerjaan.',
        en: 'Formal handover document with a 6–12 month retention period covering rectification of any defects found.'
      },
      out: { id: 'Output: BAST + garansi', en: 'Output: Handover + warranty' }
    }
  ];

  /* ---------------------------------------------------------------------
     5. MENGAPA MEMILIH RGI
     --------------------------------------------------------------------- */
  const compare = [
    {
      aspect: { id: 'Legalitas', en: 'Legality' },
      them: { id: 'Sering perorangan tanpa badan usaha resmi', en: 'Often individuals without a registered legal entity' },
      us: { id: 'PT berbadan hukum: NIB, NPWP, SBU, SIUJK', en: 'Incorporated company: NIB, NPWP, SBU, SIUJK' }
    },
    {
      aspect: { id: 'Material', en: 'Materials' },
      them: { id: 'Merek dan mutu menyesuaikan sisa stok', en: 'Brand and grade depend on leftover stock' },
      us: { id: 'Spesifikasi tertulis, material bermutu SNI', en: 'Written specifications, SNI-grade materials' }
    },
    {
      aspect: { id: 'Anggaran', en: 'Budget' },
      them: { id: 'Harga borongan global, rawan biaya tambahan', en: 'Lump-sum pricing, prone to extra charges' },
      us: { id: 'RAB terperinci per item, terbuka sejak awal', en: 'Itemised budget, transparent from the start' }
    },
    {
      aspect: { id: 'Quality Control', en: 'Quality Control' },
      them: { id: 'Pemeriksaan mutu bergantung pengawas harian', en: 'Quality checks depend on the daily foreman' },
      us: { id: 'QC terjadwal di setiap tahap struktur', en: 'Scheduled QC at every structural stage' }
    },
    {
      aspect: { id: 'Laporan Progres', en: 'Progress Reporting' },
      them: { id: 'Kabar lisan, sulit ditelusuri ulang', en: 'Verbal updates, hard to trace back' },
      us: { id: 'Laporan berkala + dokumentasi foto lapangan', en: 'Periodic reports + on-site photo documentation' }
    },
    {
      aspect: { id: 'Garansi', en: 'Warranty' },
      them: { id: 'Selesai bayar, tanggung jawab ikut selesai', en: 'Once paid, responsibility ends' },
      us: { id: 'Masa retensi 6–12 bulan setelah BAST', en: '6–12 month retention period after handover' }
    }
  ];

  /* ---------------------------------------------------------------------
     6. KOMITMEN K3
     --------------------------------------------------------------------- */
  const safety = [
    {
      icon: 'helmet',
      title: { id: 'APD Wajib', en: 'Mandatory PPE' },
      desc: {
        id: 'Helm, sepatu safety, dan rompi wajib dikenakan seluruh pekerja serta tamu selama berada di area proyek.',
        en: 'Helmets, safety boots, and vests are mandatory for all workers and visitors inside the project area.'
      }
    },
    {
      icon: 'clipboard',
      title: { id: 'Safety Briefing Harian', en: 'Daily Safety Briefing' },
      desc: {
        id: 'Pengarahan singkat sebelum kerja dimulai untuk membahas risiko pekerjaan hari itu dan cara pencegahannya.',
        en: 'A short briefing before work starts to review the day’s risks and how to prevent them.'
      }
    },
    {
      icon: 'fence',
      title: { id: 'Manajemen Area Proyek', en: 'Site Area Management' },
      desc: {
        id: 'Pembatas area kerja, penataan material, dan jalur akses yang jelas agar lingkungan sekitar tetap aman.',
        en: 'Work-area barriers, organised material storage, and clear access routes to keep surroundings safe.'
      }
    },
    {
      icon: 'shield',
      title: { id: 'Target Zero Accident', en: 'Zero Accident Target' },
      desc: {
        id: 'Setiap proyek dijalankan dengan target nihil kecelakaan kerja, dievaluasi rutin bersama tim lapangan.',
        en: 'Every project runs with a zero-accident target, reviewed regularly together with the field team.'
      }
    }
  ];

  /* ---------------------------------------------------------------------
     7. PORTOFOLIO
     --------------------------------------------------------------------- */
  const projects = [
    {
      slug: 'villa-klasik-eropa',
      cover: 'klasik-fasad-depan',
      title: { id: 'Villa Klasik Eropa', en: 'European Classical Villa' },
      location: { id: 'Jakarta Selatan', en: 'South Jakarta' },
      category: { id: 'Residensial Mewah', en: 'Luxury Residential' },
      desc: {
        id: 'Hunian dua lantai bergaya klasik Eropa dengan kolom pilar, ornamen pediment, dan balkon besi tempa. Area belakang dilengkapi kolam renang dengan dek kayu.',
        en: 'A two-storey European classical residence with pilaster columns, pediment ornaments, and wrought-iron balconies. The rear features a swimming pool with a timber deck.'
      },
      gallery: [
        { img: 'klasik-fasad-depan', cap: { id: 'Fasad depan — portico dan pilar utama', en: 'Front facade — portico and main columns' } },
        { img: 'klasik-fasad-samping', cap: { id: 'Fasad samping pada waktu senja', en: 'Side facade at dusk' } },
        { img: 'villa-klasik-eropa', cap: { id: 'Area kolam renang dan dek kayu', en: 'Swimming pool area and timber deck' } },
        { img: 'klasik-interior-sosial', cap: { id: 'Ruang tamu, ruang makan, dan bar', en: 'Living room, dining room, and bar' } },
        { img: 'klasik-interior-privat', cap: { id: 'Kamar tidur utama dan walk-in closet', en: 'Master bedroom and walk-in closet' } }
      ]
    },
    {
      slug: 'hunian-modern-minimalis',
      cover: 'hunian-modern-minimalis',
      title: { id: 'Hunian Modern Minimalis', en: 'Modern Minimalist Residence' },
      location: { id: 'BSD City, Tangerang Selatan', en: 'BSD City, South Tangerang' },
      category: { id: 'Residensial', en: 'Residential' },
      desc: {
        id: 'Rumah dua lantai dengan komposisi bidang tegas, bukaan lebar, dan palet monokrom. Carport terintegrasi dengan garis atap yang bersih tanpa ornamen berlebih.',
        en: 'A two-storey house with bold planar composition, wide openings, and a monochrome palette. An integrated carport with clean roof lines and no excess ornament.'
      },
      gallery: [
        { img: 'hunian-modern-minimalis', cap: { id: 'Fasad depan dengan carport terintegrasi', en: 'Front facade with integrated carport' } },
        { img: 'modern-fasad', cap: { id: 'Studi fasad modern dengan aksen hijau', en: 'Modern facade studies with green accents' } },
        { img: 'modern-interior-sosial', cap: { id: 'Ruang keluarga, dapur, dan ruang makan', en: 'Family room, kitchen, and dining area' } },
        { img: 'modern-interior-privat', cap: { id: 'Kamar utama, kamar mandi, dan walk-in closet', en: 'Master bedroom, bathroom, and walk-in closet' } }
      ]
    },
    {
      slug: 'tropical-resort-living',
      cover: 'tropical-resort-living',
      title: { id: 'Tropical Resort Living', en: 'Tropical Resort Living' },
      location: { id: 'Bali', en: 'Bali' },
      category: { id: 'Villa & Resor', en: 'Villa & Resort' },
      desc: {
        id: 'Konsep hunian resor tropis: kolam renang memanjang, tanaman rambat, dan bukaan kaca penuh yang melarutkan batas ruang dalam dengan taman.',
        en: 'A tropical resort living concept: a lap pool, hanging greenery, and full-height glazing that dissolves the boundary between interior and garden.'
      },
      gallery: [
        { img: 'tropical-resort-living', cap: { id: 'Kolam renang dan area lounge terbuka', en: 'Swimming pool and open lounge area' } }
      ]
    }
  ];

  /* ---------------------------------------------------------------------
     8. LIBRARY PROSES PENGERJAAN
     Proyek: Rumah Ms. Mala, Cisarua, Bogor
     --------------------------------------------------------------------- */
  const stages = [
    { key: 'persiapan', label: { id: 'Persiapan Lahan', en: 'Site Preparation' } },
    { key: 'pondasi', label: { id: 'Pondasi & Galian', en: 'Foundation & Excavation' } },
    { key: 'struktur', label: { id: 'Struktur', en: 'Structure' } },
    { key: 'finishing', label: { id: 'Finishing', en: 'Finishing' } }
  ];

  const projectRef = { id: 'Rumah Ms. Mala — Cisarua, Bogor', en: 'Ms. Mala Residence — Cisarua, Bogor' };

  const library = [
    {
      img: 'site-10', stage: 'persiapan',
      title: { id: 'Pembersihan & perataan lahan', en: 'Land clearing and levelling' },
      desc: {
        id: 'Lahan dibersihkan dan diratakan sebelum pemasangan bouwplank. Elevasi tanah diperiksa terhadap gambar rencana pondasi.',
        en: 'The site is cleared and levelled before setting out. Ground elevation is checked against the foundation plan.'
      }
    },
    {
      img: 'site-08', stage: 'persiapan',
      title: { id: 'Penataan material batu kali', en: 'Stone material staging' },
      desc: {
        id: 'Batu kali disiapkan di sisi galian untuk pekerjaan pondasi menerus pada lahan berkontur.',
        en: 'River stone is staged beside the trench for continuous foundation work on the sloping site.'
      }
    },
    {
      img: 'site-09', stage: 'pondasi',
      title: { id: 'Galian pondasi pada lahan miring', en: 'Foundation trench on sloping ground' },
      desc: {
        id: 'Galian mengikuti kontur lahan. Kedalaman disesuaikan agar pondasi duduk pada tanah keras.',
        en: 'Excavation follows the land contour. Depth is adjusted so the foundation sits on firm soil.'
      }
    },
    {
      img: 'site-07', stage: 'pondasi',
      title: { id: 'Pembesian sloof menerus', en: 'Continuous tie-beam reinforcement' },
      desc: {
        id: 'Rangkaian tulangan sloof dipasang sepanjang jalur galian, dicek jarak sengkang dan selimut betonnya.',
        en: 'Tie-beam reinforcement is installed along the trench; stirrup spacing and concrete cover are verified.'
      }
    },
    {
      img: 'site-06', stage: 'pondasi',
      title: { id: 'Rangka footplate 120×120', en: 'Footplate cage 120×120' },
      desc: {
        id: 'Rangka tulangan footplate dipasang pada lubang galian sesuai gambar Rencana Pondasi.',
        en: 'The footplate reinforcement cage is placed in the pit according to the Foundation Plan drawing.'
      }
    },
    {
      img: 'site-04', stage: 'pondasi',
      title: { id: 'Pengecoran pondasi', en: 'Foundation concrete pour' },
      desc: {
        id: 'Pengecoran dilakukan menerus untuk menghindari sambungan dingin. Campuran dipadatkan agar tidak ada rongga.',
        en: 'Concrete is poured continuously to avoid cold joints. The mix is compacted to eliminate voids.'
      }
    },
    {
      img: 'site-05', stage: 'struktur',
      title: { id: 'Stek kolom di atas sloof', en: 'Column starter bars above tie beam' },
      desc: {
        id: 'Tulangan stek kolom ditegakkan dan diverifikasi posisinya terhadap as bangunan sebelum pemasangan bekisting.',
        en: 'Column starter bars are set upright and checked against the building grid before formwork is installed.'
      }
    },
    {
      img: 'site-01', stage: 'struktur',
      title: { id: 'Bekisting kolom lantai 1', en: 'Ground floor column formwork' },
      desc: {
        id: 'Bekisting kolom dipasang dan diskur. Ketegakan diperiksa dua arah sebelum pengecoran.',
        en: 'Column formwork is installed and braced. Verticality is checked in both axes before pouring.'
      }
    },
    {
      img: 'site-03', stage: 'struktur',
      title: { id: 'Kolom lantai 1 selesai dicor', en: 'Ground floor columns cast' },
      desc: {
        id: 'Bekisting dibuka setelah beton cukup umur. Tulangan menerus disiapkan untuk balok dan kolom lantai berikutnya.',
        en: 'Formwork is stripped once the concrete has cured. Continuing bars are prepared for the next floor’s beams and columns.'
      }
    },
    {
      img: 'site-02', stage: 'struktur',
      title: { id: 'Bekisting struktur lantai atas', en: 'Upper floor structural formwork' },
      desc: {
        id: 'Pekerjaan naik ke elevasi berikutnya. Perancah dan bekisting balok disusun mengikuti gambar rencana kolom.',
        en: 'Work moves to the next level. Scaffolding and beam formwork follow the column layout drawings.'
      }
    }
  ];

  /* ---------------------------------------------------------------------
     9. VIDEO LIVE SITE
     Ganti `src` dengan file video atau URL baru bila tersedia.
     --------------------------------------------------------------------- */
  const videos = [
    {
      src: 'assets/video/live-site-1.mp4', poster: 'assets/img/library/vid-1-poster.webp', dur: '0:17',
      stage: 'struktur',
      title: { id: 'Bekisting dan pembesian kolom', en: 'Column formwork and reinforcement' },
      desc: {
        id: 'Tinjauan lapangan pada pekerjaan kolom lantai satu: bekisting kayu, pembesian, dan skur penahan ketegakan.',
        en: 'Site walkthrough of ground-floor column work: timber formwork, reinforcement, and bracing for verticality.'
      }
    },
    {
      src: 'assets/video/live-site-2.mp4', poster: 'assets/img/library/vid-2-poster.webp', dur: '0:16',
      stage: 'persiapan',
      title: { id: 'Penataan material dan area kerja', en: 'Material staging and work area' },
      desc: {
        id: 'Penataan bambu perancah dan material di area kerja, serta kondisi lingkungan sekitar lokasi proyek.',
        en: 'Bamboo scaffolding and materials staged in the work area, plus the surrounding site conditions.'
      }
    },
    {
      src: 'assets/video/live-site-3.mp4', poster: 'assets/img/library/vid-3-poster.webp', dur: '0:11',
      stage: 'pondasi',
      title: { id: 'Galian dan pekerjaan pondasi', en: 'Excavation and foundation work' },
      desc: {
        id: 'Proses galian pondasi pada lahan berkontur beserta pemasangan patok dan tangga akses sementara.',
        en: 'Foundation excavation on sloping ground, with stakes and temporary access ladders in place.'
      }
    },
    {
      src: 'assets/video/live-site-4.mp4', poster: 'assets/img/library/vid-4-poster.webp', dur: '0:21',
      stage: 'pondasi',
      title: { id: 'Sloof menerus dan stek kolom', en: 'Continuous tie beams and column starters' },
      desc: {
        id: 'Panorama area pondasi setelah sloof terpasang: jalur sloof menerus dan stek kolom yang menunggu bekisting.',
        en: 'Panorama of the foundation area after tie beams: continuous beam runs and column starters awaiting formwork.'
      }
    },
    {
      src: 'assets/video/live-site-5.mp4', poster: 'assets/img/library/vid-5-poster.webp', dur: '0:12',
      stage: 'struktur',
      title: { id: 'Molen dan pengecoran di lokasi', en: 'On-site mixer and casting' },
      desc: {
        id: 'Peralatan pengecoran di lokasi. Campuran diaduk di tempat untuk menjaga kesegaran beton saat dituang.',
        en: 'On-site casting equipment. The mix is batched on location to keep the concrete fresh when poured.'
      }
    }
  ];

  /* ---------------------------------------------------------------------
     10. LEMBAR GAMBAR TEKNIS (DENAH)
     --------------------------------------------------------------------- */
  const sheets = [
    { file: 'denah-lt1', scale: '1 : 100', group: 'denah',
      title: { id: 'Denah Rumah Lantai 1', en: 'Ground Floor Plan' },
      desc: { id: 'Tata ruang lantai dasar beserta ukuran as ke as dan posisi bukaan.', en: 'Ground floor layout with grid dimensions and opening positions.' } },
    { file: 'denah-lt2', scale: '1 : 100', group: 'denah',
      title: { id: 'Denah Rumah Lantai 2', en: 'Second Floor Plan' },
      desc: { id: 'Pembagian ruang lantai dua, area privat, dan sirkulasi tangga.', en: 'Second floor room layout, private areas, and stair circulation.' } },
    { file: 'denah-lt3', scale: '1 : 100', group: 'denah',
      title: { id: 'Denah Rumah Lantai 3', en: 'Third Floor Plan' },
      desc: { id: 'Denah lantai tiga beserta area servis dan ruang terbuka atas.', en: 'Third floor plan with service areas and upper open space.' } },
    { file: 'tampak-kiri', scale: '1 : 100', group: 'tampak',
      title: { id: 'Tampak Kiri', en: 'Left Elevation' },
      desc: { id: 'Tampilan sisi kiri bangunan: ketinggian lantai dan komposisi bukaan.', en: 'Left side of the building: floor heights and opening composition.' } },
    { file: 'tampak-belakang', scale: '1 : 100', group: 'tampak',
      title: { id: 'Tampak Belakang', en: 'Rear Elevation' },
      desc: { id: 'Tampilan sisi belakang bangunan beserta elevasi atap.', en: 'Rear side of the building including roof elevations.' } },
    { file: 'potongan-bb', scale: '1 : 110', group: 'tampak',
      title: { id: 'Potongan B–B', en: 'Section B–B' },
      desc: { id: 'Potongan melintang: hubungan antar lantai, tinggi plafon, dan struktur atap.', en: 'Cross section: floor-to-floor relationships, ceiling heights, and roof structure.' } },
    { file: 'rencana-pondasi', scale: '1 : 100', group: 'struktur',
      title: { id: 'Rencana Pondasi', en: 'Foundation Plan' },
      desc: { id: 'Posisi footplate 80×80 dan 120×120 beserta jalur sloof menerus.', en: 'Positions of 80×80 and 120×120 footplates with continuous tie-beam runs.' } },
    { file: 'rencana-kolom-lt1', scale: '1 : 100', group: 'struktur',
      title: { id: 'Rencana Kolom Lantai 1', en: 'Ground Floor Column Plan' },
      desc: { id: 'Penomoran dan posisi kolom struktur pada lantai dasar.', en: 'Numbering and positions of structural columns on the ground floor.' } },
    { file: 'rencana-kolom-lt2', scale: '1 : 100', group: 'struktur',
      title: { id: 'Rencana Kolom Lantai 2', en: 'Second Floor Column Plan' },
      desc: { id: 'Kelanjutan kolom struktur pada lantai dua.', en: 'Continuation of structural columns on the second floor.' } },
    { file: 'rencana-kolom-lt3', scale: '1 : 100', group: 'struktur',
      title: { id: 'Rencana Kolom Lantai 3', en: 'Third Floor Column Plan' },
      desc: { id: 'Kolom struktur lantai tiga hingga elevasi atap.', en: 'Third floor structural columns up to roof level.' } },
    { file: 'detail-kolom-sloof-balok', scale: '—', group: 'struktur',
      title: { id: 'Detail Kolom, Sloof & Balok', en: 'Column, Tie Beam & Beam Details' },
      desc: { id: 'Detail penampang dan penulangan kolom, sloof, serta balok.', en: 'Section and reinforcement details for columns, tie beams, and beams.' } }
  ];

  const sheetGroups = [
    { key: 'all', label: { id: 'Semua Lembar', en: 'All Sheets' } },
    { key: 'denah', label: { id: 'Denah', en: 'Floor Plans' } },
    { key: 'tampak', label: { id: 'Tampak & Potongan', en: 'Elevations & Sections' } },
    { key: 'struktur', label: { id: 'Struktur', en: 'Structure' } }
  ];

  /* ---------------------------------------------------------------------
     11. KAMUS TERJEMAHAN (data-i18n)
     --------------------------------------------------------------------- */
  const t = {
    id: {
      'meta.tagline': 'General Contractor',
      'nav.home': 'Beranda',
      'nav.about': 'Tentang & Legalitas',
      'nav.services': 'Layanan',
      'nav.plan': 'Denah',
      'nav.library': 'Library Proses',
      'nav.portfolio': 'Portofolio',
      'nav.contact': 'Kontak',
      'nav.menu': 'Menu',
      'nav.close': 'Tutup menu',
      'nav.open': 'Buka menu',
      'nav.skip': 'Lompat ke konten utama',
      'lang.label': 'Pilih bahasa',

      'cta.order': 'Pesan layanan ini',
      'cta.orderLike': 'Konsultasi proyek serupa',
      'cta.quick': 'Pesan Cepat',
      'hero.cue': 'Gulir',
      'quick.eyebrow': 'Pesan Cepat',
      'quick.title': 'Sekali klik, pesan Anda sudah tersusun',
      'quick.lead': 'Pilih kebutuhan yang paling mendekati. WhatsApp terbuka dengan pesan yang sudah rapi — Anda tinggal melengkapi bagian dalam tanda kurung lalu kirim.',
      'porto.all': 'Semua Proyek',
      'porto.photos': 'foto',
      'porto.open': 'Lihat galeri',
      'plan.pause': 'Jeda',
      'plan.play': 'Putar',
      'plan.sheetOf': 'Lembar',
      'plan.3dStepHint': 'Pilih tahap untuk melihat bagian struktur yang dikerjakan. Gambar kerja di atas ikut berpindah.',
      'plan.3dLoading': 'Memuat model',
      'plan.legendFoot': 'Pondasi & sloof',
      'plan.legendCol': 'Kolom',
      'plan.legendBeam': 'Balok & atap',
      'lib.videoNav': 'Navigasi video',
      'cta.wa': 'Konsultasi via WhatsApp',
      'cta.waShort': 'WhatsApp',
      'cta.services': 'Lihat Layanan',
      'cta.email': 'Kirim Email',
      'cta.contact': 'Hubungi Kami',
      'cta.detail': 'Selengkapnya',
      'cta.allProjects': 'Lihat Semua Proyek',
      'cta.library': 'Buka Library Proses',
      'cta.plan': 'Lihat Denah Bangunan',

      'hero.eyebrow': 'PT RIV Group Indonesia',
      'hero.title': 'Membangun Kepercayaan, Mewujudkan Kualitas',
      'hero.sub': 'Kontraktor umum di Jakarta Timur yang menangani pembangunan dari perencanaan hingga serah terima — dengan struktur yang kokoh, anggaran yang terbuka, dan jadwal yang dijaga.',
      'hero.m1k': 'Bidang Layanan',
      'hero.m1v': '6 Layanan',
      'hero.m1s': 'Gedung, hunian, interior, sipil',
      'hero.m2k': 'Legalitas',
      'hero.m2v': 'Terdaftar Resmi',
      'hero.m2s': 'NIB · NPWP · SBU · SIUJK',
      'hero.m3k': 'Garansi Retensi',
      'hero.m3v': '6–12 Bulan',
      'hero.m3s': 'Setelah Berita Acara Serah Terima',

      'exec.eyebrow': 'Ringkasan Perusahaan',
      'exec.title': 'Kontraktor yang bekerja dengan angka, bukan dengan janji',
      'exec.p1': 'PT RIV Group Indonesia (RGI) adalah kontraktor umum yang bergerak di bidang perencanaan dan pelaksanaan konstruksi. Kami menangani proyek gedung komersial, hunian pribadi, interior, renovasi, hingga pekerjaan sipil pendukung kawasan.',
      'exec.p2': 'Tiga hal yang kami jaga di setiap proyek: kualitas struktural yang mengikuti standar teknis, efisiensi waktu melalui jadwal kerja yang realistis, dan transparansi anggaran melalui RAB yang dapat ditelusuri sampai ke item terkecil.',
      'exec.p3': 'Kami percaya kepercayaan tidak diminta, melainkan dibangun — lewat pekerjaan yang bisa diperiksa, laporan yang bisa dibaca, dan hasil yang bertahan setelah proyek selesai.',
      'exec.s1': 'Layanan konstruksi terintegrasi',
      'exec.s2': 'Tahap SOP proyek terstandar',
      'exec.s3': 'Bulan masa retensi garansi',

      'trust.title': 'Legalitas & Administrasi',
      'trust.nib': 'Nomor Induk Berusaha aktif',
      'trust.npwp': 'NPWP badan usaha resmi',
      'trust.sbu': 'Bangunan Gedung & Sipil',
      'trust.siujk': 'Izin usaha jasa konstruksi',
      'trust.more': 'Lihat detail legalitas',

      'vm.eyebrow': 'Visi & Misi',
      'vm.title': 'Arah kerja yang kami pegang',
      'vm.visionLabel': 'Visi',
      'vm.vision': 'Menjadi mitra konstruksi terpercaya yang dikenal karena mutu pekerjaan, ketepatan waktu, dan keterbukaan — di setiap skala proyek yang kami tangani.',
      'vm.missionLabel': 'Misi',
      'vm.m1t': 'Mengutamakan mutu struktural',
      'vm.m1d': 'Menjalankan pekerjaan sesuai standar teknis yang berlaku, dengan material bermutu dan pemeriksaan di setiap tahap kritis.',
      'vm.m2t': 'Menjaga ketepatan waktu',
      'vm.m2d': 'Menyusun jadwal yang realistis sejak awal dan menjaganya melalui koordinasi lapangan yang disiplin.',
      'vm.m3t': 'Menjunjung transparansi anggaran',
      'vm.m3d': 'Menyajikan RAB terperinci agar setiap rupiah yang dikeluarkan pemilik proyek dapat ditelusuri.',
      'vm.m4t': 'Mengedepankan keselamatan kerja',
      'vm.m4d': 'Menerapkan prosedur K3 di seluruh area proyek dengan target nihil kecelakaan kerja.',
      'vm.m5t': 'Membangun hubungan jangka panjang',
      'vm.m5d': 'Mendampingi pemilik proyek melewati masa retensi, bukan berhenti pada saat pembayaran terakhir.',

      'svc.eyebrow': 'Layanan',
      'svc.title': 'Enam lini pekerjaan, satu standar mutu',
      'svc.lead': 'Setiap layanan dijalankan dengan prosedur yang sama: survei, perhitungan, pelaksanaan terawasi, dan serah terima yang terdokumentasi.',
      'svc.detailTitle': 'Cakupan pekerjaan',

      'why.eyebrow': 'Mengapa Memilih RGI',
      'why.title': 'Perbedaannya ada pada hal-hal yang tidak terlihat',
      'why.lead': 'Banyak yang terlihat sama pada saat penawaran. Perbedaannya baru terasa ketika proyek berjalan — dan ketika proyek selesai.',
      'why.colAspect': 'Aspek',
      'why.colThem': 'Kontraktor Umumnya',
      'why.colUs': 'RGI',

      'k3.eyebrow': 'Komitmen K3',
      'k3.title': 'Proyek yang aman adalah proyek yang selesai',
      'k3.lead': 'Keselamatan kerja bukan formalitas administratif. Ia menentukan apakah pekerjaan berjalan lancar atau berhenti di tengah jalan.',

      'sop.eyebrow': 'Standar Operasional Prosedur',
      'sop.title': 'Lima tahap dari survei hingga serah terima',
      'sop.lead': 'Alur kerja yang sama diterapkan pada setiap proyek, sehingga pemilik proyek tahu persis apa yang sedang berlangsung dan apa yang akan terjadi berikutnya.',

      'porto.eyebrow': 'Portofolio',
      'porto.title': 'Karya dan konsep rancangan',
      'porto.lead': 'Ragam gaya yang kami tangani, dari klasik Eropa sampai tropis modern.',
      'porto.note': 'Ilustrasi Konsep',
      'porto.noteFull': 'Gambar bertanda “Ilustrasi Konsep” merupakan render rancangan, bukan foto proyek terbangun. Dokumentasi foto lapangan tersedia di halaman Library Proses.',
      'porto.gallery': 'Galeri proyek',
      'porto.pageLead': 'Kumpulan rancangan dan karya yang menggambarkan cakupan gaya serta tingkat detail yang kami kerjakan.',

      'lib.eyebrow': 'Library Proses',
      'lib.title': 'Library Proses Pengerjaan',
      'lib.lead': 'Dokumentasi tahap demi tahap dari lapangan — mulai dari lahan kosong hingga struktur berdiri. Kami menampilkannya apa adanya supaya proses kerja dapat dinilai, bukan hanya hasil akhirnya.',
      'lib.filterLabel': 'Saring berdasarkan tahap',
      'lib.all': 'Semua Tahap',
      'lib.photos': 'Dokumentasi Foto',
      'lib.videos': 'Dokumentasi Video',
      'lib.videosLead': 'Rekaman singkat dari lokasi proyek. Ketuk untuk memutar.',
      'lib.project': 'Proyek',
      'lib.empty': 'Belum ada dokumentasi pada tahap ini.',
      'lib.count': 'dokumentasi',

      'plan.eyebrow': 'Gambar Kerja',
      'plan.title': 'Denah Bangunan',
      'plan.lead': 'Gambar kerja yang menyertai progres pembangunan aktual di lapangan. Setiap lembar denah menjadi acuan langsung bagi pekerjaan yang terdokumentasi di halaman Library Proses.',
      'plan.sheetLabel': 'Lembar gambar',
      'plan.scale': 'Skala',
      'plan.zoomHint': 'Ketuk gambar untuk memperbesar',
      'plan.consultant': 'Konsultan perencana: Dani Architecture Design',
      'plan.placeholderTitle': 'Sketsa denah akan ditampilkan di sini',
      'plan.placeholderDesc': 'Slot ini disiapkan untuk sketsa denah tambahan. Letakkan berkas gambar di folder assets/img/teknis lalu daftarkan pada data.js.',
      'plan.3dEyebrow': 'Model Struktur',
      'plan.3dTitle': 'Struktur bangunan, tahap demi tahap',
      'plan.3dLead': 'Gulir untuk melihat urutan pekerjaan struktur — dari pondasi hingga atap — mengikuti lembar gambar di atas.',
      'plan.3dHint': 'Seret untuk memutar',
      'plan.3dFallback': 'Tampilan 3D tidak tersedia pada perangkat ini. Silakan gunakan lembar gambar di atas.',
      'plan.videoEyebrow': 'Video Live Site',
      'plan.videoTitle': 'Rekaman langsung dari lokasi',
      'plan.videoLead': 'Cuplikan proses pengerjaan proyek terkait, direkam langsung di lapangan tanpa penyuntingan berlebih.',
      'plan.videoMore': 'Rekaman lainnya',

      'about.eyebrow': 'Tentang Kami',
      'about.title': 'Tentang & Legalitas',
      'about.lead': 'Profil perusahaan, arah kerja, dan dasar hukum yang menaungi setiap kontrak yang kami tandatangani.',
      'about.legalEyebrow': 'Legalitas & Administrasi',
      'about.legalTitle': 'Dasar hukum yang bisa diperiksa',
      'about.legalLead': 'Berikut dokumen legalitas yang kami miliki. Nomor registrasi lengkap beserta salinan dokumen dapat kami kirimkan langsung kepada calon klien pada tahap penawaran.',
      'about.legalStatus': 'Terdaftar',
      'about.legalOnRequest': 'Nomor registrasi tersedia atas permintaan',
      'about.legalNumber': 'Nomor',
      'about.legalNote': 'Nomor legalitas ditampilkan sebagai informasi kepercayaan. Kami tidak menayangkan pindaian dokumen asli di situs publik demi menjaga data pribadi pengurus perusahaan.',

      'contact.eyebrow': 'Kontak',
      'contact.title': 'Mulai dari percakapan',
      'contact.lead': 'Ceritakan rencana proyek Anda. Kami akan meninjau kebutuhannya dan menjadwalkan survei lokasi bila diperlukan.',
      'contact.office': 'Kantor',
      'contact.email': 'Email',
      'contact.wa': 'WhatsApp',
      'contact.waSub': 'Klik untuk langsung memulai percakapan',
      'contact.hours': 'Jam Operasional',
      'contact.formTitle': 'Formulir Konsultasi',
      'contact.formLead': 'Isi ringkasan kebutuhan Anda. Tombol kirim akan membuka WhatsApp dengan pesan yang sudah tersusun rapi.',
      'contact.fName': 'Nama lengkap',
      'contact.fNamePh': 'Nama Anda',
      'contact.fContact': 'Nomor WhatsApp atau email',
      'contact.fContactPh': 'Agar kami bisa membalas',
      'contact.fType': 'Jenis pekerjaan',
      'contact.fTypePh': 'Pilih jenis pekerjaan',
      'contact.fLoc': 'Lokasi proyek',
      'contact.fLocPh': 'Kota atau kecamatan',
      'contact.fMsg': 'Kebutuhan proyek',
      'contact.fMsgPh': 'Ceritakan singkat: luas bangunan, jumlah lantai, target waktu, atau pertanyaan Anda.',
      'contact.submit': 'Kirim via WhatsApp',
      'contact.required': 'wajib diisi',
      'contact.errName': 'Mohon isi nama Anda.',
      'contact.errContact': 'Mohon isi nomor WhatsApp atau email yang bisa dihubungi.',
      'contact.errMsg': 'Mohon jelaskan kebutuhan proyek Anda secara singkat.',
      'contact.ok': 'WhatsApp sedang dibuka dengan pesan Anda. Bila tidak terbuka otomatis, gunakan tombol WhatsApp di sudut layar.',
      'contact.formNote': 'Formulir ini tidak menyimpan data Anda di server mana pun. Isian hanya disusun menjadi pesan WhatsApp yang Anda kirim sendiri.',
      'contact.mapTitle': 'Peta lokasi kantor',
      'contact.openMaps': 'Buka di Google Maps',

      'quote.text': 'Kepercayaan Anda adalah fondasi utama kami dalam setiap pengerjaan proyek.',
      'quote.cite': 'PT RIV Group Indonesia',

      'ctaband.title': 'Punya rencana pembangunan?',
      'ctaband.lead': 'Kirimkan gambaran proyek Anda. Kami akan meninjau kebutuhannya dan menyiapkan estimasi awal tanpa biaya.',

      'footer.about': 'Kontraktor umum yang menangani konstruksi gedung, hunian, interior, renovasi, dan pekerjaan sipil di Jabodetabek dan sekitarnya.',
      'footer.nav': 'Navigasi',
      'footer.services': 'Layanan',
      'footer.contact': 'Kontak',
      'footer.rights': 'Seluruh hak cipta dilindungi.',
      'footer.built': 'Membangun Kepercayaan, Mewujudkan Kualitas.',

      'lb.close': 'Tutup',
      'lb.prev': 'Sebelumnya',
      'lb.next': 'Berikutnya',
      'lb.of': 'dari'
    },

    en: {
      'meta.tagline': 'General Contractor',
      'nav.home': 'Home',
      'nav.about': 'About & Legality',
      'nav.services': 'Services',
      'nav.plan': 'Floor Plan',
      'nav.library': 'Process Library',
      'nav.portfolio': 'Portfolio',
      'nav.contact': 'Contact',
      'nav.menu': 'Menu',
      'nav.close': 'Close menu',
      'nav.open': 'Open menu',
      'nav.skip': 'Skip to main content',
      'lang.label': 'Choose language',

      'cta.order': 'Request this service',
      'cta.orderLike': 'Discuss a similar project',
      'cta.quick': 'Quick Order',
      'hero.cue': 'Scroll',
      'quick.eyebrow': 'Quick Order',
      'quick.title': 'One click and your message is already written',
      'quick.lead': 'Pick whichever need is closest. WhatsApp opens with a tidy message — just fill in the bracketed parts and send.',
      'porto.all': 'All Projects',
      'porto.photos': 'photos',
      'porto.open': 'View gallery',
      'plan.pause': 'Pause',
      'plan.play': 'Play',
      'plan.sheetOf': 'Sheet',
      'plan.3dStepHint': 'Pick a stage to see which part of the structure is being built. The drawing above follows along.',
      'plan.3dLoading': 'Loading model',
      'plan.legendFoot': 'Foundation & tie beams',
      'plan.legendCol': 'Columns',
      'plan.legendBeam': 'Beams & roof',
      'lib.videoNav': 'Video navigation',
      'cta.wa': 'Consult via WhatsApp',
      'cta.waShort': 'WhatsApp',
      'cta.services': 'View Services',
      'cta.email': 'Send Email',
      'cta.contact': 'Contact Us',
      'cta.detail': 'Learn more',
      'cta.allProjects': 'View All Projects',
      'cta.library': 'Open Process Library',
      'cta.plan': 'View Floor Plans',

      'hero.eyebrow': 'PT RIV Group Indonesia',
      'hero.title': 'Building Trust, Realizing Quality',
      'hero.sub': 'A general contractor based in East Jakarta handling construction from planning to handover — with sound structures, open budgets, and schedules we keep.',
      'hero.m1k': 'Service Lines',
      'hero.m1v': '6 Services',
      'hero.m1s': 'Buildings, homes, interiors, civil works',
      'hero.m2k': 'Legality',
      'hero.m2v': 'Officially Registered',
      'hero.m2s': 'NIB · NPWP · SBU · SIUJK',
      'hero.m3k': 'Retention Warranty',
      'hero.m3v': '6–12 Months',
      'hero.m3s': 'After the formal handover document',

      'exec.eyebrow': 'Executive Summary',
      'exec.title': 'A contractor that works with numbers, not promises',
      'exec.p1': 'PT RIV Group Indonesia (RGI) is a general contractor working in construction planning and execution. We handle commercial buildings, private residences, interiors, renovations, and the civil works that support them.',
      'exec.p2': 'Three things we protect on every project: structural quality that follows technical standards, time efficiency through realistic scheduling, and budget transparency through cost estimates traceable down to the smallest line item.',
      'exec.p3': 'We believe trust is not requested but built — through work that can be inspected, reports that can be read, and results that hold up long after the project ends.',
      'exec.s1': 'Integrated construction services',
      'exec.s2': 'Standardised project SOP stages',
      'exec.s3': 'Months of retention warranty',

      'trust.title': 'Legality & Administration',
      'trust.nib': 'Active business identification number',
      'trust.npwp': 'Registered corporate tax ID',
      'trust.sbu': 'Building & civil works classification',
      'trust.siujk': 'Construction services licence',
      'trust.more': 'See legality details',

      'vm.eyebrow': 'Vision & Mission',
      'vm.title': 'The direction we hold to',
      'vm.visionLabel': 'Vision',
      'vm.vision': 'To be a trusted construction partner known for quality of work, punctuality, and openness — at every scale of project we take on.',
      'vm.missionLabel': 'Mission',
      'vm.m1t': 'Put structural quality first',
      'vm.m1d': 'Carry out work to the applicable technical standards, with quality materials and inspection at every critical stage.',
      'vm.m2t': 'Keep to the schedule',
      'vm.m2d': 'Set a realistic schedule from the outset and hold to it through disciplined site coordination.',
      'vm.m3t': 'Uphold budget transparency',
      'vm.m3d': 'Present itemised cost estimates so every rupiah the owner spends can be traced.',
      'vm.m4t': 'Prioritise workplace safety',
      'vm.m4d': 'Apply health and safety procedures across the whole site, with a zero-accident target.',
      'vm.m5t': 'Build long-term relationships',
      'vm.m5d': 'Stay with the owner through the retention period, rather than stopping at the final payment.',

      'svc.eyebrow': 'Services',
      'svc.title': 'Six lines of work, one quality standard',
      'svc.lead': 'Every service runs through the same procedure: survey, calculation, supervised execution, and documented handover.',
      'svc.detailTitle': 'Scope of work',

      'why.eyebrow': 'Why Choose RGI',
      'why.title': 'The difference lies in what you cannot see',
      'why.lead': 'Most bids look alike on paper. The difference shows once the project is running — and once it is finished.',
      'why.colAspect': 'Aspect',
      'why.colThem': 'Typical Contractor',
      'why.colUs': 'RGI',

      'k3.eyebrow': 'HSE Commitment',
      'k3.title': 'A safe project is a project that finishes',
      'k3.lead': 'Workplace safety is not an administrative formality. It decides whether work runs smoothly or stops halfway.',

      'sop.eyebrow': 'Standard Operating Procedure',
      'sop.title': 'Five stages from survey to handover',
      'sop.lead': 'The same workflow applies to every project, so the owner knows exactly what is happening now and what comes next.',

      'porto.eyebrow': 'Portfolio',
      'porto.title': 'Works and design concepts',
      'porto.lead': 'The range of styles we handle, from European classical to modern tropical.',
      'porto.note': 'Concept Illustration',
      'porto.noteFull': 'Images marked “Concept Illustration” are design renders, not photographs of completed projects. On-site photo documentation is available on the Process Library page.',
      'porto.gallery': 'Project gallery',
      'porto.pageLead': 'A collection of designs and works that shows the range of styles and the level of detail we deliver.',

      'lib.eyebrow': 'Process Library',
      'lib.title': 'Construction Process Library',
      'lib.lead': 'Stage-by-stage documentation from the field — from bare land to standing structure. We show it as it is, so the process can be judged, not just the finished result.',
      'lib.filterLabel': 'Filter by stage',
      'lib.all': 'All Stages',
      'lib.photos': 'Photo Documentation',
      'lib.videos': 'Video Documentation',
      'lib.videosLead': 'Short recordings from the project site. Tap to play.',
      'lib.project': 'Project',
      'lib.empty': 'No documentation for this stage yet.',
      'lib.count': 'items',

      'plan.eyebrow': 'Working Drawings',
      'plan.title': 'Floor Plan',
      'plan.lead': 'The working drawings that accompany actual construction progress on site. Each sheet is the direct reference for the work documented on the Process Library page.',
      'plan.sheetLabel': 'Drawing sheet',
      'plan.scale': 'Scale',
      'plan.zoomHint': 'Tap the drawing to enlarge',
      'plan.consultant': 'Design consultant: Dani Architecture Design',
      'plan.placeholderTitle': 'Additional sketch will appear here',
      'plan.placeholderDesc': 'This slot is reserved for an additional floor plan sketch. Place the image file in assets/img/teknis and register it in data.js.',
      'plan.3dEyebrow': 'Structural Model',
      'plan.3dTitle': 'The structure, stage by stage',
      'plan.3dLead': 'Scroll to follow the structural sequence — from foundation to roof — matching the drawing sheets above.',
      'plan.3dHint': 'Drag to rotate',
      'plan.3dFallback': '3D view is unavailable on this device. Please use the drawing sheets above.',
      'plan.videoEyebrow': 'Live Site Video',
      'plan.videoTitle': 'Recorded live from site',
      'plan.videoLead': 'Clips of the related construction process, recorded on site with minimal editing.',
      'plan.videoMore': 'More recordings',

      'about.eyebrow': 'About Us',
      'about.title': 'About & Legality',
      'about.lead': 'Company profile, working principles, and the legal basis behind every contract we sign.',
      'about.legalEyebrow': 'Legality & Administration',
      'about.legalTitle': 'A legal basis you can verify',
      'about.legalLead': 'These are the legal documents we hold. Full registration numbers and document copies can be sent directly to prospective clients at the proposal stage.',
      'about.legalStatus': 'Registered',
      'about.legalOnRequest': 'Registration number available on request',
      'about.legalNumber': 'Number',
      'about.legalNote': 'Legality details are shown as trust information. We do not publish scans of original documents on a public site, in order to protect the personal data of company officers.',

      'contact.eyebrow': 'Contact',
      'contact.title': 'It starts with a conversation',
      'contact.lead': 'Tell us about your project plan. We will review the requirements and schedule a site survey where needed.',
      'contact.office': 'Office',
      'contact.email': 'Email',
      'contact.wa': 'WhatsApp',
      'contact.waSub': 'Tap to start the conversation directly',
      'contact.hours': 'Operating Hours',
      'contact.formTitle': 'Consultation Form',
      'contact.formLead': 'Fill in a summary of your needs. The send button opens WhatsApp with your message already composed.',
      'contact.fName': 'Full name',
      'contact.fNamePh': 'Your name',
      'contact.fContact': 'WhatsApp number or email',
      'contact.fContactPh': 'So we can reply to you',
      'contact.fType': 'Type of work',
      'contact.fTypePh': 'Select the type of work',
      'contact.fLoc': 'Project location',
      'contact.fLocPh': 'City or district',
      'contact.fMsg': 'Project requirements',
      'contact.fMsgPh': 'Briefly: floor area, number of storeys, target timeline, or any questions.',
      'contact.submit': 'Send via WhatsApp',
      'contact.required': 'required',
      'contact.errName': 'Please enter your name.',
      'contact.errContact': 'Please enter a WhatsApp number or email we can reach you on.',
      'contact.errMsg': 'Please describe your project requirements briefly.',
      'contact.ok': 'WhatsApp is opening with your message. If it does not open automatically, use the WhatsApp button in the corner of the screen.',
      'contact.formNote': 'This form stores no data on any server. Your entries are only composed into a WhatsApp message that you send yourself.',
      'contact.mapTitle': 'Office location map',
      'contact.openMaps': 'Open in Google Maps',

      'quote.text': 'Your trust is the primary foundation of everything we build.',
      'quote.cite': 'PT RIV Group Indonesia',

      'ctaband.title': 'Have a construction plan?',
      'ctaband.lead': 'Send us an outline of your project. We will review the requirements and prepare an initial estimate at no cost.',

      'footer.about': 'A general contractor handling building construction, residences, interiors, renovations, and civil works across Greater Jakarta and beyond.',
      'footer.nav': 'Navigation',
      'footer.services': 'Services',
      'footer.contact': 'Contact',
      'footer.rights': 'All rights reserved.',
      'footer.built': 'Building Trust, Realizing Quality.',

      'lb.close': 'Close',
      'lb.prev': 'Previous',
      'lb.next': 'Next',
      'lb.of': 'of'
    }
  };

  return {
    company: company, legal: legal, services: services, sop: sop, compare: compare,
    quick: quick, bpStages: bpStages,
    safety: safety, projects: projects, library: library, stages: stages,
    projectRef: projectRef, videos: videos, sheets: sheets, sheetGroups: sheetGroups, t: t
  };
})();
