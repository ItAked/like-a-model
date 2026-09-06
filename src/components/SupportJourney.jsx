import HomeService from './HomeService.jsx';
import PinScrollCue from './PinScrollCue.jsx';
import { assetUrl } from '../lib/asset.js';

/** MOTION LOCK: orbit path, stage nodes, .support-head, copy accordion. */
export default function SupportJourney({ onOpenBooking }) {
  return (
    <>
      <section className="section section-support" id="support" aria-labelledby="supportTitle">
        <div className="support-track">
        <div className="support-pin">
          <div className="shell">
          <header className="support-head">
            <p className="sec-ornament" aria-hidden="true">
              <span className="sec-ornament-line"></span>
              <svg className="ico" aria-hidden="true"><use href="#i-heart"></use></svg>
              <span className="sec-ornament-line"></span>
            </p>
            <h2 className="support-title" id="supportTitle">قصتك تبدأ هنا</h2>
            <p className="support-lede">
              لا نؤمن بالحلول الجاهزة؛ نصمّم لكِ برنامجًا متكاملاً يبدأ من أهدافكِ واحتياجاتكِ وأسلوب حياتكِ، ويجمع التدريب والتغذية والمتابعة لتصلي إلى نتيجة تناسبكِ وتستمر معكِ.
            </p>
          </header>

          <div className="support-orbit">
            <div className="support-orbit__center">
              <svg className="support-arc" viewBox="0 0 400 400" aria-hidden="true" focusable="false">
                <circle className="support-arc-track" cx="200" cy="200" r="168" fill="none" pathLength="1"/>
                <circle className="support-arc-progress" cx="200" cy="200" r="168" fill="none" pathLength="1"
                        transform="rotate(-45 200 200)"/>
                <g className="support-arc-arrow" opacity="0">
                  <polygon points="-1.2,-3.6 11,0 -1.2,3.6 1.8,0"/>
                </g>
              </svg>
              <div className="support-halo" aria-hidden="true"></div>
              <div className="support-figure">
                <img src={assetUrl('/assets/img/support-woman.png')} alt="" width="1024" height="1536" loading="eager" decoding="async" />
              </div>
            </div>

            <article className="support-step support-step--1" data-support-step="1">
              <span className="support-step-node">
                <span className="support-step-link" aria-hidden="true"></span>
                <span className="support-ico"><svg className="ico" aria-hidden="true"><use href="#i-clipboard"></use></svg></span>
                <span className="support-num" aria-hidden="true">01</span>
              </span>
              <div className="support-copy">
                <h3>نفهمك</h3>
                <p>نبدأ بالتعرّف على أهدافكِ ونمط حياتكِ واحتياجاتكِ الخاصة، لأن كل رحلة ناجحة تبدأ بفهم حقيقي لنقطة البداية. ومن خلال جلسة التقييم نحدّد ما تحتاجينه لنصمم رحلة تناسبكِ أنتِ، وليس برنامجًا عامًا للجميع.</p>
              </div>
            </article>

            <article className="support-step support-step--2" data-support-step="2">
              <span className="support-step-node">
                <span className="support-step-link" aria-hidden="true"></span>
                <span className="support-ico"><svg className="ico" aria-hidden="true"><use href="#i-users"></use></svg></span>
                <span className="support-num" aria-hidden="true">02</span>
              </span>
              <div className="support-copy">
                <h3>نصمم لك</h3>
                <p>بناءً على نتائج التقييم، نصمم رحلة تحوّل تناسب أهدافكِ وأسلوب حياتكِ بكل تفاصيلها، بدءًا من اختيار رحلة التحوّل المناسبة وحتى أسلوب التدريب ومدة البرنامج ومستوى التجربة. لأن النتائج الأفضل تبدأ بخطة صُممت خصيصًا لكِ.</p>
              </div>
            </article>

            <article className="support-step support-step--3" data-support-step="3">
              <span className="support-step-node">
                <span className="support-step-link" aria-hidden="true"></span>
                <span className="support-ico"><svg className="ico" aria-hidden="true"><use href="#i-bars"></use></svg></span>
                <span className="support-num" aria-hidden="true">03</span>
              </span>
              <div className="support-copy">
                <h3>ندعمك</h3>
                <p>رحلتكِ لا تتوقف عند أول جلسة، بل تبدأ منها. لذلك نرافقكِ بالتدريب والمتابعة والتوجيه المستمر، ونكون إلى جانبكِ في كل خطوة لنساعدكِ على الالتزام والتقدم بثقة نحو أهدافكِ.</p>
              </div>
            </article>

            <article className="support-step support-step--4" data-support-step="4">
              <span className="support-step-node">
                <span className="support-step-link" aria-hidden="true"></span>
                <span className="support-ico"><svg className="ico" aria-hidden="true"><use href="#i-target"></use></svg></span>
                <span className="support-num" aria-hidden="true">04</span>
              </span>
              <div className="support-copy">
                <h3>نحتفل معك</h3>
                <p>نراقب تقدمكِ، ونقيس نتائجكِ، ونحتفل بكل إنجاز تحققينه. خلال رحلتكِ لن تكوني وحدكِ، بل سيكون معكِ فريق يدعمكِ لبناء أسلوب حياة يمنحكِ الثقة ويستمر معكِ لسنوات قادمة.</p>
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
