# -*- coding: utf-8 -*-
"""
Generator halaman statis RGI.
Jalankan dari folder `site/`:   python _source/build.py
Semua header, footer, dan <head> berasal dari file ini agar 7 halaman konsisten.
"""
import os, io, sys

OUT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

NAV = [
    ("index.html",      "nav.home",      "01"),
    ("tentang.html",    "nav.about",     "02"),
    ("layanan.html",    "nav.services",  "03"),
    ("denah.html",      "nav.plan",      "04"),
    ("library.html",    "nav.library",   "05"),
    ("portofolio.html", "nav.portfolio", "06"),
    ("kontak.html",     "nav.contact",   "07"),
]

# Instance statis (tanpa sumbu variabel) dan hanya berat yang benar-benar
# dipakai — memangkas unduhan font dari ~267 KB menjadi ~120 KB.
FONTS = ("https://fonts.googleapis.com/css2?"
         "family=Source+Serif+4:ital,wght@0,400;0,600;1,400"
         "&family=Work+Sans:wght@400;500;600"
         "&family=JetBrains+Mono:wght@400;500&display=swap")


def nav_links(active, mobile=False):
    out = []
    for href, key, num in NAV:
        cur = ' aria-current="page"' if href == active else ""
        if mobile:
            out.append(f'<a class="mobile-nav__link" href="{href}"{cur}>'
                       f'<span data-i18n="{key}"></span><em>{num}</em></a>')
        else:
            out.append(f'<a class="nav__link" href="{href}"{cur} data-i18n="{key}"></a>')
    return "\n        ".join(out)


def footer_nav():
    return "\n            ".join(
        f'<li><a href="{h}" data-i18n="{k}"></a></li>' for h, k, _ in NAV[1:])


SERVICES = [
    ("gedung-komersial", "Gedung &amp; Komersial"),
    ("residensial",      "Hunian &amp; Residensial"),
    ("interior",         "Interior Fit-Out"),
    ("renovasi",         "Renovasi &amp; Restrukturisasi"),
    ("infrastruktur",    "Infrastruktur &amp; Sipil"),
    ("design-build",     "Design &amp; Build"),
]


def footer_services():
    return "\n            ".join(
        f'<li><a href="layanan.html#{s}">{n}</a></li>' for s, n in SERVICES)


ICON_SVG = {
 "mapPin": '<path d="M20 10.5c0 5.3-8 12-8 12s-8-6.7-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10.5" r="2.8"/>',
 "mail": '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
 "wa": '<path d="M3.5 20.5 5 16.2A8.4 8.4 0 1 1 8.2 19.3l-4.7 1.2Z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-.2-1-1.7-.6-.9 1a5.6 5.6 0 0 1-2.1-2.1l1-.9-.6-1.7-1-.2c-.5 0-1 .4-1 1Z"/>',
 "clock": '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>',
}


def svg(name, cls=""):
    c = f' class="{cls}"' if cls else ""
    return (f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" '
            f'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"{c}>{ICON_SVG[name]}</svg>')


def shell(page, title_key, body, desc_id, extra_head="", extra_js="", title=""):
    active = page
    depth_home = "index.html"
    three_block = ""
    if extra_js:
        three_block = extra_js
    return f'''<!doctype html>
<html lang="id" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
<meta name="description" content="{desc_id}">
<meta name="theme-color" content="#F5F1EA">
<meta name="author" content="PT RIV Group Indonesia">
<meta property="og:type" content="website">
<meta property="og:title" content="PT RIV Group Indonesia (RGI) — General Contractor">
<meta property="og:description" content="{desc_id}">
<meta property="og:image" content="assets/img/hero/hero-poster.webp">
<meta property="og:locale" content="id_ID">
<meta property="og:locale:alternate" content="en_US">
<link rel="icon" type="image/png" href="assets/img/brand/favicon.png">
<link rel="apple-touch-icon" href="assets/img/brand/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
<link rel="stylesheet" href="assets/css/style.css">
{extra_head}</head>
<body data-title-key="{title_key}" data-page="{page}">
<a class="skip-link" href="#main" data-i18n="nav.skip"></a>

<header class="header">
  <div class="container header__inner">
    <a class="brand" href="index.html" aria-label="PT RIV Group Indonesia">
      <img class="brand__mark" src="assets/img/brand/rgi-logo.png" width="512" height="364" alt="Logo RGI">
      <span class="brand__text">
        <span class="brand__name">RGI</span>
        <span class="brand__tag" data-i18n="meta.tagline"></span>
      </span>
    </a>
    <nav class="nav" aria-label="Utama">
        {nav_links(active)}
    </nav>
    <div class="header__actions">
      <div class="lang" role="group" data-i18n-attr="aria-label:lang.label">
        <button class="lang__btn" type="button" data-lang="id" aria-pressed="true">ID</button>
        <button class="lang__btn" type="button" data-lang="en" aria-pressed="false">EN</button>
      </div>
      <a class="btn btn--primary btn--sm header__cta" href="kontak.html" data-i18n="cta.contact"></a>
      <button class="burger" type="button" aria-expanded="false" aria-controls="mobile-nav"
              data-i18n-attr="aria-label:nav.open">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile">
  {nav_links(active, mobile=True)}
  <div class="mobile-nav__foot">
    <a class="btn btn--wa" href="#" data-wa-link target="_blank" rel="noopener">
      {svg("wa")}<span data-i18n="cta.wa"></span></a>
    <a class="btn btn--ghost" href="kontak.html" data-i18n="cta.contact"></a>
  </div>
</nav>

<main id="main">
{body}
</main>

<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <div class="footer__brand">
          <img src="assets/img/brand/rgi-logo.png" width="512" height="364" alt="">
          <span class="brand__text">
            <span class="brand__name">RGI</span>
            <span class="brand__tag" data-i18n="meta.tagline"></span>
          </span>
        </div>
        <p class="footer__about" data-i18n="footer.about"></p>
      </div>
      <div>
        <h3 data-i18n="footer.nav"></h3>
        <ul>
            {footer_nav()}
        </ul>
      </div>
      <div>
        <h3 data-i18n="footer.services"></h3>
        <ul>
            {footer_services()}
        </ul>
      </div>
      <div>
        <h3 data-i18n="footer.contact"></h3>
        <ul class="footer__contact">
          <li>{svg("mapPin")}<span data-company="address"></span></li>
          <li>{svg("mail")}<a href="mailto:kreasikarya.estetika@gmail.com">kreasikarya.estetika@gmail.com</a></li>
          <li>{svg("wa")}<a href="#" data-wa-link target="_blank" rel="noopener"><span data-company="wa"></span></a></li>
          <li>{svg("clock")}<span data-company="hours"></span></li>
        </ul>
      </div>
    </div>
    <div class="footer__bar">
      <p>&copy; <span data-company="year"></span> PT RIV Group Indonesia. <span data-i18n="footer.rights"></span></p>
      <p data-i18n="footer.built"></p>
    </div>
  </div>
</footer>

<a class="wa-fab" href="#" data-wa-link target="_blank" rel="noopener" data-i18n-attr="aria-label:cta.wa">
  {svg("wa")}<em data-i18n="cta.waShort"></em>
</a>

<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" defer
        integrity="sha384-HOvlOYPIs/zjoIkWUGXkVmXsjr8GuZLV+Q+rcPwmJOVZVpvTSXQChiN4t9Euv9Vc"
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js" defer
        integrity="sha384-P8VzCVnT9NBUkMrpcIZrJbA7EBjJvh/fJS6PmP+4nLIM284DtsImIv8D0fFjIkeh"
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="assets/js/data.js" defer></script>
<script src="assets/js/app.js" defer></script>
<script src="assets/js/motion.js" defer></script>
{three_block}</body>
</html>
'''


def write(name, html):
    with io.open(os.path.join(OUT, name), "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print("  wrote", name, len(html) // 1024, "KB")


# ---------------------------------------------------------------- shared blocks
def page_hero(eyebrow_key, title_key, lead_key, crumb_key):
    return f'''<section class="page-hero">
  <div class="page-hero__grid" aria-hidden="true"></div>
  <div class="container page-hero__inner">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="index.html" data-i18n="nav.home"></a><i>/</i><span data-i18n="{crumb_key}"></span>
    </nav>
    <p class="eyebrow" data-i18n="{eyebrow_key}"></p>
    <h1 class="h1" data-i18n="{title_key}"></h1>
    <p class="lead" style="margin-top:1.25rem" data-i18n="{lead_key}"></p>
  </div>
</section>'''


CTA_BAND = '''<section class="section">
  <div class="container">
    <div class="cta-band" data-reveal>
      <h2 class="h2" data-i18n="ctaband.title"></h2>
      <p data-i18n="ctaband.lead"></p>
      <div class="btn-row">
        <a class="btn btn--light" href="#" data-wa-link target="_blank" rel="noopener"
           data-i18n="cta.wa"></a>
        <a class="btn btn--outline-light" href="kontak.html" data-i18n="cta.contact"></a>
      </div>
    </div>
  </div>
</section>'''

QUOTE = '''<section class="section section--tight section--alt">
  <div class="container">
    <blockquote class="quote-band" data-reveal>
      <svg class="quote-band__mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.5 5C6.5 6.5 5 9.5 5 13v6h6v-6H8c0-2.5.8-4.2 2.5-5.2L9.5 5ZM19 5c-3 1.5-4.5 4.5-4.5 8v6h6v-6h-3c0-2.5.8-4.2 2.5-5.2L19 5Z"/>
      </svg>
      <p class="serif-quote" data-i18n="quote.text"></p>
      <cite data-i18n="quote.cite"></cite>
    </blockquote>
  </div>
</section>'''

VM = '''<section class="section" id="visi-misi">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow" data-i18n="vm.eyebrow"></p>
      <h2 class="h2" data-i18n="vm.title"></h2>
    </div>
    <div class="vm">
      <div class="vm__vision" data-reveal>
        <p class="eyebrow" data-i18n="vm.visionLabel"></p>
        <p class="serif-quote" data-i18n="vm.vision"></p>
      </div>
      <div>
        <p class="eyebrow" data-reveal data-i18n="vm.missionLabel"></p>
        <ul class="mission-list">
          <li data-reveal><div><strong data-i18n="vm.m1t"></strong><p data-i18n="vm.m1d"></p></div></li>
          <li data-reveal><div><strong data-i18n="vm.m2t"></strong><p data-i18n="vm.m2d"></p></div></li>
          <li data-reveal><div><strong data-i18n="vm.m3t"></strong><p data-i18n="vm.m3d"></p></div></li>
          <li data-reveal><div><strong data-i18n="vm.m4t"></strong><p data-i18n="vm.m4d"></p></div></li>
          <li data-reveal><div><strong data-i18n="vm.m5t"></strong><p data-i18n="vm.m5d"></p></div></li>
        </ul>
      </div>
    </div>
  </div>
</section>'''

WHY = '''<section class="section section--alt" id="mengapa-rgi">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow" data-i18n="why.eyebrow"></p>
      <h2 class="h2" data-i18n="why.title"></h2>
      <p class="lead" data-i18n="why.lead"></p>
    </div>
    <div class="compare" data-render="compare"></div>
  </div>
</section>'''

K3 = '''<section class="section section--dark" id="k3">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow" data-i18n="k3.eyebrow"></p>
      <h2 class="h2" data-i18n="k3.title"></h2>
      <p class="lead" data-i18n="k3.lead"></p>
    </div>
    <div class="safety" data-render="safety"></div>
  </div>
</section>'''

SOP = '''<section class="section" id="sop">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow" data-i18n="sop.eyebrow"></p>
      <h2 class="h2" data-i18n="sop.title"></h2>
      <p class="lead" data-i18n="sop.lead"></p>
    </div>
    <div class="sop" data-render="sop"></div>
  </div>
</section>'''
