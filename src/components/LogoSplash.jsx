import { useEffect, useRef, useState } from 'react';
import { LOGO_PATHS, LOGO_VIEWBOX } from './logoPaths.js';

const DRAW_MS = 3500;
const HOLD_MS = 700;
const FADE_MS = 400;
const REDUCED_HOLD_MS = 500;

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function LogoSplash({ onDone }) {
  const svgRef = useRef(null);
  const [fading, setFading] = useState(false);
  const finished = useRef(false);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const timers = [];
    let raf = 0;
    let cancelled = false;

    const finish = () => {
      if (finished.current || cancelled) return;
      finished.current = true;
      onDone?.();
    };

    const fadeThenDone = () => {
      if (cancelled) return;
      setFading(true);
      timers.push(window.setTimeout(finish, FADE_MS));
    };

    const showComplete = () => {
      const paths = svgRef.current?.querySelectorAll('path');
      paths?.forEach((path) => {
        path.style.strokeDasharray = 'none';
        path.style.strokeDashoffset = '0';
        path.style.opacity = '1';
      });
    };

    if (reduce) {
      showComplete();
      timers.push(window.setTimeout(fadeThenDone, REDUCED_HOLD_MS));
      return () => {
        cancelled = true;
        timers.forEach((id) => window.clearTimeout(id));
      };
    }

    raf = window.requestAnimationFrame(() => {
      const node = svgRef.current;
      if (!node || cancelled) return;
      const paths = Array.from(node.querySelectorAll('path'));
      if (!paths.length) {
        fadeThenDone();
        return;
      }

      const lengths = paths.map((path) => {
        const len = path.getTotalLength();
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
        path.style.opacity = '1';
        return Math.max(len, 1);
      });

      const totalLen = lengths.reduce((sum, n) => sum + n, 0);
      let elapsedBefore = 0;

      paths.forEach((path, i) => {
        const share = lengths[i] / totalLen;
        const duration = Math.max(DRAW_MS * share, 40);
        const delay = DRAW_MS * (elapsedBefore / totalLen);
        elapsedBefore += lengths[i];
        path.style.transition = `stroke-dashoffset ${duration}ms linear ${delay}ms`;
        path.getBoundingClientRect();
        path.style.strokeDashoffset = '0';
      });

      timers.push(window.setTimeout(fadeThenDone, DRAW_MS + HOLD_MS));
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(raf);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [onDone]);

  return (
    <div
      className={[
        'fixed inset-0 z-10000 grid place-items-center bg-(--section-splash) p-[clamp(1.5rem,5vw,3rem)]',
        fading
          ? 'invisible pointer-events-none opacity-0 [transition:opacity_400ms_var(--ease-out,cubic-bezier(.16,1,.3,1)),visibility_0s_linear_400ms] motion-reduce:[transition:opacity_280ms_ease,visibility_0s_linear_280ms]'
          : 'visible pointer-events-auto opacity-100 [transition:opacity_400ms_var(--ease-out,cubic-bezier(.16,1,.3,1))] motion-reduce:[transition:opacity_280ms_ease]'
      ].join(' ')} role="presentation" aria-hidden="true" inert={fading ? true : undefined}>
      <svg ref={svgRef} className={`block h-auto max-h-[min(62vh,480px)] w-[min(58vw,180px)] overflow-visible min-[760px]:max-h-[min(68vh,560px)] min-[760px]:w-[min(42vw,220px)]
        min-[1100px]:max-h-[min(70vh,600px)] min-[1100px]:w-[min(28vw,240px)]`} viewBox={LOGO_VIEWBOX} xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" focusable="false">
        {LOGO_PATHS.map((d, i) => (
          <path className={`fill-none stroke-(--color-logo-stroke) opacity-0 motion-reduce:opacity-100 motion-reduce:[stroke-dasharray:none] motion-reduce:[stroke-dashoffset:0]
            motion-reduce:transition-none"`} key={i} d={d} fill="none" stroke="#3E190B" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
        ))}
      </svg>
    </div>
  );
}