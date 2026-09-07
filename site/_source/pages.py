# -*- coding: utf-8 -*-
"""
Isi tiap halaman RGI. Jalankan dari folder `site/`:
    python _source/pages.py
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build import (shell, write, page_hero, svg, CTA_BAND, QUOTE, VM, WHY, K3, SOP)

ARROW = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" '
         'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
         '<path d="M4 12h15"/><path d="m13 6 6 6-6 6"/></svg>')
CHEV_L = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" '
          'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
          '<path d="m14.5 5-7 7 7 7"/></svg>')
CHEV_R = ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" '
          'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
          '<path d="m9.5 5 7 7-7 7"/></svg>')


def carousel(render, delay, title_key, lead_key=None, dark=False):
    lead = f'<p class="lead" data-i18n="{lead_key}"></p>' if lead_key else ''
    return f'''<div class="carousel" data-carousel="{delay}">
      <div class="head-row">
        <div class="section-head" style="margin-bottom:0" data-reveal>
          <h3 class="h2" data-i18n="{title_key}"></h3>{lead}
        </div>
        <div class="carousel__ctrl" data-reveal>
          <div class="carousel__dots" data-car-dots role="tablist"
               data-i18n-attr="aria-label:lib.videoNav"></div>
          <button class="carousel__btn" type="button" data-car-prev
                  data-i18n-attr="aria-label:lb.prev">{CHEV_L}</button>
          <button class="carousel__btn" type="button" data-car-next
                  data-i18n-attr="aria-label:lb.next">{CHEV_R}</button>
        </div>
      </div>
      <div class="carousel__rail" data-render="{render}"></div>
    </div>'''


FEATURE = '''<section class="section section--defer" id="foto-utama">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow" data-i18n="photo.eyebrow"></p>
      <h2 class="h2" data-i18n="photo.title"></h2>
      <p class="lead" data-i18n="photo.lead"></p>
    </div>
    <figure class="feature-photo" data-reveal>
      <img src="assets/img/portfolio/klasik-fasad-depan.webp" width="1600" height="999"
           loading="lazy" decoding="async"
           alt="Fasad depan hunian dua lantai bergaya klasik pada waktu senja">
      <figcaption class="feature-photo__cap">
        <p data-i18n="photo.caption"></p>
        <span class="tag" data-i18n="porto.note"></span>
      </figcaption>
    </figure>
  </div>
</section>'''

TEAM = '''<section class="section section--alt section--defer" id="tim">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow" data-i18n="team.eyebrow"></p>
      <h2 class="h2" data-i18n="team.title"></h2>
      <p class="lead" data-i18n="team.lead"></p>
    </div>

    <div class="owner" data-render="owner" data-reveal></div>

    <div class="carousel carousel--team" data-carousel="6000"
         style="margin-top:clamp(2.5rem,5vw,3.75rem)">
      <div class="head-row">
        <div class="section-head" style="margin-bottom:0" data-reveal>
          <h3 class="h3" data-i18n="team.expertLabel"></h3>
        </div>
        <div class="carousel__ctrl" data-reveal>
          <div class="carousel__dots" data-car-dots
               data-i18n-attr="aria-label:team.nav"></div>
          <button class="carousel__btn" type="button" data-car-prev
                  data-i18n-attr="aria-label:lb.prev">''' + CHEV_L + '''</button>
          <button class="carousel__btn" type="button" data-car-next
                  data-i18n-attr="aria-label:lb.next">''' + CHEV_R + '''</button>
        </div>
      </div>
      <div class="carousel__rail" data-render="team"></div>
    </div>
  </div>
</section>'''

PREVIEW3D = '''<section class="section section--dark section--defer bp-section" id="model-struktur">
  <div class="container">
    <div class="bp-preview">
      <div data-reveal>
        <p class="eyebrow" data-i18n="plan.3dEyebrow"></p>
        <h2 class="h2" data-i18n="plan.3dTitle"></h2>
        <p class="lead" data-i18n="plan.previewLead"></p>
        <div class="bp-legend">
          <span><i style="background:#93a072"></i><span data-i18n="plan.legendFoot"></span></span>
          <span><i style="background:#c0824e"></i><span data-i18n="plan.legendCol"></span></span>
          <span><i style="background:#d0a75a"></i><span data-i18n="plan.legendBeam"></span></span>
        </div>
        <div class="btn-row" style="margin-top:1.75rem">
          <a class="btn btn--light" href="denah.html" data-i18n="plan.previewCta"></a>
          <a class="btn btn--outline-light" href="library.html" data-i18n="cta.library"></a>
        </div>
      </div>
      <div class="blueprint blueprint--preview" data-blueprint data-reveal>
        <div class="bp-progress" aria-hidden="true"><i data-bp-bar></i></div>
        <p class="blueprint__hint" data-i18n="plan.3dHint"></p>
        <div class="blueprint__hud">
          <p class="blueprint__stage" data-blueprint-stage></p>
          <p class="blueprint__label" data-blueprint-label></p>
        </div>
        <p class="blueprint__loading" data-blueprint-loading data-i18n="plan.3dLoading"></p>
        <p class="blueprint__fallback" data-blueprint-fallback hidden
           data-i18n="plan.3dFallback"></p>
      </div>
    </div>
  </div>
</section>'''

QUICK = '''<section class="section section--alt section--defer" id="pesan-cepat">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <p class="eyebrow" data-i18n="quick.eyebrow"></p>
      <h2 class="h2" data-i18n="quick.title"></h2>
      <p class="lead" data-i18n="quick.lead"></p>
    </div>
    <div class="quick" data-render="quick"></div>
  </div>
</section>'''


# --------------------------------------------------------------------------
# 1. BERANDA
# --------------------------------------------------------------------------
HOME = '''<section class="hero hero--scroll" data-hero>
  <div class="hero__sticky">
    <div class="hero__media">
      <video muted playsinline preload="none" aria-hidden="true" tabindex="-1"
             poster="assets/img/hero/hero-lahan.webp"
             data-poster-mobile="assets/img/hero/hero-lahan-mobile.webp"
             data-src="assets/video/hero-scrub.mp4"
             data-src-mobile="assets/video/hero-scrub-mobile.mp4"></video>
    </div>
    <div class="hero__scrim" aria-hidden="true"></div>
    <div class="container hero__inner">
      <div class="hero__content">
        <p class="eyebrow" data-i18n="hero.eyebrow"></p>
        <h1 class="h-display" data-i18n="hero.title"></h1>
        <p class="hero__sub" data-i18n="hero.sub"></p>
        <div class="btn-row hero__cta">
          <a class="btn btn--wa" href="#" data-wa-link target="_blank" rel="noopener">
            ''' + svg("wa") + '''<span data-i18n="cta.wa"></span></a>
          <a class="btn btn--outline-light" href="layanan.html" data-i18n="cta.services"></a>
        </div>
      </div>
      <dl class="hero__meta">
        <div><dt data-i18n="hero.m1k"></dt><dd data-i18n="hero.m1v"></dd>
          <dd><small data-i18n="hero.m1s"></small></dd></div>
        <div><dt data-i18n="hero.m2k"></dt><dd data-i18n="hero.m2v"></dd>
          <dd><small data-i18n="hero.m2s"></small></dd></div>
        <div><dt data-i18n="hero.m3k"></dt><dd data-i18n="hero.m3v"></dd>
          <dd><small data-i18n="hero.m3s"></small></dd></div>
      </dl>
    </div>
    <p class="hero__cue" aria-hidden="true"><em data-i18n="hero.cue"></em><span></span></p>
    <div class="hero__bar" aria-hidden="true"><i data-hero-bar></i></div>
  </div>
</section>

<section class="section" id="tentang">
  <div class="container">
    <div class="two-col">
      <div class="sticky-col" data-reveal>
        <p class="eyebrow" data-i18n="exec.eyebrow"></p>
        <h2 class="h2" data-i18n="exec.title"></h2>
        <div class="stat-row">
          <div class="stat"><span class="stat__n" data-count="6">6</span>
            <span class="stat__l" data-i18n="exec.s1"></span></div>
          <div class="stat"><span class="stat__n" data-count="5">5</span>
            <span class="stat__l" data-i18n="exec.s2"></span></div>
          <div class="stat"><span class="stat__n" data-count="5">5</span>
            <span class="stat__l" data-i18n="exec.s3"></span></div>
        </div>
      </div>
      <div class="prose">
        <p class="lead" data-reveal data-i18n="exec.p1"></p>
        <p data-reveal data-i18n="exec.p2" style="margin-top:1.5rem"></p>
        <p data-reveal data-i18n="exec.p3" style="margin-top:1.5rem"></p>
        <div class="btn-row" style="margin-top:2rem" data-reveal>
          <a class="btn btn--ghost btn--sm" href="tentang.html" data-i18n="trust.more"></a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="trust">
  <div class="container">
    <div class="trust__grid">
      <div class="trust__item" data-reveal>
        <span class="trust__ic" data-icon="badge"></span>
        <span><span class="trust__k">NIB</span>
          <span class="trust__v" data-i18n="trust.nib"></span></span></div>
      <div class="trust__item" data-reveal>
        <span class="trust__ic" data-icon="file"></span>
        <span><span class="trust__k">NPWP</span>
          <span class="trust__v" data-i18n="trust.npwp"></span></span></div>
      <div class="trust__item" data-reveal>
        <span class="trust__ic" data-icon="scale"></span>
        <span><span class="trust__k">SBU</span>
          <span class="trust__v" data-i18n="trust.sbu"></span></span></div>
      <div class="trust__item" data-reveal>
        <span class="trust__ic" data-icon="shield"></span>
        <span><span class="trust__k">SIUJK</span>
          <span class="trust__v" data-i18n="trust.siujk"></span></span></div>
    </div>
  </div>
</section>

''' + FEATURE + '''

''' + VM + '''

''' + QUICK + '''

<section class="section section--defer" id="layanan">
  <div class="container">
    <div class="head-row">
      <div class="section-head" data-reveal>
        <p class="eyebrow" data-i18n="svc.eyebrow"></p>
        <h2 class="h2" data-i18n="svc.title"></h2>
        <p class="lead" data-i18n="svc.lead"></p>
      </div>
      <a class="link-arrow" href="layanan.html" data-reveal>
        <span data-i18n="cta.services"></span>''' + ARROW + '''</a>
    </div>
    <div class="grid grid-3" data-render="services"></div>
  </div>
</section>

''' + QUOTE + '''

''' + WHY + '''

<section class="section section--defer" id="portofolio">
  <div class="container">
    <div class="head-row">
      <div class="section-head" data-reveal>
        <p class="eyebrow" data-i18n="porto.eyebrow"></p>
        <h2 class="h2" data-i18n="porto.title"></h2>
        <p class="lead" data-i18n="porto.lead"></p>
      </div>
      <a class="link-arrow" href="portofolio.html" data-reveal>
        <span data-i18n="cta.allProjects"></span>''' + ARROW + '''</a>
    </div>
    <div class="pgrid" data-render="projects"></div>
    <p class="imgnote" data-i18n="porto.noteFull"></p>
  </div>
</section>

<section class="section section--alt section--defer">
  <div class="container">
    <div class="grid grid-2">
      <a class="mcard" href="denah.html" data-reveal>
        <div class="mcard__media" style="aspect-ratio:16/10;background:#FCFAF6">
          <img src="assets/img/teknis/denah-lt1.webp" loading="lazy" decoding="async"
               style="object-fit:contain;padding:1rem" alt="">
        </div>
        <div class="mcard__body">
          <span class="mcard__cat" data-i18n="plan.eyebrow"></span>
          <h3 class="h3" data-i18n="plan.title"></h3>
          <p class="card__body" data-i18n="plan.lead"></p>
          <span class="link-arrow" style="margin-top:.5rem">
            <span data-i18n="cta.plan"></span>''' + ARROW + '''</span>
        </div>
      </a>
      <a class="mcard" href="library.html" data-reveal>
        <div class="mcard__media" style="aspect-ratio:16/10">
          <img src="assets/img/library/site-01.webp" loading="lazy" decoding="async" alt="">
        </div>
        <div class="mcard__body">
          <span class="mcard__cat" data-i18n="lib.eyebrow"></span>
          <h3 class="h3" data-i18n="lib.title"></h3>
          <p class="card__body" data-i18n="lib.lead"></p>
          <span class="link-arrow" style="margin-top:.5rem">
            <span data-i18n="cta.library"></span>''' + ARROW + '''</span>
        </div>
      </a>
    </div>
  </div>
</section>

''' + PREVIEW3D + '''

''' + K3 + '''

''' + CTA_BAND


# --------------------------------------------------------------------------
# 2. TENTANG & LEGALITAS
# --------------------------------------------------------------------------
ABOUT = page_hero("about.eyebrow", "about.title", "about.lead", "nav.about") + '''

<section class="section">
  <div class="container">
    <div class="two-col">
      <div class="sticky-col" data-reveal>
        <p class="eyebrow" data-i18n="exec.eyebrow"></p>
        <h2 class="h2" data-i18n="exec.title"></h2>
        <figure class="figure" style="margin-top:2rem">
          <img src="assets/img/library/site-01.webp" width="1100" height="1467" loading="lazy"
               decoding="async" alt="Pekerjaan kolom struktur di lokasi proyek RGI">
          <figcaption data-i18n="plan.consultant"></figcaption>
        </figure>
      </div>
      <div class="prose">
        <p class="lead" data-reveal data-i18n="exec.p1"></p>
        <p data-reveal data-i18n="exec.p2" style="margin-top:1.5rem"></p>
        <p data-reveal data-i18n="exec.p3" style="margin-top:1.5rem"></p>
        <div class="stat-row" data-reveal>
          <div class="stat"><span class="stat__n" data-count="6">6</span>
            <span class="stat__l" data-i18n="exec.s1"></span></div>
          <div class="stat"><span class="stat__n" data-count="5">5</span>
            <span class="stat__l" data-i18n="exec.s2"></span></div>
          <div class="stat"><span class="stat__n" data-count="5">5</span>
            <span class="stat__l" data-i18n="exec.s3"></span></div>
        </div>
      </div>
    </div>
  </div>
</section>

''' + VM + '''

''' + TEAM + '''

<section class="section section--defer" id="legalitas">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow" data-i18n="about.legalEyebrow"></p>
      <h2 class="h2" data-i18n="about.legalTitle"></h2>
      <p class="lead" data-i18n="about.legalLead"></p>
    </div>
    <div class="legal-grid" data-render="legal"></div>
    <div class="note" style="margin-top:2rem" data-reveal>
      <span data-icon="info"></span>
      <span data-i18n="about.legalNote"></span>
    </div>
  </div>
</section>

''' + K3 + '''

''' + QUOTE + '''

''' + CTA_BAND


# --------------------------------------------------------------------------
# 3. LAYANAN
# --------------------------------------------------------------------------
SERVICES_PAGE = page_hero("svc.eyebrow", "svc.title", "svc.lead", "nav.services") + '''

<section class="section">
  <div class="container">
    <div class="grid grid-3" data-render="services" data-full="true"></div>
  </div>
</section>

''' + QUICK + '''

<section class="section section--defer" id="sop">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow" data-i18n="sop.eyebrow"></p>
      <h2 class="h2" data-i18n="sop.title"></h2>
      <p class="lead" data-i18n="sop.lead"></p>
    </div>
    <div class="sop" data-render="sop"></div>
  </div>
</section>

''' + WHY.replace('section--alt', 'section--surface section--defer') + '''

''' + K3 + '''

''' + CTA_BAND


# --------------------------------------------------------------------------
# 4. DENAH
# --------------------------------------------------------------------------
PLAN = page_hero("plan.eyebrow", "plan.title", "plan.lead", "nav.plan") + '''

<section class="section">
  <div class="container">
    <div class="filters" data-render="sheet-groups" role="group"
         data-i18n-attr="aria-label:plan.sheetLabel"></div>
    <div class="slider" data-render="sheet-slider" data-reveal
         data-i18n-attr="aria-label:plan.sheetLabel"></div>
    <div class="note" style="margin-top:1.75rem" data-reveal>
      <span data-icon="info"></span>
      <span><span data-i18n="plan.consultant"></span> &middot;
        <span data-i18n="plan.placeholderDesc"></span></span>
    </div>
  </div>
</section>

<section class="section section--dark section--defer bp-section">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <p class="eyebrow" data-i18n="plan.3dEyebrow"></p>
      <h2 class="h2" data-i18n="plan.3dTitle"></h2>
      <p class="lead" data-i18n="plan.3dLead"></p>
    </div>
    <div class="bp-layout">
      <div class="blueprint" data-blueprint data-reveal>
        <div class="bp-progress" aria-hidden="true"><i data-bp-bar></i></div>
        <p class="blueprint__hint" data-i18n="plan.3dHint"></p>
        <p class="blueprint__loading" data-blueprint-loading data-i18n="plan.3dLoading"></p>
        <div class="blueprint__hud">
          <p class="blueprint__stage" data-blueprint-stage></p>
          <p class="blueprint__label" data-blueprint-label></p>
          <p class="blueprint__desc" data-blueprint-desc></p>
          <p class="blueprint__sheet" data-blueprint-sheet></p>
        </div>
        <p class="blueprint__fallback" data-blueprint-fallback hidden
           data-i18n="plan.3dFallback"></p>
      </div>
      <div data-reveal>
        <div class="bp-steps" data-render="bp-steps" role="group"
             data-i18n-attr="aria-label:plan.3dEyebrow"></div>
        <div class="bp-legend">
          <span><i style="background:#93a072"></i><span data-i18n="plan.legendFoot"></span></span>
          <span><i style="background:#c0824e"></i><span data-i18n="plan.legendCol"></span></span>
          <span><i style="background:#d0a75a"></i><span data-i18n="plan.legendBeam"></span></span>
        </div>
        <p class="tiny" style="color:#8D8073;margin-top:1.1rem" data-i18n="plan.3dStepHint"></p>
      </div>
    </div>
  </div>
</section>

<section class="section section--defer" id="video-live-site">
  <div class="container">
    <div class="section-head" data-reveal>
      <p class="eyebrow" data-i18n="plan.videoEyebrow"></p>
      <h2 class="h2" data-i18n="plan.videoTitle"></h2>
      <p class="lead" data-i18n="plan.videoLead"></p>
    </div>
    <div class="video-feature" style="margin-bottom:3.5rem">
      <div class="video-shell" data-reveal>
        <video controls preload="metadata" playsinline
               poster="assets/img/library/vid-1-poster.webp">
          <source src="assets/video/live-site-1.mp4" type="video/mp4">
        </video>
      </div>
      <div data-reveal>
        <h3 class="h3" style="margin-bottom:.75rem" data-i18n="lib.projectTitle"></h3>
        <p class="lead" data-i18n="lib.lead"></p>
        <div class="btn-row" style="margin-top:1.75rem">
          <a class="btn btn--primary" href="library.html" data-i18n="cta.library"></a>
          <a class="btn btn--ghost" href="#" data-wa-link target="_blank" rel="noopener"
             data-i18n="cta.wa"></a>
        </div>
      </div>
    </div>

    ''' + carousel("videos", 5200, "plan.videoMore") + '''
  </div>
</section>

''' + QUICK + '''

''' + CTA_BAND


# --------------------------------------------------------------------------
# 5. LIBRARY PROSES
# --------------------------------------------------------------------------
LIBRARY = page_hero("lib.eyebrow", "lib.title", "lib.lead", "nav.library") + '''

<section class="section">
  <div class="container">
    <div class="head-row">
      <div class="section-head" data-reveal style="margin-bottom:0">
        <p class="eyebrow" data-i18n="lib.photos"></p>
        <h2 class="h2" data-i18n="lib.projectTitle"></h2>
      </div>
      <a class="link-arrow" href="denah.html" data-reveal>
        <span data-i18n="cta.plan"></span>''' + ARROW + '''</a>
    </div>

    <div class="filters" data-render="library-filters" role="group"
         data-i18n-attr="aria-label:lib.filterLabel"></div>
    <div class="gal" data-render="library"></div>
    <p class="note" style="margin-top:1.5rem" data-library-empty hidden>
      <span data-icon="info"></span><span data-i18n="lib.empty"></span></p>
  </div>
</section>

<section class="section section--alt section--defer">
  <div class="container">
    ''' + carousel("videos", 4800, "lib.videos", "lib.videosLead") + '''
  </div>
</section>

''' + QUICK + '''

<section class="section section--defer">
  <div class="container">
    <div class="grid grid-2">
      <a class="mcard" href="denah.html" data-reveal>
        <div class="mcard__media" style="aspect-ratio:16/10;background:#FCFAF6">
          <img src="assets/img/teknis/rencana-pondasi.webp" loading="lazy" decoding="async"
               style="object-fit:contain;padding:1rem" alt="">
        </div>
        <div class="mcard__body">
          <span class="mcard__cat" data-i18n="plan.eyebrow"></span>
          <h3 class="h3" data-i18n="plan.title"></h3>
          <p class="card__body" data-i18n="plan.lead"></p>
        </div>
      </a>
      <a class="mcard" href="portofolio.html" data-reveal>
        <div class="mcard__media" style="aspect-ratio:16/10">
          <img src="assets/img/portfolio/klasik-fasad-depan.webp" loading="lazy" decoding="async" alt="">
        </div>
        <div class="mcard__body">
          <span class="mcard__cat" data-i18n="porto.eyebrow"></span>
          <h3 class="h3" data-i18n="porto.title"></h3>
          <p class="card__body" data-i18n="porto.pageLead"></p>
        </div>
      </a>
    </div>
  </div>
</section>

''' + CTA_BAND


# --------------------------------------------------------------------------
# 6. PORTOFOLIO
# --------------------------------------------------------------------------
PORTFOLIO = page_hero("porto.eyebrow", "porto.title", "porto.pageLead", "nav.portfolio") + '''

<section class="section">
  <div class="container">
    <div class="filters" data-render="porto-filters" role="group"
         data-i18n-attr="aria-label:porto.eyebrow"></div>
    <div class="pgrid" data-render="projects"></div>
  </div>
</section>

<div data-render="projects-full"></div>

''' + QUICK + '''

''' + QUOTE + '''

''' + CTA_BAND


# --------------------------------------------------------------------------
# 7. KONTAK
# --------------------------------------------------------------------------
CONTACT = page_hero("contact.eyebrow", "contact.title", "contact.lead", "nav.contact") + '''

''' + QUICK.replace('section--alt section--defer', '') + '''

<section class="section">
  <div class="container">
    <div class="contact-grid">
      <div class="cinfo">
        <a class="cinfo__item" data-reveal target="_blank" rel="noopener"
           href="https://www.google.com/maps/search/?api=1&amp;query=Jl.+Dukuh+VI+No.6+RT.7%2FRW.2+Dukuh+Kramat+Jati+Jakarta+Timur+13550">
          <span class="cinfo__ic" data-icon="mapPin"></span>
          <span><span class="cinfo__k" data-i18n="contact.office"></span>
            <span class="cinfo__v" data-company="address"></span></span></a>

        <a class="cinfo__item" data-reveal href="mailto:kreasikarya.estetika@gmail.com">
          <span class="cinfo__ic" data-icon="mail"></span>
          <span><span class="cinfo__k" data-i18n="contact.email"></span>
            <span class="cinfo__v">kreasikarya.estetika@gmail.com
              <small>rivkyofficial18@gmail.com</small></span></span></a>

        <a class="cinfo__item" data-reveal href="#" data-wa-link target="_blank" rel="noopener">
          <span class="cinfo__ic" data-icon="wa"></span>
          <span><span class="cinfo__k" data-i18n="contact.wa"></span>
            <span class="cinfo__v"><span data-company="wa"></span>
              <small data-i18n="contact.waSub"></small></span></span></a>

        <div class="cinfo__item" data-reveal>
          <span class="cinfo__ic" data-icon="clock"></span>
          <span><span class="cinfo__k" data-i18n="contact.hours"></span>
            <span class="cinfo__v" data-company="hours"></span></span></div>
      </div>

      <form class="form" data-form="consult" novalidate data-reveal>
        <h2 class="h3" style="margin-bottom:.5rem" data-i18n="contact.formTitle"></h2>
        <p class="small muted" style="margin-bottom:1.75rem" data-i18n="contact.formLead"></p>

        <p class="form__ok" data-form-ok>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
               stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>
          <span data-i18n="contact.ok"></span></p>

        <div class="field">
          <label for="f-name"><span data-i18n="contact.fName"></span> <i>*</i></label>
          <input id="f-name" name="name" type="text" autocomplete="name" required
                 data-i18n-attr="placeholder:contact.fNamePh">
          <span class="field__err">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                 stroke-linecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9"/><path d="M12 8v4.5M12 16h.01"/></svg>
            <span data-i18n="contact.errName"></span></span>
        </div>

        <div class="field">
          <label for="f-contact"><span data-i18n="contact.fContact"></span> <i>*</i></label>
          <input id="f-contact" name="contact" type="text" autocomplete="tel" required
                 data-i18n-attr="placeholder:contact.fContactPh">
          <span class="field__err">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                 stroke-linecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9"/><path d="M12 8v4.5M12 16h.01"/></svg>
            <span data-i18n="contact.errContact"></span></span>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="f-type" data-i18n="contact.fType"></label>
            <select id="f-type" name="type"></select>
          </div>
          <div class="field">
            <label for="f-loc" data-i18n="contact.fLoc"></label>
            <input id="f-loc" name="location" type="text"
                   data-i18n-attr="placeholder:contact.fLocPh">
          </div>
        </div>

        <div class="field">
          <label for="f-msg"><span data-i18n="contact.fMsg"></span> <i>*</i></label>
          <textarea id="f-msg" name="message" required
                    data-i18n-attr="placeholder:contact.fMsgPh"></textarea>
          <span class="field__err">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"
                 stroke-linecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9"/><path d="M12 8v4.5M12 16h.01"/></svg>
            <span data-i18n="contact.errMsg"></span></span>
        </div>

        <button class="btn btn--wa" type="submit" style="width:100%">
          ''' + svg("wa") + '''<span data-i18n="contact.submit"></span></button>
        <p class="form__note" data-i18n="contact.formNote"></p>
      </form>
    </div>
  </div>
</section>

<section class="section section--alt section--defer">
  <div class="container">
    <div class="head-row">
      <h2 class="h2" data-reveal data-i18n="contact.mapTitle"></h2>
      <a class="link-arrow" data-reveal target="_blank" rel="noopener"
         href="https://www.google.com/maps/search/?api=1&amp;query=Jl.+Dukuh+VI+No.6+RT.7%2FRW.2+Dukuh+Kramat+Jati+Jakarta+Timur+13550">
        <span data-i18n="contact.openMaps"></span>''' + ARROW + '''</a>
    </div>
    <div class="map-shell" data-reveal>
      <iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade"
              title="Peta lokasi kantor PT RIV Group Indonesia"
              src="https://www.google.com/maps?q=Jl.+Dukuh+VI+No.6+RT.7%2FRW.2+Dukuh+Kramat+Jati+Jakarta+Timur+13550&amp;output=embed"></iframe>
    </div>
  </div>
</section>'''


# --------------------------------------------------------------------------
THREE_JS = '''<script type="importmap">
{"imports":{
  "three":"https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
  "three/addons/":"https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
}}
</script>
<script type="module" src="assets/js/blueprint.js"></script>
'''

PRELOAD_HERO = ('<link rel="preload" as="image" href="assets/img/hero/hero-lahan.webp" '
                'fetchpriority="high">\n')

D_HOME = ("PT RIV Group Indonesia (RGI) — kontraktor umum di Jakarta Timur. Konstruksi gedung, "
          "hunian mewah, interior, renovasi, infrastruktur, dan design &amp; build.")

TITLES = {
    "index.html":      "PT RIV Group Indonesia (RGI) — General Contractor Jakarta Timur",
    "tentang.html":    "Tentang &amp; Legalitas — PT RIV Group Indonesia (RGI)",
    "layanan.html":    "Layanan &amp; SOP Proyek — PT RIV Group Indonesia (RGI)",
    "denah.html":      "Denah Bangunan &amp; Video Live Site — PT RIV Group Indonesia (RGI)",
    "library.html":    "Library Proses Pengerjaan — PT RIV Group Indonesia (RGI)",
    "portofolio.html": "Portofolio Proyek — PT RIV Group Indonesia (RGI)",
    "kontak.html":     "Kontak &amp; Konsultasi — PT RIV Group Indonesia (RGI)",
}

PAGES = [
    ("index.html",      "nav.home",      HOME,          D_HOME, THREE_JS, PRELOAD_HERO),
    ("tentang.html",    "nav.about",     ABOUT,
     "Profil, visi &amp; misi, serta legalitas PT RIV Group Indonesia: NIB, NPWP, SBU, SIUJK, dan SKA/SKT.", "", ""),
    ("layanan.html",    "nav.services",  SERVICES_PAGE,
     "Enam layanan RGI dan Standar Operasional Prosedur proyek dari survei hingga serah terima.", "", ""),
    ("denah.html",      "nav.plan",      PLAN,
     "Denah bangunan, gambar kerja struktur, model 3D, dan video live site proyek RGI.", THREE_JS, ""),
    ("library.html",    "nav.library",   LIBRARY,
     "Dokumentasi tahap demi tahap pengerjaan proyek RGI: persiapan lahan, pondasi, struktur, finishing.", "", ""),
    ("portofolio.html", "nav.portfolio", PORTFOLIO,
     "Portofolio RGI: Villa Klasik Eropa, Hunian Modern Minimalis, dan Tropical Resort Living.", "", ""),
    ("kontak.html",     "nav.contact",   CONTACT,
     "Hubungi PT RIV Group Indonesia di Kramat Jati, Jakarta Timur. WhatsApp, email, dan formulir konsultasi.", "", ""),
]

if __name__ == "__main__":
    print("Building RGI site...")
    for name, key, body, desc, extra, head in PAGES:
        write(name, shell(name, key, body, desc, extra_head=head, extra_js=extra,
                          title=TITLES[name]))
    print("Done.")
