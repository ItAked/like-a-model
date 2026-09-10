import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FIELD = 'field grid gap-[.45rem]';
const LABEL = 'field-lbl text-(length:--fs-body) leading-[1.5] font-medium text-lam-brown';
const WRAP = 'field-wrap relative block';
const INPUT = 'input min-h-13 w-full appearance-none rounded-lam-md border-[1.5px] border-[var(--color-border-strong)] bg-lam-surface-alt px-4 py-[.85rem] text-(length:--fs-body) leading-[1.6] text-lam-brown transition-[border-color,box-shadow,background] duration-200 placeholder:text-lam-muted placeholder:opacity-75 hover:border-(--color-brand-rose) focus:border-lam-primary focus:bg-lam-surface focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] focus:outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lam-primary';
const ERROR = 'field-err text-[length:var(--fs-small)] leading-[1.5] font-bold text-lam-danger empty:hidden';
const OPTION = 'optrow relative flex h-full min-w-0';
const OPTION_FACE = 'optrow-face flex min-h-13 w-full flex-1 items-center gap-[.7rem] rounded-lam-md border-[1.5px] border-[var(--color-border)] bg-lam-surface-alt px-[.9rem] py-[.65rem] text-start text-(length:--fs-body) leading-[1.5] text-lam-muted transition-colors duration-200 before:size-[19px] before:shrink-0 before:rounded-lam-pill before:border-2 before:border-[var(--color-border-strong)] before:bg-lam-surface';

const SyjCard = memo(function SyjCard() {
  return (
    <div className="syj-card mx-auto w-[min(100%,40rem)] rounded-lam-2xl border border-(--color-brand-rose) bg-lam-surface p-[clamp(1.25rem,2.6vw,1.85rem)] text-start shadow-lam-1"
      id="syjCard">
      <div className="syj-flow">
        <div className="mb-[1.15rem] grid gap-[.45rem]">
          <p className="text-(length:--fs-eyebrow) font-bold text-lam-muted" id="syjStepLbl" aria-live="polite">١ من ٤</p>
          <div className="h-[1.5px] overflow-hidden rounded-lam-pill bg-[color-mix(in_srgb,var(--color-primary-border)_70%,transparent)]" aria-hidden="true">
            <span className="syj-bar-fill block h-full w-[calc(var(--syj-p,25)*1%)] bg-lam-primary transition-[width] duration-300 motion-reduce:transition-none" id="syjBarFill"></span>
          </div>
        </div>

        <form id="syjForm" noValidate>
          <fieldset className="syj-panel is-on hidden min-w-0 border-0 p-0 [&.is-on]:grid [&.is-on]:gap-4" data-syj-step="1">
            <p className="sr-only">بداية رحلتكِ</p>
            <h1 className="font-lam-heading text-(length:--fs-h1) leading-[1.35] font-bold text-lam-brown" tabIndex={-1}>يسعدنا التعرّف عليكِ</h1>
            <p className={FIELD}>
              <label className={LABEL} htmlFor="syjName">الاسم الكامل <span className="req text-lam-primary" aria-hidden="true">*</span></label>
              <span className={WRAP}>
                <svg className="ico pointer-events-none absolute top-1/2 right-[.9rem] size-[1.2rem] -translate-y-1/2 text-lam-muted" aria-hidden="true"><use href="#i-user"></use></svg>
                <input className={`${INPUT} pr-[2.9rem] pl-4`} id="syjName" name="name" type="text" autoComplete="name" required placeholder="اسمِك الكامل" />
              </span>
              <span className={ERROR} data-err-for="name"></span>
            </p>
            <p className={FIELD}>
              <label className={LABEL} htmlFor="syjPhone">رقم الجوال السعودي <span className="req text-lam-primary" aria-hidden="true">*</span></label>
              <span className={WRAP}>
                <svg className="ico pointer-events-none absolute top-1/2 right-[.9rem] size-[1.2rem] -translate-y-1/2 text-lam-muted" aria-hidden="true"><use href="#i-phone"></use></svg>
                <input className={`${INPUT} pr-[2.9rem] pl-4`} id="syjPhone" name="phone" type="tel" inputMode="tel" dir="ltr"
                  autoComplete="tel" required placeholder="05XXXXXXXX" />
              </span>
              <span className={ERROR} data-err-for="phone"></span>
            </p>
          </fieldset>

          <fieldset className="syj-panel hidden min-w-0 border-0 p-0 [&.is-on]:grid [&.is-on]:gap-4" data-syj-step="2">
            <p className="sr-only">هدفكِ</p>
            <h1 className="font-lam-heading text-(length:--fs-h1) leading-[1.35] font-bold text-lam-brown" tabIndex={-1}>ما الذي ترغبين في تحقيقه؟</h1>
            <div className="grid items-stretch gap-[.4rem] sm:grid-cols-2" role="radiogroup" aria-labelledby="syjGoalLegend">
              <p className="sr-only" id="syjGoalLegend">اختاري هدفًا واحدًا</p>
              <label className={OPTION}><input type="radio" name="goal" value="رحلة خسارة الدهون" /><span className={OPTION_FACE}>رحلة خسارة الدهون</span></label>
              {[
                'رحلة نحت وتنسيق القوام', 'رحلة بناء العضلات والقوة', 'رحلة نمط الحياة الصحي', 'رحلة الحمل الصحي',
                'رحلة ما بعد الولادة', 'رحلة التحوّل بعد التكميم', 'رحلة اللياقة والصحة لكبار السن', 'رحلة تألق العروس',
              ].map((goal) => <label className={OPTION} key={goal}><input type="radio" name="goal" value={goal} /><span className={OPTION_FACE}>{goal}</span></label>)}
              <label className={`${OPTION} optrow-wide col-span-full`}><input type="radio" name="goal" value="لست متأكدة وأرغب بالحصول على توصية من فريق Like A Model" />
                <span className={OPTION_FACE}>لست متأكدة وأرغب بالحصول على توصية من فريق Like A Model</span>
              </label>
            </div>
            <span className={ERROR} data-err-for="goal"></span>
          </fieldset>

          <fieldset className="syj-panel hidden min-w-0 border-0 p-0 [&.is-on]:grid [&.is-on]:gap-4" data-syj-step="3">
            <p className="sr-only">نوع الدعم</p>
            <h1 className="font-lam-heading text-(length:--fs-h1) leading-[1.35] font-bold text-lam-brown" tabIndex={-1}>كيف نساعدكِ في رحلتكِ؟</h1>
            <div className="grid items-stretch gap-[.4rem]" role="radiogroup" aria-labelledby="syjSupportLegend">
              <p className="sr-only" id="syjSupportLegend">اختاري نوع الدعم</p>
              {['تدريب شخصي', 'تغذية', 'متابعة متكاملة'].map((support) => <label className={OPTION} key={support}><input type="radio" name="support" value={support} />
                <span className={OPTION_FACE}>{support}</span></label>)}
            </div>
            <span className={ERROR} data-err-for="support"></span>
            <p className={FIELD}>
              <label className={LABEL} htmlFor="syjTime">وقت التواصل المفضّل <span className="req text-lam-primary" aria-hidden="true">*</span></label>
              <select className={INPUT} id="syjTime" name="time" required>
                <option value="">اختاري الوقت</option>
                <option value="صباحًا">صباحًا</option>
                <option value="ظهرًا">ظهرًا</option>
                <option value="مساءً">مساءً</option>
                <option value="في أي وقت">في أي وقت</option>
              </select>
              <span className={ERROR} data-err-for="time"></span>
            </p>
          </fieldset>

          <fieldset className="syj-panel hidden min-w-0 border-0 p-0 [&.is-on]:grid [&.is-on]:gap-4" data-syj-step="4">
            <p className="sr-only">الخطوة الأخيرة</p>
            <h1 className="font-lam-heading text-(length:--fs-h1) leading-[1.35] font-bold text-lam-brown" tabIndex={-1}>باقي خطوة ونبدأ</h1>
            <p className={FIELD}>
              <label className={LABEL} htmlFor="syjSource">كيف تعرّفتِ علينا؟ <span className="text-[.8438rem] text-lam-subtle">(اختياري)</span></label>
              <select className={INPUT} id="syjSource" name="source">
                <option value="">اختاري إن رغبتِ</option>
                <option value="إنستغرام">إنستغرام</option>
                <option value="سناب شات">سناب شات</option>
                <option value="تيك توك">تيك توك</option>
                <option value="صديقة أو أحد أفراد العائلة">صديقة أو أحد أفراد العائلة</option>
                <option value="شريك من شركاء النجاح">شريك من شركاء النجاح</option>
                <option value="واتساب">واتساب</option>
                <option value="إعلان ممول">إعلان ممول</option>
                <option value="معرض أو فعالية">معرض أو فعالية</option>
                <option value="أخرى">أخرى</option>
              </select>
            </p>
            <p className={FIELD}>
              <label className={LABEL} htmlFor="syjMessage">رسالتِك <span className="text-[.8438rem] text-lam-subtle">(اختياري)</span></label>
              <textarea className={`${INPUT} syj-note min-h-32 max-h-35 resize-y leading-[1.75]`} id="syjMessage" name="message" rows="4" placeholder="أي تفاصيل تودّين إخبارنا بها…"></textarea>
            </p>
            <div className="mt-[.15rem] grid gap-[.45rem] rounded-lam-md border border-[color-mix(in_srgb,var(--color-brand-rose)_70%,transparent)] bg-lam-blush px-4 py-[.9rem]">
              <label className="flex cursor-pointer items-start gap-[.7rem] text-(length:--fs-body) leading-[1.7] text-lam-brown">
                <input className="mt-[.2rem] size-5 shrink-0 accent-lam-primary" type="checkbox" id="syjConsent" name="consent" required aria-describedby="syjConsentErr" />
                <span>أوافق على تواصل فريق <bdi className="lam" lang="en">Like A Model</bdi> معي بشأن طلبي.</span>
              </label>
              <span className={ERROR} id="syjConsentErr" data-err-for="consent"></span>
            </div>
          </fieldset>

          <div className={`syj-actions mt-[1.35rem] flex flex-wrap items-center justify-between gap-3 max-sm:flex-col-reverse max-sm:items-stretch [&_.btn]:min-w-34 max-sm:[&_.btn]:w-full
            max-sm:[&_.btn]:min-w-0`}>
            <button className="btn syj-ghost border border-lam-primary bg-transparent text-lam-brown shadow-none hover:bg-lam-primary-hover" id="syjBack" type="button" hidden>رجوع</button>
            <button className="btn btn-primary" id="syjNext" type="button">التالي</button>
            <button className="btn btn-primary btn-lg" id="syjSend" type="submit" hidden aria-hidden="true">إرسال الطلب</button>
          </div>
          <p className="form-status syj-status mt-1 min-h-[1.4em] text-(length:--fs-body) leading-[1.6] font-bold text-lam-muted [&.is-err]:text-lam-danger [&.is-ok]:text-lam-success"
            role="status" aria-live="polite" id="syjLive"></p>
        </form>
      </div>

      <div className="syj-done hidden justify-items-center gap-4 py-6 text-center">
        <h1 className="font-lam-heading text-(length:--fs-h1) font-bold text-lam-brown" id="syjDoneTitle" tabIndex={-1}>تم استلام طلبكِ</h1>
        <p className="max-w-md text-(length:--fs-body) leading-[1.9] text-lam-muted">شكرًا لكِ. سيتواصل معكِ فريق <bdi className="lam" lang="en">Like A Model</bdi> قريبًا لتبدأ رحلتكِ.</p>
        <p className="max-w-md text-(length:--fs-body) leading-[1.9] text-lam-muted">سنعيدكِ للرئيسية خلال <span className="font-bold text-lam-brown" id="syjCount">٨</span> ثوانٍ.</p>
        <Link className="btn btn-primary btn-lg" id="syjHome" to="/">العودة للرئيسية</Link>
      </div>
    </div>
  );
}, () => true);

export default function StartJourneyPage() {
  useEffect(() => {
    window.__lamInitStartJourney?.();
    return () => window.__lamAbortStartJourney?.();
  }, []);

  return (
    <main id="main">
      <div className="shell pb-20 pt-[calc(var(--header-h)+env(safe-area-inset-top,0px)+2.25rem)]">
        <Link className="mb-5 inline-flex min-h-11 items-center gap-[.4rem] font-bold text-lam-muted hover:text-lam-brown" to="/">
          <svg className="ico size-[1em]" aria-hidden="true"><use href="#i-arrow"></use></svg>
          العودة للرئيسية
        </Link>
        <SyjCard />
      </div>
    </main>
  );
}