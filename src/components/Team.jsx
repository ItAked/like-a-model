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
  { title: 'العمليات', desc: 'فريق منظم يعمل خلف الكواليس لتقديم تجربة سلسة.', alt: 'العمليات' }
];

function JourneyFrame({ shown, index, title, desc, alt }) {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [hov, setHov] = useState(false);
  const lift = Boolean(fine && !reduce && hov);

  return (
    <m.figure className="relative m-0 min-w-0" tabIndex={0} initial={false} animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ ...tween(reduce ? 0 : 0.52, easeOut), delay: reduce || !shown ? 0 : index * 0.07 }} onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      onFocus={() => setHov(true)} onBlur={() => setHov(false)}>
      <div className="relative aspect-3/2 overflow-hidden rounded-lam-md border border-(--color-brand-rose)">
        <img className="absolute inset-0 block h-full w-full object-cover object-center" src={PREVIEW} alt={alt} width="1024" height="682" loading="lazy" />
        <m.span className="pointer-events-none absolute inset-0 z-1 bg-[color-mix(in_srgb,var(--color-brown)_28%,transparent)]" aria-hidden="true" initial={false}
          animate={{ opacity: lift ? 1 : 0 }} transition={tween(reduce ? 0 : dur.hover, easeUi)} />
      </div>
      <figcaption className={`pointer-events-none absolute inset-x-0 bottom-0 z-2 grid justify-items-start gap-[.2rem] rounded-b-lam-md
        bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-brown)_58%,transparent)_0%,color-mix(in_srgb,var(--color-brown)_18%,transparent)_55%,transparent_100%)] px-[.95rem]
        pt-[2.6rem] pb-[.8rem] text-start text-white lg:pt-[2.35rem]`}>
        <span className="font-lam-heading text-(length:--fs-h3) leading-[1.35] font-bold [text-shadow:0_1px_8px_color-mix(in_srgb,var(--color-brown)_35%,transparent)]">{title}</span>
        <m.span className="max-w-88 text-(length:--fs-body) leading-[1.65] font-(--w-body) text-[color-mix(in_srgb,var(--color-text-on-dark)_92%,transparent)] motion-reduce:translate-y-0"
          initial={false} animate={fine ? { opacity: lift ? 1 : 0, y: lift ? 0 : 8 } : { opacity: 1, y: 0 }} transition={tween(reduce ? 0 : dur.hover, easeUi)}>
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
    <div className="block scroll-mt-(--scroll-offset)" id="journey">
      <section className={`relative scroll-mt-(--scroll-offset) overflow-hidden bg-[linear-gradient(180deg,var(--section-white)_0%,var(--section-blush)_100%)] py-(--section-gap)
        before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(color-mix(in_srgb,var(--color-brand-rose)_55%,transparent)_1px,transparent_1px),
        linear-gradient(90deg,color-mix(in_srgb,var(--color-brand-rose)_55%,transparent)_1px,transparent_1px)] before:bg-size-[3rem_3rem] before:opacity-0
        before:mask-[radial-gradient(ellipse_58%_52%_at_50%_48%,transparent_42%,#000_100%)] before:content-[''] after:pointer-events-none after:absolute after:inset-0
        after:bg-[radial-gradient(ellipse_42%_34%_at_0%_100%,var(--color-surface-blush),transparent_70%),radial-gradient(ellipse_38%_30%_at_100%_0%,var(--color-surface-blush),
        transparent_70%)] after:opacity-0 after:content-[''] md:before:opacity-14 md:after:opacity-38`} id="journey-guide" aria-labelledby="journeyTitle" ref={ref}>
        <div className="relative z-1 mx-auto w-full max-w-(--shell) px-(--gutter)">
          <m.header className="mb-[clamp(1.15rem,1.8vw,1.75rem)] text-center" initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={tween(reduce ? 0 : 0.5, easeOut)}>
            <p className="mb-[.85rem] flex items-center justify-center gap-[.7rem] text-lam-primary" aria-hidden="true">
              <span className="block h-px w-11 bg-current opacity-72"></span>
              <svg className="ico h-3.25 w-3.25 fill-current stroke-none" aria-hidden="true"><use href="#i-heart"></use></svg>
              <span className="block h-px w-11 bg-current opacity-72"></span>
            </p>
            <h2 className="font-lam-heading text-(length:--fs-h2) leading-[1.4] font-bold text-lam-brown lg:whitespace-nowrap" id="journeyTitle">فريق يعمل من أجل نجاح رحلتكِ</h2>
          </m.header>
        </div>

        <div className={`relative z-1 mx-auto grid w-full max-w-(--shell) gap-[clamp(1.15rem,2.2vw,1.6rem)] px-(--gutter) lg:w-[min(1720px,88vw)] lg:max-w-none lg:grid-cols-2
          lg:items-center lg:gap-7 lg:px-0`}>
          <div className={`flex min-w-0 flex-col justify-center self-center gap-6 before:block before:h-px before:w-9 before:flex-none before:self-start before:bg-[rgba(74,41,50,.22)]
            before:content-[''] lg:border-e lg:border-[rgba(74,41,50,.22)] lg:pe-[clamp(28px,3vw,52px)] lg:before:hidden`}>
            <m.p className="m-0 text-start text-[calc(var(--fs-body)*1.11)] leading-loose text-lam-muted" initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ ...tween(reduce ? 0 : 0.48, easeOut), delay: copyDelay(0) }}>
              في <bdi className="lam" lang="en">Like A Model</bdi> لا تقتصر رحلتكِ على مدربة أو برنامج تدريبي، بل تبدأ بالانضمام إلى منظومة متكاملة من المختصين الذين يعملون من أجل فهم أهدافكِ، وتقديم تجربة متوازنة تساعدكِ على تحقيق أفضل النتائج.
            </m.p>
            <m.p className="m-0 text-start text-[calc(var(--fs-body)*1.11)] leading-loose text-lam-muted" initial={false} animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ ...tween(reduce ? 0 : 0.48, easeOut), delay: copyDelay(0.09) }}>
              لأن كل رحلة تحوّل ناجحة تستحق أكثر من مجرد تدريب، وضعنا فريقًا متكاملًا يعمل خلف الكواليس لمنحكِ تجربة احترافية ونتائج تدوم.
            </m.p>
          </div>

          <JourneyFrame shown={show} index={0} {...FRAMES[0]} />
        </div>

        <div className={`relative z-1 mx-auto mt-[clamp(1.15rem,2.2vw,1.6rem)] grid w-full max-w-(--shell) gap-[clamp(1.15rem,2.2vw,1.6rem)] px-(--gutter) lg:w-[min(1720px,88vw)]
          lg:max-w-none lg:grid-cols-2 lg:gap-7 lg:px-0`}>
          {FRAMES.slice(1).map((frame, i) => (
            <JourneyFrame key={frame.title} shown={show} index={i + 1} {...frame} />
          ))}
        </div>
      </section>
    </div>
  );
}