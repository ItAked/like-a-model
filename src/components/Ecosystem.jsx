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
    <m.article className={`group relative isolate mt-0 flex aspect-4/3 w-full flex-col justify-end overflow-hidden rounded-3xl border border-(--color-brand-rose) bg-lam-brown p-0 text-white
      transition-[box-shadow,border-color] duration-(--t-med) ease-(--ease) before:pointer-events-none before:absolute before:inset-0 before:z-1
      before:bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-brown)_78%,transparent)_0%,color-mix(in_srgb,var(--color-brown)_28%,transparent)_28%,transparent_52%)] before:content-['']
      after:pointer-events-none after:absolute after:inset-0 after:z-1 after:bg-[color-mix(in_srgb,var(--color-brown)_62%,var(--color-primary))] after:opacity-0 after:transition-opacity
      after:duration-(--t-med) after:ease-(--ease) hover:border-(--color-brand-rose) hover:shadow-lam-1 hover:after:opacity-28 focus-visible:border-(--color-brand-rose)
      focus-visible:shadow-lam-1 focus-visible:after:opacity-28 lg:aspect-auto lg:h-[calc((min(var(--shell),100vw)-2*var(--gutter)-1.5rem)/2*3/4)] lg:min-w-0 lg:max-w-none
      motion-reduce:after:transition-none`} tabIndex={0} initial={false} animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ ...tween(reduce ? 0 : 0.5, easeOut), delay: reduce || !shown ? 0 : delay }} whileHover={fine && !reduce ? { y: -2, transition: tween(dur.hover, easeUi) } : undefined}
      onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)} onFocus={() => setHov(true)} onBlur={() => setHov(false)}>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <m.img className="block h-full w-full object-cover object-center" src={img} alt={alt} width="1024" height="768" loading="lazy" initial={false} animate={{ scale: lift ? 1.02 : 1 }}
          transition={tween(reduce ? 0 : dur.hover, easeUi)}
/>
      </div>
      <div className="relative z-2 flex w-full flex-col items-start px-[1.4rem] pt-5 pb-[1.3rem] text-start">
        <h3 className="m-0 font-lam-heading text-(length:--fs-h3) leading-[1.35] font-bold text-white [text-shadow:0_1px_10px_color-mix(in_srgb,var(--color-brown)_45%,transparent)]">
          {title}
        </h3>
        <p className="hidden">{sub}</p>
        <div className={`grid min-h-0 grid-rows-[1fr] overflow-hidden transition-[grid-template-rows] duration-(--t-med) ease-(--ease) [@media(hover:hover)_and_(pointer:fine)]:grid-rows-[0fr]
          [@media(hover:hover)_and_(pointer:fine)]:group-hover:grid-rows-[1fr] [@media(hover:hover)_and_(pointer:fine)]:group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none`}>
          <p className={`mt-[.45rem] max-w-xl min-h-0 overflow-hidden text-(length:--fs-body) leading-[1.7] text-[color-mix(in_srgb,var(--color-text-on-dark)_90%,var(--color-brand-rose))]
            transition-[opacity,translate] duration-(--t-med) ease-out [@media(hover:hover)_and_(pointer:fine)]:mt-[.55rem] [@media(hover:hover)_and_(pointer:fine)]:translate-y-[.7rem]
            [@media(hover:hover)_and_(pointer:fine)]:opacity-0 [@media(hover:hover)_and_(pointer:fine)]:pointer-events-none [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0
            [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover:pointer-events-auto
            [@media(hover:hover)_and_(pointer:fine)]:group-focus-visible:translate-y-0 [@media(hover:hover)_and_(pointer:fine)]:group-focus-visible:opacity-100
            [@media(hover:hover)_and_(pointer:fine)]:group-focus-visible:pointer-events-auto motion-reduce:transition-none`}>{desc}</p>
        </div>
        <p className="mt-2 inline-flex items-center gap-[.35rem] text-[.8125rem] font-bold text-[color-mix(in_srgb,var(--color-text-on-dark)_82%,var(--color-brand-rose))]">
          <span>اكتشفي المزيد</span>
          <svg className={`ico h-[1em] w-[1em] transition-transform duration-(--t-med) ease-(--ease) group-hover:-translate-x-1 group-focus-visible:-translate-x-1
            motion-reduce:transition-none`} aria-hidden="true"><use href="#i-arrow"></use></svg>
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
    <section className={`relative scroll-mt-(--scroll-offset) overflow-hidden bg-[linear-gradient(180deg,var(--section-cream)_0%,var(--section-white)_100%)] pt-(--section-y)
      pb-(--section-gap) before:pointer-events-none before:absolute before:bottom-[-26%] before:inset-s-[-14%] before:h-[min(40vw,24rem)] before:w-[min(56vw,32rem)]
      before:rounded-full-48-40-52-36 before:bg-lam-surface-alt before:opacity-0 before:content-[''] md:before:opacity-62`} id="ecosystem" ref={ref}>
      <div className="relative z-1 mx-auto flex w-full max-w-(--shell) flex-col gap-3.25 px-(--gutter)">
        <m.header className="mx-auto max-w-208 pb-0 text-center" initial={false} animate={show ? 'shown' : 'hidden'}
          variants={{
            hidden: {},
            shown: { transition: { staggerChildren: reduce ? 0 : 0.08 } }
          }}
        >
          <m.p className="mb-[.85rem] flex items-center justify-center gap-[.7rem] text-lam-primary" aria-hidden="true" variants={headItem}>
            <span className="block h-px w-11 bg-current opacity-72"></span>
            <svg className="ico h-3.25 w-3.25 fill-current stroke-none" aria-hidden="true"><use href="#i-heart"></use></svg>
            <span className="block h-px w-11 bg-current opacity-72"></span>
          </m.p>
          <m.h2 className="font-lam-heading text-(length:--fs-h2) leading-[1.3] font-bold text-lam-brown text-balance" variants={headItem}>منظومة
            <em className="lam" lang="en">Like A Model</em></m.h2>
          <m.p className="mx-auto mt-5 max-w-176 text-(length:--fs-body) leading-[1.45] font-(--w-body) text-lam-muted" variants={headItem}>
            لأن التحوّل الحقيقي يحتاج أكثر من مجرد تدريب، صمّمنا منظومة متكاملة تجمع بين
            الخدمات الاحترافية والشركاء الموثوقين لتمنحِك تجربة استثنائية ونتائج تليق
            بطموحِك
          </m.p>
        </m.header>

        <div className={`grid grid-cols-1 gap-[clamp(var(--s-4),2vw,var(--s-6))] lg:w-[max(100%,min(1600px,88vw))] lg:max-w-none lg:grid-cols-2 lg:gap-[clamp(var(--s-6),2vw,var(--s-7))]
          lg:mx-[calc(50%-max(50%,min(800px,44vw)))]`}>
          <EcoCard shown={show} delay={0} img={assetUrl('/assets/img/success-partners.jpg')} alt="استشارة تغذية ونمط حياة صحي بين مختصة وعميلة في جلسة هادئة" title="شركاء النجاح"
            sub="اكتشفي منظومة متكاملة تدعم نجاحِك"
            desc="من المختبرات والوجبات الصحية إلى المنتجات والخدمات المختارة بعناية، نوفّر لكِ شبكة من الشركاء الذين يشاركوننا نفس معايير الجودة لنرافقِك نحو أفضل النتائج." />
          <EcoCard shown={show} delay={0.08} img={assetUrl('/assets/img/services-training.jpg')} alt="مدربة تساعد متدربة على أداء تمرين في استوديو نسائي حديث وهادئ"
            title="خدماتنا" sub="ابدئي رحلة التحوّل التي تناسبِك"
            desc="برامج متخصصة، مدرِّبات محترفات، خطط مخصصة، ومتابعة مستمرة صُمّمت لتمنحِك تجربة استثنائية ونتائج حقيقية تدوم. استكشفي الخدمات واختاري الرحلة الأقرب إلى أهدافِك." />
        </div>
      </div>
    </section>
  );
}