import { useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { assetUrl } from '../lib/asset.js';
import { useFinePointer } from '../motion/pointer.js';
import { dur, easeOut, easeUi, inViewOnce, tween } from '../motion/tokens.js';

function EcoCard({ shown, delay, img, alt, title, sub, desc }) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [hov, setHov] = useState(false);
  const lift = Boolean(fine && !reduce && hov);

  return (
    <m.article
      className="eco-card"
      tabIndex={0}
      initial={false}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ ...tween(reduce ? 0 : 0.5, easeOut), delay: reduce || !shown ? 0 : delay }}
      whileHover={fine && !reduce ? { y: -2, transition: tween(dur.hover, easeUi) } : undefined}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      onFocus={() => setHov(true)}
      onBlur={() => setHov(false)}
    >
      <div className="eco-media">
        <m.img
          src={img}
          alt={alt}
          width="1024"
          height="768"
          loading="lazy"
          initial={false}
          animate={{ scale: lift ? 1.02 : 1 }}
          transition={tween(reduce ? 0 : dur.hover, easeUi)}
        />
      </div>
      <div className="eco-body">
        <h3 className="h3">{title}</h3>
        <p className="eco-sub">{sub}</p>
        <div className="eco-card-reveal">
          <p className="eco-desc">{desc}</p>
        </div>
        <p className="eco-cue">
          <span>اكتشفي المزيد</span>
          <svg className="ico eco-cue-arrow" aria-hidden="true"><use href="#i-arrow"></use></svg>
        </p>
      </div>
    </m.article>
  );
}

export default function Ecosystem() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, inViewOnce);
  const show = reduce || inView;
  const headItem = {
    hidden: { opacity: 0, y: 8 },
    shown: { opacity: 1, y: 0, transition: tween(reduce ? 0 : 0.48, easeOut) },
  };

  return (
    <section className="section" id="ecosystem" ref={ref}>
      <div className="shell">
        <m.header
          className="sec-head sec-head-center"
          initial={false}
          animate={show ? 'shown' : 'hidden'}
          variants={{
            hidden: {},
            shown: { transition: { staggerChildren: reduce ? 0 : 0.08 } },
          }}
        >
          <m.p className="sec-ornament" aria-hidden="true" variants={headItem}>
            <span className="sec-ornament-line"></span>
            <svg className="ico" aria-hidden="true"><use href="#i-heart"></use></svg>
            <span className="sec-ornament-line"></span>
          </m.p>
          <m.h2 className="h2" variants={headItem}>منظومة <em className="lam" lang="en">Like A Model</em></m.h2>
          <m.p className="sec-sub" variants={headItem}>
            لأن التحوّل الحقيقي يحتاج أكثر من مجرد تدريب، صمّمنا منظومة متكاملة تجمع بين
            الخدمات الاحترافية والشركاء الموثوقين لتمنحِك تجربة استثنائية ونتائج تليق
            بطموحِك
          </m.p>
        </m.header>

        <div className="grid grid-2 eco-grid">
          <EcoCard
            shown={show}
            delay={0}
            img={assetUrl('/assets/img/success-partners.jpg')}
            alt="استشارة تغذية ونمط حياة صحي بين مختصة وعميلة في جلسة هادئة"
            title="شركاء النجاح"
            sub="اكتشفي منظومة متكاملة تدعم نجاحِك"
            desc="من المختبرات والوجبات الصحية إلى المنتجات والخدمات المختارة بعناية، نوفّر لكِ شبكة من الشركاء الذين يشاركوننا نفس معايير الجودة لنرافقِك نحو أفضل النتائج."
          />
          <EcoCard
            shown={show}
            delay={0.08}
            img={assetUrl('/assets/img/services-training.jpg')}
            alt="مدربة تساعد متدربة على أداء تمرين في استوديو نسائي حديث وهادئ"
            title="خدماتنا"
            sub="ابدئي رحلة التحوّل التي تناسبِك"
            desc="برامج متخصصة، مدرِّبات محترفات، خطط مخصصة، ومتابعة مستمرة صُمّمت لتمنحِك تجربة استثنائية ونتائج حقيقية تدوم. استكشفي الخدمات واختاري الرحلة الأقرب إلى أهدافِك."
          />
        </div>
      </div>
    </section>
  );
}
