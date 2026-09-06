/* ==========================================================================
   Like A Model — Landing Page JS
   ──────────────────────────────────────────────────────────────────────────
   ✏️  كل ما يحتاج تعديلًا موجود في الكتل المرقّمة أدناه فقط.

   MOTION LOCKS — do not retune selectors, observers, class names, or timings:
   • Support orbit: #support / .section-support, .support-orbit, .support-head,
     stage nodes, initSupportOrbit. CSS: .section-support through orbit PRM.
   • Stats: #stats / .stats-section, .stat-num[data-count], .stats-parallax-bg,
     heading/tile .reveal stagger — initCounters, initStatsParallax.
   • Contact: #contact-form / .section-contact, .contact-parallax-bg,
     .contact-unified-card.reveal (including leave-on-exit) — initContactParallax.
   • Tokens in :root: --t-fast 180ms, --t-med 320ms, --t-slow 600ms, --t-btn 220ms,
     --ease, --ease-out. Do not restyle global .btn/.input in a way that hits contact.

   Header / nav / scroll-spy live in Header.jsx — do not revive initHeader,
   initNav, or initScrollSpy here.

   Hash / section scroll lives in src/lib/navScroll.js. Route restore: App.jsx.
   Click-to-section: Header.jsx (and Hero). Do not reintroduce initHashLanding.
   ========================================================================== */

import {
  createContactRequest,
  createEvaluationBooking,
  getEvaluationSlots,
  normalizeIsoDate,
  PublicApiError,
} from '../lib/publicApi.js';

/* ✏️ ①  بيانات التواصل */
export const CONTACT = {
  whatsapp    : '966542555516',              // رقم واتساب بصيغة دولية بدون + أو مسافات
  whatsappText: '0542555516',                // الرقم كما يُعرض للزائرة
  phoneTel    : '+966920031018',             // ما يُتصل به فعليًا عند الضغط
  phoneText   : '920031018',                 // الرقم الموحّد كما يُعرض
  email       : 'info@likeamodel.com.sa',
  address     : 'الرياض – المملكة العربية السعودية',

  /* ✏️ روابط الحسابات — ضعي رابط الحساب الكامل لكل منصّة.
     اتركي القيمة فارغة '' لإخفاء أيقونة المنصّة من الموقع بالكامل. */
  social: {
    tiktok   : 'https://www.tiktok.com/',
    youtube  : 'https://www.youtube.com/',
    instagram: 'https://www.instagram.com/',
    facebook : 'https://www.facebook.com/',
    x        : 'https://x.com/',
    linkedin : 'https://www.linkedin.com/'
  }
};

/* ✏️ ③  فيديو الهيرو — خلفية سينمائية (أول ٣ ثوانٍ حلقيًا). */
export const VIDEO = {
  url   : 'https://www.youtube.com/watch?v=nuvMkMLdQqc',
  poster: 'https://i.ytimg.com/vi/nuvMkMLdQqc/maxresdefault.jpg',
  start : 0,
  end   : 3
};

/* ✏️ ④  خريطة موقع الشركة — غيّري الرابطين معًا عند اعتماد الموقع النهائي */
export const MAP = {
  embed: 'https://www.google.com/maps?q=حي%20الورود%2C%20الرياض%2C%20المملكة%20العربية%20السعودية&output=embed',
  open:  'https://www.google.com/maps?q=حي%20الورود%2C%20الرياض%2C%20المملكة%20العربية%20السعودية'
};

/* ✏️ ⑤  وجهة نموذج «تواصل معنا»
   endpoint فارغ  → يُرسَل الطلب عبر واتساب برسالة جاهزة (لا يحتاج خادمًا).
   endpoint مضبوط → يُرسَل الطلب بصيغة JSON عبر POST (Formspree / Google Apps Script / API خاص). */
export const FORM = {
  endpoint: ''
};

/* ✏️ ⑥  النسخة الإنجليزية — ضعي رابط الصفحة الإنجليزية لتفعيل زر EN */
export const LANG = {
  enUrl: ''                                  // مثال: 'en/index.html'
};

/* ✏️ ⑦  شكل أرقام «نجاحنا بالأرقام»: false = ٣٥+ عربية · true = 35+ لاتينية */
export const STATS_LATIN = false;

/* ✏️ ⑧  أسئلة وإجابات الشات بوت — src/data/chatFaq.js */

/* ────────────────────────────────────────────────────────────────────────── */

export function bootPageEffects() {

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fx = (window.__lamFx ||= { aborts: {} });
  function takeSignal(key) {
    fx.aborts[key]?.abort();
    fx.aborts[key] = new AbortController();
    return fx.aborts[key].signal;
  }
  function trackIo(io) {
    (fx.observers ||= []).push(io);
    return io;
  }
  function trackTimeout(id) {
    (fx.timeouts ||= []).push(id);
    return id;
  }
  function resetHomeFx() {
    (fx.observers || []).forEach((io) => {
      try { io.disconnect(); } catch (err) { /* ignore */ }
    });
    fx.observers = [];
    (fx.timeouts || []).forEach((tid) => clearTimeout(tid));
    fx.timeouts = [];
  }
  let homeSignal = null;

  /* أرقام هندية (٠١٢…) للعرض بالعربية */
  const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  const toAr = (n) => String(n).replace(/\d/g, (d) => AR_DIGITS[+d]);

  const WA = 'https://wa.me/' + CONTACT.whatsapp;
  const waWith = (msg) => WA + '?text=' + encodeURIComponent(msg);


  /* ══════════ 1. بيانات التواصل ══════════ */
  function applyContact() {
    // روابط واتساب المباشرة
    ['#waLink', '#fabWhatsapp', '#cWaLink', '#headerWhatsapp'].forEach((sel) => {
      const el = $(sel); if (el) { el.href = WA; el.rel = 'noopener noreferrer'; }
    });
    const headerWa = $('#headerWhatsapp');
    if (headerWa) headerWa.target = '_blank';

    // روابط الهاتف والبريد
    const tel = 'tel:' + CONTACT.phoneTel.replace(/[^\d+]/g, '');
    ['#phoneLink', '#cPhoneLink'].forEach((sel) => {
      const el = $(sel); if (el) el.href = tel;
    });
    ['#emailLink', '#cMailLink'].forEach((sel) => {
      const el = $(sel); if (el) el.href = 'mailto:' + CONTACT.email;
    });

    // النصوص المعروضة
    const setText = (sel, txt) => {
      const el = $(sel);
      if (!el) return;
      const slot = el.querySelector('[data-contact-text]');
      (slot || el).textContent = txt;
    };
    setText('#phoneLink',    CONTACT.phoneText);
    setText('#cPhoneLink',   CONTACT.phoneText);
    setText('#waLink',       CONTACT.whatsappText);
    setText('#cWaLink',      CONTACT.whatsappText);
    setText('#emailLink',    CONTACT.email);
    setText('#cMailLink',    CONTACT.email);
    setText('#addrText',     CONTACT.address);
    setText('#cAddrText',    CONTACT.address);

    // حسابات التواصل — يُخفى العنصر إن لم يوجد رابط
    $$('[data-social]').forEach((a) => {
      const url = (CONTACT.social[a.dataset.social] || '').trim();
      const host = a.closest('li') || a;
      if (url) { a.href = url; a.rel = 'noopener'; a.target = '_blank'; host.hidden = false; }
      else { host.hidden = true; }
    });

    // ✏️ روابط CTA التي تفتح واتساب برسالة جاهزة — أضيفي 'معرّف#': 'الرسالة'
    // (فرغت بعد حذف قسم شركاء النجاح؛ الآلية باقية لأي زرّ جديد)
    const presets = {};
    Object.entries(presets).forEach(([sel, msg]) => {
      const el = $(sel);
      if (el) { el.href = waWith(msg); el.rel = 'noopener'; }
    });

    const year = $('#year');
    if (year) year.textContent = toAr(new Date().getFullYear());
  }


  /* ══════════ 2. زر تبديل اللغة ══════════ */
  function initLang() {
    const btn = $('#langSwitch');
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    const url = (LANG.enUrl || '').trim();

    if (url) { btn.href = url; return; }

    // لا توجد نسخة إنجليزية بعد — يبقى الزر ظاهرًا لكن غير فعّال
    btn.setAttribute('aria-disabled', 'true');
    btn.title = 'النسخة الإنجليزية قريبًا';
    btn.addEventListener('click', (e) => e.preventDefault());
  }


  /* ══════════ 3. فيديو الهيرو (خلفية غير تفاعلية) ══════════ */
  function initHeroVideo() {
    const media = $('#heroMedia');
    if (!media || media.querySelector('iframe')) return;

    const url = (VIDEO.url || '').trim();
    const poster = (VIDEO.poster || '').trim();
    if (poster) {
      media.style.backgroundImage = 'url("' + poster.replace(/"/g, '%22') + '")';
    }

    if (reduceMotion || !url) return;

    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/);
    if (!yt) return;

    const id = yt[1];
    const start = Number.isFinite(VIDEO.start) ? VIDEO.start : 0;
    const end = Number.isFinite(VIDEO.end) ? VIDEO.end : 3;
    const src = 'https://www.youtube-nocookie.com/embed/' + id +
      '?autoplay=1&mute=1&loop=1&playlist=' + encodeURIComponent(id) +
      '&start=' + start + '&end=' + end +
      '&controls=0&playsinline=1&rel=0&modestbranding=1';

    const f = iframeEl(src);
    f.title = '';
    f.tabIndex = -1;
    f.setAttribute('aria-hidden', 'true');
    f.allow = 'autoplay; encrypted-media';
    f.allowFullscreen = false;
    f.removeAttribute('loading');
    f.style.pointerEvents = 'none';
    media.appendChild(f);
  }

  function iframeEl(src) {
    const f = document.createElement('iframe');
    f.src = src;
    f.title = 'فيديو تسويقي لخدمات Like A Model';
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    f.loading = 'lazy';
    return f;
  }


  /* ══════════ 4. خريطة موقع الشركة ══════════ */
  function initMap() {
    const frame = $('#mapFrame');
    const open = $('#mapOpen');
    const src = (MAP.embed || '').trim();
    const href = (MAP.open || src.replace(/&output=embed$/, '')).trim();

    if (open && href) open.href = href;
    const addr = $('#addrText');
    if (addr && href && addr.tagName === 'A') {
      addr.href = href;
      addr.target = '_blank';
      addr.rel = 'noopener noreferrer';
    }
    if (!frame || !src) return;
    if (frame.querySelector('iframe')) return;

    const f = document.createElement('iframe');
    f.src = src;
    f.title = 'موقع شركة Like A Model — حي الورود، الرياض';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.setAttribute('scrolling', 'no');
    f.allowFullscreen = true;
    f.style.width = '100%';
    f.style.height = '100%';
    f.style.border = '0';
    frame.replaceChildren(f);
  }


  /* ══════════ 5. عدّاد «نجاحنا بالأرقام» ══════════ */
  /* MOTION LOCK — Stats counters. Do not change thresholds, durations, or targets. */
  function initCounters() {
    const nums = $$('.stat-num[data-count]');
    if (!nums.length) return;

    const fmt = (n) => (STATS_LATIN ? String(n) : toAr(n)) + '+';

    if (reduceMotion || !('IntersectionObserver' in window)) {
      nums.forEach((el) => { el.textContent = fmt(+el.dataset.count || 0); });
      return;
    }

    nums.forEach((el) => { el.textContent = fmt(0); });

    const run = (el) => {
      if (el.dataset.done) return;
      el.dataset.done = '1';
      const target = +el.dataset.count || 0;
      const start = performance.now();
      const DUR = 1200;

      const tick = (now) => {
        const p = Math.min(1, (now - start) / DUR);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const io = trackIo(new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        run(entry.target);
      });
    }, { threshold: 0.4 }));

    nums.forEach((el) => io.observe(el));

    // شبكة أمان: لا يجوز أن يبقى رقم على صفر إذا تعطّل المراقب
    trackTimeout(setTimeout(() => {
      nums.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) run(el);
      });
    }, 1500));
  }


  /* ══════════ 5b. Parallax خلفية «نجاحنا بالأرقام» ══════════ */
  /* MOTION LOCK — Stats parallax. Do not change scroll factor or targets. */
  function initStatsParallax() {
    const statsSection = document.querySelector('.stats-section');
    const statsBg = document.querySelector('.stats-section .stats-parallax-bg');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!statsSection || !statsBg) return;

    let statsParallaxFrame = null;

    const updateStatsParallax = () => {
      statsParallaxFrame = null;

      if (reduceMotion.matches || window.innerWidth < 768) {
        statsBg.style.setProperty('--stats-parallax-y', '0px');
        return;
      }

      const rect = statsSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // يبدأ قبل دخول القسم وينتهي بعد خروجه
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      // حركة أوضح بمقدار 640px من أعلى إلى أسفل أثناء مرور القسم
      const offsetY = -320 + (clamped * 640);

      statsBg.style.setProperty('--stats-parallax-y', `${offsetY.toFixed(1)}px`);
    };

    const requestStatsParallax = () => {
      if (!statsParallaxFrame) {
        statsParallaxFrame = requestAnimationFrame(updateStatsParallax);
      }
    };

    window.addEventListener('scroll', requestStatsParallax, { passive: true, signal: homeSignal });
    window.addEventListener('resize', requestStatsParallax, { signal: homeSignal });
    if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', requestStatsParallax, { signal: homeSignal });
    requestStatsParallax();
  }


  /* ══════════ 5c. Parallax شريط صورة التواصل العلوي ══════════ */
  /* MOTION LOCK — Contact parallax. Do not change scroll factor or targets. */
  function initContactParallax() {
    const banner = document.querySelector('.section-contact .contact-banner');
    const contactBg = document.querySelector('.section-contact .contact-parallax-bg');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!banner || !contactBg) return;

    let contactParallaxFrame = null;

    const updateContactParallax = () => {
      contactParallaxFrame = null;

      if (reduceMotion.matches) {
        contactBg.style.setProperty('--contact-parallax-y', '0px');
        return;
      }

      // تقدّم مرور الشريط داخل نافذة العرض: 0 عند الدخول → 1 عند الخروج
      const rect = banner.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));

      // مدى أوضح ±220px أثناء مرور الشريط
      const offsetY = -220 + (clamped * 440);

      contactBg.style.setProperty('--contact-parallax-y', `${offsetY.toFixed(1)}px`);
    };

    const requestContactParallax = () => {
      if (!contactParallaxFrame) {
        contactParallaxFrame = requestAnimationFrame(updateContactParallax);
      }
    };

    window.addEventListener('scroll', requestContactParallax, { passive: true, signal: homeSignal });
    window.addEventListener('resize', requestContactParallax, { signal: homeSignal });
    if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', requestContactParallax, { signal: homeSignal });
    requestContactParallax();
  }


  /* ══════════ 8. ظهور العناصر عند التمرير ══════════ */
  function initReveal() {
    clearTimeout(window.__lamReveal);
    const items = $$('.reveal').filter((el) => el.closest(
      '#stats, .stats-section, #contact, #contact-form, .section-contact, .contact-unified-card'
    ));
    if (!items.length) return;

    /* Stats enter-once. Contact keeps leave. */
    const skipExit = (el) => !el.closest(
      '#contact, #contact-form, .section-contact, .contact-unified-card'
    );
    const onceItems = items.filter(skipExit);
    const exitItems = items.filter((el) => !skipExit(el));

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach((el) => {
        el.classList.add('is-in');
        el.classList.remove('is-leaving-up', 'is-leaving-down');
      });
      return;
    }

    const markIn = (el) => {
      el.classList.add('is-in');
      el.classList.remove('is-leaving-up', 'is-leaving-down');
    };

    const markOut = (el, entry) => {
      if (!el.classList.contains('is-in') &&
          !el.classList.contains('is-leaving-up') &&
          !el.classList.contains('is-leaving-down')) {
        return;
      }
      const rect = entry.boundingClientRect;
      const vh = (entry.rootBounds && entry.rootBounds.height) || window.innerHeight;
      el.classList.remove('is-in');
      if (rect.bottom < vh * 0.45) {
        el.classList.add('is-leaving-up');
        el.classList.remove('is-leaving-down');
      } else {
        el.classList.add('is-leaving-down');
        el.classList.remove('is-leaving-up');
      }
    };

    if (onceItems.length) {
      const onceIo = trackIo(new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          markIn(entry.target);
          onceIo.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }));
      onceItems.forEach((el) => onceIo.observe(el));

      trackTimeout(setTimeout(() => {
        onceItems.forEach((el) => {
          if (el.classList.contains('is-in')) return;
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            markIn(el);
            onceIo.unobserve(el);
          }
        });
      }, 1200));
    }

    if (exitItems.length) {
      const exitIo = trackIo(new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) markIn(entry.target);
          else markOut(entry.target, entry);
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }));
      exitItems.forEach((el) => exitIo.observe(el));

      trackTimeout(setTimeout(() => {
        exitItems.forEach((el) => {
          if (el.classList.contains('is-in')) return;
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) markIn(el);
        });
      }, 1200));
    }
  }


  /* ══════════ 8.5 مسار ندعمكِ الدائري مع التمرير ══════════ */
  /* MOTION LOCK — Support orbit path, stage nodes, copy accordion.
     Desktop pin: intro 0–12%, exit 12–20%, circle timeline 20–100%. */
  function initSupportOrbit() {
    const section = $('#support');
    if (!section) return;

    const progressEl = $('.support-arc-progress', section);
    const arrow = $('.support-arc-arrow', section);
    const center = $('.support-orbit__center', section);
    const steps = [1, 2, 3, 4].map((n) => section.querySelector('[data-support-step="' + n + '"]'));
    const desktopMq = window.matchMedia('(min-width: 960px)');

    const THRESH = { 1: 0.04, 2: 0.28, 3: 0.52, 4: 0.76 };
    const CX = 200, CY = 200, RADIUS = 168;
    const track = $('.support-track', section);
    const orbit = $('.support-orbit', section);

    const placeArrow = (p) => {
      if (!arrow) return;
      if (p < 0.012) {
        arrow.setAttribute('opacity', '0');
        return;
      }
      const a = -Math.PI / 4 + p * Math.PI * 2;
      const x = CX + RADIUS * Math.cos(a);
      const y = CY + RADIUS * Math.sin(a);
      const deg = Math.atan2(Math.cos(a), -Math.sin(a)) * (180 / Math.PI);
      arrow.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ') rotate(' + deg.toFixed(2) + ')');
      arrow.setAttribute('opacity', '1');
    };

    const setStages = (intro, introY) => {
      section.style.setProperty('--support-intro', intro.toFixed(4));
      section.style.setProperty('--support-intro-y', introY.toFixed(2));
      section.style.setProperty('--support-orbit', '1');
      section.classList.toggle('is-orbit-stage', intro < 0.55);
      if (orbit) orbit.removeAttribute('aria-hidden');
    };

    const apply = (p) => {
      const drawn = Math.min(1, Math.max(0, p));
      if (progressEl) {
        progressEl.style.strokeDasharray = '1';
        progressEl.style.strokeDashoffset = String(1 - drawn);
      }
      placeArrow(drawn);

      let highest = 0;
      steps.forEach((el, i) => {
        if (!el) return;
        const on = drawn >= THRESH[i + 1];
        el.classList.toggle('is-on', on);
        if (on) {
          highest = i + 1;
          el.removeAttribute('aria-hidden');
        } else {
          el.setAttribute('aria-hidden', 'true');
        }
      });
      steps.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle('is-current', highest > 0 && (i + 1) === highest);
      });
    };

    const toStatic = () => {
      section.classList.add('is-static');
      section.classList.remove('is-orbit-stage', 'is-head-leaving-up', 'is-head-leaving-down');
      center?.classList.add('is-in');
      revealHead();
      apply(1);
      setStages(1, 0);
    };

    const measurePin = () => {
      if (!track) return;
      const vh = window.innerHeight;
      const box = track.getBoundingClientRect();
      const range = Math.max(1, box.height - vh);
      const p = Math.min(1, Math.max(0, -box.top / range));

      let intro = 1;
      let introY = 0;
      let drawn = 0;

      if (p <= 0.12) {
        intro = 1;
        introY = 0;
        drawn = 0;
      } else if (p < 0.20) {
        const t = (p - 0.12) / 0.08;
        intro = 1 - t;
        introY = -28 * t;
        drawn = t * 0.05;
      } else {
        intro = 0;
        introY = -28;
        drawn = 0.05 + ((p - 0.20) / 0.80) * 0.95;
      }

      center?.classList.add('is-in');
      setStages(intro, introY);
      apply(drawn);
    };

    const revealHead = () => {
      section.classList.add('is-headed');
      section.classList.remove('is-head-leaving-up', 'is-head-leaving-down');
    };

    if (reduceMotion || !desktopMq.matches) {
      toStatic();
      desktopMq.addEventListener?.('change', () => {
        if (reduceMotion || !desktopMq.matches) toStatic();
        else {
          section.classList.remove('is-static');
          measurePin();
        }
      }, { signal: homeSignal });
      return;
    }

    section.classList.remove('is-static');
    revealHead();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!desktopMq.matches) {
          toStatic();
          return;
        }
        section.classList.remove('is-static');
        measurePin();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true, signal: homeSignal });
    window.addEventListener('resize', onScroll, { signal: homeSignal });
    desktopMq.addEventListener?.('change', onScroll, { signal: homeSignal });
    measurePin();
  }


  /* ══════════ 10. نموذج «تواصل معنا» ══════════ */
  function initContactForm() {
    const form = $('#contactForm');
    if (!form || form.dataset.bound === '1') return;
    form.dataset.bound = '1';

    const status  = $('#formStatus');
    const submit  = $('#contactSubmit');
    const otherIn = $('#cSourceOther');
    const otherFd = $('#sourceOtherField');
    const sourceEl = $('#cSource', form);
    const timeEl = $('#cTime', form);
    const consentEl = $('#cConsent', form);
    let submitting = false;

    const isOther = () => val('#cSource') === 'أخرى';

    const syncOther = () => {
      const on = isOther();
      if (otherFd) otherFd.hidden = !on;
      if (otherIn) {
        otherIn.disabled = !on;
        otherIn.required = on;
        if (!on) {
          otherIn.value = '';
          otherIn.removeAttribute('aria-invalid');
          setErr('cSourceOther', '');
        }
        syncFilled(otherIn);
      }
    };

    const setErr = (key, msg) => {
      const box = form.querySelector('[data-err-for="' + key + '"]');
      if (box) box.textContent = msg || '';
    };
    const mark = (el, bad) => {
      if (!el) return;
      if (bad) el.setAttribute('aria-invalid', 'true');
      else el.removeAttribute('aria-invalid');
    };
    const say = (msg, kind) => {
      if (!status) return;
      status.textContent = msg;
      status.classList.toggle('is-err', kind === 'err');
      status.classList.toggle('is-ok',  kind === 'ok');
    };

    const val = (sel) => ($(sel, form)?.value || '').trim();

    function isFilledControl(el) {
      if (!el || el.type === 'checkbox' || el.type === 'radio') return false;
      if (!el.classList.contains('input')) return false;
      if (el.tagName === 'SELECT') return Boolean((el.value || '').trim());
      return String(el.value || '').trim() !== '';
    }

    function syncFilled(el) {
      if (!el || !el.classList || el.type === 'checkbox' || el.type === 'radio') return;
      if (!el.classList.contains('input')) return;
      const on = isFilledControl(el);
      el.classList.toggle('is-filled', on);
      const wrap = el.closest('.field-wrap');
      if (wrap) wrap.classList.toggle('is-filled', on);
    }

    function syncFilledAll() {
      form.querySelectorAll('.input').forEach(syncFilled);
    }

    const phoneOk = (raw) => {
      const digits = String(raw || '').replace(/\D/g, '');
      return digits.length >= 9 && digits.length <= 15;
    };
    const numIn = (raw, min, max) => {
      if (raw === '') return false;
      const n = Number(raw);
      return Number.isFinite(n) && n >= min && n <= max;
    };

    function inspect() {
      const nameEl = $('#cName', form);
      const phoneEl = $('#cPhone', form);
      const weightEl = $('#cWeight', form);
      const heightEl = $('#cHeight', form);
      const goalEl = $('#cGoal', form);
      const issues = [];

      if (val('#cName').length < 2) {
        issues.push({ el: nameEl, key: 'cName', msg: 'الرجاء كتابة الاسم الكامل.' });
      }
      if (!phoneOk(val('#cPhone'))) {
        issues.push({ el: phoneEl, key: 'cPhone', msg: 'الرجاء كتابة رقم جوال صحيح.' });
      }
      if (!numIn(val('#cWeight'), 30, 250)) {
        issues.push({ el: weightEl, key: 'cWeight', msg: 'الرجاء إدخال الوزن بالكيلوجرام.' });
      }
      if (!numIn(val('#cHeight'), 100, 220)) {
        issues.push({ el: heightEl, key: 'cHeight', msg: 'الرجاء إدخال الطول بالسنتيمتر.' });
      }
      if (!val('#cGoal')) {
        issues.push({ el: goalEl, key: 'goal', msg: 'الرجاء اختيار هدف الرحلة.' });
      }
      if (!val('#cSource')) {
        issues.push({ el: sourceEl, key: 'source', msg: 'الرجاء اختيار كيف تعرّفتِ علينا.' });
      }
      if (isOther() && val('#cSourceOther').length < 2) {
        issues.push({ el: otherIn, key: 'cSourceOther', msg: 'الرجاء توضيح كيف تعرّفتِ علينا.' });
      }
      if (!val('#cTime')) {
        issues.push({ el: timeEl, key: 'time', msg: 'الرجاء اختيار الوقت المناسب للتواصل.' });
      }
      if (!consentEl?.checked) {
        issues.push({ el: consentEl, key: 'consent', msg: 'يلزم الموافقة على التواصل لإرسال الطلب.' });
      }
      return issues;
    }

    const ERR_KEYS = ['cName','cPhone','cWeight','cHeight','goal','source','cSourceOther','time','consent'];
    const FIELD_IDS = {
      cName: '#cName', cPhone: '#cPhone', cWeight: '#cWeight', cHeight: '#cHeight',
      goal: '#cGoal', source: '#cSource', cSourceOther: '#cSourceOther',
      time: '#cTime', consent: '#cConsent'
    };

    function paintErrors(issues) {
      const bad = new Map(issues.map((i) => [i.key, i]));
      ERR_KEYS.forEach((key) => {
        const hit = bad.get(key);
        setErr(key, hit ? hit.msg : '');
        mark($(FIELD_IDS[key], form), Boolean(hit));
      });
    }

    function validate() {
      const issues = inspect();
      paintErrors(issues);
      return issues[0]?.el || null;
    }

    function syncSubmit() {
      if (!submit) return;
      const ready = !submitting && inspect().length === 0;
      submit.disabled = !ready;
      submit.setAttribute('aria-disabled', ready ? 'false' : 'true');
    }

    function collect() {
      const src = val('#cSource');
      const other = val('#cSourceOther');
      return {
        name    : val('#cName'),
        phone   : val('#cPhone'),
        weight  : val('#cWeight'),
        height  : val('#cHeight'),
        goal    : val('#cGoal'),
        source  : src === 'أخرى' && other ? 'أخرى — ' + other : src,
        time    : val('#cTime'),
        message : val('#cMessage'),
        consent : consentEl?.checked === true
      };
    }

    function buildMessage(d) {
      const line = (k, v, suffix) => v ? '• ' + k + ': ' + v + (suffix || '') + '\n' : '';
      return 'مرحبًا Like A Model 👋\n' +
             'أرغب بالتواصل معكم عبر نموذج الموقع:\n\n' +
             line('الاسم', d.name) +
             line('رقم الجوال', d.phone) +
             line('الوزن', d.weight, ' كجم') +
             line('الطول', d.height, ' سم') +
             line('الهدف', d.goal) +
             line('كيف تعرّفتُ عليكم', d.source) +
             line('وقت التواصل المناسب', d.time) +
             (d.message ? '\n' + d.message + '\n' : '') +
             '\nأتطلع لردّكم.';
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (submitting) return;
      syncOther();

      const bad = validate();
      if (bad) {
        say('الرجاء إكمال جميع الحقول المطلوبة قبل الإرسال.', 'err');
        bad.focus({ preventScroll: false });
        syncSubmit();
        return;
      }
      if (!consentEl?.checked) {
        say('يلزم الموافقة على التواصل لإرسال الطلب.', 'err');
        syncSubmit();
        return;
      }

      const data = collect();
      submitting = true;
      submit.disabled = true;
      submit.setAttribute('aria-disabled', 'true');
      say('جارٍ الإرسال…');
      try {
        const payload = {
          full_name: data.name,
          phone: data.phone,
          weight: String(data.weight),
          height: String(data.height),
          goal: data.goal,
          knowledge_source: data.source,
          preferred_contact_time: data.time,
          consent: true,
        };
        if (data.message) payload.message = data.message;

        const res = await createContactRequest(payload);
        form.reset();
        syncOther();
        syncFilledAll();
        paintErrors([]);
        const okMsg = (res && typeof res.message === 'string' && res.message.trim())
          ? res.message.trim()
          : 'تم استلام طلبِك ✓ سيتواصل معكِ الفريق قريبًا.';
        say(okMsg, 'ok');
      } catch (err) {
        if (err instanceof PublicApiError && err.status === 422) {
          say(err.message || 'تحقق من الحقول المطلوبة ثم أعيدي المحاولة.', 'err');
          if (err.errors && typeof err.errors === 'object') {
            const map = {
              full_name: 'cName',
              phone: 'cPhone',
              weight: 'cWeight',
              height: 'cHeight',
              goal: 'goal',
              knowledge_source: 'source',
              preferred_contact_time: 'time',
              consent: 'consent',
            };
            Object.entries(err.errors).forEach(([apiKey, msgs]) => {
              const key = map[apiKey];
              if (!key) return;
              const msg = Array.isArray(msgs) ? msgs[0] : msgs;
              if (!msg) return;
              setErr(key, String(msg));
              mark($(FIELD_IDS[key], form), true);
            });
          }
        } else {
          say(
            err instanceof PublicApiError
              ? err.message
              : 'تعذّر الإرسال. حاولِي مرة أخرى بعد قليل.',
            'err',
          );
        }
      } finally {
        submitting = false;
        syncSubmit();
      }
    });

    form.addEventListener('input', (e) => {
      const map = {
        cName: 'cName', cPhone: 'cPhone', cWeight: 'cWeight', cHeight: 'cHeight',
        cSourceOther: 'cSourceOther'
      };
      const key = e.target && map[e.target.id];
      if (key) { setErr(key, ''); mark(e.target, false); }
      if (e.target && e.target.matches('input.input, textarea.input')) syncFilled(e.target);
      syncOther();
      syncSubmit();
    });
    form.addEventListener('change', (e) => {
      syncOther();
      if (e.target && e.target.id) {
        const map = {
          cName: 'cName', cPhone: 'cPhone', cWeight: 'cWeight', cHeight: 'cHeight',
          cGoal: 'goal', cSource: 'source', cSourceOther: 'cSourceOther',
          cTime: 'time', cConsent: 'consent'
        };
        const key = map[e.target.id];
        if (key) { setErr(key, ''); mark(e.target, false); }
      }
      if (e.target && e.target.matches('select.input, input.input, textarea.input')) {
        syncFilled(e.target);
      }
      syncSubmit();
    });

    syncOther();
    syncFilledAll();
    syncSubmit();
  }


  /* ══════════ 10ب. نموذج «ابدئي رحلتكِ» ══════════ */
  function initStartJourney() {
    const form = $('#syjForm');
    const card = $('#syjCard');
    if (!form || !card) return;
    if (form.dataset.bound === '1') return;
    form.dataset.bound = '1';

    const KEY = 'lamStartJourney';
    const stepAr = (n) => toAr(n);
    const panels = $$('[data-syj-step]', form);
    const backBtn = $('#syjBack');
    const nextBtn = $('#syjNext');
    const sendBtn = $('#syjSend');
    const stepLbl = $('#syjStepLbl');
    const bar = $('#syjBarFill');
    const live = $('#syjLive');
    const countEl = $('#syjCount');
    let step = 1;
    let timer = 0;

    const isSaudiPhone = (raw) => {
      const d = String(raw || '').replace(/\D/g, '');
      return /^05\d{8}$/.test(d) || /^5\d{8}$/.test(d) || /^9665\d{8}$/.test(d);
    };

    const say = (msg) => { if (live) live.textContent = msg || ''; };

    const setErr = (key, msg) => {
      const box = form.querySelector('[data-err-for="' + key + '"]');
      if (box) box.textContent = msg || '';
    };

    const mark = (el, bad) => {
      if (!el) return;
      if (bad) el.setAttribute('aria-invalid', 'true');
      else el.removeAttribute('aria-invalid');
    };

    const read = () => ({
      name: ($('#syjName')?.value || '').trim(),
      phone: ($('#syjPhone')?.value || '').trim(),
      goal: (form.querySelector('input[name="goal"]:checked') || {}).value || '',
      support: (form.querySelector('input[name="support"]:checked') || {}).value || '',
      time: ($('#syjTime')?.value || '').trim(),
      source: ($('#syjSource')?.value || '').trim(),
      message: ($('#syjMessage')?.value || '').trim(),
      consent: $('#syjConsent')?.checked === true
    });

    const persist = () => {
      try { sessionStorage.setItem(KEY, JSON.stringify({ step, ...read() })); }
      catch (e) { /* تجاهل وضع التصفح الخاص */ }
    };

    const restore = () => {
      let saved = null;
      try { saved = JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch (e) { saved = null; }
      if (!saved) return;
      if (saved.name) $('#syjName').value = saved.name;
      if (saved.phone) $('#syjPhone').value = saved.phone;
      if (saved.goal) {
        const g = form.querySelector('input[name="goal"][value="' + saved.goal + '"]');
        if (g) g.checked = true;
      }
      if (saved.support) {
        const s = form.querySelector('input[name="support"][value="' + saved.support + '"]');
        if (s) s.checked = true;
      }
      if (saved.time) $('#syjTime').value = saved.time;
      if (saved.source) $('#syjSource').value = saved.source;
      if (saved.message) $('#syjMessage').value = saved.message;
      if (saved.consent) $('#syjConsent').checked = true;
      if (saved.step >= 1 && saved.step <= 4) step = saved.step;
    };

    const GOAL_SLUGS = {
      'fat-loss': 'رحلة خسارة الدهون',
      'body-sculpt': 'رحلة نحت وتنسيق القوام',
      'muscle-building': 'رحلة بناء العضلات والقوة',
      'bride': 'رحلة تألق العروس',
      'postpartum': 'رحلة ما بعد الولادة',
      'pregnancy': 'رحلة الحمل الصحي',
      'lifestyle': 'رحلة نمط الحياة الصحي',
      'bariatric': 'رحلة التحوّل بعد التكميم'
    };

    const applyGoalFromQuery = () => {
      const slug = new URLSearchParams(location.search).get('goal');
      if (!slug) return;
      const value = GOAL_SLUGS[slug];
      if (!value) return;
      const g = form.querySelector('input[name="goal"][value="' + value + '"]');
      if (g) g.checked = true;
    };

    const validate = (n) => {
      const d = read();
      let first = null;
      if (n === 1) {
        const nameEl = $('#syjName');
        const phoneEl = $('#syjPhone');
        if (d.name.length < 2) {
          setErr('name', 'الرجاء كتابة الاسم الكامل.'); mark(nameEl, true); first ||= nameEl;
        } else { setErr('name', ''); mark(nameEl, false); }
        if (!isSaudiPhone(d.phone)) {
          setErr('phone', 'الرجاء إدخال رقم جوال سعودي صحيح.'); mark(phoneEl, true); first ||= phoneEl;
        } else { setErr('phone', ''); mark(phoneEl, false); }
      }
      if (n === 2) {
        if (!d.goal) { setErr('goal', 'الرجاء اختيار هدف واحد.'); first ||= form.querySelector('input[name="goal"]'); }
        else setErr('goal', '');
      }
      if (n === 3) {
        if (!d.support) { setErr('support', 'الرجاء اختيار نوع الدعم.'); first ||= form.querySelector('input[name="support"]'); }
        else setErr('support', '');
        const timeEl = $('#syjTime');
        if (!d.time) { setErr('time', 'الرجاء اختيار وقت التواصل المفضّل.'); mark(timeEl, true); first ||= timeEl; }
        else { setErr('time', ''); mark(timeEl, false); }
      }
      if (n === 4) {
        const c = $('#syjConsent');
        if (!d.consent) { setErr('consent', 'يلزم الموافقة على التواصل للمتابعة.'); first ||= c; }
        else setErr('consent', '');
      }
      return first;
    };

    const show = () => {
      panels.forEach((p) => p.classList.toggle('is-on', +p.dataset.syjStep === step));
      if (stepLbl) stepLbl.textContent = stepAr(step) + ' من ٤';
      if (bar) bar.style.setProperty('--syj-p', String((step / 4) * 100));
      card.classList.toggle('is-final', step === 4);
      if (backBtn) backBtn.hidden = step === 1;
      if (nextBtn) nextBtn.hidden = step === 4;
      syncSend({ instant: true });
      const heading = form.querySelector('[data-syj-step="' + step + '"] h1');
      if (heading && !reduceMotion) heading.focus({ preventScroll: true });
      persist();
    };

    const hideSend = () => {
      if (!sendBtn) return;
      sendBtn.classList.remove('is-in');
      sendBtn.hidden = true;
      sendBtn.disabled = true;
      sendBtn.setAttribute('aria-hidden', 'true');
      sendBtn.setAttribute('aria-disabled', 'true');
    };

    const syncSend = (opts) => {
      if (!sendBtn) return;
      const instant = opts && opts.instant;
      const ok = step === 4 && $('#syjConsent')?.checked === true;
      if (!ok) {
        if (sendBtn.hidden || instant || reduceMotion) {
          hideSend();
          return;
        }
        sendBtn.classList.remove('is-in');
        sendBtn.disabled = true;
        sendBtn.setAttribute('aria-disabled', 'true');
        const finish = () => {
          if (step === 4 && $('#syjConsent')?.checked) return;
          hideSend();
        };
        sendBtn.addEventListener('transitionend', finish, { once: true });
        window.setTimeout(finish, 400);
        return;
      }
      sendBtn.disabled = false;
      sendBtn.removeAttribute('aria-hidden');
      sendBtn.setAttribute('aria-disabled', 'false');
      setErr('consent', '');
      if (!sendBtn.hidden && sendBtn.classList.contains('is-in')) return;
      sendBtn.hidden = false;
      if (instant || reduceMotion) {
        sendBtn.classList.add('is-in');
        return;
      }
      sendBtn.classList.remove('is-in');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => sendBtn.classList.add('is-in'));
      });
    };

    const buildMessage = (d) => {
      const line = (k, v) => v ? '• ' + k + ': ' + v + '\n' : '';
      return 'مرحبًا Like A Model\n' +
        'أرغب ببدء رحلتي عبر نموذج الموقع:\n\n' +
        line('الاسم', d.name) +
        line('رقم الجوال', d.phone) +
        line('الهدف', d.goal) +
        line('نوع الدعم', d.support) +
        line('وقت التواصل', d.time) +
        line('كيف تعرّفتُ عليكم', d.source) +
        (d.message ? '\n' + d.message + '\n' : '') +
        '\nأوافق على تواصل الفريق معي بشأن طلبي.';
    };

    restore();
    applyGoalFromQuery();
    show();

    form.addEventListener('input', persist);
    form.addEventListener('change', (e) => {
      persist();
      if (e.target.id === 'syjConsent') {
        syncSend();
        if (e.target.checked) say('');
      }
    });

    backBtn?.addEventListener('click', () => {
      say('');
      if (step > 1) { step -= 1; show(); }
    });

    nextBtn?.addEventListener('click', () => {
      const bad = validate(step);
      if (bad) {
        say('الرجاء إكمال هذه الخطوة قبل المتابعة.');
        bad.focus();
        return;
      }
      say('');
      if (step < 4) { step += 1; show(); }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const bad = validate(4);
      if (bad) {
        say('الرجاء الموافقة على التواصل لإرسال الطلب.');
        bad.focus();
        return;
      }
      const data = read();
      const url = waWith(buildMessage(data));
      try { sessionStorage.removeItem(KEY); } catch (err) { /* */ }

      const win = window.open(url, '_blank', 'noopener');
      if (!win) window.location.href = url;

      card.classList.add('is-done');
      say('تم استلام طلبكِ. سيتواصل معكِ الفريق قريبًا.');
      $('#syjDoneTitle')?.focus();

      let left = 8;
      if (countEl) countEl.textContent = toAr(left);
      timer = window.setInterval(() => {
        left -= 1;
        if (left <= 0) {
          window.clearInterval(timer);
          window.location.href = import.meta.env.BASE_URL || '/';
          return;
        }
        if (countEl) countEl.textContent = toAr(left);
      }, 1000);
    });

    $('#syjHome')?.addEventListener('click', () => {
      window.clearInterval(timer);
    });

    window.__lamAbortStartJourney = () => {
      window.clearInterval(timer);
    };
  }


  /* ══════════ 11. الأزرار العائمة ══════════ */
  function initToTop() {
    const topBtn = $('#toTop');
    if (!topBtn) return;
    if (topBtn.dataset.bound === '1') return;
    topBtn.dataset.bound = '1';

    topBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
      $('.brand')?.focus();
    });
  }


  /* ══════════ 10ج. Modal حجز جلسة التقييم (متعدد الخطوات) ══════════ */
  function initBookingModal() {
    const modal = $('#bookingModal');
    const form = $('#bookingForm');
    if (!modal || !form) return;
    if (form.dataset.bound === '1') return;
    form.dataset.bound = '1';
    const openSel = '[data-bk-open], [data-open-booking-modal]';

    const TOTAL = 5;
    const RIYADH = { lat: 24.7136, lng: 46.6753 };
    const MONTHS_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    const DEFAULT_LOCATION = 'صلاح الدين - الرياض';

    const dialog = $('.bk-modal-dialog', modal);
    const panels = $$('[data-bk-step]', form);
    const backBtn = $('#bkBack');
    const nextBtn = $('#bkNext');
    const sendBtn = $('#bkSend');
    const stepLbl = $('#bkStepLbl');
    const bar = $('#bkBarFill');
    const status = $('#bkStatus');
    const review = $('#bkReview');
    const consentEl = $('#bkConsent', form);
    const locateOpen = $('#bkLocateOpen', form);
    const mapPanel = $('#bkMapPanel', form);
    const mapEl = $('#bkMap', form);
    const useMyLoc = $('#bkUseMyLoc', form);
    const locateDone = $('#bkLocateDone', form);
    const locateEdit = $('#bkLocateEdit', form);
    const locateAddr = $('#bkLocateAddr', form);
    const latEl = $('#bkLat', form);
    const lngEl = $('#bkLng', form);
    const addressEl = $('#bkAddress', form);
    const calMonthEl = $('#bkCalMonth', form);
    const calGrid = $('#bkCalGrid', form);
    const calPrev = $('#bkCalPrev', form);
    const calNext = $('#bkCalNext', form);
    const slotsWrap = $('#bkSlots', form);
    const slotsList = $('#bkSlotsList', form);
    const slotsStatus = $('#bkSlotsStatus', form);
    const slotsRetry = $('#bkSlotsRetry', form);
    const dateEl = $('#bkDate', form);
    const slotEl = $('#bkSlot', form);

    let step = 1;
    let lastFocus = null;
    let open = false;
    let leaving = false;
    let map = null;
    let marker = null;
    let pendingLatLng = null;
    let slotsAbort = null;
    let slotsRequestToken = 0;
    let submitting = false;
    let closeTimer = 0;
    let calCursor = new Date();
    calCursor.setDate(1);
    calCursor.setHours(0, 0, 0, 0);

    const val = (sel) => ($(sel, form)?.value || '').trim();
    /* Published evaluation site key for slots/bookings — never the map geocode label. */
    const bookingLocation = () => DEFAULT_LOCATION;

    const formatSlotLabel = (raw) => {
      const m = String(raw || '').match(/^(\d{1,2}):(\d{2})$/);
      if (!m) return String(raw || '');
      let h = Number(m[1]);
      const min = m[2];
      const period = h < 12 ? 'ص' : 'م';
      let h12 = h % 12;
      if (h12 === 0) h12 = 12;
      return String(h12).padStart(2, '0') + ':' + min + ' ' + period;
    };

    const phoneOk = (raw) => {
      const digits = String(raw || '').replace(/\D/g, '');
      return digits.length >= 9 && digits.length <= 15;
    };
    const numIn = (raw, min, max) => {
      if (raw === '') return false;
      const n = Number(raw);
      return Number.isFinite(n) && n >= min && n <= max;
    };
    const setErr = (key, msg) => {
      const box = form.querySelector('[data-err-for="' + key + '"]');
      if (box) box.textContent = msg || '';
    };
    const mark = (el, bad) => {
      if (!el) return;
      if (bad) el.setAttribute('aria-invalid', 'true');
      else el.removeAttribute('aria-invalid');
    };
    const say = (msg, kind) => {
      if (!status) return;
      status.textContent = msg || '';
      status.classList.toggle('is-err', kind === 'err');
      status.classList.toggle('is-ok', kind === 'ok');
    };

    function isFilledControl(el) {
      if (!el || el.type === 'checkbox' || el.type === 'radio' || el.type === 'hidden') return false;
      if (!el.classList.contains('input')) return false;
      if (el.tagName === 'SELECT') return Boolean((el.value || '').trim());
      return String(el.value || '').trim() !== '';
    }
    function syncFilled(el) {
      if (!el || !el.classList || el.type === 'checkbox' || el.type === 'radio') return;
      if (!el.classList.contains('input')) return;
      const on = isFilledControl(el);
      el.classList.toggle('is-filled', on);
      const wrap = el.closest('.field-wrap');
      if (wrap) wrap.classList.toggle('is-filled', on);
    }
    function syncFilledAll() {
      form.querySelectorAll('.input').forEach(syncFilled);
    }

    function loadLeaflet() {
      if (window.L) return Promise.resolve(window.L);
      return new Promise((resolve, reject) => {
        const cssId = 'lam-leaflet-css';
        if (!document.getElementById(cssId)) {
          const link = document.createElement('link');
          link.id = cssId;
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }
        const existing = document.getElementById('lam-leaflet-js');
        if (existing) {
          existing.addEventListener('load', () => resolve(window.L));
          existing.addEventListener('error', reject);
          return;
        }
        const script = document.createElement('script');
        script.id = 'lam-leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = () => resolve(window.L);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    async function reverseGeocode(lat, lng) {
      try {
        const url = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' +
          encodeURIComponent(lat) + '&lon=' + encodeURIComponent(lng) + '&accept-language=ar';
        const res = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error('geo');
        const data = await res.json();
        const a = data.address || {};
        const short = [a.suburb || a.neighbourhood || a.quarter, a.city || a.town || a.state || 'الرياض']
          .filter(Boolean).join(' — ');
        return short || data.display_name || 'موقع محدد على الخريطة';
      } catch (e) {
        return 'موقع محدد على الخريطة';
      }
    }

    function setPending(lat, lng) {
      pendingLatLng = { lat, lng };
      if (marker && map) marker.setLatLng([lat, lng]);
      saveLocation(lat, lng);
    }

    async function saveLocation(lat, lng) {
      if (latEl) latEl.value = String(lat);
      if (lngEl) lngEl.value = String(lng);
      const addr = await reverseGeocode(lat, lng);
      if (addressEl) addressEl.value = addr;
      setErr('bkLocation', '');
      showLocateDone();
      clearSelectedSlot();
      const date = bookingDate();
      if (date) loadSlots(date);
    }

    async function ensureMap() {
      const L = await loadLeaflet();
      if (!mapEl) return;
      if (L.Icon && L.Icon.Default) {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
        });
      }
      const startLat = Number(latEl?.value) || RIYADH.lat;
      const startLng = Number(lngEl?.value) || RIYADH.lng;
      if (!map) {
        map = L.map(mapEl, { scrollWheelZoom: false, attributionControl: true });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap'
        }).addTo(map);
        marker = L.marker([startLat, startLng], { draggable: true }).addTo(map);
        marker.on('dragend', () => {
          const p = marker.getLatLng();
          setPending(p.lat, p.lng);
        });
        map.on('click', (e) => setPending(e.latlng.lat, e.latlng.lng));
      }
      map.setView([startLat, startLng], 13);
      marker.setLatLng([startLat, startLng]);
      pendingLatLng = { lat: startLat, lng: startLng };
      requestAnimationFrame(() => map.invalidateSize());
      setTimeout(() => map && map.invalidateSize(), 180);
    }

    function showLocateIdle() {
      if (locateOpen) locateOpen.hidden = false;
      if (mapPanel) mapPanel.hidden = true;
      if (locateDone) locateDone.hidden = true;
      if (locateAddr) { locateAddr.hidden = true; locateAddr.textContent = ''; }
    }
    function showLocateMap() {
      if (locateOpen) locateOpen.hidden = true;
      if (mapPanel) mapPanel.hidden = false;
      if (locateDone) locateDone.hidden = true;
      ensureMap();
    }
    function showLocateDone() {
      if (locateOpen) locateOpen.hidden = true;
      if (mapPanel) mapPanel.hidden = true;
      if (locateDone) locateDone.hidden = false;
      const addr = val('#bkAddress');
      if (locateAddr) {
        locateAddr.hidden = !addr;
        locateAddr.textContent = addr;
      }
    }
    function syncLocateUi() {
      if (val('#bkLat') && val('#bkLng')) showLocateDone();
      else showLocateIdle();
    }
    function clearLocation() {
      if (latEl) latEl.value = '';
      if (lngEl) lngEl.value = '';
      if (addressEl) addressEl.value = '';
      pendingLatLng = null;
      showLocateIdle();
      clearSelectedSlot();
      const date = bookingDate();
      if (date) loadSlots(date);
    }

    function todayStart() {
      const t = new Date();
      t.setHours(0, 0, 0, 0);
      return t;
    }
    function ymd(d) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return y + '-' + m + '-' + day;
    }
    function bookingDate(iso) {
      return normalizeIsoDate(iso ?? val('#bkDate'));
    }
    function slotsResultStillCurrent(token, date, location) {
      return token === slotsRequestToken
        && bookingDate() === date
        && bookingLocation() === location;
    }
    function formatDateAr(iso) {
      if (!iso) return '';
      const [y, m, d] = iso.split('-').map(Number);
      return toAr(d) + ' ' + MONTHS_AR[m - 1] + ' ' + toAr(y);
    }

    function paintCalendar() {
      if (!calGrid || !calMonthEl) return;
      const year = calCursor.getFullYear();
      const month = calCursor.getMonth();
      calMonthEl.textContent = MONTHS_AR[month] + ' ' + toAr(year);
      const firstDow = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const selected = bookingDate();
      const today = todayStart();
      const frag = document.createDocumentFragment();
      for (let i = 0; i < firstDow; i++) {
        const empty = document.createElement('button');
        empty.type = 'button';
        empty.className = 'bk-cal-day is-empty';
        empty.tabIndex = -1;
        empty.setAttribute('aria-hidden', 'true');
        frag.appendChild(empty);
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const iso = ymd(date);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bk-cal-day';
        btn.textContent = toAr(day);
        btn.dataset.date = iso;
        if (date < today) btn.disabled = true;
        if (ymd(today) === iso) btn.classList.add('is-today');
        if (selected === iso) btn.classList.add('is-on');
        btn.addEventListener('click', () => selectDate(iso));
        frag.appendChild(btn);
      }
      calGrid.replaceChildren(frag);
      if (calPrev) {
        const prevMonthEnd = new Date(year, month, 0);
        calPrev.disabled = prevMonthEnd < today;
      }
    }

    function selectDate(iso) {
      const date = normalizeIsoDate(iso);
      if (!date) return;
      if (dateEl) dateEl.value = date;
      clearSelectedSlot();
      setErr('bkAppt', '');
      paintCalendar();
      loadSlots(date);
    }

    function selectSlot(value) {
      if (slotEl) slotEl.value = value;
      $$('.bk-slot', form).forEach((b) => b.classList.toggle('is-on', b.dataset.slot === value));
      setErr('bkAppt', '');
    }

    function clearSelectedSlot() {
      if (slotEl) slotEl.value = '';
      $$('.bk-slot', form).forEach((b) => b.classList.remove('is-on'));
    }

    function setSlotsStatus(msg, kind) {
      if (!slotsStatus) return;
      if (!msg) {
        slotsStatus.hidden = true;
        slotsStatus.textContent = '';
        slotsStatus.classList.remove('is-err');
        return;
      }
      slotsStatus.hidden = false;
      slotsStatus.textContent = msg;
      slotsStatus.classList.toggle('is-err', kind === 'err');
    }

    function renderSlotButtons(slots) {
      if (!slotsList) return;
      const frag = document.createDocumentFragment();
      slots.forEach((slot) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'bk-slot';
        btn.dataset.slot = slot;
        btn.textContent = formatSlotLabel(slot);
        if (val('#bkSlot') === slot) btn.classList.add('is-on');
        frag.appendChild(btn);
      });
      slotsList.replaceChildren(frag);
    }

    async function loadSlots(requestedDate) {
      const date = bookingDate(requestedDate);
      if (!date) {
        if (slotsWrap) slotsWrap.hidden = true;
        if (slotsList) slotsList.replaceChildren();
        if (slotsRetry) slotsRetry.hidden = true;
        setSlotsStatus('');
        return;
      }

      if (dateEl && dateEl.value !== date) dateEl.value = date;

      if (slotsWrap) slotsWrap.hidden = false;
      if (slotsRetry) slotsRetry.hidden = true;
      if (slotsList) slotsList.replaceChildren();
      setSlotsStatus('جارٍ تحميل الأوقات المتاحة…');

      if (slotsAbort) slotsAbort.abort();
      slotsAbort = new AbortController();
      const token = ++slotsRequestToken;
      const location = bookingLocation();

      try {
        const slots = await getEvaluationSlots({
          location,
          date,
          signal: slotsAbort.signal,
        });
        if (!slotsResultStillCurrent(token, date, location)) return;
        if (!slots.length) {
          setSlotsStatus('لا توجد مواعيد متاحة لهذا اليوم، اختاري تاريخًا آخر.');
          return;
        }
        setSlotsStatus('');
        renderSlotButtons(slots);
      } catch (err) {
        if (err && err.name === 'AbortError') return;
        if (!slotsResultStillCurrent(token, date, location)) return;
        setSlotsStatus(
          err instanceof PublicApiError
            ? err.message
            : 'تعذّر جلب الأوقات المتاحة. حاولِي مرة أخرى.',
          'err',
        );
        if (slotsRetry) slotsRetry.hidden = false;
      }
    }

    function collect() {
      return {
        name: val('#bkName'),
        phone: val('#bkPhone'),
        weight: val('#bkWeight'),
        height: val('#bkHeight'),
        goal: val('#bkGoal'),
        lat: val('#bkLat'),
        lng: val('#bkLng'),
        address: val('#bkAddress'),
        location: bookingLocation(),
        date: val('#bkDate'),
        slot: val('#bkSlot'),
        slotLabel: formatSlotLabel(val('#bkSlot')),
        consent: consentEl?.checked === true
      };
    }

    function paintReview() {
      if (!review) return;
      const d = collect();
      const esc = (s) => String(s || '')
        .replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
      const row = (k, v) => v
        ? '<div class="bk-review-row"><span class="bk-review-k">' + esc(k) + '</span><span class="bk-review-v">' + esc(v) + '</span></div>'
        : '';
      review.innerHTML =
        row('الاسم', d.name) +
        row('رقم الجوال', d.phone) +
        row('الوزن', d.weight ? d.weight + ' كجم' : '') +
        row('الطول', d.height ? d.height + ' سم' : '') +
        row('الهدف', d.goal) +
        row('موقع الجلسة', d.address || (d.lat && d.lng ? 'موقع محدد على الخريطة' : '')) +
        row('موعد الجلسة', d.date ? (formatDateAr(d.date) + (d.slotLabel ? ' — ' + d.slotLabel : '')) : '');
    }

    function validateStep(n) {
      let first = null;
      const fail = (el, key, msg) => { setErr(key, msg); if (el) mark(el, true); first ||= el; };
      const ok = (el, key) => { setErr(key, ''); if (el) mark(el, false); };

      if (n === 1) {
        const nameEl = $('#bkName', form);
        const phoneEl = $('#bkPhone', form);
        const name = val('#bkName');
        if (name.length < 2) fail(nameEl, 'bkName', 'الرجاء كتابة الاسم الكامل.');
        else ok(nameEl, 'bkName');
        if (!phoneOk(val('#bkPhone'))) fail(phoneEl, 'bkPhone', 'الرجاء كتابة رقم جوال صحيح.');
        else ok(phoneEl, 'bkPhone');
      }
      if (n === 2) {
        const weightEl = $('#bkWeight', form);
        const heightEl = $('#bkHeight', form);
        const goalEl = $('#bkGoal', form);
        if (!numIn(val('#bkWeight'), 30, 250)) fail(weightEl, 'bkWeight', 'الرجاء إدخال الوزن بالكيلوجرام.');
        else ok(weightEl, 'bkWeight');
        if (!numIn(val('#bkHeight'), 100, 220)) fail(heightEl, 'bkHeight', 'الرجاء إدخال الطول بالسنتيمتر.');
        else ok(heightEl, 'bkHeight');
        if (!val('#bkGoal')) fail(goalEl, 'bkGoal', 'الرجاء اختيار هدف الرحلة.');
        else ok(goalEl, 'bkGoal');
      }
      if (n === 3) {
        // موقع الجلسة اختياري — يمكن المتابعة بدون تحديد
        setErr('bkLocation', '');
      }
      if (n === 4) {
        if (!val('#bkDate') || !val('#bkSlot')) {
          fail(calGrid, 'bkAppt', 'الرجاء اختيار التاريخ والوقت المناسبين.');
        } else ok(null, 'bkAppt');
      }
      if (n === 5) {
        if (!consentEl?.checked) fail(consentEl, 'bkConsent', 'يلزم الموافقة على التواصل لإرسال الطلب.');
        else ok(consentEl, 'bkConsent');
      }
      return first;
    }

    function syncSend() {
      if (!sendBtn) return;
      const ready = step === TOTAL && consentEl?.checked === true;
      sendBtn.hidden = step !== TOTAL;
      sendBtn.disabled = !ready;
      sendBtn.setAttribute('aria-disabled', ready ? 'false' : 'true');
    }

    function paintHello() {
      const nameSlot = $('#bkHelloName');
      if (nameSlot) nameSlot.textContent = val('#bkName');
    }
    function playHelloEnter() {
      const hello = $('#bkHello');
      if (!hello) return;
      hello.classList.remove('is-in');
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        hello.classList.add('is-in');
        return;
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => hello.classList.add('is-in'));
      });
    }

    function showStep() {
      panels.forEach((p) => {
        const on = +p.dataset.bkStep === step;
        p.classList.toggle('is-on', on);
        p.hidden = !on;
      });
      if (stepLbl) stepLbl.textContent = toAr(step) + ' من ' + toAr(TOTAL);
      if (bar) bar.style.setProperty('--bk-p', String((step / TOTAL) * 100));
      if (backBtn) backBtn.hidden = step === 1;
      if (nextBtn) nextBtn.hidden = step === TOTAL;
      if (step === 2) { paintHello(); playHelloEnter(); }
      if (step === 3) syncLocateUi();
      if (step === 4) {
        paintCalendar();
        const date = bookingDate();
        if (date) loadSlots(date);
        else {
          if (slotsWrap) slotsWrap.hidden = true;
          if (slotsList) slotsList.replaceChildren();
          setSlotsStatus('');
          if (slotsRetry) slotsRetry.hidden = true;
        }
      }
      if (step === 5) paintReview();
      syncSend();
      say('');
      if (open && step <= 2) {
        const firstInput = form.querySelector('[data-bk-step="' + step + '"] .input');
        if (firstInput) requestAnimationFrame(() => firstInput.focus({ preventScroll: true }));
      }
    }

    function buildMessage(d) {
      const line = (k, v, suffix) => v ? '• ' + k + ': ' + v + (suffix || '') + '\n' : '';
      return 'مرحبًا Like A Model 👋\n' +
        'أرغب بحجز جلسة تقييم مجانية عبر الموقع:\n\n' +
        line('الاسم', d.name) +
        line('رقم الجوال', d.phone) +
        line('الوزن', d.weight, ' كجم') +
        line('الطول', d.height, ' سم') +
        line('الهدف', d.goal) +
        line('موقع الجلسة', d.address) +
        (d.lat && d.lng ? line('الإحداثيات', d.lat + ', ' + d.lng) : '') +
        line('موعد الجلسة', d.date ? (formatDateAr(d.date) + (d.slotLabel ? ' — ' + d.slotLabel : '')) : '') +
        '\nأتطلع لردّكم.';
    }

    function resetBookingExtras() {
      if (slotsAbort) {
        slotsAbort.abort();
        slotsAbort = null;
      }
      slotsRequestToken += 1;
      if (latEl) latEl.value = '';
      if (lngEl) lngEl.value = '';
      if (addressEl) addressEl.value = '';
      pendingLatLng = null;
      showLocateIdle();
      if (dateEl) dateEl.value = '';
      clearSelectedSlot();
      if (slotsWrap) slotsWrap.hidden = true;
      if (slotsList) slotsList.replaceChildren();
      setSlotsStatus('');
      if (slotsRetry) slotsRetry.hidden = true;
      calCursor = new Date();
      calCursor.setDate(1);
      calCursor.setHours(0, 0, 0, 0);
    }

    function openModal() {
      if (open && !leaving) return;
      open = true;
      leaving = false;
      window.clearTimeout(closeTimer);
      window.dispatchEvent(new Event('lam:close-chatbot'));
      lastFocus = document.activeElement;
      step = 1;
      submitting = false;
      showStep();
      syncFilledAll();
      document.body.classList.add('is-bk-open');
      window.dispatchEvent(new Event('lam:booking-opened'));
      requestAnimationFrame(() => {
        if (!open || leaving) return;
        (dialog || modal).focus({ preventScroll: true });
        $('#bkName', form)?.focus({ preventScroll: true });
      });
    }

    function closeModal() {
      if (!open || leaving) return;
      leaving = true;
      window.clearTimeout(closeTimer);
      submitting = false;
      document.body.classList.remove('is-bk-open');
      window.dispatchEvent(new Event('lam:booking-closed'));
      const finish = () => {
        if (!leaving) return;
        leaving = false;
        open = false;
        say('');
        if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true });
      };
      if (reduceMotion) finish();
      else closeTimer = window.setTimeout(finish, 320);
    }

    window.__lamOpenBooking = openModal;
    window.__lamCloseBooking = closeModal;
    if (window.__lamBookingQueued) {
      window.__lamBookingQueued = false;
      openModal();
    }

    document.addEventListener('click', (e) => {
      const btn = e.target && e.target.closest(openSel);
      if (!btn || !document.contains(btn)) return;
      e.preventDefault();
      openModal();
    });
    modal.addEventListener('click', (e) => {
      if (e.target && e.target.closest('[data-bk-close]')) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (!open || e.key !== 'Escape') return;
      e.preventDefault();
      closeModal();
    });

    locateOpen?.addEventListener('click', () => {
      setErr('bkLocation', '');
      showLocateMap();
    });
    locateEdit?.addEventListener('click', () => showLocateMap());
    useMyLoc?.addEventListener('click', () => {
      if (!navigator.geolocation) return;
      useMyLoc.disabled = true;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          useMyLoc.disabled = false;
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          if (map) map.setView([lat, lng], 15);
          if (marker && map) marker.setLatLng([lat, lng]);
          setPending(lat, lng);
        },
        () => { useMyLoc.disabled = false; },
        { enableHighAccuracy: true, timeout: 12000, maximumAge: 60000 }
      );
    });

    calPrev?.addEventListener('click', () => {
      calCursor.setMonth(calCursor.getMonth() - 1);
      paintCalendar();
    });
    calNext?.addEventListener('click', () => {
      calCursor.setMonth(calCursor.getMonth() + 1);
      paintCalendar();
    });
    slotsRetry?.addEventListener('click', () => {
      const date = bookingDate();
      if (date) loadSlots(date);
    });
    slotsList?.addEventListener('click', (e) => {
      const btn = e.target.closest('.bk-slot');
      if (!btn || !btn.dataset.slot) return;
      selectSlot(btn.dataset.slot);
    });

    backBtn?.addEventListener('click', () => {
      if (step <= 1 || submitting) return;
      step -= 1;
      showStep();
    });
    nextBtn?.addEventListener('click', () => {
      if (submitting) return;
      const bad = validateStep(step);
      if (bad) {
        if (typeof bad.focus === 'function') bad.focus({ preventScroll: false });
        return;
      }
      if (step >= TOTAL) return;
      step += 1;
      showStep();
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (step !== TOTAL || submitting) return;
      const bad = validateStep(TOTAL);
      if (bad) {
        say('يلزم الموافقة على التواصل قبل إرسال الطلب.', 'err');
        if (typeof bad.focus === 'function') bad.focus({ preventScroll: false });
        syncSend();
        return;
      }
      if (!consentEl?.checked) {
        say('يلزم الموافقة على التواصل قبل إرسال الطلب.', 'err');
        syncSend();
        return;
      }

      const data = collect();
      submitting = true;
      sendBtn.disabled = true;
      sendBtn.setAttribute('aria-disabled', 'true');
      say('جارٍ الإرسال…');
      try {
        const res = await createEvaluationBooking({
          full_name: data.name,
          phone: data.phone,
          weight: String(data.weight),
          height: String(data.height),
          goal: data.goal,
          location: data.location,
          date: data.date,
          time: data.slot,
          consent: true,
        });
        form.reset();
        resetBookingExtras();
        step = 1;
        syncFilledAll();
        showStep();
        const okMsg = (res && typeof res.message === 'string' && res.message.trim())
          ? res.message.trim()
          : 'تم استلام طلب الحجز وسيتواصل الفريق للتأكيد.';
        say(okMsg, 'ok');
        closeTimer = window.setTimeout(() => {
          closeModal();
        }, 2200);
      } catch (err) {
        if (err instanceof PublicApiError && err.status === 422) {
          say(err.message || 'تحقق من الحقول المطلوبة ثم أعيدي المحاولة.', 'err');
        } else {
          say(
            err instanceof PublicApiError
              ? err.message
              : 'تعذّر الإرسال. حاولِي مرة أخرى بعد قليل.',
            'err',
          );
        }
      } finally {
        submitting = false;
        syncSend();
      }
    });

    form.addEventListener('input', (e) => {
      const t = e.target;
      if (!t || !t.id) return;
      if (['bkName', 'bkPhone', 'bkWeight', 'bkHeight'].includes(t.id)) {
        setErr(t.id, ''); mark(t, false);
      }
      if (t.matches('input.input, textarea.input')) syncFilled(t);
      syncSend();
    });
    form.addEventListener('change', (e) => {
      const t = e.target;
      if (t && t.id) {
        const mapIds = { bkName: 'bkName', bkPhone: 'bkPhone', bkWeight: 'bkWeight', bkHeight: 'bkHeight', bkGoal: 'bkGoal', bkConsent: 'bkConsent' };
        const key = mapIds[t.id];
        if (key) { setErr(key, ''); mark(t, false); }
      }
      if (t && t.matches('select.input, input.input, textarea.input')) syncFilled(t);
      if (step === TOTAL) paintReview();
      syncSend();
    });

    modal.addEventListener('keydown', (e) => {
      if (!open || e.key !== 'Tab') return;
      const focusables = $$('button:not([hidden]):not([disabled]), [href], input:not([disabled]):not([hidden]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', modal)
        .filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    showStep();
    syncFilledAll();
  }


  /* ══════════ التشغيل ══════════ */
  function bootLayout() {
    applyContact();
    initLang();
    initBookingModal();
    initToTop();
  }

  function bootHome() {
    homeSignal = takeSignal('home');
    resetHomeFx();
    applyContact();
    initHeroVideo();
    initMap();
    initCounters();
    initStatsParallax();
    initContactParallax();
    initReveal();
    initSupportOrbit();
    initContactForm();
  }

  window.__lamInitHome = bootHome;
  window.__lamAbortHome = () => {
    takeSignal('home');
    resetHomeFx();
  };
  window.__lamInitStartJourney = initStartJourney;

  if (!window.__lamLayoutBooted) {
    window.__lamLayoutBooted = true;
    bootLayout();
  }
}

