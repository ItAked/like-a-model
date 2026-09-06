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
const CODA_LINE_DUR = 0.8;
const CODA_ITEM_STAGGER = 0.08;

function CodaPoint({ item, index, show, reduce, fine }) {
  const [hov, setHov] = useState(false);
  const glow = Boolean(fine && !reduce && hov);

  return (
    <m.li
      className="about-coda-point"
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{
        ...tween(reduce ? 0 : 0.48, easeOut),
        delay: reduce || !show ? 0 : CODA_LINE_DUR * 0.12 + index * CODA_ITEM_STAGGER,
      }}
      whileHover={fine && !reduce ? { y: -2, transition: tween(dur.hover, easeUi) } : undefined}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
    >
      <span className="about-coda-station">
        <span className="about-coda-disk" aria-hidden="true">
          <svg className="ico"><use href={item.icon}></use></svg>
        </span>
        <m.span
          className="about-coda-dot"
          aria-hidden="true"
          initial={false}
          animate={{
            boxShadow: glow
              ? '0 0 14px rgba(224, 174, 175, 0.88)'
              : '0 0 0 0 rgba(224, 174, 175, 0)',
          }}
          transition={tween(reduce ? 0 : dur.hover, easeUi)}
        />
      </span>
      <strong>{item.title}</strong>
      <span className="about-coda-copy">{item.copy}</span>
    </m.li>
  );
}

function AboutCoda() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const inView = useInView(ref, { once: true, amount: 0.28 });
  const show = Boolean(reduce || inView);

  return (
    <section
      className="about-coda"
      ref={ref}
      aria-label="شريككِ في رحلة التحوّل"
    >
      <img
        className="about-coda-paper"
        src={codaPaper}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
      <div className="about-coda-inner">
        <header className="about-coda-head">
          <p>لسنا مجرد برنامج تدريبي.</p>
          <p>نحن شريككِ في رحلة التحوّل.</p>
        </header>

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
              initial={false}
              animate={{ pathLength: show ? 1 : 0 }}
              transition={tween(reduce ? 0 : CODA_LINE_DUR, easeOut)}
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
