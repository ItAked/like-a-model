import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const REST_OPACITY = 0.66;
const SUPPORT_REST_OPACITY = 0.84;
const PULSE_FIRST_MS = 900;
const PULSE_EVERY_MS = 3600;

/** Desktop pin cue. Two downward dot travels on first sight, then an occasional pulse until the pin exits. */
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
  const live = Boolean(settled && hold > 0.4 && !reduce);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (el.closest('.section-support')) setRestOp(SUPPORT_REST_OPACITY);
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
    run && !reduce ? 'is-run' : '',
    settled ? 'is-settled' : '',
    pulse && live ? 'is-pulse' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={names}
      style={{ opacity }}
      aria-hidden="true"
    >
      <span className="pin-scroll-cue__lbl">مرّري لاكتشاف التفاصيل</span>
      <span className="pin-scroll-cue__track">
        <span className="pin-scroll-cue__line"></span>
        <span
          className="pin-scroll-cue__nub"
          onAnimationEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.animationName !== 'pin-cue-dot') return;
            setSettled(true);
          }}
        >
          <span className="pin-scroll-cue__halo"></span>
          <span className="pin-scroll-cue__dot"></span>
        </span>
      </span>
    </div>
  );
}
