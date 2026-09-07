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
  close: [0.795, 1],
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
    <span className="about-decision-ico" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" focusable="false">
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
    <Tag
      className={names}
      style={tl.pin ? { opacity, y } : { opacity: 1, y: 0 }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const CODA_POINTS = [
  { title: 'أنتِ محور رحلتنا', copy: 'نحن نصمم لكِ لأنكِ أنتِ.', icon: '#i-heart' },
  { title: 'نتائج حقيقية', copy: 'خطط مبنية على العلم والخبرة لتحقيق نتائج تدوم.', icon: '#i-shield' },
  { title: 'تجربة خاصة', copy: 'برامج مصممة لتناسب أهدافكِ وأسلوب حياتكِ.', icon: '#i-diamond' },
  { title: 'دعم متكامل', copy: 'فريق متخصص معكِ في كل خطوة.', icon: '#i-users' },
];

/* RTL: starts at the right-hand station and flows left through 12.5 / 37.5 / 62.5 / 87.5. */
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
  const delay = reduce || !show ? 0 : (stacked
    ? CODA_MOBILE_START + index * CODA_MOBILE_STAGGER
    : stopDelay);
  const lift = Boolean(hoverReady && fine && !reduce);
  const hide = !show && !reduce;
  const kidsRest = stacked || reduce;

  return (
    <m.li
      className="about-coda-point"
      style={{ '--coda-delay': `${delay}s` }}
      initial={stacked && !reduce ? { opacity: 0, y: 12 } : false}
      animate={stacked
        ? (hide ? { opacity: 0, y: 12 } : { opacity: 1, y: 0 })
        : { opacity: 1, y: 0 }}
      transition={stacked
        ? { ...tween(reduce ? 0 : CODA_MOBILE_DUR, easeOut), delay }
        : instant()}
      whileHover={lift ? { y: CODA_HOVER_Y, transition: tween(dur.hover, easeUi) } : undefined}
    >
      <span className="about-coda-station">
        <m.span
          className="about-coda-disk"
          aria-hidden="true"
          initial={kidsRest ? false : { opacity: 0, scale: 0.88 }}
          animate={kidsRest || !hide ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 }}
          transition={{
            ...tween(kidsRest ? 0 : CODA_ICON_DUR, easeOut),
            delay: kidsRest || hide ? 0 : stopDelay + CODA_ICON_LAG,
          }}
        >
          <svg className="ico"><use href={item.icon}></use></svg>
        </m.span>
        <span className="about-coda-dot" aria-hidden="true">
          <span
            className={'about-coda-dot-core' + (!kidsRest && show ? ' is-pulse' : '')}
          />
        </span>
      </span>
      <m.strong
        initial={kidsRest ? false : { opacity: 0, y: 12 }}
        animate={kidsRest || !hide ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{
          ...tween(kidsRest ? 0 : CODA_TEXT_DUR, easeOut),
          delay: kidsRest || hide ? 0 : stopDelay + CODA_TEXT_LAG,
        }}
      >
        {item.title}
      </m.strong>
      <m.span
        className="about-coda-copy"
        initial={kidsRest ? false : { opacity: 0, y: 12 }}
        animate={kidsRest || !hide ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
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
    offset: ['start end', 'end start'],
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
    <section
      className="about-coda"
      ref={ref}
      aria-label="شريككِ في رحلة التحوّل"
    >
      <m.img
        className="about-coda-paper"
        src={codaPaper}
        alt=""
        aria-hidden="true"
        draggable="false"
        style={{ y: paperY }}
      />
      <div className="about-coda-inner">
        <m.header
          className="about-coda-head"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={tween(reduce ? 0 : CODA_TITLE_DUR, easeOut)}
        >
          <p>لسنا مجرد برنامج تدريبي</p>
          <p>نحن شريككِ في رحلة التحوّل</p>
        </m.header>

        <div className="about-coda-trail">
          <svg
            className="about-coda-line"
            viewBox="0 0 1000 40"
            preserveAspectRatio="none"
            dir="ltr"
            aria-hidden="true"
            focusable="false"
          >
            <m.path
              d={CODA_LINE}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: reduce || stacked ? 1 : 0 }}
              animate={{ pathLength: show ? 1 : 0 }}
              transition={{
                ...tween(reduce || stacked ? 0 : CODA_PATH_DUR, easeOut),
                delay: reduce || stacked || !show ? 0 : CODA_PATH_DELAY,
              }}
            />
          </svg>
          <ul className="about-coda-points">
            {CODA_POINTS.map((item, index) => (
              <CodaPoint
                key={item.title}
                item={item}
                index={index}
                show={show}
                reduce={Boolean(reduce)}
                fine={fine}
                stacked={stacked}
                hoverReady={hoverReady}
              />
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
    offset: ['start 20%', 'end end'],
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
        <section className="section section-about" id="about-intro" aria-labelledby="aboutTitle">
          <div className="shell">
            <StoryLine as="header" className="about-lead" from={BEATS.lead[0]} until={BEATS.lead[1]}>
              <p className="sec-ornament" aria-hidden="true">
                <span className="sec-ornament-line"></span>
                <svg className="ico" aria-hidden="true"><use href="#i-heart"></use></svg>
                <span className="sec-ornament-line"></span>
              </p>
              <h2 className="about-lead-title" id="aboutTitle">من نحن</h2>
              <p className="about-lead-sub">خبرة تمتد لأكثر من ٢٠ عامًا</p>
            </StoryLine>

            <div className="about-body">
              <m.div
                className="about-deco"
                aria-hidden="true"
                style={pin ? { opacity: decoOpacity } : { opacity: 1 }}
              >
                <m.img
                  className="about-logo-watermark"
                  src={womanSilhouette}
                  alt=""
                  width="1024"
                  height="1536"
                  draggable="false"
                  style={{ y: pin ? watermarkY : 0 }}
                />
              </m.div>
              <div className="about-story">
                <StoryLine className="about-brand lam" lang="en" from={BEATS.brand[0]} until={BEATS.brand[1]}>Like A Model</StoryLine>

                <div className="about-editorial" data-timeline ref={blockRef}>
                  <div className="about-timeline" aria-hidden="true">
                    <span className="about-tl-track"></span>
                    <span className="about-tl-progress"></span>
                    <span className="about-tl-start"></span>
                    <span className="about-tl-head"></span>
                  </div>
                  <div className="about-editorial-body">
                    <StoryLine className="about-line about-opener" from={BEATS.opener[0]} until={BEATS.opener[1]}>رحلة تحوّل مصممة خصيصًا لكِ.</StoryLine>
                    <StoryLine className="about-line" from={BEATS.intro[0]} until={BEATS.intro[1]}>في <bdi className="lam" lang="en">Like A Model</bdi> نؤمن أن التحول الحقيقي لا يبدأ من الميزان، بل من القرار.</StoryLine>
                    <ul className="about-decisions">
                      <StoryLine as="li" className="about-decision" from={BEATS.b1[0]} until={BEATS.b1[1]}>
                        <DecisionCheck />
                        <span>قرار الاهتمام بنفسك.</span>
                      </StoryLine>
                      <StoryLine as="li" className="about-decision" from={BEATS.b2[0]} until={BEATS.b2[1]}>
                        <DecisionCheck />
                        <span>قرار الاستثمار في صحتك.</span>
                      </StoryLine>
                      <StoryLine as="li" className="about-decision" from={BEATS.b3[0]} until={BEATS.b3[1]}>
                        <DecisionCheck />
                        <span>قرار بناء أسلوب حياة يمنحك المزيد من القوة والثقة والتوازن.</span>
                      </StoryLine>
                    </ul>
                    <StoryLine className="about-line about-copy" from={BEATS.close[0]} until={BEATS.close[1]}>لهذا صممنا تجربة متكاملة ترافقك في كل خطوة، من التقييم الأول وحتى تحقيق أهدافك، من خلال التدريب الشخصي، والتغذية، والمتابعة المستمرة، ضمن رحلة تناسب احتياجاتك وأسلوب حياتك.</StoryLine>
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
