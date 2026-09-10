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
        transition: { duration: 1.9, ease: easeUi, repeat: Infinity }
      });
    } else {
      dotControls.stop();
    }
    return undefined;
  }, [dotControls, inView, reduce]);

  const hover = fine && !reduce ? 'hover' : undefined;
  const tap = !reduce ? 'tap' : undefined;

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-black text-white" id="home" aria-label="الواجهة الرئيسية" ref={heroRef}>
      <div className="hero-media pointer-events-none absolute inset-0 overflow-hidden bg-black bg-cover bg-center bg-no-repeat" id="heroMedia" aria-hidden="true"></div>
      <div className="pointer-events-none absolute inset-0 bg-black/12" aria-hidden="true"></div>
      <h1 className="sr-only"><span className="lam" lang="en">Like A Model</span></h1>

      <m.button className={`hero-cta group absolute right-[clamp(1.15rem,4vw,2.75rem)] bottom-[clamp(2rem,4.5vw,3.25rem)] z-3 inline-flex max-w-[calc(100%-(var(--gutter)*2))] items-center
        gap-[.85rem] border-0 bg-transparent p-0 text-(length:clamp(1.05rem,.98rem+.35vw,1.22rem)) leading-[1.2] font-bold text-white shadow-none max-md:right-[clamp(1rem,5vw,1.5rem)]
        max-md:bottom-(clamp(6.25rem,16vw,7.75rem)) max-[420px]:left-(--gutter) max-[420px]:justify-start focus-visible:rounded-lam-pill focus-visible:outline-3 focus-visible:outline-offset-4
        focus-visible:outline-lam-primary-hover`} type="button" data-bk-open onClick={onOpenBooking} aria-haspopup="dialog" aria-controls="bookingModal" initial={false} whileHover={hover}
        whileTap={tap}>
        <m.span className={`hero-cta-play grid size-13.5 flex-none place-items-center rounded-lam-pill bg-lam-primary text-white
          shadow-[0_8px_20px_color-mix(in_srgb,var(--color-primary)_34%,transparent)] transition-box-shadow,background,color duration-(--t-btn) ease-(--ease)
          group-hover:bg-(--color-btn-primary-hover) group-hover:shadow-[0_12px_28px_color-mix(in_srgb,var(--color-btn-primary-hover)_44%,transparent)]
          group-active:bg-(--color-btn-primary-active)`}
          aria-hidden="true"
          variants={{
            hover: { scale: 1.02 },
            tap: { scale: 0.99 }
          }} transition={tween(dur.hover, easeUi)}>
          <svg className="ico ms-[.12em] size-4.5 fill-current stroke-none text-inherit" focusable="false"><use href="#i-play"></use></svg>
        </m.span>
        <span className="whitespace-nowrap">ابدئي رحلتكِ</span>
      </m.button>

      <a className={`absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] left-1/2 z-2 grid -translate-x-1/2 justify-items-center gap-[.65rem] text-(length:--fs-eyebrow)font-bold
        text-(--color-text-on-dark-muted) transition-colors duration-(--t-fast) ease-(--ease) hover:text-(--color-brand-rose)`}
        href="#about"
        onClick={(e) => {
          const target = document.getElementById('about');
          if (!target) return;
          e.preventDefault();
          navigate({ pathname: '/', hash: '#about' }, { replace: true });
          scrollToNavTarget(target, false);
        }}>
        <span>اكتشفي المزيد</span>
        <span className="relative block h-10 w-px overflow-hidden bg-[color-mix(in_srgb,var(--color-text-on-dark)_28%,transparent)]" aria-hidden="true">
          <m.span className="absolute top-0 left-1/2 -ms-0.5 h-2 w-1 rounded-xs bg-(--color-brand-rose)" animate={dotControls} />
        </span>
      </a>
    </section>
  );
}