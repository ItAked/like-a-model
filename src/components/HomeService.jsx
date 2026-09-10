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
    <div className={`relative z-2 isolate grid min-h-0 w-full grid-cols-[minmax(0,1.22fr)_minmax(18.5rem,.86fr)] items-stretch overflow-hidden border-0
    bg-[radial-gradient(ellipse_70%_55%_at_100%_100%,color-mix(in_srgb,var(--color-primary)_12%,transparent),transparent_62%),radial-gradient(ellipse_46%_36%_at_78%_18%,
    color-mix(in_srgb,var(--color-primary)_7%,transparent),transparent_70%)] bg-(--section-cream) pt-[clamp(2.5rem,4vw,4rem)] pb-[clamp(3rem,4vw,4.5rem)] shadow-none [direction:ltr]
    max-lg:grid-cols-1 max-lg:pt-[clamp(1.75rem,5vw,2.5rem)] max-lg:pb-10`} id="home-training" aria-labelledby="homeCtaTitle" ref={ref}>
      <m.div
        className={`home-train-media pointer-events-none relative z-1 min-h-[clamp(26rem,34vw,32rem)] w-full self-stretch overflow-hidden max-lg:h-[clamp(15.5rem,58vw,20rem)]
          max-lg:min-h-[clamp(15.5rem,58vw,20rem)]`} initial={false} animate={{ opacity: show ? 1 : 0 }} transition={motion(0.72)}>
        <m.img className="absolute inset-0 block size-full max-w-none origin-[38%_52%] object-cover object-[18%_48%] max-lg:object-[10%_40%]"
          src={assetUrl('/assets/img/home-training.jpg?v=20260827-1149')} alt="" width="1536" height="1024" decoding="async" initial={false} animate={{ scale: show ? 1 : 1.035 }}
          transition={motion(0.72)} />
      </m.div>

      <div className={`relative z-2 flex flex-col items-start justify-center gap-0 bg-transparent py-0 ps-[clamp(4rem,9vw,11rem)] pe-[clamp(1.4rem,4vw,3.25rem)] text-start [direction:rtl]
        max-lg:px-(--gutter) max-lg:pt-[1.15rem] max-lg:pb-0`}>
        <svg className={`pointer-events-none absolute top-[4%] inset-s-[-18%] z-0 h-[min(36rem,92%)] w-[min(34rem,108%)] text-[color-mix(in_srgb,var(--color-primary)_42%,var(--color-white))]
          opacity-70 max-lg:top-[-6%] max-lg:inset-s-[-8%] max-lg:h-[min(22rem,78%)] max-lg:w-[min(22rem,92%)] max-lg:opacity-50`} viewBox="0 0 480 540" preserveAspectRatio="xMidYMid meet"
          aria-hidden="true" focusable="false">
          <m.path d={HALO} fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" vectorEffect="non-scaling-stroke" initial={false} animate={{ pathLength: show ? 1 : 0 }}
            transition={motion(0.9, 0.12)} />
        </svg>

        <div className="relative z-1 mb-5.5 inline-block max-w-[min(36rem,100%)] pt-[.45rem] max-lg:max-w-none">
          <m.span className="home-cta-mark absolute top-[-.15rem] inset-s-[-.05rem] m-0 leading-none text-[color-mix(in_srgb,var(--color-primary)_78%,var(--color-brown))] opacity-78"
            aria-hidden="true" initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={motion(0.52, copyDelay(0))}>
            <svg className="ico size-[.72rem]" viewBox="0 0 24 24">
              <use href="#i-heart"></use>
            </svg>
          </m.span>
          <m.h2 className="home-cta-title max-w-[min(36rem,100%)] font-lam-heading text-(length:--fs-h2) leading-[1.35] font-bold text-(--color-text) max-lg:max-w-none" id="homeCtaTitle"
            initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={motion(0.52, copyDelay(0))}>
            من تريدين أن تكوني بعد اليوم؟
          </m.h2>
        </div>

        <m.p className="home-cta-copy-text relative z-1 mb-7.5 max-w-xl text-start text-(length:--fs-body) leading-[1.8] text-lam-muted max-lg:max-w-none" initial={false}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={motion(0.52, copyDelay(1))}>
          رحلتكِ نحو النسخة التي تطمحين إليها تبدأ بخطوة واحدة، وجلسة التقييم هي البداية التي نصمّم منها رحلتكِ الخاصة.
        </m.p>

        <m.button className={`home-cta-btn relative z-1 inline-flex min-h-11.5 w-auto items-center justify-center gap-[.6rem] rounded-lam-pill border-0 bg-lam-primary px-[1.4rem] py-[.65rem]
          text-center text-(length:--fs-ui) leading-[1.2] font-bold text-white shadow-none transition-colors duration-(--t-btn) ease-(--ease) hover:bg-(--color-btn-primary-hover)
        hover:text-white active:bg-(--color-btn-primary-active) active:text-white`} type="button" id="bookingOpen" data-bk-open onClick={onOpenBooking} aria-haspopup="dialog"
          aria-controls="bookingModal" initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={motion(0.52, copyDelay(2))}
          whileHover={fine && !reduce ? { y: -2, transition: tween(0.18, easeUi) } : undefined} whileTap={!reduce ? { y: 0 } : undefined}>
          احجزي جلسة تقييمكِ المجانية
          <svg className="ico btn-ico" aria-hidden="true"><use href="#i-arrow"></use></svg>
        </m.button>
      </div>

      <div className={`pointer-events-none absolute -inset-e-6 bottom-[clamp(3rem,4vw,4.5rem)] z-1 h-[min(14rem,28vw)] w-[min(18rem,34vw)] overflow-hidden max-lg:-inset-e-4 max-lg:bottom-10
        max-lg:h-[min(8.5rem,34vw)] max-lg:w-[min(11rem,46vw)]`} aria-hidden="true">
        <svg className={`absolute inset-e-[4%] bottom-[6%] h-auto w-[78%] rotate-[-18deg] fill-[color-mix(in_srgb,var(--color-primary)_38%,var(--color-brown))] stroke-none opacity-22
          blur-lg max-lg:opacity-16 max-lg:blur-[14px]`} viewBox="0 0 180 160" focusable="false">
          <path d="M86 148 C 40 120, 18 78, 38 42 C 58 8, 96 22, 108 58 C 94 86, 92 118, 86 148 Z" />
          <path d="M108 58 C 128 18, 168 22, 166 62 C 164 96, 132 118, 108 128" />
          <path d="M86 90 C 62 70, 48 42, 70 28" />
        </svg>
        <svg className={`absolute inset-e-[28%] bottom-[-8%] h-auto w-[58%] rotate-22 fill-[color-mix(in_srgb,var(--color-primary)_38%,var(--color-brown))] stroke-none opacity-16 blur-lg
          max-lg:blur-[14px]`} viewBox="0 0 140 120" focusable="false">
          <path d="M28 108 C 18 70, 38 22, 78 18 C 112 16, 128 48, 112 78 C 90 104, 52 112, 28 108 Z" />
          <path d="M78 18 C 86 48, 74 82, 52 104" />
        </svg>
      </div>
    </div>
  );
}