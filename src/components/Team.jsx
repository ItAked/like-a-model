import { useRef, useState } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { assetUrl } from '../lib/asset.js';
import { useFinePointer } from '../motion/pointer.js';
import { dur, easeOut, easeUi, inViewOnce, tween } from '../motion/tokens.js';

const PREVIEW = assetUrl('/assets/img/journey-preview.jpg');

const FRAMES = [
  { title: 'خدمة العملاء', desc: 'فريق قريب منكِ للإجابة عن استفساراتكِ وتنسيق رحلتكِ.', alt: 'خدمة العملاء' },
  { title: 'مديرة التقييم', desc: 'تقييم دقيق يضع نقطة البداية المناسبة لأهدافكِ.', alt: 'مديرة التقييم' },
  { title: 'أخصائية التغذية', desc: 'خطة غذائية مرنة تناسب احتياجاتكِ وأسلوب حياتكِ.', alt: 'أخصائية التغذية' },
  { title: 'فيديو تدريبات', desc: 'تدريب واضح ومتابعة تساعدكِ على أداء التمارين بثقة.', alt: 'فيديو تدريبات' },
  { title: 'جماعية التدريب', desc: 'بيئة تدريب داعمة تمنحكِ حافزًا للاستمرار.', alt: 'جماعية التدريب' },
  { title: 'المتابعة', desc: 'متابعة مستمرة لتعديل الخطة ومواكبة تقدّمكِ.', alt: 'المتابعة' },
  { title: 'العمليات', desc: 'فريق منظم يعمل خلف الكواليس لتقديم تجربة سلسة.', alt: 'العمليات' },
];

function JourneyFrame({ shown, index, title, desc, alt }) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [hov, setHov] = useState(false);
  const lift = Boolean(fine && !reduce && hov);

  return (
    <m.figure
      className="journey-frame"
      tabIndex={0}
      initial={false}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ ...tween(reduce ? 0 : 0.52, easeOut), delay: reduce || !shown ? 0 : index * 0.07 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      onFocus={() => setHov(true)}
      onBlur={() => setHov(false)}
    >
      <div className="journey-media">
        <img src={PREVIEW} alt={alt} width="1024" height="682" loading="lazy" />
        <m.span
          className="journey-veil"
          aria-hidden="true"
          initial={false}
          animate={{ opacity: lift ? 1 : 0 }}
          transition={tween(reduce ? 0 : dur.hover, easeUi)}
        />
      </div>
      <figcaption className="journey-cap">
        <span className="journey-cap-title">{title}</span>
        <m.span
          className="journey-cap-desc"
          initial={false}
          animate={fine ? { opacity: lift ? 1 : 0, y: lift ? 0 : 8 } : { opacity: 1, y: 0 }}
          transition={tween(reduce ? 0 : dur.hover, easeUi)}
        >
          {desc}
        </m.span>
      </figcaption>
    </m.figure>
  );
}

export default function Team() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, inViewOnce);
  const show = reduce || inView;
  const copyDelay = (ms) => (reduce || !show ? 0 : ms);

  return (
    <div className="chapter" id="journey">
      <section className="section section-alt" id="journey-guide" aria-labelledby="journeyTitle" ref={ref}>
        <div className="shell">
          <m.header
            className="about-lead journey-lead"
            initial={false}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={tween(reduce ? 0 : 0.5, easeOut)}
          >
            <p className="sec-ornament" aria-hidden="true">
              <span className="sec-ornament-line"></span>
              <svg className="ico" aria-hidden="true"><use href="#i-heart"></use></svg>
              <span className="sec-ornament-line"></span>
            </p>
            <h2 className="about-lead-title" id="journeyTitle">فريق يعمل من أجل نجاح رحلتكِ</h2>
          </m.header>
        </div>

        <div className="journey-main">
          <div className="journey-copy">
            <m.p
              initial={false}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ ...tween(reduce ? 0 : 0.48, easeOut), delay: copyDelay(0) }}
            >
              في <bdi className="lam" lang="en">Like A Model</bdi> لا تقتصر رحلتكِ على مدربة أو برنامج تدريبي، بل تبدأ بالانضمام إلى منظومة متكاملة من المختصين الذين يعملون من أجل فهم أهدافكِ، وتقديم تجربة متوازنة تساعدكِ على تحقيق أفضل النتائج.
            </m.p>
            <m.p
              initial={false}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ ...tween(reduce ? 0 : 0.48, easeOut), delay: copyDelay(0.09) }}
            >
              لأن كل رحلة تحوّل ناجحة تستحق أكثر من مجرد تدريب، وضعنا فريقًا متكاملًا يعمل خلف الكواليس لمنحكِ تجربة احترافية ونتائج تدوم.
            </m.p>
          </div>

          <JourneyFrame shown={show} index={0} {...FRAMES[0]} />
        </div>

        <div className="journey-gallery">
          {FRAMES.slice(1).map((frame, i) => (
            <JourneyFrame key={frame.title} shown={show} index={i + 1} {...frame} />
          ))}
        </div>
      </section>
    </div>
  );
}
