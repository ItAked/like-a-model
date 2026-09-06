/** MOTION LOCK: parallax, .contact-unified-card.reveal (including leave-on-exit). */
export default function Contact() {
  return (
    <>
      <div className="chapter" id="contact">

      {/* ══════════ 9 · CONTACT ══════════ */}
      <section className="section section-contact" id="contact-form">
        <div className="contact-banner" aria-hidden="true">
          <div className="contact-parallax-bg"></div>
          <div className="contact-parallax-overlay"></div>
        </div>

        <div className="contact-shell">
          <div className="contact-unified-card reveal" data-delay="1">
            <div className="contact-main">
            <header className="contact-card-head">
              <p className="sec-ornament" aria-hidden="true">
                <span className="sec-ornament-line"></span>
                <svg className="ico" aria-hidden="true"><use href="#i-heart"></use></svg>
                <span className="sec-ornament-line"></span>
              </p>
              <h2 className="h2">خطوتكِ الأولى تبدأ هنا</h2>
              <p className="sec-sub">أخبرينا عن أهدافكِ، وسنصمّم لكِ الخطوة المناسبة</p>
            </header>

            {/* وجهة الإرسال عبر Public API (VITE_API_BASE_URL) */}
            <form className="contact-form" id="contactForm" noValidate>

              <div className="field-row">
                <p className="field">
                  <label className="field-lbl" htmlFor="cName">الاسم الكامل <span className="req" aria-hidden="true">*</span></label>
                  <span className="field-wrap">
                    <svg className="ico field-ico" aria-hidden="true"><use href="#i-user"></use></svg>
                    <input className="input" id="cName" name="name" type="text" autoComplete="name" required placeholder="اسمِك الكامل" />
                  </span>
                  <span className="field-err" data-err-for="cName"></span>
                </p>

                <p className="field">
                  <label className="field-lbl" htmlFor="cPhone">رقم الجوال <span className="req" aria-hidden="true">*</span></label>
                  <span className="field-wrap">
                    <svg className="ico field-ico" aria-hidden="true"><use href="#i-phone"></use></svg>
                    <input className="input" id="cPhone" name="phone" type="tel" inputMode="tel" dir="ltr"
                           autoComplete="tel" required placeholder="05XXXXXXXX" />
                  </span>
                  <span className="field-err" data-err-for="cPhone"></span>
                </p>
              </div>

              <div className="field-row">
                <p className="field">
                  <label className="field-lbl" htmlFor="cWeight">الوزن <span className="field-unit">(كجم)</span> <span className="req" aria-hidden="true">*</span></label>
                  <span className="field-wrap">
                    <svg className="ico field-ico" aria-hidden="true"><use href="#i-weight"></use></svg>
                    <input className="input" id="cWeight" name="weight" type="number" inputMode="decimal" dir="ltr"
                           min="30" max="250" step="0.1" placeholder="65" required />
                  </span>
                  <span className="field-err" data-err-for="cWeight"></span>
                </p>

                <p className="field">
                  <label className="field-lbl" htmlFor="cHeight">الطول <span className="field-unit">(سم)</span> <span className="req" aria-hidden="true">*</span></label>
                  <span className="field-wrap">
                    <svg className="ico field-ico" aria-hidden="true"><use href="#i-ruler"></use></svg>
                    <input className="input" id="cHeight" name="height" type="number" inputMode="numeric" dir="ltr"
                           min="100" max="220" step="1" placeholder="165" required />
                  </span>
                  <span className="field-err" data-err-for="cHeight"></span>
                </p>
              </div>

              <p className="field">
                <label className="field-lbl" htmlFor="cGoal">ما الذي ترغبين في تحقيقه؟ <span className="req" aria-hidden="true">*</span></label>
                <span className="field-wrap field-wrap-select">
                  <select className="input" id="cGoal" name="goal" required defaultValue="">
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
                <span className="field-err" data-err-for="goal"></span>
              </p>

              <p className="field">
                <label className="field-lbl" htmlFor="cSource">كيف تعرّفتِ على <bdi className="lam" lang="en">Like A Model</bdi>؟ <span className="req" aria-hidden="true">*</span></label>
                <span className="field-wrap field-wrap-select">
                  <select className="input" id="cSource" name="source" required defaultValue="">
                    <option value="" disabled hidden>اختاري كيف تعرّفتِ علينا</option>
                    <option value="إنستغرام">إنستغرام</option>
                    <option value="تيك توك">تيك توك</option>
                    <option value="سناب شات">سناب شات</option>
                    <option value="جوجل">جوجل</option>
                    <option value="صديقة أو أحد أفراد العائلة">صديقة أو أحد أفراد العائلة</option>
                    <option value="عميلة حالية">عميلة حالية</option>
                    <option value="شريك من شركاء النجاح">شريك من شركاء النجاح</option>
                    <option value="إعلان ممول">إعلان ممول</option>
                    <option value="واتساب">واتساب</option>
                    <option value="معرض أو فعالية">معرض أو فعالية</option>
                    <option value="أخرى">أخرى (يرجى التوضيح)</option>
                  </select>
                </span>
                <span className="field-err" data-err-for="source"></span>
              </p>
              <p className="field field-other" id="sourceOtherField" hidden>
                <label className="field-lbl" htmlFor="cSourceOther">يرجى توضيح كيف تعرّفتِ علينا <span className="req" aria-hidden="true">*</span></label>
                <input className="input" id="cSourceOther" name="sourceOther" type="text" placeholder="يرجى التوضيح…" disabled />
                <span className="field-err" data-err-for="cSourceOther"></span>
              </p>

              <p className="field">
                <label className="field-lbl" htmlFor="cTime">متى الوقت المناسب للتواصل معكِ؟ <span className="req" aria-hidden="true">*</span></label>
                <span className="field-wrap field-wrap-select">
                  <select className="input" id="cTime" name="time" required defaultValue="">
                    <option value="" disabled hidden>اختاري الوقت المناسب</option>
                    <option value="صباحًا">صباحًا</option>
                    <option value="ظهرًا">ظهرًا</option>
                    <option value="مساءً">مساءً</option>
                    <option value="في أي وقت">في أي وقت</option>
                  </select>
                </span>
                <span className="field-err" data-err-for="time"></span>
              </p>

              <p className="field">
                <label className="field-lbl" htmlFor="cMessage">رسالتِك <span className="field-unit">(اختياري)</span></label>
                <textarea className="input" id="cMessage" name="message" rows="3" placeholder="أي تفاصيل تودّين إخبارنا بها…"></textarea>
              </p>

              <div className="form-foot">
                <div className="contact-consent">
                  <label className="contact-check">
                    <input type="checkbox" id="cConsent" name="consent" required />
                    <span>أوافق على التواصل معي من فريق <bdi className="lam" lang="en">Like A Model</bdi> بخصوص طلبي.</span>
                  </label>
                  <span className="field-err" data-err-for="consent"></span>
                </div>
                <button className="btn btn-primary" id="contactSubmit" type="submit" disabled aria-disabled="true">
                  إرسال الطلب
                  <svg className="ico btn-ico" aria-hidden="true"><use href="#i-send"></use></svg>
                </button>
                <p className="form-status" role="status" aria-live="polite" id="formStatus"></p>
              </div>
            </form>
            </div>

            <aside className="contact-aside">
              <p className="sec-ornament" aria-hidden="true">
                <span className="sec-ornament-line"></span>
                <svg className="ico" aria-hidden="true"><use href="#i-heart"></use></svg>
                <span className="sec-ornament-line"></span>
              </p>
              <div className="contact-info">
                <h3 className="contact-info-title">تواصلي معنا</h3>
                <span className="contact-head-accent" aria-hidden="true"></span>
                <ul className="contact-list">
                  <li>
                    <a href="tel:920031018" id="cPhoneLink" aria-label="الهاتف">
                      <span className="contact-ico" aria-hidden="true"><svg className="ico"><use href="#i-telephone"></use></svg></span>
                      <span className="contact-row-text">
                        <span className="contact-row-lbl">هاتف</span>
                        <span data-contact-text dir="ltr">920031018</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#" id="cWaLink" rel="noopener" aria-label="الواتساب">
                      <span className="contact-ico" aria-hidden="true"><svg className="ico"><use href="#i-whatsapp"></use></svg></span>
                      <span className="contact-row-text">
                        <span className="contact-row-lbl">واتساب</span>
                        <span data-contact-text dir="ltr">0542555516</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@likeamodel.com.sa" id="cMailLink" aria-label="البريد الإلكتروني">
                      <span className="contact-ico" aria-hidden="true"><svg className="ico"><use href="#i-mail"></use></svg></span>
                      <span className="contact-row-text">
                        <span className="contact-row-lbl">إيميل</span>
                        <span data-contact-text dir="ltr">info@likeamodel.com.sa</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <span className="contact-addr">
                      <span className="contact-ico" aria-hidden="true"><svg className="ico"><use href="#i-pin"></use></svg></span>
                      <span className="contact-row-text">
                        <span className="contact-row-lbl">الموقع</span>
                        <span id="cAddrText">الرياض — المملكة العربية السعودية</span>
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
              <figure className="contact-map" aria-label="موقع الشركة">
                <div className="map-frame" id="mapFrame"></div>
                <a className="map-open" id="mapOpen" href="https://www.google.com/maps?q=حي%20الورود%2C%20الرياض%2C%20المملكة%20العربية%20السعودية" target="_blank" rel="noopener noreferrer">فتح في خرائط Google</a>
              </figure>
            </aside>

          </div>
        </div>
      </section>

      </div>
    </>
  );
}
