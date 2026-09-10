import { memo, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { dur, easeOut, easeUi, tween } from '../motion/tokens.js';

const FIELD = 'field grid gap-[.45rem]';
const LABEL = 'field-lbl text-(length:--fs-body) leading-normal font-medium text-lam-brown';
const WRAP = 'field-wrap relative block';
const INPUT = 'input min-h-13 w-full rounded-lam-md border-[1.5px] border-[var(--color-border-strong)] bg-lam-surface-alt px-4 py-[.85rem] text-(length:--fs-body) leading-[1.6] text-lam-brown transition-[border-color,box-shadow,background] duration-200 placeholder:text-lam-muted placeholder:opacity-75 hover:border-(--color-brand-rose) focus:border-lam-primary focus:bg-lam-surface focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] focus:outline-0 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-lam-primary';
const WRAPPED_INPUT = `${INPUT} pr-[2.9rem] pl-4`;
const ERROR = 'field-err text-(length:--fs-small) leading-normal font-bold text-lam-danger empty:hidden';
const ICON = 'ico field-ico pointer-events-none absolute top-1/2 right-[.9rem] size-[1.2rem] -translate-y-1/2 text-lam-muted';

const BookingWizard = memo(function BookingWizard() {
  return (
    <>
      <button className={`bk-modal-close absolute inset-e-[.85rem] top-[.85rem] z-2 grid size-10 place-items-center rounded-lam-pill text-lam-muted
            hover:bg-[color-mix(in_srgb,var(--color-brown)_5%,transparent)] hover:text-lam-brown`} type="button" data-bk-close aria-label="إغلاق">
        <svg className="ico size-[1.15rem]" aria-hidden="true"><use href="#i-close"></use></svg>
      </button>

      <div className={`bk-modal-scroll overflow-auto overscroll-contain px-[1.35rem] pb-[1.35rem] pt-[1.45rem] max-md:px-[1.1rem] max-md:pb-[calc(1.25rem+env(safe-area-inset-bottom))]
            max-md:pt-5`}>
        <header className="mb-[1.15rem] pe-9">
          <h2 className="mb-[.65rem] font-lam-heading text-(length:--fs-h3) leading-[1.35] font-bold text-lam-brown" id="bkModalTitle">احجزي جلسة تقييمكِ المجانية</h2>
          <p className="mb-[.45rem] text-(length:--fs-eyebrow) font-bold text-lam-muted" id="bkStepLbl">١ من ٥</p>
          <div className="h-1 overflow-hidden rounded-lam-pill bg-[rgba(214,214,214,.85)]" aria-hidden="true">
            <span className="bk-bar-fill block h-full w-[calc(var(--bk-p,25)*1%)] rounded-[inherit] bg-lam-primary transition-width duration-300 motion-reduce:transition-none"
              id="bkBarFill"></span>
          </div>
        </header>

        <form className="bk-form contact-form grid gap-4 bg-transparent p-0 shadow-none" id="bookingForm" noValidate>
          <div className="bk-panel is-on hidden min-w-0 gap-4 border-0 p-0 [&.is-on]:grid" data-bk-step="1">
            <p className={FIELD}>
              <label className={LABEL} htmlFor="bkName">الاسم الكامل <span className="req text-lam-primary" aria-hidden="true">*</span></label>
              <span className={WRAP}>
                <svg className={ICON} aria-hidden="true"><use href="#i-user"></use></svg>
                <input className={WRAPPED_INPUT} id="bkName" name="name" type="text" autoComplete="name" required placeholder="اسمِك الكامل" />
              </span>
              <span className={ERROR} data-err-for="bkName"></span>
            </p>
            <p className={FIELD}>
              <label className={LABEL} htmlFor="bkPhone">رقم الجوال <span className="req text-lam-primary" aria-hidden="true">*</span></label>
              <span className={WRAP}>
                <svg className={ICON} aria-hidden="true"><use href="#i-phone"></use></svg>
                <input className={WRAPPED_INPUT} id="bkPhone" name="phone" type="tel" inputMode="tel" dir="ltr" autoComplete="tel" required placeholder="05XXXXXXXX" />
              </span>
              <span className={ERROR} data-err-for="bkPhone"></span>
            </p>
          </div>

          <div className="bk-panel hidden min-w-0 gap-4 border-0 p-0 [&.is-on]:grid" data-bk-step="2" hidden>
            <div className={`bk-hello mb-[.15rem] translate-y-2 opacity-0 transition-[opacity,transform] duration-300 [&.is-in]:translate-y-0 [&.is-in]:opacity-100
                  motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none`} id="bkHello">
              <p className="text-[clamp(1.05rem,1rem+.2vw,1.2rem)] leading-[1.45] font-bold text-lam-brown">خطوتكِ الأولى تمت يا <span id="bkHelloName"></span> ✨</p>
              <p className="mt-[.4rem] text-(length:--fs-body) leading-[1.75] text-lam-muted">والآن نرسم معًا شكل النتيجة التي تتمنين الوصول إليها.</p>
            </div>
            <div className="grid gap-[clamp(1.1rem,2.2vw,1.5rem)] sm:grid-cols-2">
              <p className={FIELD}>
                <label className={LABEL} htmlFor="bkWeight">الوزن <span className="text-(length:.8438rem) text-lam-subtle">(كجم)</span> <span className="req text-lam-primary"
                  aria-hidden="true">*</span></label>
                <span className={WRAP}>
                  <svg className={ICON} aria-hidden="true"><use href="#i-weight"></use></svg>
                  <input className={WRAPPED_INPUT} id="bkWeight" name="weight" type="number" inputMode="decimal" dir="ltr" min="30" max="250" step="0.1" placeholder="65" required />
                </span>
                <span className={ERROR} data-err-for="bkWeight"></span>
              </p>
              <p className={FIELD}>
                <label className={LABEL} htmlFor="bkHeight">الطول <span className="text-[.8438rem] text-lam-subtle">(سم)</span> <span className="req text-lam-primary"
                  aria-hidden="true">*</span></label>
                <span className={WRAP}>
                  <svg className={ICON} aria-hidden="true"><use href="#i-ruler"></use></svg>
                  <input className={WRAPPED_INPUT} id="bkHeight" name="height" type="number" inputMode="numeric" dir="ltr" min="100" max="220" step="1" placeholder="165" required />
                </span>
                <span className={ERROR} data-err-for="bkHeight"></span>
              </p>
            </div>
            <p className={FIELD}>
              <label className={LABEL} htmlFor="bkGoal">ما الذي ترغبين في تحقيقه؟ <span className="req text-lam-primary" aria-hidden="true">*</span></label>
              <span className="field-wrap field-wrap-select relative block">
                <select className={`${INPUT} cursor-pointer appearance-none text-right`} id="bkGoal" name="goal" required defaultValue="">
                  <option value="" disabled hidden>اختاري هدف رحلتك</option>
                  <option value="رحلة خسارة الدهون">رحلة خسارة الدهون</option>
                  <option value="رحلة نحت وتنسيق القوام">رحلة نحت وتنسيق القوام</option>
                  <option value="رحلة بناء العضلات والقوة">رحلة بناء العضلات والقوة</option>
                  <option value="رحلة نمط الحياة الصحي">رحلة نمط الحياة الصحي</option>
                  <option value="رحلة الحمل الصحي">رحلة الحمل الصحي</option>
                  <option value="رحلة ما بعد الولادة">رحلة ما بعد الولادة</option>
                  <option value="رحلة التحوّل بعد التكميم">رحلة التحوّل بعد التكميم</option>
                  <option value="رحلة اللياقة والصحة لكبار السن">رحلة اللياقة والصحة لكبار السن</option>
                  <option value="رحلة تألّق العروس">رحلة تألّق العروس</option>
                  <option value="لست متأكدة وأرغب بالحصول على توصية من فريق Like A Model">لست متأكدة وأرغب بالحصول على توصية من فريق Like A Model</option>
                </select>
              </span>
              <span className={ERROR} data-err-for="bkGoal"></span>
            </p>
          </div>

          <div className="bk-panel hidden min-w-0 gap-4 border-0 p-0 [&.is-on]:grid" data-bk-step="3" hidden>
            <button className={`bk-locate-btn inline-flex min-h-13 w-full items-center justify-center gap-[.55rem] rounded-lam-md border border-lam-primary bg-transparent px-4 py-[.85rem]
                  text-(length:--fs-body) leading-[1.4] font-bold text-lam-brown transition-colors hover:bg-lam-primary-hover`} type="button" id="bkLocateOpen">
              <svg className="ico size-[1.15rem] shrink-0" aria-hidden="true"><use href="#i-pin"></use></svg>
              <span>تحديد موقعي على الخريطة</span>
            </button>
            <div className="bk-map-panel grid gap-[.7rem]" id="bkMapPanel" hidden>
              <div className="bk-map z-0 h-55 w-full overflow-hidden rounded-lam-md border border-(--color-neutral-border) bg-lam-blush" id="bkMap" role="application"
                aria-label="خريطة اختيار موقع الجلسة"></div>
              <button className={`bk-map-geo inline-flex min-h-13 w-full items-center justify-center gap-[.55rem] rounded-lam-md border border-lam-primary bg-transparent px-4 py-[.85rem]
                    font-bold text-lam-brown hover:bg-lam-primary-hover`} type="button" id="bkUseMyLoc">
                <svg className="ico" aria-hidden="true"><use href="#i-pin"></use></svg>
                استخدام موقعي الحالي
              </button>
              <p className="text-[.8125rem] leading-normal text-lam-muted" id="bkMapHint">اضغطي على الخريطة لوضع العلامة، أو استخدمي موقعكِ الحالي.</p>
            </div>
            <div className={`bk-locate-done flex min-h-13 w-full items-center justify-between gap-3 rounded-lam-md border border-lam-primary bg-white px-4 py-[.7rem]
              shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_14%,transparent)]`} id="bkLocateDone" hidden>
              <span className="inline-flex items-center gap-[.45rem] text-(length:--fs-body) font-bold text-lam-brown">
                <svg className="ico" aria-hidden="true"><use href="#i-check"></use></svg>
                <span>تم تحديد موقع الجلسة</span>
              </span>
              <button className="shrink-0 text-[.8125rem] font-bold text-lam-muted underline underline-offset-[.15em] hover:text-lam-primary" type="button" id="bkLocateEdit">تعديل</button>
            </div>
            <p className="bk-locate-addr text-[.8125rem] leading-[1.55] text-lam-muted" id="bkLocateAddr" hidden></p>
            <span className={ERROR} data-err-for="bkLocation"></span>
            <input type="hidden" id="bkLat" name="lat" defaultValue="" />
            <input type="hidden" id="bkLng" name="lng" defaultValue="" />
            <input type="hidden" id="bkAddress" name="address" defaultValue="" />
          </div>

          <div className="bk-panel hidden min-w-0 gap-4 border-0 p-0 [&.is-on]:grid" data-bk-step="4" hidden>
            <p className="text-(length:--fs-body) leading-normal font-bold text-lam-brown">اختاري الموعد المناسب لجلسة التقييم <span className="req text-lam-primary"
              aria-hidden="true">*</span></p>
            <div className="rounded-lam-md border border-(--color-neutral-border) bg-white px-3 pb-4 pt-[.85rem]" id="bkCal">
              <div className="mb-3 flex items-center justify-between gap-2">
                <button className="grid size-9 place-items-center rounded-lam-pill text-lam-muted hover:bg-[color-mix(in_srgb,var(--color-brown)_5%,transparent)] hover:text-lam-brown"
                  type="button" id="bkCalNext" aria-label="الشهر التالي">
                  <svg className="ico" aria-hidden="true"><use href="#i-arrow"></use></svg>
                </button>
                <p className="text-(length:--fs-body) font-bold text-lam-brown" id="bkCalMonth"></p>
                <button className="grid size-9 place-items-center rounded-lam-pill text-lam-muted hover:bg-[color-mix(in_srgb,var(--color-brown)_5%,transparent)] hover:text-lam-brown"
                  type="button" id="bkCalPrev" aria-label="الشهر السابق">
                  <svg className="ico" aria-hidden="true" style={{ transform: "scaleX(-1)" }}><use href="#i-arrow"></use></svg>
                </button>
              </div>
              <div className="grid grid-cols-7 gap-[.2rem] text-center" aria-hidden="true">
                {['أحد', 'إثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].map((day) => <span className="py-1 text-[.7rem] font-bold text-lam-subtle" key={day}>{day}</span>)}
              </div>
              <div className="bk-cal-grid" id="bkCalGrid"></div>
            </div>
            <div className="bk-slots grid gap-[.55rem]" id="bkSlots" hidden>
              <p className="text-[.8125rem] font-bold text-lam-muted">الأوقات المتاحة</p>
              <p className="bk-slots-status text-[.875rem] leading-[1.6] text-lam-muted [&.is-err]:text-lam-danger" id="bkSlotsStatus" hidden role="status" aria-live="polite"></p>
              <div className="bk-slots-list flex flex-wrap gap-[.45rem]" id="bkSlotsList" role="group" aria-label="أوقات الجلسة"></div>
              <button className={`bk-slots-retry min-h-[2.1rem] justify-self-start rounded-lam-pill border border-(--color-neutral-border) bg-white px-[.9rem] py-[.35rem] text-[.8125rem]
                font-bold text-lam-brown hover:bg-[color-mix(in_srgb,var(--color-primary)_12%,white)]`} type="button" id="bkSlotsRetry" hidden>إعادة المحاولة</button>
            </div>
            <span className={ERROR} data-err-for="bkAppt"></span>
            <input type="hidden" id="bkDate" name="date" defaultValue="" />
            <input type="hidden" id="bkSlot" name="slot" defaultValue="" />
          </div>

          <div className="bk-panel hidden min-w-0 gap-4 border-0 p-0 [&.is-on]:grid" data-bk-step="5" hidden>
            <div className="bk-review grid gap-[.7rem] rounded-lam-md border border-(--color-neutral-border) bg-white px-[1.05rem] py-4" id="bkReview" aria-live="polite"></div>
            <div className="grid w-full gap-[.45rem]">
              <label className="flex cursor-pointer items-start gap-[.7rem] text-(length:--fs-body) leading-[1.7] text-lam-brown">
                <input className="mt-[.2rem] size-5 shrink-0 accent-lam-primary" type="checkbox" id="bkConsent" name="consent" required />
                <span>أوافق على التواصل معي من فريق <bdi className="lam" lang="en">Like A Model</bdi> بخصوص طلبي.</span>
              </label>
              <span className={ERROR} data-err-for="bkConsent"></span>
            </div>
          </div>

          <div className="bk-actions mt-1 flex flex-wrap items-center justify-between gap-3 max-md:flex-col-reverse max-md:items-stretch">
            <button className="bk-back min-h-11 bg-transparent px-1 text-(length:--fs-body) font-bold text-lam-muted hover:text-lam-brown max-md:self-center" type="button" id="bkBack"
              hidden>رجوع</button>
            <button className="btn btn-primary bk-next ms-auto min-w-34 max-md:ms-0 max-md:w-full" type="button" id="bkNext">التالي</button>
            <button className="btn btn-primary bk-send ms-auto min-w-34 max-md:ms-0 max-md:w-full" type="submit" id="bkSend" hidden disabled aria-disabled="true">
              إرسال الطلب
              <svg className="ico btn-ico" aria-hidden="true"><use href="#i-send"></use></svg>
            </button>
          </div>
          <p className="form-status min-h-[1.4em] text-(length:--fs-body) leading-[1.6] font-bold text-lam-muted [&.is-err]:text-lam-danger [&.is-ok]:text-lam-success" role="status"
          aria-live="polite" id="bkStatus"></p>
        </form>
      </div>
    </>
  );
}, () => true);

export default function BookingModal({ open }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(Boolean(open));
  if (open && !shown) setShown(true);

  return (
    <div
      className="bk-modal fixed inset-0 z-120 grid place-items-center px-4 py-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] max-md:items-stretch max-md:p-0"
      id="bookingModal" hidden={shown ? undefined : true} aria-hidden={open ? 'false' : 'true'}>
      <m.div className="absolute inset-0 bg-[rgba(36,18,16,.48)] backdrop-blur-[2px]" data-bk-close tabIndex="-1" initial={{ opacity: 0 }} animate={{ opacity: open ? 1 : 0 }}
        transition={tween(reduce ? 0 : dur.fade, easeUi)} />
      <m.div className={`bk-modal-dialog relative z-1 flex max-h-[min(92vh,44rem)] w-[min(100%,34rem)] flex-col overflow-hidden rounded-[22px] border border-(--color-neutral-border)
        bg-white text-lam-brown shadow-[0_2px_10px_color-mix(in_srgb,var(--color-brown)_6%,transparent),0_22px_48px_color-mix(in_srgb,var(--color-brown)_16%,transparent)] max-md:h-full
          max-md:max-h-none max-md:w-full max-md:max-w-none max-md:rounded-none max-md:border-0`} role="dialog" aria-modal="true" aria-labelledby="bkModalTitle" tabIndex="-1"
        initial={reduce ? false : { opacity: 0, y: 8 }} animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 8 }}
        transition={open ? tween(reduce ? 0 : dur.panel, easeOut) : tween(reduce ? 0 : dur.panelExit, easeUi)}
        onAnimationComplete={() => {
          if (!open) setShown(false);
        }}
      >
        <BookingWizard />
      </m.div>
    </div>
  );
}