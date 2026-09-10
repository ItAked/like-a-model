export default function Stats() {
  return (
    <>
      <section className={`stats-section relative isolate flex min-h-[clamp(390px,42vw,460px)] items-center overflow-hidden bg-lam-primary px-0 pt-16 pb-13.5 scroll-mt-(--scroll-offset)
        max-md:block max-md:min-h-0 max-md:px-5 max-md:py-16`} id="stats">
        <div className="stats-parallax-bg pointer-events-none absolute inset-x-0 -inset-y-75 z-0 bg-[url('/assets/img/stats-riyadh-new.jpg')] bg-cover bg-center bg-no-repeat"
          aria-hidden="true"></div>
        <div className="stats-overlay pointer-events-none absolute inset-0 z-1 
          bg-[linear-gradient(115deg,rgba(31,12,9,.84)_0%,rgba(68,35,26,.76)_42%,rgba(105,54,61,.68)_72%,rgba(149,95,98,.52)_100%)]" aria-hidden="true"></div>
        <div className="relative z-2 mx-auto w-full max-w-(--shell) px-(--gutter) max-md:px-0">
          <header className="mx-auto mb-[clamp(38px,4.2vw,48px)] max-w-152 text-center">
            <p className="reveal mb-[.85rem] flex items-center justify-center gap-[.7rem] text-[#EFC9C8]" aria-hidden="true">
              <span className="block h-px w-11 bg-[#EFC9C8]"></span>
              <svg className="ico size-3.25 fill-current stroke-none" aria-hidden="true"><use href="#i-heart"></use></svg>
              <span className="block h-px w-11 bg-[#EFC9C8]"></span>
            </p>
            <h2 className="reveal font-lam-heading text-(length:--fs-h2) leading-[1.3] font-bold text-[#FBEDE7] text-balance" data-delay="1">نجاحنا
              <em className="text-[#FBEDE7] not-italic">بالأرقام</em></h2>
            <p className={`reveal mx-auto mt-[.7rem] max-w-136 text-(length:--fs-body) leading-[1.65] font-medium text-[rgba(255,252,250,.88)]
              [text-shadow:0_2px_18px_rgba(30,12,8,.48)]`} data-delay="2">
              وراء كل رقم قصة نجاح وثقة اكتسبناها على مدار السنوات
            </p>
          </header>

          <ul className="grid grid-cols-2 items-stretch gap-0 md:grid-cols-4" id="statsGrid">
            <li className={`reveal grid min-w-0 content-center justify-items-center gap-[.3rem] px-[clamp(.45rem,2vw,1.1rem)] py-[.2rem] text-center max-md:border-e max-md:border-b
              max-md:border-[color-mix(in_srgb,var(--color-white)_48%,transparent)] max-md:px-[.45rem] max-md:py-[.85rem] md:border-e
              md:border-[color-mix(in_srgb,var(--color-white)_48%,transparent)]`} data-delay="1">
              <span className={`stat-num font-lam-en text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.05] font-semibold whitespace-nowrap text-white tabular-nums [direction:ltr]
                [text-shadow:0_2px_16px_rgba(68,35,26,.55)] [unicode-bidi:isolate]`} data-count="35">٣٥+</span>
              <span className={`max-w-full text-(length:--fs-body) leading-[1.45] font-medium text-[color-mix(in_srgb,var(--color-white)_92%,transparent)] wrap-break-word
                [text-shadow:0_1px_10px_rgba(68,35,26,.42)]`}>موظفين ومحترفين</span>
            </li>
            <li className={`reveal grid min-w-0 content-center justify-items-center gap-[.3rem] border-b border-[color-mix(in_srgb,var(--color-white)_48%,transparent)]
              px-[clamp(.45rem,2vw,1.1rem)] py-[.2rem] text-center max-md:px-[.45rem] max-md:py-[.85rem] md:border-e md:border-b-0`} data-delay="2">
              <span className={`stat-num font-lam-en text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.05] font-semibold whitespace-nowrap text-white tabular-nums [direction:ltr]
                [text-shadow:0_2px_16px_rgba(68,35,26,.55)] [unicode-bidi:isolate]`} data-count="18">١٨+</span>
              <span className={`max-w-full text-(length:--fs-body) leading-[1.45] font-medium text-[color-mix(in_srgb,var(--color-white)_92%,transparent)] wrap-break-word
                [text-shadow:0_1px_10px_rgba(68,35,26,.42)]`}>مدربات متخصصات</span>
            </li>
            <li className={`reveal grid min-w-0 content-center justify-items-center gap-[.3rem] px-[clamp(.45rem,2vw,1.1rem)] py-[.2rem] text-center max-md:border-e
              max-md:border-[color-mix(in_srgb,var(--color-white)_48%,transparent)] max-md:px-[.45rem] max-md:py-[.85rem] md:border-e`} data-delay="3">
              <span className={`stat-num font-lam-en text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.05] font-semibold whitespace-nowrap text-white tabular-nums [direction:ltr]
                [text-shadow:0_2px_16px_rgba(68,35,26,.55)] [unicode-bidi:isolate]`} data-count="192">١٩٢+</span>
              <span className={`max-w-full text-(length:--fs-body) leading-[1.45] font-medium text-[color-mix(in_srgb,var(--color-white)_92%,transparent)] wrap-break-word
                [text-shadow:0_1px_10px_rgba(68,35,26,.42)]`}>مشترك نشط</span>
            </li>
            <li className="reveal grid min-w-0 content-center justify-items-center gap-[.3rem] px-[clamp(.45rem,2vw,1.1rem)] py-[.2rem] text-center max-md:px-[.45rem] max-md:py-[.85rem]"
              data-delay="4">
              <span className={`stat-num font-lam-en text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.05] font-semibold whitespace-nowrap text-white tabular-nums [direction:ltr]
                [text-shadow:0_2px_16px_rgba(68,35,26,.55)] [unicode-bidi:isolate]`} data-count="569">٥٦٩+</span>
              <span className={`max-w-full text-(length:--fs-body) leading-[1.45] font-medium text-[color-mix(in_srgb,var(--color-white)_92%,transparent)] wrap-break-word
                [text-shadow:0_1px_10px_rgba(68,35,26,.42)]`}>عميلة سعيدة</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}