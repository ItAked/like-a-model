import { useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { assetUrl } from '../lib/asset.js';
import { useFinePointer } from '../motion/pointer.js';
import { dur, easeOut, easeUi, inViewOnce, tween } from '../motion/tokens.js';

const MotionLink = m.create(Link);

const START = [
  {
    story: 'body-sculpt', to: '/stories?goal=body-toning', img: '/assets/img/goal-body-toning.png', imageClass: 'object-[62%_28%]', alt: 'تمارين نحت القوام بأشرطة مقاومة في استوديو بيلاتس',
    icon: '#i-sparkle', title: 'نحت القوام'
  },
  {
    story: 'bride', to: '/stories?goal=bridal', img: '/assets/img/goal-bridal-glow.png', imageClass: 'object-[48%_14%]', alt: 'استعداد هادئ لتألّق يوم الزفاف', icon: '#i-crown',
    title: 'تألق العروس'
  },
  {
    story: 'pregnancy', to: '/stories?goal=pregnancy', img: '/assets/img/goal-pregnancy-wellness.png', imageClass: 'object-[50%_20%]', alt: 'حركة هادئة تدعم الحمل الصحي', icon: '#i-bloom',
    title: 'الحمل الصحي'
  },
  {
    story: 'bariatric', to: '/stories?goal=bariatric', img: '/assets/img/goal-post-bariatric.png', imageClass: 'object-[52%_22%]', alt: 'خطوة واثقة في رحلة التحوّل بعد التكميم',
    icon: '#i-transform', title: 'بعد التكميم'
  },
];

const END = [
  {
    story: 'fat-loss', to: '/stories?goal=fat-loss', img: '/assets/img/goal-fat-loss.png', imageClass: 'object-[50%_24%]', alt: 'تدريب يركّز على خسارة الدهون في استوديو نسائي هادئ',
    icon: '#i-flame', title: 'خسارة الدهون'
  },
  {
    story: 'muscle-building', to: '/stories?goal=muscle-building', img: '/assets/img/goal-muscle-building.png', imageClass: 'object-[52%_28%]', alt: 'تمرين قوة لبناء العضلات بأوزان خفيفة',
    icon: '#i-dumbbell', title: 'بناء العضلات'
  },
  {
    story: 'postpartum', to: '/stories?goal=postpartum', img: '/assets/img/goal-postpartum.png', imageClass: 'object-[48%_20%]', alt: 'تمارين لطيفة لدعم الجسم بعد الولادة', icon: '#i-baby',
    title: 'ما بعد الولادة'
  },
  {
    story: 'lifestyle', to: '/stories?goal=healthy-lifestyle', img: '/assets/img/goal-healthy-lifestyle.png', imageClass: 'object-[58%_42%]', alt: 'عادات يومية لنمط حياة صحي في المطبخ',
    icon: '#i-leaf', title: 'نمط الحياة الصحي'
  },
];

function StoryCard({ shown, delay, item, tone }) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [hov, setHov] = useState(false);
  const lift = Boolean(fine && !reduce && hov);

  return (
    <MotionLink
      className={`group relative isolate flex h-full min-h-[6.35rem] min-w-0 cursor-pointer flex-row overflow-hidden rounded-2xl border border-[rgba(68,35,26,.14)]
        bg-[color-mix(in_srgb,var(--color-primary-soft)_35%,var(--color-white))] p-0 text-lam-brown no-underline shadow-[0_10px_26px_rgba(68,35,26,.10)]
        transition-[box-shadow,border-color] duration-180 ease-(--ease) after:pointer-events-none after:absolute after:inset-0 after:z-1 after:content-['']
        focus-visible:z-2 focus-visible:rounded-2xl focus-visible:border-[rgba(68,35,26,.14)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-lam-primary
        focus-visible:shadow-[0_16px_34px_rgba(68,35,26,.16)] hover:z-2 hover:shadow-[0_16px_34px_rgba(68,35,26,.16)] max-[479px]:min-h-[5.85rem] motion-reduce:transition-none
        ${tone === 'end' ? 'after:bg-[linear-gradient(270deg,rgba(255,252,250,.78)_0%,rgba(255,252,250,.58)_36%,rgba(255,252,250,.18)_58%,rgba(255,252,250,0)_78%)]' :
          'after:bg-[linear-gradient(90deg,rgba(255,252,250,.78)_0%,rgba(255,252,250,.58)_36%,rgba(255,252,250,.18)_58%,rgba(255,252,250,0)_78%)]'}`}
      data-story={item.story}
      to={item.to}
      initial={false}
      animate={shown ? { opacity: 1, y: lift ? -2 : 0 } : { opacity: 0, y: 12 }}
      transition={
        shown && lift ? tween(dur.hover, easeUi) : { ...tween(reduce ? 0 : 0.5, easeOut), delay: reduce || !shown ? 0 : delay }
      } onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)} onFocus={() => setHov(true)} onBlur={() => setHov(false)}>
      <span className="pointer-events-none absolute inset-0 z-0 min-w-0 overflow-hidden rounded-[inherit] bg-lam-blush">
        <m.img className={`absolute inset-0 block h-full w-full max-w-none object-cover ${item.imageClass}`} src={assetUrl(item.img)} alt={item.alt} width={item.wide ? 960 : 640}
          height={item.wide ? 640 : 960} loading="lazy" onError={(e) => { e.currentTarget.hidden = true; }} initial={false} animate={{ scale: lift ? 1.02 : 1.01 }}
          transition={tween(reduce ? 0 : dur.hover, easeUi)} />
      </span>
      <span className={`relative z-2 flex w-auto max-w-46 flex-none self-center flex-col items-start justify-center gap-[.28rem] bg-transparent px-5.5 py-4.5
        ${tone === 'start' ? 'ms-auto' : tone === 'end' ? 'me-auto' : 'mr-auto'}`}>
        <svg className={`ico relative z-1 h-[1.12rem] w-[1.12rem] text-lam-primary filter-[drop-shadow(0_1px_8px_rgba(255,252,250,.55))] transition-[color,filter] duration-(--t-med)
          ease-(--ease) group-hover:text-lam-brown group-focus-visible:text-lam-brown`} aria-hidden="true"><use href={item.icon}></use></svg>
        <span className={`relative z-1 block font-lam-heading text-(length:--fs-h3) leading-[1.35] font-bold text-lam-primary [text-shadow:0_1px_8px_rgba(255,252,250,.55)]
          transition-[color,filter] duration-(--t-med) ease-(--ease) group-hover:text-lam-brown group-focus-visible:text-lam-brown`}>{item.title}</span>
        <svg className={`ico relative z-1 mt-[.12rem] h-[.82rem] w-[.82rem] text-lam-primary opacity-90 filter-[drop-shadow(0_1px_8px_rgba(255,252,250,.55))] transition-[color,filter]
          duration-(--t-med) ease-(--ease) group-hover:text-lam-brown group-focus-visible:text-lam-brown`} aria-hidden="true"><use href="#i-arrow"></use></svg>
      </span>
    </MotionLink>
  );
}

export default function TransformationStories() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, inViewOnce);
  const show = reduce || inView;
  const later = (ms) => (reduce || !show ? 0 : ms);

  return (
    <div className="block scroll-mt-(--scroll-offset)" id="stories">
      <section className={`relative scroll-mt-(--scroll-offset) overflow-hidden bg-[linear-gradient(180deg,var(--section-blush)_0%,var(--section-cream)_100%)] pt-(--section-gap)
        pb-(--section-y)`} aria-labelledby="storiesTitle" ref={ref}>
        <div className="relative z-1 mx-auto w-full max-w-(--shell) px-(--gutter)">
          <header className="mx-auto mb-[clamp(1.75rem,3vw,2.5rem)] max-w-208 text-center">
            <p className="mb-[.85rem] flex items-center justify-center gap-[.7rem] text-lam-primary" aria-hidden="true">
              <span className="block h-px w-11 bg-current opacity-72"></span>
              <svg className="ico h-3.25 w-3.25 fill-current stroke-none" aria-hidden="true"><use href="#i-heart"></use></svg>
              <span className="block h-px w-11 bg-current opacity-72"></span>
            </p>
            <m.h2 className="font-lam-heading text-(length:--fs-h2) leading-[1.3] font-bold text-lam-brown text-balance [&_em]:text-lam-primary" id="storiesTitle" initial={false}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ ...tween(reduce ? 0 : 0.48, easeOut), delay: later(0) }}>
              قصص بدأت <em>بقرار</em>
            </m.h2>
            <m.p className="mx-auto mt-5 max-w-xl text-center text-(length:--fs-body) leading-[1.85] font-(--w-body) text-lam-muted" initial={false}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }} transition={{ ...tween(reduce ? 0 : 0.48, easeOut), delay: later(0.08) }}>
              كل قصة هنا كانت يومًا في نفس نقطة البداية التي تقفين عندها اليوم.<br />اكتشفي كيف تحوّلت قراراتهن إلى حياة جديدة.
            </m.p>
          </header>

          <div className="flex min-h-0 flex-col gap-[.7rem] lg:grid lg:min-h-[min(78vh,50rem)] lg:grid-cols-3 lg:items-stretch lg:gap-[.78rem]">
            <div className="flex min-w-0 flex-col gap-[.7rem] lg:grid lg:grid-rows-4 lg:gap-[.78rem]">
              {START.map((item, i) => (
                <StoryCard key={item.story} shown={show} delay={i * 0.05} item={item} tone="start" />
              ))}
            </div>

            <div className="order-first grid min-w-0 grid-rows-[auto_auto] gap-[.7rem] overflow-visible lg:order-0 lg:grid-rows-[minmax(0,3fr)_minmax(0,1fr)] lg:gap-[.78rem]">
              <MotionLink className={`flex h-auto min-h-0 min-w-0 flex-col items-center justify-center gap-[.2rem] overflow-visible border-0 bg-transparent p-0 text-inherit
                no-underline shadow-none focus-visible:rounded-lg focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-lam-primary lg:h-full`}
                to="/start-your-journey" initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ ...tween(reduce ? 0 : 0.52, easeOut), delay: later(0.2) }}>
                <img className="pointer-events-none block h-auto max-h-105 w-auto max-w-[80%] flex-none object-contain object-bottom"
                  src={assetUrl('/assets/img/stories/story-center-figure.png')} alt="امرأة تنظر بأمل نحو قصتها القادمة" width="607" height="1024" loading="lazy" />
                <span className="flex flex-none flex-col items-center bg-transparent pb-[.15rem] text-center">
                  <span className="text-[.98rem] leading-[1.45] font-bold text-lam-brown">ابحثي عن قصة</span>
                  <span className="mt-[.08rem] flex flex-col items-center text-[1.22rem] leading-[1.3] font-bold text-lam-primary-active">تشبه قصتكِ
                    <svg className="block h-[.72rem] w-19 text-lam-primary-active" viewBox="0 0 88 14" aria-hidden="true" focusable="false">
                      <path d="M5 9.5c16 6.5 52 6.5 78-5" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round" />
                    </svg>
                  </span>
                </span>
              </MotionLink>
              <StoryCard shown={show} delay={0.25}
                item={{
                  story: 'wellness',
                  to: '/stories?goal=health-fitness',
                  img: '/assets/img/goal-health-fitness.png',
                  alt: 'استوديو عافية هادئ بإضاءة طبيعية دافئة',
                  icon: '#i-heart',
                  title: 'الصحة واللياقة',
                  wide: true,
                  imageClass: 'object-[40%_48%]'
                }} tone="wellness" />
            </div>

            <div className="flex min-w-0 flex-col gap-[.7rem] lg:grid lg:grid-rows-4 lg:gap-[.78rem]">
              {END.map((item, i) => (
                <StoryCard key={item.story} shown={show} delay={i * 0.05} item={item} tone="end" />
              ))}
            </div>
          </div>

          <m.aside className="mt-[clamp(1.25rem,2.8vw,1.85rem)] border-0 bg-transparent p-0 text-center text-(length:--fs-body) leading-[1.75] text-lam-muted shadow-none" initial={false}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ ...tween(reduce ? 0 : 0.52, easeOut), delay: later(0.32) }}>
            <p>كل قرار صغير اليوم... قد يكون البداية لحياة جديدة لا تتخيلينها.</p>
            <p className="mt-[.2rem] text-[1.05rem] font-bold text-lam-primary">ما قصتكِ القادمة؟</p>
          </m.aside>
        </div>
      </section>
    </div>
  );
}