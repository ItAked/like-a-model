import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { m, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import PinScrollCue from './PinScrollCue.jsx';
import womanSilhouette from '../assets/Woman Silhouette Vector.svg';
import codaPaper from '../assets/about-coda-paper.png';
import { useFinePointer } from '../motion/pointer.js';
import { dur, easeOut, easeUi, tween } from '../motion/tokens.js';

const AboutTl = createContext(null);
const PIN_MQ = '(min-width: 1080px)';

const BEATS = {
  lead: [0, 0.125],
  deco: [0.091, 0.227],
  brand: [0.182, 0.318],
  opener: [0.295, 0.432],
  intro: [0.409, 0.545],
  b1: [0.523, 0.636],
  b2: [0.614, 0.727],
  b3: [0.705, 0.818],
  close: [0.795, 1]
};

function useAboutPin(reduce) {
  const [pin, setPin] = useState(() => !reduce && window.matchMedia(PIN_MQ).matches);
  useEffect(() => {
    const mq = window.matchMedia(PIN_MQ);
    const sync = () => setPin(!reduce && mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [reduce]);
  return pin;
}

function DecisionCheck() {
  return (
    <span className="mt-[calc((1.85em-20px)/2)] size-5 shrink-0 text-inherit" aria-hidden="true">
      <svg className="block size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" focusable="false">
        <path d="M5 12.5 10 17.5 19 6.5" />
      </svg>
    </span>
  );
}

function StoryLine({ as = 'p', from = 0, until, className, children, ...rest }) {
  const tl = useContext(AboutTl);
  const Tag = m[as] || m.p;
  const to = until ?? Math.min(1, from + 0.1);
  const opacity = useTransform(tl.progress, [from, to], [0, 1]);
  const y = useTransform(tl.progress, [from, to], [12, 0]);
  const names = [className, 'about-story-line'].filter(Boolean).join(' ');

  return (
    <Tag className={names} style={tl.pin ? { opacity, y } : { opacity: 1, y: 0 }} {...rest}>
      {children}
    </Tag>
  );
}

const CODA_POINTS = [
  { title: 'أنتِ محور رحلتنا', copy: 'نحن نصمم لكِ لأنكِ أنتِ.', icon: '#i-heart' },
  { title: 'نتائج حقيقية', copy: 'خطط مبنية على العلم والخبرة لتحقيق نتائج تدوم.', icon: '#i-shield' },
  { title: 'تجربة خاصة', copy: 'برامج مصممة لتناسب أهدافكِ وأسلوب حياتكِ.', icon: '#i-diamond' },
  { title: 'دعم متكامل', copy: 'فريق متخصص معكِ في كل خطوة.', icon: '#i-users' }
];

const CODA_LINE = 'M875 20 C790 8 710 32 625 18 C540 6 460 34 375 20 C290 8 210 30 125 20';
const CODA_STACK_MQ = '(max-width: 899px)';
const CODA_TITLE_DUR = 0.32;
const CODA_PATH_DELAY = 0.18;
const CODA_PATH_DUR = 0.78;
const CODA_ICON_DUR = 0.26;
const CODA_TEXT_DUR = 0.28;
const CODA_ICON_LAG = 0.05;
const CODA_TEXT_LAG = 0.08;
const CODA_STOP_AT = [0, 1 / 3, 2 / 3, 1];
const CODA_MOBILE_START = 0.18;
const CODA_MOBILE_STAGGER = 0.18;
const CODA_MOBILE_DUR = 0.4;
const CODA_HOVER_Y = -3;
const CODA_DONE_MS = Math.round((CODA_PATH_DELAY + CODA_PATH_DUR + CODA_TEXT_LAG + CODA_TEXT_DUR) * 1000);
const CODA_MOBILE_DONE_MS = Math.round((CODA_MOBILE_START + CODA_MOBILE_STAGGER * 3 + CODA_MOBILE_DUR) * 1000);

function instant() {
  return tween(0, easeOut);
}

function useCodaStack() {
  const [stack, setStack] = useState(() => window.matchMedia(CODA_STACK_MQ).matches);
  useEffect(() => {
    const mq = window.matchMedia(CODA_STACK_MQ);
    const sync = () => setStack(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return stack;
}

function CodaPoint({ item, index, show, reduce, fine, stacked, hoverReady }) {
  const stopDelay = CODA_PATH_DELAY + CODA_PATH_DUR * CODA_STOP_AT[index];
  const delay = reduce || !show ? 0 : (stacked ? CODA_MOBILE_START + index * CODA_MOBILE_STAGGER : stopDelay);
  const lift = Boolean(hoverReady && fine && !reduce);
  const hide = !show && !reduce;
  const kidsRest = stacked || reduce;

  return (
    <m.li className="about-coda-point relative z-1 flex min-w-0 flex-col items-center px-[clamp(12px,1.8vw,28px)] text-center max-lg:px-(--s-2)" style={{ '--coda-delay': `${delay}s` }}
      initial={stacked && !reduce ? { opacity: 0, y: 12 } : false} animate={stacked ? (hide ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 }) : { opacity: 1, y: 0 }}
      transition={stacked ? { ...tween(reduce ? 0 : CODA_MOBILE_DUR, easeOut), delay } : instant()}
      whileHover={lift ? { y: CODA_HOVER_Y, transition: tween(dur.hover, easeUi) } : undefined}
    >
      <span className="relative z-1 flex h-[calc(var(--coda-disk)+var(--coda-rail))] w-(--coda-disk) flex-none flex-col items-center">
        <m.span className="about-coda-disk grid size-(--coda-disk) place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-primary)_34%,var(--color-white))] text-lam-brown"
          aria-hidden="true" initial={kidsRest ? false : { opacity: 0, scale: 0.88 }} animate={kidsRest || !hide ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
          transition={{
            ...tween(kidsRest ? 0 : CODA_ICON_DUR, easeOut),
            delay: kidsRest || hide ? 0 : stopDelay + CODA_ICON_LAG,
          }}
        >
          <svg className="ico size-[1.85rem] stroke-[1.45] max-lg:size-[1.55rem]"><use href={item.icon}></use></svg>
        </m.span>
        <span className={`absolute top-[calc(var(--coda-disk)+var(--coda-rail)/2)] left-1/2 z-2 size-2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-lam-pill bg-transparent
          shadow-none`} aria-hidden="true">
          <span className={'about-coda-dot-core block size-2 origin-center rounded-[inherit] bg-lam-primary' + (!kidsRest && show ? ' is-pulse' : '')} />
        </span>
      </span>
      <m.strong className="mb-[.4rem] text-[clamp(.98rem,.95rem+.12vw,1.06rem)] leading-[1.35] font-bold text-(--color-text)" initial={kidsRest ? false : { opacity: 0, y: 12 }}
        animate={kidsRest || !hide ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{
          ...tween(kidsRest ? 0 : CODA_TEXT_DUR, easeOut),
          delay: kidsRest || hide ? 0 : stopDelay + CODA_TEXT_LAG,
        }}
      >
        {item.title}
      </m.strong>
      <m.span className="about-coda-copy max-w-66 text-[clamp(.86rem,.84rem+.1vw,.94rem)] leading-[1.65] font-medium text-lam-muted max-lg:max-w-none"
        initial={kidsRest ? false : { opacity: 0, y: 12 }} animate={kidsRest || !hide ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{
          ...tween(kidsRest ? 0 : CODA_TEXT_DUR, easeOut),
          delay: kidsRest || hide ? 0 : stopDelay + CODA_TEXT_LAG,
        }}
      >
        {item.copy}
      </m.span>
    </m.li>
  );
}

function AboutCoda() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const stacked = useCodaStack();
  const inView = useInView(ref, { once: true, amount: 0.28 });
  const show = Boolean(reduce || inView);
  const [hoverReady, setHoverReady] = useState(() => Boolean(reduce));
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const paperY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [7, -7]);

  useEffect(() => {
    if (reduce) {
      setHoverReady(true);
      return undefined;
    }
    if (!show) {
      setHoverReady(false);
      return undefined;
    }
    const ms = stacked ? CODA_MOBILE_DONE_MS : CODA_DONE_MS;
    const id = window.setTimeout(() => setHoverReady(true), ms);
    return () => window.clearTimeout(id);
  }, [reduce, show, stacked]);

  return (
    <section className={`about-coda relative z-1 m-0 w-full overflow-x-hidden bg-(--section-blush) p-0 text-center text-(--color-text) [--coda-disk:clamp(3.65rem,5.6vw,4.75rem)]
      [--coda-rail:2.15rem] [direction:rtl] max-lg:[--coda-disk:3.5rem] max-lg:[--coda-rail:1.35rem]`} ref={ref} aria-label="شريككِ في رحلة التحوّل">
      <m.img className="pointer-events-none absolute inset-0 z-0 size-full select-none object-fill" src={codaPaper} alt="" aria-hidden="true" draggable="false" style={{ y: paperY }} />
      <div className={`relative z-1 mx-auto grid w-full max-w-(--shell) justify-items-stretch gap-[clamp(28px,3.4vw,42px)] px-(--gutter) pt-[clamp(36px,4.6vw,56px)] pb-[clamp(40px,4.4vw,58px)]
        max-lg:gap-7 max-lg:px-[clamp(28px,5vw,36px)] max-lg:py-[clamp(32px,6vw,40px)]`}>
        <m.header className={`about-coda-head mx-auto grid max-w-190 justify-items-center gap-[clamp(2px,.2vw,6px)] text-center text-lam-brown [&>p]:m-0
        [&>p]:text-[clamp(1.875rem,1.78rem+.4vw,2.125rem)] [&>p]:leading-[1.45] [&>p]:font-semibold [&>p]:text-lam-brown max-lg:[&>p]:text-[clamp(1.625rem,1.5rem+.35vw,1.875rem)]`}
          initial={reduce ? false : { opacity: 0, y: 10 }} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={tween(reduce ? 0 : CODA_TITLE_DUR, easeOut)}>
          <p>لسنا مجرد برنامج تدريبي</p>
          <p>نحن شريككِ في رحلة التحوّل</p>
        </m.header>

        <div className="relative mx-auto w-full min-w-0 max-w-7xl overflow-x-hidden">
          <svg className={`pointer-events-none absolute inset-x-0 top-(--coda-disk) z-0 hidden h-(--coda-rail) w-full overflow-visible
            text-[color-mix(in_srgb,var(--color-primary)_78%,var(--color-brown))] [direction:ltr] lg:block`} viewBox="0 0 1000 40" preserveAspectRatio="none" dir="ltr" aria-hidden="true"
            focusable="false">
            <m.path d={CODA_LINE} fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" vectorEffect="non-scaling-stroke"
              initial={{ pathLength: reduce || stacked ? 1 : 0 }} animate={{ pathLength: show ? 1 : 0 }}
              transition={{
                ...tween(reduce || stacked ? 0 : CODA_PATH_DUR, easeOut),
                delay: reduce || stacked || !show ? 0 : CODA_PATH_DELAY
              }}
            />
          </svg>
          <ul className="m-0 grid list-none grid-cols-2 items-start gap-x-(--s-4) gap-y-(--s-7) p-0 text-center [direction:rtl] lg:grid-cols-4 lg:gap-0">
            {CODA_POINTS.map((item, index) => (
              <CodaPoint key={item.title} item={item} index={index} show={show} reduce={Boolean(reduce)} fine={fine} stacked={stacked} hoverReady={hoverReady} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  const trackRef = useRef(null);
  const blockRef = useRef(null);
  const reduce = useReducedMotion();
  const pin = useAboutPin(Boolean(reduce));
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 20%', 'end end']
  });

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return undefined;
    if (!pin) {
      el.classList.add('is-tl-complete');
      el.style.setProperty('--about-tl', '1');
      return undefined;
    }
    el.classList.remove('is-tl-complete');
    const apply = (v) => {
      el.style.setProperty('--about-tl', Math.min(1, Math.max(0, v)).toFixed(4));
    };
    apply(scrollYProgress.get());
    return scrollYProgress.on('change', apply);
  }, [pin, scrollYProgress]);

  const decoOpacity = useTransform(scrollYProgress, BEATS.deco, [0, 1]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [8, -8]);

  return (
    <AboutTl.Provider value={{ progress: scrollYProgress, pin, reduce }}>
      <div className="chapter" id="about">
        <div className="about-track" ref={trackRef}>
          <section className="section section-about bg-[linear-gradient(180deg,var(--section-white)_0%,var(--section-blush)_100%)] pt-(--section-y) pb-29 scroll-mt-(--scroll-offset)"
            id="about-intro" aria-labelledby="aboutTitle">
            <div className="mx-auto w-full max-w-(--shell) px-(--gutter)">
              <StoryLine as="header" className="mb-[clamp(2.5rem,4vw,4rem)] text-center" from={BEATS.lead[0]} until={BEATS.lead[1]}>
                <p className="mb-[.85rem] flex items-center justify-center gap-[.7rem] text-lam-primary" aria-hidden="true">
                  <span className="block h-px w-11 bg-current opacity-72"></span>
                  <svg className="ico size-3.25 fill-current stroke-none" aria-hidden="true"><use href="#i-heart"></use></svg>
                  <span className="block h-px w-11 bg-current opacity-72"></span>
                </p>
                <h2 className="font-lam-heading text-(length:--fs-h2) leading-[1.3] font-bold text-(--color-text)" id="aboutTitle">من نحن</h2>
                <p className="mt-[.9rem] text-(length:--fs-body) font-medium text-lam-muted">خبرة تمتد لأكثر من ٢٠ عامًا</p>
              </StoryLine>

              <div className="relative z-1 isolate">
                <m.div className={`about-deco pointer-events-none absolute inset-y-0 inset-s-auto inset-e-0 z-0 grid w-[min(36%,20rem)] place-items-center max-md:top-0
                  max-md:w-[min(58%,14.5rem)]`} aria-hidden="true" style={pin ? { opacity: decoOpacity } : { opacity: 1 }}>
                  <m.img className="relative z-1 h-auto max-h-full w-[min(100%,18.5rem)] object-contain object-left opacity-20 aspect-1024/1536 max-md:opacity-10" src={womanSilhouette}
                    alt="" width="1024" height="1536" draggable="false" style={{ y: pin ? watermarkY : 0 }} />
                </m.div>
                <div className="relative z-2 max-w-160">
                  <StoryLine className="lam mb-[clamp(1.1rem,2vw,1.6rem)] font-lam-brand text-(length:--fs-display) leading-[1.15] font-semibold tracking-[-.02em] text-(--color-text)"
                    lang="en" from={BEATS.brand[0]} until={BEATS.brand[1]}>Like A Model</StoryLine>

                  <div className="about-editorial relative z-1 grid grid-cols-[8px_minmax(0,1fr)] items-stretch gap-x-[.85rem]" data-timeline ref={blockRef}>
                    <div className="about-timeline relative min-h-full" aria-hidden="true">
                      <span className="about-tl-track absolute top-1 bottom-1 left-1/2 w-px -translate-x-1/2 bg-[color-mix(in_srgb,var(--color-brand-rose)_68%,transparent)]"></span>
                      <span className="about-tl-progress absolute top-1 left-1/2 h-[calc((100%-8px)*var(--about-tl))] w-[1.5px] -translate-x-1/2 bg-lam-primary"></span>
                      <span className="about-tl-start absolute top-0 left-1/2 z-1 size-1.75 -translate-x-1/2 rounded-lam-pill bg-(--color-brand-rose)"></span>
                      <span className="about-tl-head absolute top-[calc(4px+(100%-8px)*var(--about-tl)-3.5px)] left-1/2 z-1 size-1.75 -translate-x-1/2 rounded-lam-pill bg-lam-primary"></span>
                    </div>
                    <div className="grid min-w-0 content-start">
                      <StoryLine className="mb-[.85rem] max-w-xl text-start text-(length:--fs-title) leading-[1.75] font-bold text-(--color-text)" from={BEATS.opener[0]}
                        until={BEATS.opener[1]}>رحلة تحوّل مصممة خصيصًا لكِ.</StoryLine>
                      <StoryLine className="max-w-xl text-start text-(length:--fs-body) leading-8 text-lam-muted" from={BEATS.intro[0]} until={BEATS.intro[1]}>في <bdi className="lam"
                        lang="en">Like A Model</bdi> نؤمن أن التحول الحقيقي لا يبدأ من الميزان، بل من القرار.</StoryLine>
                      <ul>
                        <StoryLine as="li" className="mt-[.15rem] flex items-start gap-x-2 text-(--color-text) [&>span:last-child]:min-w-0" from={BEATS.b1[0]} until={BEATS.b1[1]}>
                          <DecisionCheck />
                          <span>قرار الاهتمام بنفسك.</span>
                        </StoryLine>
                        <StoryLine as="li" className="mt-[.15rem] flex items-start gap-x-2 text-(--color-text) [&>span:last-child]:min-w-0" from={BEATS.b2[0]} until={BEATS.b2[1]}>
                          <DecisionCheck />
                          <span>قرار الاستثمار في صحتك.</span>
                        </StoryLine>
                        <StoryLine as="li" className="mt-[.15rem] flex items-start gap-x-2 text-(--color-text) [&>span:last-child]:min-w-0" from={BEATS.b3[0]} until={BEATS.b3[1]}>
                          <DecisionCheck />
                          <span>قرار بناء أسلوب حياة يمنحك المزيد من القوة والثقة والتوازن.</span>
                        </StoryLine>
                      </ul>
                      <StoryLine className="mt-[1.35rem] max-w-xl text-start text-(length:--fs-body) leading-8 text-lam-muted" from={BEATS.close[0]} until={BEATS.close[1]}>لهذا صممنا تجربة متكاملة ترافقك في كل خطوة، من التقييم الأول وحتى تحقيق أهدافك، من خلال التدريب الشخصي، والتغذية، والمتابعة المستمرة، ضمن رحلة تناسب احتياجاتك وأسلوب حياتك.</StoryLine>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {pin ? <PinScrollCue /> : null}
          </section>
        </div>

        <AboutCoda />
      </div>
    </AboutTl.Provider>
  );
}