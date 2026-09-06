import { memo, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { dur, easeOut, easeUi, tween } from '../motion/tokens.js';

/* boot.js mutates wizard DOM; skip re-renders so React does not reset steps. */
const BookingWizard = memo(function BookingWizard() {
  return (
    <>
          <button className="bk-modal-close" type="button" data-bk-close aria-label="إغلاق">
            <svg className="ico" aria-hidden="true"><use href="#i-close"></use></svg>
          </button>

          <div className="bk-modal-scroll">
            <header className="bk-modal-head">
              <h2 className="bk-modal-title" id="bkModalTitle">احجزي جلسة تقييمكِ المجانية</h2>
              <p className="bk-step-lbl" id="bkStepLbl">١ من ٥</p>
              <div className="bk-bar" aria-hidden="true">
                <span className="bk-bar-fill" id="bkBarFill"></span>
              </div>
            </header>

            <form className="bk-form contact-form" id="bookingForm" noValidate>
              <div className="bk-panel is-on" data-bk-step="1">
                <p className="field">
                  <label className="field-lbl" htmlFor="bkName">الاسم الكامل <span className="req" aria-hidden="true">*</span></label>
                  <span className="field-wrap">
                    <svg className="ico field-ico" aria-hidden="true"><use href="#i-user"></use></svg>
                    <input className="input" id="bkName" name="name" type="text" autoComplete="name" required placeholder="اسمِك الكامل" />
                  </span>
                  <span className="field-err" data-err-for="bkName"></span>
                </p>
                <p className="field">
                  <label className="field-lbl" htmlFor="bkPhone">رقم الجوال <span className="req" aria-hidden="true">*</span></label>
                  <span className="field-wrap">
                    <svg className="ico field-ico" aria-hidden="true"><use href="#i-phone"></use></svg>
                    <input className="input" id="bkPhone" name="phone" type="tel" inputMode="tel" dir="ltr"
                           autoComplete="tel" required placeholder="05XXXXXXXX" />
                  </span>
                  <span className="field-err" data-err-for="bkPhone"></span>
                </p>
              </div>

              <div className="bk-panel" data-bk-step="2" hidden>
                <div className="bk-hello" id="bkHello">
                  <p className="bk-hello-title">خطوتكِ الأولى تمت يا <span id="bkHelloName"></span> ✨</p>
                  <p className="bk-hello-sub">والآن نرسم معًا شكل النتيجة التي تتمنين الوصول إليها.</p>
                </div>
                <div className="field-row">
                  <p className="field">
                    <label className="field-lbl" htmlFor="bkWeight">الوزن <span className="field-unit">(كجم)</span> <span className="req" aria-hidden="true">*</span></label>
                    <span className="field-wrap">
                      <svg className="ico field-ico" aria-hidden="true"><use href="#i-weight"></use></svg>
                      <input className="input" id="bkWeight" name="weight" type="number" inputMode="decimal" dir="ltr"
                             min="30" max="250" step="0.1" placeholder="65" required />
                    </span>
                    <span className="field-err" data-err-for="bkWeight"></span>
                  </p>
                  <p className="field">
                    <label className="field-lbl" htmlFor="bkHeight">الطول <span className="field-unit">(سم)</span> <span className="req" aria-hidden="true">*</span></label>
                    <span className="field-wrap">
                      <svg className="ico field-ico" aria-hidden="true"><use href="#i-ruler"></use></svg>
                      <input className="input" id="bkHeight" name="height" type="number" inputMode="numeric" dir="ltr"
                             min="100" max="220" step="1" placeholder="165" required />
                    </span>
                    <span className="field-err" data-err-for="bkHeight"></span>
                  </p>
                </div>
                <p className="field">
                  <label className="field-lbl" htmlFor="bkGoal">ما الذي ترغبين في تحقيقه؟ <span className="req" aria-hidden="true">*</span></label>
                  <span className="field-wrap field-wrap-select">
                    <select className="input" id="bkGoal" name="goal" required defaultValue="">
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
                  <span className="field-err" data-err-for="bkGoal"></span>
                </p>
              </div>

              <div className="bk-panel" data-bk-step="3" hidden>
                <button className="bk-locate-btn" type="button" id="bkLocateOpen">
                  <svg className="ico" aria-hidden="true"><use href="#i-pin"></use></svg>
                  <span>تحديد موقعي على الخريطة</span>
                </button>
                <div className="bk-map-panel" id="bkMapPanel" hidden>
                  <div className="bk-map" id="bkMap" role="application" aria-label="خريطة اختيار موقع الجلسة"></div>
                  <button className="bk-map-geo" type="button" id="bkUseMyLoc">
                    <svg className="ico" aria-hidden="true"><use href="#i-pin"></use></svg>
                    استخدام موقعي الحالي
                  </button>
                  <p className="bk-map-hint" id="bkMapHint">اضغطي على الخريطة لوضع العلامة، أو استخدمي موقعكِ الحالي.</p>
                </div>
                <div className="bk-locate-done" id="bkLocateDone" hidden>
                  <span className="bk-locate-ok">
                    <svg className="ico" aria-hidden="true"><use href="#i-check"></use></svg>
                    <span>تم تحديد موقع الجلسة</span>
                  </span>
                  <button className="bk-locate-edit" type="button" id="bkLocateEdit">تعديل</button>
                </div>
                <p className="bk-locate-addr" id="bkLocateAddr" hidden></p>
                <span className="field-err" data-err-for="bkLocation"></span>
                <input type="hidden" id="bkLat" name="lat" defaultValue="" />
                <input type="hidden" id="bkLng" name="lng" defaultValue="" />
                <input type="hidden" id="bkAddress" name="address" defaultValue="" />
              </div>

              <div className="bk-panel" data-bk-step="4" hidden>
                <p className="bk-step-title">اختاري الموعد المناسب لجلسة التقييم <span className="req" aria-hidden="true">*</span></p>
                <div className="bk-cal" id="bkCal">
                  <div className="bk-cal-head">
                    <button className="bk-cal-nav" type="button" id="bkCalNext" aria-label="الشهر التالي">
                      <svg className="ico" aria-hidden="true"><use href="#i-arrow"></use></svg>
                    </button>
                    <p className="bk-cal-month" id="bkCalMonth"></p>
                    <button className="bk-cal-nav" type="button" id="bkCalPrev" aria-label="الشهر السابق">
                      <svg className="ico" aria-hidden="true" style={{ transform: "scaleX(-1)" }}><use href="#i-arrow"></use></svg>
                    </button>
                  </div>
                  <div className="bk-cal-weekdays" aria-hidden="true">
                    <span>أحد</span><span>إثنين</span><span>ثلاثاء</span><span>أربعاء</span><span>خميس</span><span>جمعة</span><span>سبت</span>
                  </div>
                  <div className="bk-cal-grid" id="bkCalGrid"></div>
                </div>
                <div className="bk-slots" id="bkSlots" hidden>
                  <p className="bk-slots-lbl">الأوقات المتاحة</p>
                  <p className="bk-slots-status" id="bkSlotsStatus" hidden role="status" aria-live="polite"></p>
                  <div className="bk-slots-list" id="bkSlotsList" role="group" aria-label="أوقات الجلسة"></div>
                  <button className="bk-slots-retry" type="button" id="bkSlotsRetry" hidden>إعادة المحاولة</button>
                </div>
                <span className="field-err" data-err-for="bkAppt"></span>
                <input type="hidden" id="bkDate" name="date" defaultValue="" />
                <input type="hidden" id="bkSlot" name="slot" defaultValue="" />
              </div>

              <div className="bk-panel" data-bk-step="5" hidden>
                <div className="bk-review" id="bkReview" aria-live="polite"></div>
                <div className="contact-consent">
                  <label className="contact-check">
                    <input type="checkbox" id="bkConsent" name="consent" required />
                    <span>أوافق على التواصل معي من فريق <bdi className="lam" lang="en">Like A Model</bdi> بخصوص طلبي.</span>
                  </label>
                  <span className="field-err" data-err-for="bkConsent"></span>
                </div>
              </div>

              <div className="bk-actions">
                <button className="bk-back" type="button" id="bkBack" hidden>رجوع</button>
                <button className="btn btn-primary bk-next" type="button" id="bkNext">التالي</button>
                <button className="btn btn-primary bk-send" type="submit" id="bkSend" hidden disabled aria-disabled="true">
                  إرسال الطلب
                  <svg className="ico btn-ico" aria-hidden="true"><use href="#i-send"></use></svg>
                </button>
              </div>
              <p className="form-status" role="status" aria-live="polite" id="bkStatus"></p>
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
      className="bk-modal"
      id="bookingModal"
      hidden={shown ? undefined : true}
      aria-hidden={open ? 'false' : 'true'}
    >
      <m.div
        className="bk-modal-backdrop"
        data-bk-close
        tabIndex="-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={tween(reduce ? 0 : dur.fade, easeUi)}
      />
      <m.div
        className="bk-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bkModalTitle"
        tabIndex="-1"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: reduce ? 0 : 8 }}
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
