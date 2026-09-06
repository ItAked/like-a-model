import { useEffect, useRef } from 'react';
import { m, useAnimationControls, useInView, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scrollToNavTarget } from '../lib/navScroll.js';
import { useFinePointer } from '../motion/pointer.js';
import { dur, easeUi, tween } from '../motion/tokens.js';

export default function Hero({ onOpenBooking }) {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const inView = useInView(heroRef, { amount: 0, initial: true });
  const dotControls = useAnimationControls();

  useEffect(() => {
    if (reduce) {
      dotControls.set({ y: 12, opacity: 1 });
      return undefined;
    }
    if (inView) {
      dotControls.start({
        y: [0, 32],
        opacity: [1, 0.7, 0],
        transition: { duration: 1.9, ease: easeUi, repeat: Infinity },
      });
    } else {
      dotControls.stop();
    }
    return undefined;
  }, [dotControls, inView, reduce]);

  const hover = fine && !reduce ? 'hover' : undefined;
  const tap = !reduce ? 'tap' : undefined;

  return (
    <section className="hero" id="home" aria-label="الواجهة الرئيسية" ref={heroRef}>
      <div className="hero-media" id="heroMedia" aria-hidden="true"></div>
      <div className="hero-overlay" aria-hidden="true"></div>
      <h1 className="sr-only"><span className="lam" lang="en">Like A Model</span></h1>

      <m.button
        className="hero-cta"
        type="button"
        data-bk-open
        onClick={onOpenBooking}
        aria-haspopup="dialog"
        aria-controls="bookingModal"
        initial={false}
        whileHover={hover}
        whileTap={tap}
      >
        <m.span
          className="hero-cta-play"
          aria-hidden="true"
          variants={{
            hover: { scale: 1.02 },
            tap: { scale: 0.99 },
          }}
          transition={tween(dur.hover, easeUi)}
        >
          <svg className="ico" focusable="false"><use href="#i-play"></use></svg>
        </m.span>
        <span className="hero-cta-lbl">ابدئي رحلتكِ</span>
      </m.button>

      <a
        className="hero-scroll"
        href="#about"
        onClick={(e) => {
          const target = document.getElementById('about');
          if (!target) return;
          e.preventDefault();
          navigate({ pathname: '/', hash: '#about' }, { replace: true });
          scrollToNavTarget(target, false);
        }}
      >
        <span className="hero-scroll-lbl">اكتشفي المزيد</span>
        <span className="hero-scroll-track" aria-hidden="true">
          <m.span
            className="hero-scroll-dot"
            animate={dotControls}
          />
        </span>
      </a>
    </section>
  );
}
