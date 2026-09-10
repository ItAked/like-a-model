import HomeService from './HomeService.jsx';
import PinScrollCue from './PinScrollCue.jsx';
import { assetUrl } from '../lib/asset.js';

export default function SupportJourney({ onOpenBooking }) {
  return (
    <>
      <section className="section-support relative bg-[linear-gradient(180deg,var(--section-blush)_0%,var(--section-cream)_100%)] scroll-mt-(--scroll-offset)" id="support"
        aria-labelledby="supportTitle">
        <div className="support-track">
          <div className="support-pin">
            <div className="shell">
              <header className="support-head">
                <p className="sec-ornament mb-[.85rem] flex items-center justify-center gap-[.7rem] text-(--support-line)" aria-hidden="true">
                  <span className="sec-ornament-line block h-px w-11 bg-(--support-line) opacity-72"></span>
                  <svg className="ico size-3.25 fill-current stroke-none text-(--support-line) opacity-80" aria-hidden="true"><use href="#i-heart"></use></svg>
                  <span className="sec-ornament-line block h-px w-11 bg-(--support-line) opacity-72"></span>
                </p>
                <h2 className="support-title grid gap-[.15rem] font-lam-heading text-(length:--fs-h2) leading-[1.35] font-bold text-(--color-text)" id="supportTitle">قصتك تبدأ هنا</h2>
                <p className="support-lede mx-auto mt-5 max-w-[min(36rem,100%)] text-(length:--fs-body) leading-8 text-lam-muted">
                  لا نؤمن بالحلول الجاهزة؛ نصمّم لكِ برنامجًا متكاملاً يبدأ من أهدافكِ واحتياجاتكِ وأسلوب حياتكِ، ويجمع التدريب والتغذية والمتابعة لتصلي إلى نتيجة تناسبكِ وتستمر معكِ.
                </p>
              </header>

              <div className={`support-orbit relative flex flex-col gap-[clamp(1.15rem,2.6vw,1.65rem)] overflow-visible max-[959px]:gap-[.85rem] min-[960px]:grid
                min-[960px]:grid-cols-[minmax(17.5rem,1fr)_min(520px,40vw)_minmax(17.5rem,1fr)] min-[960px]:grid-rows-2 min-[960px]:[grid-template-areas:'s1_center_s4'_'s2_center_s3']
                min-[960px]:items-center min-[960px]:gap-x-[clamp(1.35rem,2.8vw,2.25rem)] min-[960px]:gap-y-[.85rem]`}>
                <div className="support-orbit__center relative z-1 order-0 mx-auto aspect-square h-auto w-[min(20.5rem,86vw)] flex-none -translate-y-2 overflow-visible min-[960px]:order-0
                  min-[960px]:m-0 min-[960px]:size-[min(520px,40vw)] min-[960px]:-translate-y-14 min-[960px]:[grid-area:center] min-[960px]:justify-self-center">
                  <svg className="support-arc pointer-events-none absolute inset-0 z-1 m-auto block size-full overflow-visible" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
                    <circle className="support-arc-track" cx="200" cy="200" r="168" fill="none" pathLength="1" />
                    <circle className="support-arc-progress" cx="200" cy="200" r="168" fill="none" pathLength="1" transform="rotate(-45 200 200)" />
                    <g className="support-arc-arrow" opacity="0">
                      <polygon points="-1.2,-3.6 11,0 -1.2,3.6 1.8,0" />
                    </g>
                  </svg>
                  <div className="support-halo pointer-events-none absolute inset-0 z-0 m-auto size-[82%] rounded-full
                    bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-primary)_22%,transparent)_0%,color-mix(in_srgb,var(--color-brand-rose)_14%,transparent)_42%,
                    color-mix(in_srgb,var(--color-brand-rose)_5%,transparent)_68%,transparent_84%)]" aria-hidden="true"></div>
                  <div className="support-figure absolute inset-0 z-2 m-auto h-[68%] w-[52%]">
                    <img className={`block size-full object-contain object-center
                      filter-[drop-shadow(0_16px_18px_color-mix(in_srgb,var(--color-brown)_22%,transparent))_drop-shadow(0_6px_12px_color-mix(in_srgb,var(--color-brand-rose)_42%,transparent))]`}
                      src={assetUrl('/assets/img/support-woman.png')} alt="" width="1024" height="1536" loading="eager" decoding="async" />
                  </div>
                </div>

                <article className="support-step support-step--1 z-3 flex items-start gap-4 text-start min-[960px]:flex-row-reverse min-[960px]:[grid-area:s1]" data-support-step="1">
                  <span className="support-step-node relative size-18 flex-none overflow-visible">
                    <span className="support-step-link" aria-hidden="true"></span>
                    <span className="support-ico"><svg className="ico" aria-hidden="true"><use href="#i-clipboard"></use></svg></span>
                    <span className="support-num" aria-hidden="true">01</span>
                  </span>
                  <div className="support-copy min-w-0 w-full max-w-full min-[960px]:w-[clamp(17.5rem,19vw,20rem)] min-[960px]:flex-none min-[960px]:text-right">
                    <h3 className="mb-[.35rem] text-(length:--fs-h3) leading-[1.35] font-bold text-(--color-text)">نفهمك</h3>
                    <p className="text-[clamp(.9rem,.88rem+.12vw,.98rem)] leading-[1.78]">نبدأ بالتعرّف على أهدافكِ ونمط حياتكِ واحتياجاتكِ الخاصة، لأن كل رحلة ناجحة تبدأ بفهم حقيقي لنقطة البداية.
                      ومن خلال جلسة التقييم نحدّد ما تحتاجينه لنصمم رحلة تناسبكِ أنتِ، وليس برنامجًا عامًا للجميع.</p>
                  </div>
                </article>

                <article className="support-step support-step--2 z-3 flex items-start gap-4 text-start min-[960px]:flex-row-reverse min-[960px]:[grid-area:s2]" data-support-step="2">
                  <span className="support-step-node relative size-18 flex-none overflow-visible">
                    <span className="support-step-link" aria-hidden="true"></span>
                    <span className="support-ico"><svg className="ico" aria-hidden="true"><use href="#i-users"></use></svg></span>
                    <span className="support-num" aria-hidden="true">02</span>
                  </span>
                  <div className="support-copy min-w-0 w-full max-w-full min-[960px]:w-[clamp(17.5rem,19vw,20rem)] min-[960px]:flex-none min-[960px]:text-right">
                    <h3 className="mb-[.35rem] text-(length:--fs-h3) leading-[1.35] font-bold text-(--color-text)">نصمم لك</h3>
                    <p className="text-[clamp(.9rem,.88rem+.12vw,.98rem)] leading-[1.78]">بناءً على نتائج التقييم، نصمم رحلة تحوّل تناسب أهدافكِ وأسلوب حياتكِ بكل تفاصيلها، بدءًا من اختيار رحلة التحوّل المناسبة وحتى أسلوب التدريب ومدة البرنامج ومستوى التجربة. لأن النتائج الأفضل تبدأ بخطة صُممت خصيصًا لكِ.</p>
                  </div>
                </article>

                <article className="support-step support-step--3 z-3 flex items-start gap-4 text-start min-[960px]:[grid-area:s3]" data-support-step="3">
                  <span className="support-step-node relative size-18 flex-none overflow-visible">
                    <span className="support-step-link" aria-hidden="true"></span>
                    <span className="support-ico"><svg className="ico" aria-hidden="true"><use href="#i-bars"></use></svg></span>
                    <span className="support-num" aria-hidden="true">03</span>
                  </span>
                  <div className="support-copy min-w-0 w-full max-w-full min-[960px]:w-[clamp(17.5rem,19vw,20rem)] min-[960px]:flex-none min-[960px]:text-right min-[960px]:[direction:rtl]">
                    <h3 className="mb-[.35rem] text-(length:--fs-h3) leading-[1.35] font-bold text-(--color-text)">ندعمك</h3>
                    <p className="text-[clamp(.9rem,.88rem+.12vw,.98rem)] leading-[1.78]">رحلتكِ لا تتوقف عند أول جلسة، بل تبدأ منها. لذلك نرافقكِ بالتدريب والمتابعة والتوجيه المستمر، ونكون إلى جانبكِ في كل خطوة لنساعدكِ على الالتزام والتقدم بثقة نحو أهدافكِ.</p>
                  </div>
                </article>

                <article className="support-step support-step--4 z-3 flex items-start gap-4 text-start min-[960px]:[grid-area:s4]" data-support-step="4">
                  <span className="support-step-node relative size-18 flex-none overflow-visible">
                    <span className="support-step-link" aria-hidden="true"></span>
                    <span className="support-ico"><svg className="ico" aria-hidden="true"><use href="#i-target"></use></svg></span>
                    <span className="support-num" aria-hidden="true">04</span>
                  </span>
                  <div className="support-copy min-w-0 w-full max-w-full min-[960px]:w-[clamp(17.5rem,19vw,20rem)] min-[960px]:flex-none min-[960px]:text-right min-[960px]:[direction:rtl]">
                    <h3 className="mb-[.35rem] text-(length:--fs-h3) leading-[1.35] font-bold text-(--color-text)">نحتفل معك</h3>
                    <p className="text-[clamp(.9rem,.88rem+.12vw,.98rem)] leading-[1.78]">نراقب تقدمكِ، ونقيس نتائجكِ، ونحتفل بكل إنجاز تحققينه. خلال رحلتكِ لن تكوني وحدكِ، بل سيكون معكِ فريق يدعمكِ لبناء أسلوب حياة يمنحكِ الثقة ويستمر معكِ لسنوات قادمة.</p>
                  </div>
                </article>
              </div>
            </div>
            <PinScrollCue />
          </div>
        </div>

        <HomeService onOpenBooking={onOpenBooking} />
      </section>
    </>
  );
}