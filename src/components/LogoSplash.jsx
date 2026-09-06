import { useEffect, useRef, useState } from 'react';
import { LOGO_PATHS, LOGO_VIEWBOX } from './logoPaths.js';

const DRAW_MS = 3500;
const HOLD_MS = 700;
const FADE_MS = 400;
const REDUCED_HOLD_MS = 500;

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Logo splash on every full page load: stroke-draws the centerline mark
 * from the lower body upward, then fades into the site.
 */
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
      className={'logo-splash' + (fading ? ' is-fading' : '')}
      role="presentation"
      aria-hidden="true"
      inert={fading ? true : undefined}
    >
      <svg
        ref={svgRef}
        className="logo-splash-mark"
        viewBox={LOGO_VIEWBOX}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {LOGO_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="#3E190B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
          />
        ))}
      </svg>
    </div>
  );
}
