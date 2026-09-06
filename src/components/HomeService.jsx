import { useRef } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { assetUrl } from '../lib/asset.js';
import { useFinePointer } from '../motion/pointer.js';
import { easeOut, easeUi, tween } from '../motion/tokens.js';

const HALO = 'M 438 72 C 262 8, 48 96, 64 268 C 80 430, 248 512, 430 456';
const STAGGER = 0.09;
const COPY_START = 0.42;

export default function HomeService({ onOpenBooking }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const inView = useInView(ref, { once: true, amount: 0.28 });
  const show = Boolean(reduce || inView);
  const copyDelay = (i) => (reduce || !show ? 0 : COPY_START + i * STAGGER);
  const motion = (duration, delay = 0) => ({
    ...tween(reduce ? 0 : duration, easeOut),
    delay: reduce ? 0 : delay,
  });

  return (
    <div className="home-train-banner" id="home-training" aria-labelledby="homeCtaTitle" ref={ref}>
      <m.div
        className="home-train-media"
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={motion(0.72)}
      >
        <m.img
          src={assetUrl('/assets/img/home-training.jpg?v=20260827-1149')}
          alt=""
          width="1536"
          height="1024"
          decoding="async"
          initial={false}
          animate={{ scale: show ? 1 : 1.035 }}
          transition={motion(0.72)}
        />
      </m.div>

      <div className="home-train-copy">
        <svg
          className="home-train-halo"
          viewBox="0 0 480 540"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          focusable="false"
        >
          <m.path
            d={HALO}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.15"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={false}
            animate={{ pathLength: show ? 1 : 0 }}
            transition={motion(0.9, 0.12)}
          />
        </svg>

        <div className="home-cta-heading">
          <m.span
            className="home-cta-mark"
            aria-hidden="true"
            initial={false}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={motion(0.52, copyDelay(0))}
          >
            <svg className="ico" viewBox="0 0 24 24">
              <use href="#i-heart"></use>
            </svg>
          </m.span>
          <m.h2
            className="home-cta-title"
            id="homeCtaTitle"
            initial={false}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={motion(0.52, copyDelay(0))}
          >
            من تريدين أن تكوني بعد اليوم؟
          </m.h2>
        </div>

        <m.p
          className="home-cta-copy-text"
          initial={false}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={motion(0.52, copyDelay(1))}
        >
          رحلتكِ نحو النسخة التي تطمحين إليها تبدأ بخطوة واحدة، وجلسة التقييم هي البداية التي نصمّم منها رحلتكِ الخاصة.
        </m.p>

        <m.button
          className="btn home-cta-btn"
          type="button"
          id="bookingOpen"
          data-bk-open
          onClick={onOpenBooking}
          aria-haspopup="dialog"
          aria-controls="bookingModal"
          initial={false}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={motion(0.52, copyDelay(2))}
          whileHover={fine && !reduce ? { y: -2, transition: tween(0.18, easeUi) } : undefined}
          whileTap={!reduce ? { y: 0 } : undefined}
        >
          احجزي جلسة تقييمكِ المجانية
          <svg className="ico btn-ico" aria-hidden="true"><use href="#i-arrow"></use></svg>
        </m.button>
      </div>

      <div className="home-train-flora" aria-hidden="true">
        <svg className="home-train-flora-a" viewBox="0 0 180 160" focusable="false">
          <path d="M86 148 C 40 120, 18 78, 38 42 C 58 8, 96 22, 108 58 C 94 86, 92 118, 86 148 Z" />
          <path d="M108 58 C 128 18, 168 22, 166 62 C 164 96, 132 118, 108 128" />
          <path d="M86 90 C 62 70, 48 42, 70 28" />
        </svg>
        <svg className="home-train-flora-b" viewBox="0 0 140 120" focusable="false">
          <path d="M28 108 C 18 70, 38 22, 78 18 C 112 16, 128 48, 112 78 C 90 104, 52 112, 28 108 Z" />
          <path d="M78 18 C 86 48, 74 82, 52 104" />
        </svg>
      </div>
    </div>
  );
}
