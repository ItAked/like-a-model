import { useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { assetUrl } from '../lib/asset.js';
import { useFinePointer } from '../motion/pointer.js';
import { dur, easeOut, easeUi, inViewOnce, tween } from '../motion/tokens.js';

const MotionLink = m.create(Link);

const START = [
  { story: 'body-sculpt', to: '/stories?goal=body-toning', img: '/assets/img/goal-body-toning.png', alt: 'تمارين نحت القوام بأشرطة مقاومة في استوديو بيلاتس', icon: '#i-sparkle', title: 'نحت القوام' },
  { story: 'bride', to: '/stories?goal=bridal', img: '/assets/img/goal-bridal-glow.png', alt: 'استعداد هادئ لتألّق يوم الزفاف', icon: '#i-crown', title: 'تألق العروس' },
  { story: 'pregnancy', to: '/stories?goal=pregnancy', img: '/assets/img/goal-pregnancy-wellness.png', alt: 'حركة هادئة تدعم الحمل الصحي', icon: '#i-bloom', title: 'الحمل الصحي' },
  { story: 'bariatric', to: '/stories?goal=bariatric', img: '/assets/img/goal-post-bariatric.png', alt: 'خطوة واثقة في رحلة التحوّل بعد التكميم', icon: '#i-transform', title: 'بعد التكميم' },
];

const END = [
  { story: 'fat-loss', to: '/stories?goal=fat-loss', img: '/assets/img/goal-fat-loss.png', alt: 'تدريب يركّز على خسارة الدهون في استوديو نسائي هادئ', icon: '#i-flame', title: 'خسارة الدهون' },
  { story: 'muscle-building', to: '/stories?goal=muscle-building', img: '/assets/img/goal-muscle-building.png', alt: 'تمرين قوة لبناء العضلات بأوزان خفيفة', icon: '#i-dumbbell', title: 'بناء العضلات' },
  { story: 'postpartum', to: '/stories?goal=postpartum', img: '/assets/img/goal-postpartum.png', alt: 'تمارين لطيفة لدعم الجسم بعد الولادة', icon: '#i-baby', title: 'ما بعد الولادة' },
  { story: 'lifestyle', to: '/stories?goal=healthy-lifestyle', img: '/assets/img/goal-healthy-lifestyle.png', alt: 'عادات يومية لنمط حياة صحي في المطبخ', icon: '#i-leaf', title: 'نمط الحياة الصحي' },
];

function StoryCard({ shown, delay, item, className }) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [hov, setHov] = useState(false);
  const lift = Boolean(fine && !reduce && hov);

  return (
    <MotionLink
      className={className}
      data-story={item.story}
      to={item.to}
      initial={false}
      animate={shown ? { opacity: 1, y: lift ? -2 : 0 } : { opacity: 0, y: 12 }}
      transition={
        shown && lift
          ? tween(dur.hover, easeUi)
          : { ...tween(reduce ? 0 : 0.5, easeOut), delay: reduce || !shown ? 0 : delay }
      }
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      onFocus={() => setHov(true)}
      onBlur={() => setHov(false)}
    >
      <span className="story-media">
        <m.img
          src={assetUrl(item.img)}
          alt={item.alt}
          width={item.wide ? 960 : 640}
          height={item.wide ? 640 : 960}
          loading="lazy"
          onError={(e) => { e.currentTarget.hidden = true; }}
          initial={false}
          animate={{ scale: lift ? 1.02 : 1.01 }}
          transition={tween(reduce ? 0 : dur.hover, easeUi)}
        />
      </span>
      <span className="story-body">
        <svg className="ico story-ico" aria-hidden="true"><use href={item.icon}></use></svg>
        <span className="story-title">{item.title}</span>
        <svg className="ico story-arrow" aria-hidden="true"><use href="#i-arrow"></use></svg>
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
    <div className="chapter" id="stories">
      <section className="section section-stories" aria-labelledby="storiesTitle" ref={ref}>
        <div className="shell">
          <header className="sec-head sec-head-center stories-head">
            <p className="sec-ornament stories-kicker" aria-hidden="true">
              <span className="sec-ornament-line stories-kicker-line"></span>
              <svg className="ico" aria-hidden="true"><use href="#i-heart"></use></svg>
              <span className="sec-ornament-line stories-kicker-line"></span>
            </p>
            <m.h2
              className="h2"
              id="storiesTitle"
              initial={false}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ ...tween(reduce ? 0 : 0.48, easeOut), delay: later(0) }}
            >
              قصص بدأت <em>بقرار</em>
            </m.h2>
            <m.p
              className="sec-sub"
              initial={false}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ ...tween(reduce ? 0 : 0.48, easeOut), delay: later(0.08) }}
            >
              كل قصة هنا كانت يومًا في نفس نقطة البداية التي تقفين عندها اليوم.<br />اكتشفي كيف تحوّلت قراراتهن إلى حياة جديدة.
            </m.p>
          </header>

          <div className="stories-grid">
            <div className="stories-col stories-col--start">
              {START.map((item, i) => (
                <StoryCard
                  key={item.story}
                  shown={show}
                  delay={i * 0.05}
                  item={item}
                  className="story-card story-card--side"
                />
              ))}
            </div>

            <div className="stories-center">
              <MotionLink
                className="stories-figure"
                to="/start-your-journey"
                initial={false}
                animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ ...tween(reduce ? 0 : 0.52, easeOut), delay: later(0.2) }}
              >
                <img className="stories-figure-img" src={assetUrl('/assets/img/stories/story-center-figure.png')} alt="امرأة تنظر بأمل نحو قصتها القادمة" width="607" height="1024" loading="lazy" />
                <span className="stories-figure-copy">
                  <span className="stories-figure-kicker">ابحثي عن قصة</span>
                  <span className="stories-figure-accent">تشبه قصتكِ
                    <svg className="stories-figure-swoosh" viewBox="0 0 88 14" aria-hidden="true" focusable="false">
                      <path d="M5 9.5c16 6.5 52 6.5 78-5" fill="none" stroke="currentColor" strokeWidth="2.15" strokeLinecap="round"/>
                    </svg>
                  </span>
                </span>
              </MotionLink>
              <StoryCard
                shown={show}
                delay={0.25}
                item={{
                  story: 'wellness',
                  to: '/stories?goal=health-fitness',
                  img: '/assets/img/goal-health-fitness.png',
                  alt: 'استوديو عافية هادئ بإضاءة طبيعية دافئة',
                  icon: '#i-heart',
                  title: 'الصحة واللياقة',
                  wide: true,
                }}
                className="story-card story-card--side story-card--wide"
              />
            </div>

            <div className="stories-col stories-col--end">
              {END.map((item, i) => (
                <StoryCard
                  key={item.story}
                  shown={show}
                  delay={i * 0.05}
                  item={item}
                  className="story-card story-card--side"
                />
              ))}
            </div>
          </div>

          <m.aside
            className="stories-cta"
            initial={false}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ ...tween(reduce ? 0 : 0.52, easeOut), delay: later(0.32) }}
          >
            <p>كل قرار صغير اليوم... قد يكون البداية لحياة جديدة لا تتخيلينها.</p>
            <p className="stories-cta-q">ما قصتكِ القادمة؟</p>
          </m.aside>
        </div>
      </section>
    </div>
  );
}
