import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const REST_OPACITY = 0.66;
const SUPPORT_REST_OPACITY = 0.84;
const PULSE_FIRST_MS = 900;
const PULSE_EVERY_MS = 3600;

export default function PinScrollCue() {
  const ref = useRef(null);
  const holdRef = useRef(0);
  const started = useRef(false);
  const reduce = useReducedMotion();
  const [run, setRun] = useState(false);
  const [settled, setSettled] = useState(() => Boolean(reduce));
  const [pulse, setPulse] = useState(false);
  const [hold, setHold] = useState(0);
  const [restOp, setRestOp] = useState(REST_OPACITY);
  const [support, setSupport] = useState(false);
  const live = Boolean(settled && hold > 0.4 && !reduce);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (el.closest('.section-support')) {
      setSupport(true);
      setRestOp(SUPPORT_REST_OPACITY);
    }
    const track = el.closest('.about-track, .support-track');
    if (!track) return undefined;

    const tryStart = () => {
      if (reduce || started.current) return;
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || holdRef.current < 0.45) return;
      const box = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (box.bottom < 8 || box.top > vh - 8) return;
      started.current = true;
      setRun(true);
    };

    const update = () => {
      const box = track.getBoundingClientRect();
      const vh = window.innerHeight;
      if (box.top > 2) {
        holdRef.current = 0;
        setHold(0);
        return;
      }
      let next = 1;
      if (box.bottom < vh - 2) {
        const span = Math.max(64, vh * 0.22);
        next = Math.min(1, Math.max(0, 1 - (vh - 2 - box.bottom) / span));
      }
      holdRef.current = next;
      setHold(next);
      tryStart();
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [reduce]);

  useEffect(() => {
    if (reduce) setSettled(true);
  }, [reduce]);

  useEffect(() => {
    if (!live) {
      setPulse(false);
      return undefined;
    }
    let timeoutId = 0;
    let rafId = 0;
    const beat = () => {
      setPulse(false);
      rafId = window.requestAnimationFrame(() => {
        setPulse(true);
        timeoutId = window.setTimeout(beat, PULSE_EVERY_MS);
      });
    };
    timeoutId = window.setTimeout(beat, PULSE_FIRST_MS);
    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(rafId);
    };
  }, [live]);

  const opacity = hold * (settled || reduce ? restOp : 1);
  const names = [
    'pin-scroll-cue',
    'absolute top-[calc(100svh-5.15rem-env(safe-area-inset-bottom,0px))] left-1/2 z-[4] justify-items-center gap-[.4rem] whitespace-nowrap font-lam-ar text-(length:--fs-eyebrow) leading-[1.35] font-(--w-body) pointer-events-none [translate:-50%_-100%]',
    support ? '[color:color-mix(in_srgb,var(--color-primary)_38%,var(--color-brown))]' : 'text-lam-subtle',
    run && !reduce ? 'is-run' : '',
    settled ? 'is-settled' : '',
    pulse && live ? 'is-pulse' : '',
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={names} style={{ opacity }} aria-hidden="true">
      <span>مرّري لاكتشاف التفاصيل</span>
      <span className="pin-scroll-cue__track relative h-9 w-1.5">
        <span className={`pin-scroll-cue__line absolute inset-y-0 left-1/2 ml-[-.5px] w-px ${support ? 'bg-lam-primary' : 'bg-[color-mix(in_srgb,var(--color-brand-rose)_88%,transparent)]'}`}>
        </span>
        <span className="pin-scroll-cue__nub absolute top-0 left-1/2 size-1.25 ml-[-2.5px]"
          onAnimationEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.animationName !== 'pin-cue-dot') return;
            setSettled(true);
          }}
        >
          <span className={`pin-scroll-cue__halo pointer-events-none absolute top-1/2 left-1/2 size-3.5 rounded-lam-pill opacity-0 m-[-7px_0_0_-7px]
            ${support ? 'bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-primary)_40%,transparent)_0%,color-mix(in_srgb,var(--color-primary)_12%,transparent)_55%,transparent_72%)]'
            : 'bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-brand-rose)_42%,transparent)_0%,color-mix(in_srgb,var(--color-brand-rose)_12%,transparent)_55%,transparent_72%)]'}`}>
              
            </span>
          <span className={`pin-scroll-cue__dot absolute inset-0 rounded-lam-pill ${support ? 'bg-lam-primary' : 'bg-(--color-brand-rose)'}`}></span>
        </span>
      </span>
    </div>
  );
}