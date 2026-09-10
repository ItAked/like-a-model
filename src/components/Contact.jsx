/** MOTION LOCK: parallax, .contact-unified-card.reveal (including leave-on-exit). */
export default function Contact() {
  return (
    <>
      <div className="block scroll-mt-(--scroll-offset)" id="contact">

        {/* ══════════ 9 · CONTACT ══════════ */}
        <section className="section-contact relative isolate w-full max-w-none scroll-mt-(--scroll-offset) overflow-visible bg-white px-0 pt-0 pb-[clamp(2.75rem,6vw,4.5rem)]" id="contact-form">
          <div className="contact-banner pointer-events-none relative z-0 h-55 w-full overflow-hidden md:h-[310px]" aria-hidden="true">
            <div className="contact-parallax-bg absolute -top-[220px] right-0 -bottom-[220px] left-0 z-0 bg-[url('/assets/img/riyadh-skyline.jpg')] bg-cover bg-center bg-no-repeat [transform:translate3d(0,var(--contact-parallax-y,0px),0)] will-change-transform motion-reduce:[transform:translate3d(0,0,0)] motion-reduce:will-change-auto"></div>
            <div className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(115deg,rgba(31,12,9,.84)_0%,rgba(68,35,26,.76)_42%,rgba(105,54,61,.68)_72%,rgba(149,95,98,.52)_100%)] after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_center,rgba(222,197,188,.12)_0%,rgba(68,35,26,.42)_60%,rgba(20,7,5,.38)_100%)] after:mix-blend-multiply after:content-['']"></div>
          </div>

          <div className="relative z-2 mx-auto -mt-[108px] w-full max-w-(--shell) px-(--gutter) md:-mt-[155px]">
            <div className="contact-unified-card reveal block overflow-hidden rounded-[22px] border border-[color-mix(in_srgb,var(--color-brown)_8%,transparent)] bg-white px-7 py-9 shadow-[0_2px_10px_color-mix(in_srgb,var(--color-brown)_5%,transparent),0_18px_44px_color-mix(in_srgb,var(--color-brown)_7%,transparent),0_12px_36px_color-mix(in_srgb,var(--color-primary)_16%,transparent)] min-[760px]:grid min-[760px]:grid-cols-[minmax(0,1.18fr)_minmax(320px,.82fr)] min-[760px]:items-stretch min-[760px]:px-16 min-[760px]:py-14" data-delay="1">
              <div className="flex min-w-0 flex-col gap-4 min-[760px]:pe-10">
                <header className="m-0 p-0 text-center">
                  <p className="mb-[.85rem] flex items-center justify-center gap-[.7rem] text-lam-primary" aria-hidden="true">
                    <span className="block h-px w-11 bg-current opacity-72"></span>
                    <svg className="ico h-3.25 w-3.25 fill-current stroke-none" aria-hidden="true"><use href="#i-heart"></use></svg>
                    <span className="block h-px w-11 bg-current opacity-72"></span>
                  </p>
                  <h2 className="font-lam-heading text-(length:--fs-h2) leading-[1.3] font-bold text-lam-brown text-balance">خطوتكِ الأولى تبدأ هنا</h2>
                  <p className="mx-auto mt-[.55rem] max-w-xl text-(length:--fs-body) font-(--w-body) text-lam-muted">أخبرينا عن أهدافكِ، وسنصمّم لكِ الخطوة المناسبة</p>
                </header>

                {/* وجهة الإرسال عبر Public API (VITE_API_BASE_URL) */}
                <form className="grid min-w-0 gap-4 border-0 bg-transparent p-0 shadow-none" id="contactForm" noValidate>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <p className="grid gap-[.45rem]">
                      <label className="text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown" htmlFor="cName">الاسم الكامل <span className="text-lam-primary" aria-hidden="true">*</span></label>
                      <span className="field-wrap relative block [&:focus-within_svg]:text-lam-primary">
                        <svg className="ico pointer-events-none absolute top-1/2 right-[.9rem] h-[1.2rem] w-[1.2rem] -translate-y-1/2 text-lam-muted peer-focus:text-lam-primary" aria-hidden="true"><use href="#i-user"></use></svg>
                        <input className="input peer min-h-13 w-full rounded-lam-md border border-(--color-neutral-border) bg-white py-[.85rem] pr-[2.9rem] pl-[18px] text-(length:--fs-body) leading-[1.6] text-lam-brown shadow-none transition-[border-color,box-shadow,background] duration-(--t-fast) ease-(--ease) placeholder:text-[var(--color-placeholder)] hover:border-(--color-neutral-border) focus:border-lam-primary focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] focus:outline-0 focus-visible:outline-0 [&.is-filled]:border-lam-primary [&.is-filled]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] [&[aria-invalid='true']]:border-lam-danger [&[aria-invalid='true']]:bg-lam-surface [&[aria-invalid='true']]:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-danger)_12%,transparent)]" id="cName" name="name" type="text" autoComplete="name" required placeholder="اسمِك الكامل" />
                      </span>
                      <span className="text-[length:var(--fs-small)] leading-[1.5] font-bold text-lam-danger empty:hidden" data-err-for="cName"></span>
                    </p>

                    <p className="grid gap-[.45rem]">
                      <label className="text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown" htmlFor="cPhone">رقم الجوال <span className="text-lam-primary" aria-hidden="true">*</span></label>
                      <span className="field-wrap relative block [&:focus-within_svg]:text-lam-primary">
                        <svg className="ico pointer-events-none absolute top-1/2 right-[.9rem] h-[1.2rem] w-[1.2rem] -translate-y-1/2 text-lam-muted" aria-hidden="true"><use href="#i-phone"></use></svg>
                        <input className="input min-h-13 w-full rounded-lam-md border border-(--color-neutral-border) bg-white py-[.85rem] pr-[2.9rem] pl-[18px] text-(length:--fs-body) leading-[1.6] text-lam-brown shadow-none transition-[border-color,box-shadow,background] duration-(--t-fast) ease-(--ease) placeholder:text-[var(--color-placeholder)] hover:border-(--color-neutral-border) focus:border-lam-primary focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] focus:outline-0 focus-visible:outline-0 [&.is-filled]:border-lam-primary [&.is-filled]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] [&[aria-invalid='true']]:border-lam-danger [&[aria-invalid='true']]:bg-lam-surface [&[aria-invalid='true']]:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-danger)_12%,transparent)]" id="cPhone" name="phone" type="tel" inputMode="tel" dir="ltr"
                          autoComplete="tel" required placeholder="05XXXXXXXX" />
                      </span>
                      <span className="text-[length:var(--fs-small)] leading-[1.5] font-bold text-lam-danger empty:hidden" data-err-for="cPhone"></span>
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <p className="grid gap-[.45rem]">
                      <label className="text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown" htmlFor="cWeight">الوزن <span className="text-[.8438rem] text-lam-subtle">(كجم)</span> <span className="text-lam-primary" aria-hidden="true">*</span></label>
                      <span className="field-wrap relative block [&:focus-within_svg]:text-lam-primary">
                        <svg className="ico pointer-events-none absolute top-1/2 right-[.9rem] h-[1.2rem] w-[1.2rem] -translate-y-1/2 text-lam-muted" aria-hidden="true"><use href="#i-weight"></use></svg>
                        <input className="input min-h-13 w-full rounded-lam-md border border-(--color-neutral-border) bg-white py-[.85rem] pr-[2.9rem] pl-[18px] text-(length:--fs-body) leading-[1.6] text-lam-brown shadow-none transition-[border-color,box-shadow,background] duration-(--t-fast) ease-(--ease) placeholder:text-[var(--color-placeholder)] hover:border-(--color-neutral-border) focus:border-lam-primary focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] focus:outline-0 focus-visible:outline-0 [&.is-filled]:border-lam-primary [&.is-filled]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] [&[aria-invalid='true']]:border-lam-danger [&[aria-invalid='true']]:bg-lam-surface [&[aria-invalid='true']]:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-danger)_12%,transparent)]" id="cWeight" name="weight" type="number" inputMode="decimal" dir="ltr"
                          min="30" max="250" step="0.1" placeholder="65" required />
                      </span>
                      <span className="text-[length:var(--fs-small)] leading-[1.5] font-bold text-lam-danger empty:hidden" data-err-for="cWeight"></span>
                    </p>

                    <p className="grid gap-[.45rem]">
                      <label className="text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown" htmlFor="cHeight">الطول <span className="text-[.8438rem] text-lam-subtle">(سم)</span> <span className="text-lam-primary" aria-hidden="true">*</span></label>
                      <span className="field-wrap relative block [&:focus-within_svg]:text-lam-primary">
                        <svg className="ico pointer-events-none absolute top-1/2 right-[.9rem] h-[1.2rem] w-[1.2rem] -translate-y-1/2 text-lam-muted" aria-hidden="true"><use href="#i-ruler"></use></svg>
                        <input className="input min-h-13 w-full rounded-lam-md border border-(--color-neutral-border) bg-white py-[.85rem] pr-[2.9rem] pl-[18px] text-(length:--fs-body) leading-[1.6] text-lam-brown shadow-none transition-[border-color,box-shadow,background] duration-(--t-fast) ease-(--ease) placeholder:text-[var(--color-placeholder)] hover:border-(--color-neutral-border) focus:border-lam-primary focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] focus:outline-0 focus-visible:outline-0 [&.is-filled]:border-lam-primary [&.is-filled]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] [&[aria-invalid='true']]:border-lam-danger [&[aria-invalid='true']]:bg-lam-surface [&[aria-invalid='true']]:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-danger)_12%,transparent)]" id="cHeight" name="height" type="number" inputMode="numeric" dir="ltr"
                          min="100" max="220" step="1" placeholder="165" required />
                      </span>
                      <span className="text-[length:var(--fs-small)] leading-[1.5] font-bold text-lam-danger empty:hidden" data-err-for="cHeight"></span>
                    </p>
                  </div>

                  <p className="grid gap-[.45rem]">
                    <label className="text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown" htmlFor="cGoal">ما الذي ترغبين في تحقيقه؟ <span className="text-lam-primary" aria-hidden="true">*</span></label>
                    <span className="field-wrap relative block after:pointer-events-none after:absolute after:top-1/2 after:left-[1.1rem] after:z-1 after:h-[.65rem] after:w-[.65rem] after:-translate-y-1/2 after:rotate-45 after:border-r-[1.7px] after:border-b-[1.7px] after:border-lam-brown after:content-['']">
                      <select className="input min-h-13 w-full cursor-pointer appearance-none rounded-lam-md border border-(--color-neutral-border) bg-white py-[.85rem] pr-[18px] pl-[2.75rem] text-right text-(length:--fs-body) leading-[1.6] text-lam-brown shadow-none transition-[border-color,box-shadow,background] duration-(--t-fast) [direction:rtl] ease-(--ease) hover:border-(--color-neutral-border) focus:border-lam-primary focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] focus:outline-0 focus-visible:outline-0 [&.is-filled]:border-lam-primary [&.is-filled]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] [&:has(option[value='']:checked)]:text-[var(--color-placeholder)] [&[aria-invalid='true']]:border-lam-danger [&[aria-invalid='true']]:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-danger)_12%,transparent)] [&_option]:bg-lam-surface [&_option]:text-right [&_option]:text-lam-brown" id="cGoal" name="goal" required defaultValue="">
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
                    <span className="text-[length:var(--fs-small)] leading-[1.5] font-bold text-lam-danger empty:hidden" data-err-for="goal"></span>
                  </p>

                  <p className="grid gap-[.45rem]">
                    <label className="text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown" htmlFor="cSource">كيف تعرّفتِ على <bdi className="lam" lang="en">Like A Model</bdi>؟ <span className="text-lam-primary" aria-hidden="true">*</span></label>
                    <span className="field-wrap relative block after:pointer-events-none after:absolute after:top-1/2 after:left-[1.1rem] after:z-1 after:h-[.65rem] after:w-[.65rem] after:-translate-y-1/2 after:rotate-45 after:border-r-[1.7px] after:border-b-[1.7px] after:border-lam-brown after:content-['']">
                      <select className="input min-h-13 w-full cursor-pointer appearance-none rounded-lam-md border border-(--color-neutral-border) bg-white py-[.85rem] pr-[18px] pl-[2.75rem] text-right text-(length:--fs-body) leading-[1.6] text-lam-brown shadow-none transition-[border-color,box-shadow,background] duration-(--t-fast) [direction:rtl] ease-(--ease) hover:border-(--color-neutral-border) focus:border-lam-primary focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] focus:outline-0 focus-visible:outline-0 [&.is-filled]:border-lam-primary [&.is-filled]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] [&:has(option[value='']:checked)]:text-[var(--color-placeholder)] [&[aria-invalid='true']]:border-lam-danger [&[aria-invalid='true']]:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-danger)_12%,transparent)] [&_option]:bg-lam-surface [&_option]:text-right [&_option]:text-lam-brown" id="cSource" name="source" required defaultValue="">
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
                    <span className="text-[length:var(--fs-small)] leading-[1.5] font-bold text-lam-danger empty:hidden" data-err-for="source"></span>
                  </p>
                  <p className="mt-[.2rem] grid gap-[.45rem] [&[hidden]]:hidden" id="sourceOtherField" hidden>
                    <label className="text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown" htmlFor="cSourceOther">يرجى توضيح كيف تعرّفتِ علينا <span className="text-lam-primary" aria-hidden="true">*</span></label>
                    <input className="input min-h-13 w-full rounded-lam-md border border-(--color-neutral-border) bg-white px-[18px] py-[.85rem] text-(length:--fs-body) leading-[1.6] text-lam-brown shadow-none transition-[border-color,box-shadow,background] duration-(--t-fast) ease-(--ease) placeholder:text-[var(--color-placeholder)] hover:border-(--color-neutral-border) focus:border-lam-primary focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] focus:outline-0 focus-visible:outline-0 [&.is-filled]:border-lam-primary [&.is-filled]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] [&[aria-invalid='true']]:border-lam-danger [&[aria-invalid='true']]:bg-lam-surface [&[aria-invalid='true']]:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-danger)_12%,transparent)]" id="cSourceOther" name="sourceOther" type="text" placeholder="يرجى التوضيح…" disabled />
                    <span className="text-[length:var(--fs-small)] leading-[1.5] font-bold text-lam-danger empty:hidden" data-err-for="cSourceOther"></span>
                  </p>

                  <p className="grid gap-[.45rem]">
                    <label className="text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown" htmlFor="cTime">متى الوقت المناسب للتواصل معكِ؟ <span className="text-lam-primary" aria-hidden="true">*</span></label>
                    <span className="field-wrap relative block after:pointer-events-none after:absolute after:top-1/2 after:left-[1.1rem] after:z-1 after:h-[.65rem] after:w-[.65rem] after:-translate-y-1/2 after:rotate-45 after:border-r-[1.7px] after:border-b-[1.7px] after:border-lam-brown after:content-['']">
                      <select className="input min-h-13 w-full cursor-pointer appearance-none rounded-lam-md border border-(--color-neutral-border) bg-white py-[.85rem] pr-[18px] pl-[2.75rem] text-right text-(length:--fs-body) leading-[1.6] text-lam-brown shadow-none transition-[border-color,box-shadow,background] duration-(--t-fast) [direction:rtl] ease-(--ease) hover:border-(--color-neutral-border) focus:border-lam-primary focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] focus:outline-0 focus-visible:outline-0 [&.is-filled]:border-lam-primary [&.is-filled]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_14%,transparent)] [&:has(option[value='']:checked)]:text-[var(--color-placeholder)] [&[aria-invalid='true']]:border-lam-danger [&[aria-invalid='true']]:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-danger)_12%,transparent)] [&_option]:bg-lam-surface [&_option]:text-right [&_option]:text-lam-brown" id="cTime" name="time" required defaultValue="">
                        <option value="" disabled hidden>اختاري الوقت المناسب</option>
                        <option value="صباحًا">صباحًا</option>
                        <option value="ظهرًا">ظهرًا</option>
                        <option value="مساءً">مساءً</option>
                        <option value="في أي وقت">في أي وقت</option>
                      </select>
                    </span>
                    <span className="text-[length:var(--fs-small)] leading-[1.5] font-bold text-lam-danger empty:hidden" data-err-for="time"></span>
                  </p>

                  <p className="grid gap-[.45rem]">
                    <label className="text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown" htmlFor="cMessage">رسالتِك <span className="text-[.8438rem] text-lam-subtle">(اختياري)</span></label>
                    <textarea className="input min-h-24 w-full resize-y rounded-lam-md border border-(--color-neutral-border) bg-white px-[18px] py-4 text-(length:--fs-body) leading-[1.6] text-lam-brown shadow-none transition-[border-color,box-shadow,background] duration-(--t-fast) ease-(--ease) placeholder:text-[var(--color-placeholder)] hover:border-(--color-neutral-border) focus:border-lam-primary focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_18%,transparent)] focus:outline-0 focus-visible:outline-0 [&.is-filled]:border-lam-primary [&.is-filled]:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-primary)_14%,transparent)]" id="cMessage" name="message" rows="3" placeholder="أي تفاصيل تودّين إخبارنا بها…"></textarea>
                  </p>

                  <div className="grid justify-items-start gap-[.65rem]">
                    <div className="grid w-full gap-[.45rem] border-0 bg-transparent p-0">
                      <label className="flex cursor-pointer items-start gap-[.7rem] text-(length:--fs-body) leading-[1.7] text-lam-brown">
                        <input className="mt-[.2rem] h-5 w-5 flex-none accent-lam-primary" type="checkbox" id="cConsent" name="consent" required />
                        <span>أوافق على التواصل معي من فريق <bdi className="lam" lang="en">Like A Model</bdi> بخصوص طلبي.</span>
                      </label>
                      <span className="text-[length:var(--fs-small)] leading-[1.5] font-bold text-lam-danger empty:hidden" data-err-for="consent"></span>
                    </div>
                    <button className="group inline-flex min-h-12 min-w-[min(100%,16rem)] cursor-pointer items-center justify-center gap-[.6rem] rounded-lam-pill border-[1.5px] border-transparent bg-lam-primary px-[1.6rem] py-[.8rem] text-center text-(length:--fs-ui) leading-[1.2] font-bold text-white shadow-[0_8px_24px_color-mix(in_srgb,var(--color-primary)_28%,transparent)] transition-[background,color,border-color,transform,box-shadow] duration-(--t-btn) ease-(--ease) hover:bg-(--color-btn-primary-hover) hover:shadow-[0_12px_30px_color-mix(in_srgb,var(--color-btn-primary-hover)_34%,transparent)] active:translate-y-px active:bg-(--color-btn-primary-active) focus-visible:outline-lam-primary disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none [&[aria-disabled='true']]:pointer-events-none [&[aria-disabled='true']]:cursor-not-allowed [&[aria-disabled='true']]:opacity-45 [&[aria-disabled='true']]:shadow-none" id="contactSubmit" type="submit" disabled aria-disabled="true">
                      إرسال الطلب
                      <svg className="ico h-[1.1em] w-[1.1em] stroke-current transition-transform duration-(--t-btn) group-hover:-translate-x-1" aria-hidden="true"><use href="#i-send"></use></svg>
                    </button>
                    <p className="form-status min-h-[1.4em] text-(length:--fs-body) leading-[1.6] font-bold text-lam-muted [&.is-err]:text-lam-danger [&.is-ok]:text-lam-success" role="status" aria-live="polite" id="formStatus"></p>
                  </div>
                </form>
              </div>

              <aside className="relative mt-2 flex min-h-0 min-w-0 flex-col items-stretch justify-start border-t border-[color-mix(in_srgb,var(--color-brand-rose)_72%,transparent)] bg-transparent pt-6 shadow-none min-[760px]:mt-0 min-[760px]:min-h-full min-[760px]:border-0 min-[760px]:ps-10 min-[760px]:pt-0 min-[760px]:before:pointer-events-none min-[760px]:before:absolute min-[760px]:before:inset-y-[52px] min-[760px]:before:start-0 min-[760px]:before:w-px min-[760px]:before:bg-[color-mix(in_srgb,var(--color-brand-rose)_72%,transparent)] min-[760px]:before:content-['']">
                <p className="mb-[.85rem] flex items-center justify-center gap-[.7rem] text-lam-primary" aria-hidden="true">
                  <span className="block h-px w-11 bg-current opacity-72"></span>
                  <svg className="ico h-3.25 w-3.25 fill-current stroke-none" aria-hidden="true"><use href="#i-heart"></use></svg>
                  <span className="block h-px w-11 bg-current opacity-72"></span>
                </p>
                <div className="flex flex-none flex-col border-0 bg-transparent p-0 text-lam-muted shadow-none">
                  <h3 className="m-0 text-center font-lam-heading text-(length:--fs-h3) leading-[1.35] font-bold text-lam-brown">تواصلي معنا</h3>
                  <span className="mx-auto mt-1 mb-[1.05rem]" aria-hidden="true"></span>
                  <ul className="grid gap-3">
                    <li>
                      <a className="flex min-h-11 w-full items-center gap-[.8rem] py-0 text-start text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown transition-colors duration-(--t-fast) ease-(--ease) hover:text-lam-primary" href="tel:920031018" id="cPhoneLink" aria-label="الهاتف">
                        <span className="grid h-9 w-9 flex-none place-items-center rounded-lam-pill bg-[var(--color-brand-cream)] text-lam-brown" aria-hidden="true"><svg className="ico h-[1.05rem] w-[1.05rem] text-current"><use href="#i-telephone"></use></svg></span>
                        <span className="grid min-w-0 gap-[.12rem]">
                          <span className="text-(length:--fs-eyebrow) leading-[1.3] font-bold text-lam-subtle">هاتف</span>
                          <span data-contact-text dir="ltr">920031018</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a className="flex min-h-11 w-full items-center gap-[.8rem] py-0 text-start text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown transition-colors duration-(--t-fast) ease-(--ease) hover:text-lam-primary" href="#" id="cWaLink" rel="noopener" aria-label="الواتساب">
                        <span className="grid h-9 w-9 flex-none place-items-center rounded-lam-pill bg-[var(--color-brand-cream)] text-lam-brown" aria-hidden="true"><svg className="ico h-[1.05rem] w-[1.05rem] text-current"><use href="#i-whatsapp"></use></svg></span>
                        <span className="grid min-w-0 gap-[.12rem]">
                          <span className="text-(length:--fs-eyebrow) leading-[1.3] font-bold text-lam-subtle">واتساب</span>
                          <span data-contact-text dir="ltr">0542555516</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a className="flex min-h-11 w-full items-center gap-[.8rem] py-0 text-start text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown transition-colors duration-(--t-fast) ease-(--ease) hover:text-lam-primary" href="mailto:info@likeamodel.com.sa" id="cMailLink" aria-label="البريد الإلكتروني">
                        <span className="grid h-9 w-9 flex-none place-items-center rounded-lam-pill bg-[var(--color-brand-cream)] text-lam-brown" aria-hidden="true"><svg className="ico h-[1.05rem] w-[1.05rem] text-current"><use href="#i-mail"></use></svg></span>
                        <span className="grid min-w-0 gap-[.12rem]">
                          <span className="text-(length:--fs-eyebrow) leading-[1.3] font-bold text-lam-subtle">إيميل</span>
                          <span data-contact-text dir="ltr">info@likeamodel.com.sa</span>
                        </span>
                      </a>
                    </li>
                    <li>
                      <span className="flex min-h-11 w-full items-center gap-[.8rem] py-0 text-start text-(length:--fs-body) leading-[1.5] font-(--w-body) text-lam-brown">
                        <span className="grid h-9 w-9 flex-none place-items-center rounded-lam-pill bg-[var(--color-brand-cream)] text-lam-brown" aria-hidden="true"><svg className="ico h-[1.05rem] w-[1.05rem] text-current"><use href="#i-pin"></use></svg></span>
                        <span className="grid min-w-0 gap-[.12rem]">
                          <span className="text-(length:--fs-eyebrow) leading-[1.3] font-bold text-lam-subtle">الموقع</span>
                          <span id="cAddrText">الرياض — المملكة العربية السعودية</span>
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
                <figure className="mt-14 flex h-auto min-h-0 w-auto flex-none flex-col items-stretch overflow-visible border-0 bg-transparent p-0 shadow-none" aria-label="موقع الشركة">
                  <div className="relative h-55 w-full overflow-hidden rounded-2xl border border-[color-mix(in_srgb,var(--color-brand-rose)_42%,var(--color-brand-cream))] bg-lam-blush shadow-[0_2px_8px_color-mix(in_srgb,var(--color-brown)_7%,transparent),0_8px_22px_color-mix(in_srgb,var(--color-brand-rose)_22%,transparent)] min-[760px]:h-[260px] [&_iframe]:block [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0" id="mapFrame"></div>
                  <a className="mt-[.55rem] inline-flex self-start rounded-lam-pill border border-lam-primary bg-transparent px-[.7rem] py-[.3rem] text-[.75rem] font-bold text-lam-brown shadow-[0_2px_8px_color-mix(in_srgb,var(--color-brown)_6%,transparent)] transition-[color,border-color,background] duration-(--t-btn) ease-(--ease) hover:bg-lam-primary-hover hover:text-lam-brown" id="mapOpen" href="https://www.google.com/maps?q=حي%20الورود%2C%20الرياض%2C%20المملكة%20العربية%20السعودية" target="_blank" rel="noopener noreferrer">فتح في خرائط Google</a>
                </figure>
              </aside>

            </div>
          </div>
        </section>

      </div>
    </>
  );
}
