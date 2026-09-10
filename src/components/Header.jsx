import { useEffect, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu.jsx';
import { navScrollOffset, scrollToNavTarget } from '../lib/navScroll.js';
import { assetUrl } from '../lib/asset.js';
import { dur, easeUi, tween } from '../motion/tokens.js';

const NAV = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'about', label: 'من نحن' },
  { id: 'support', label: 'كيف ندعمكِ' },
  { id: 'ecosystem', label: 'منظومتنا' },
  { id: 'journey', label: 'فريقنا' },
  { id: 'stories', label: 'قصص التحوّل' },
  { id: 'contact', label: 'تواصلي معنا' }
];

function NavLinks({ home, activeId, goSection }) {
  return (
    <ul>
      {NAV.map((item) => (
        <li key={item.id}>
          <Link to={{ pathname: '/', hash: `#${item.id}` }} aria-current={home && activeId === item.id ? 'true' : undefined} onClick={goSection(item.id)}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Header({ pinned }) {
  const location = useLocation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(Boolean(pinned));
  const [desktop, setDesktop] = useState(() => window.matchMedia('(min-width: 1080px)').matches);
  const [activeId, setActiveId] = useState('home');
  const home = location.pathname === '/';

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1080px)');
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(Boolean(pinned) || y > 40);
  });

  useEffect(() => {
    setScrolled(Boolean(pinned) || window.scrollY > 40);
    const header = document.getElementById('siteHeader');
    const syncOffset = () => {
      if (!header) return;
      document.documentElement.style.setProperty('--header-measured', `${Math.round(header.getBoundingClientRect().height)}px`);
    };
    syncOffset();
    window.addEventListener('resize', syncOffset);
    return () => window.removeEventListener('resize', syncOffset);
  }, [pinned]);

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', navOpen && !desktop);
    return () => document.body.classList.remove('nav-open');
  }, [navOpen, desktop]);

  useEffect(() => {
    if (!navOpen || desktop) return undefined;
    const header = document.getElementById('siteHeader');
    const onKey = (e) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    const onOutside = (e) => {
      if (header && header.contains(e.target)) return;
      setNavOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside, true);
    };
  }, [navOpen, desktop]);

  useEffect(() => {
    if (!home) return undefined;
    const sections = NAV.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (!sections.length) return undefined;

    const apply = () => {
      const line = navScrollOffset();
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = sections[0];
      if (atEnd) {
        current = sections[sections.length - 1];
      } else {
        for (const sec of sections) {
          if (sec.getBoundingClientRect().top <= line + 1) current = sec;
        }
      }
      setActiveId(current.id);
    };

    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('resize', apply);
    apply();
    return () => {
      window.removeEventListener('scroll', apply);
      window.removeEventListener('resize', apply);
    };
  }, [home, location.hash]);

  const headerClass = [
    'site-header',
    (pinned || scrolled) ? 'is-scrolled' : '',
    navOpen ? 'is-nav-open' : ''
  ].filter(Boolean).join(' ');

  const overlayDur = reduce ? 0 : dur.overlay;
  const navExposed = navOpen || (desktop && (pinned || scrolled));

  const goSection = (id) => (e) => {
    setNavOpen(false);
    if (!home) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    navigate({ pathname: '/', hash: `#${id}` }, { replace: true });
    scrollToNavTarget(target, false);
  };

  const links = <NavLinks home={home} activeId={activeId} goSection={goSection} />;

  return (
    <header className={headerClass} id="siteHeader">
        <div className="header-inner">
          <Link className="brand" to={{ pathname: '/', hash: '#home' }} aria-label="Like A Model — الصفحة الرئيسية" onClick={goSection('home')}>
            <span className="brand-mark" aria-hidden="true">
              <img className="brand-logo" src={assetUrl('/assets/img/logo.svg')} alt="" width="48" height="48" />
            </span>
            <span className="brand-text">
              <span className="brand-name" lang="en">Like A Model</span>
            </span>
          </Link>

          {desktop ? (
            <nav className="site-nav"id="siteNav" aria-label="التنقل الرئيسي" aria-hidden={navExposed ? 'false' : 'true'} inert={!navExposed ? true : undefined}>
              {links}
            </nav>
          ) : (
            <AnimatePresence>
              {navOpen ? (
                <m.nav className="site-nav" id="siteNav" aria-label="التنقل الرئيسي" aria-hidden="false" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={tween(overlayDur, easeUi)}>
                  {links}
                </m.nav>
              ) : null}
            </AnimatePresence>
          )}

          <div className="header-tools">
            <MobileMenu open={navOpen} onToggle={() => setNavOpen((v) => !v)} />
            <div className="header-aside">
              <ul className="header-social" aria-label="حسابات التواصل الاجتماعي">
                <li><a href="https://www.linkedin.com/" rel="noopener noreferrer" target="_blank" data-social="linkedin" aria-label="لينكدإن"><svg className="ico" aria-hidden="true">
                  <use href="#i-linkedin"></use></svg></a></li>
                <li><a href="https://x.com/" rel="noopener noreferrer" target="_blank" data-social="x" aria-label="إكس"><svg className="ico" aria-hidden="true"><use href="#i-x"></use></svg>
                </a></li>
                <li><a href="https://www.facebook.com/" rel="noopener noreferrer" target="_blank" data-social="facebook" aria-label="فيسبوك"><svg className="ico" aria-hidden="true">
                  <use href="#i-facebook"></use></svg></a></li>
                <li><a href="https://www.instagram.com/" rel="noopener noreferrer" target="_blank" data-social="instagram" aria-label="إنستغرام"><svg className="ico ico-outline"
                aria-hidden="true"><use href="#i-instagram"></use></svg></a></li>
                <li><a href="https://www.tiktok.com/" rel="noopener noreferrer" target="_blank" data-social="tiktok" aria-label="تيك توك"><svg className="ico" aria-hidden="true">
                  <use href="#i-tiktok"></use></svg></a></li>
                <li><a href="https://www.youtube.com/" rel="noopener noreferrer" target="_blank" data-social="youtube" aria-label="يوتيوب"><svg className="ico" aria-hidden="true">
                  <use href="#i-youtube"></use></svg></a></li>
                <li>
                  <a href="https://wa.me/966542555516" id="headerWhatsapp" rel="noopener noreferrer" target="_blank" aria-label="واتساب">
                    <svg className="ico" aria-hidden="true"><use href="#i-whatsapp"></use></svg>
                  </a>
                </li>
              </ul>
              <a className="lang-switch" id="langSwitch" href="#" lang="en" hrefLang="en" aria-label="English version" aria-disabled="true" title="النسخة الإنجليزية قريبًا"
                onClick={(e) => e.preventDefault()}>
                <svg className="ico" aria-hidden="true"><use href="#i-globe"></use></svg>
                <span>EN</span>
              </a>
            </div>
          </div>
        </div>
    </header>
  );
}