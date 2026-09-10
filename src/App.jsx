import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BookingModal from './components/BookingModal.jsx';
import FloatingActions from './components/FloatingActions.jsx';
import LogoSplash from './components/LogoSplash.jsx';
import { bootPageEffects } from './effects/boot.js';
import { scrollToHash } from './lib/navScroll.js';
import MotionRoot from './motion/MotionRoot.jsx';
import SoftHaloCursor from './components/SoftHaloCursor.jsx';

const TITLES = {
  '/': 'Like A Model — أكثر من تدريب... أسلوب حياة.',
  '/stories': 'قصص التحوّل — Like A Model',
  '/start-your-journey': 'ابدئي رحلتكِ — Like A Model'
};

export default function App() {
  const location = useLocation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const pinned = location.pathname === '/stories' || location.pathname === '/start-your-journey';

  const onSplashDone = useCallback(() => {
    setShowSplash(false);
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }, []);

  useLayoutEffect(() => {
    document.documentElement.classList.add('js');
    document.documentElement.classList.remove('no-js');
    bootPageEffects();
  }, []);

  useEffect(() => {
    const splashBg = '#FFF9F7';
    document.documentElement.classList.toggle('is-logo-splash', showSplash);
    document.body.classList.toggle('is-logo-splash', showSplash);
    document.documentElement.style.backgroundColor = showSplash ? splashBg : '';
    document.body.style.backgroundColor = showSplash ? splashBg : '';
    return () => {
      document.documentElement.classList.remove('is-logo-splash');
      document.body.classList.remove('is-logo-splash');
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    };
  }, [showSplash]);

  useEffect(() => {
    document.title = TITLES[location.pathname] || TITLES['/'];
    document.body.classList.toggle('page-stories', location.pathname === '/stories');
    document.body.classList.toggle('page-syj', location.pathname === '/start-your-journey');
    document.body.classList.toggle('is-bk-open', isBookingOpen);
  }, [location.pathname, isBookingOpen]);

  useEffect(() => {
    const opened = () => setIsBookingOpen(true);
    const closed = () => setIsBookingOpen(false);
    window.addEventListener('lam:booking-opened', opened);
    window.addEventListener('lam:booking-closed', closed);
    return () => {
      window.removeEventListener('lam:booking-opened', opened);
      window.removeEventListener('lam:booking-closed', closed);
    };
  }, []);

  useEffect(() => {
    if (showSplash) return undefined;
    const id = window.requestAnimationFrame(() => {
      if (location.hash) scrollToHash(location.hash, false);
      else window.scrollTo({ top: 0, behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(id);
  }, [location.pathname, location.hash, showSplash]);

  const onOpenBooking = () => {
    setIsBookingOpen(true);
    if (typeof window.__lamOpenBooking === 'function') window.__lamOpenBooking();
    else window.__lamBookingQueued = true;
  };

  return (
    <MotionRoot>
      {showSplash ? <LogoSplash onDone={onSplashDone} /> : null}
      <div className={showSplash ? 'site-shell is-splash-hidden pointer-events-none select-none' : 'site-shell'} inert={showSplash ? true : undefined}>
        <a className={`fixed inset-s-[calc(1rem+env(safe-area-inset-right))] -top-25 z-200 rounded-lam-md bg-lam-primary px-5 py-3 font-bold text-white transition-[top] duration-200
        focus:top-4`} href="#main">
          تخطّي إلى المحتوى
        </a>
        <Header pinned={pinned} />
        <Outlet context={{ onOpenBooking }} />
        <Footer />
        <FloatingActions />
        <BookingModal open={isBookingOpen} />
      </div>
      <SoftHaloCursor />
    </MotionRoot>
  );
}