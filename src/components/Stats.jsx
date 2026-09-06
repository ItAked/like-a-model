/** MOTION LOCK: parallax, counters, heading/tile .reveal stagger. */
export default function Stats() {
  return (
    <>
      <section className="section section-stats stats-section" id="stats">
        <div className="stats-parallax-bg" aria-hidden="true"></div>
        <div className="stats-overlay" aria-hidden="true"></div>
        <div className="shell stats-content">
          <header className="sec-head sec-head-center">
            <p className="sec-ornament reveal" aria-hidden="true">
              <span className="sec-ornament-line"></span>
              <svg className="ico" aria-hidden="true"><use href="#i-heart"></use></svg>
              <span className="sec-ornament-line"></span>
            </p>
            <h2 className="h2 reveal" data-delay="1">نجاحنا <em>بالأرقام</em></h2>
            <p className="sec-sub reveal" data-delay="2">
              وراء كل رقم قصة نجاح وثقة اكتسبناها على مدار السنوات
            </p>
          </header>

          {/* لعرض الأرقام بالأرقام اللاتينية (35+ بدل ٣٥+) غيّري STATS_LATIN في boot.js */}
          <ul className="stats-grid" id="statsGrid">
            <li className="stat reveal" data-delay="1">
              <span className="stat-num" data-count="35">٣٥+</span>
              <span className="stat-lbl">موظفين ومحترفين</span>
            </li>
            <li className="stat reveal" data-delay="2">
              <span className="stat-num" data-count="18">١٨+</span>
              <span className="stat-lbl">مدربات متخصصات</span>
            </li>
            <li className="stat reveal" data-delay="3">
              <span className="stat-num" data-count="192">١٩٢+</span>
              <span className="stat-lbl">مشترك نشط</span>
            </li>
            <li className="stat reveal" data-delay="4">
              <span className="stat-num" data-count="569">٥٦٩+</span>
              <span className="stat-lbl">عميلة سعيدة</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
