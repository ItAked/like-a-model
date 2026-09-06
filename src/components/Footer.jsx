import { Link } from 'react-router-dom';
import { assetUrl } from '../lib/asset.js';

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-deco" aria-hidden="true">
          <svg viewBox="0 0 1440 480" preserveAspectRatio="none" focusable="false">
            <ellipse cx="0" cy="240" rx="72" ry="170"/>
            <ellipse cx="0" cy="240" rx="128" ry="250"/>
            <ellipse cx="0" cy="240" rx="184" ry="330"/>
            <ellipse cx="1440" cy="240" rx="72" ry="170"/>
            <ellipse cx="1440" cy="240" rx="128" ry="250"/>
            <ellipse cx="1440" cy="240" rx="184" ry="330"/>
            <ellipse cx="0" cy="480" rx="100" ry="78"/>
            <ellipse cx="0" cy="480" rx="170" ry="128"/>
            <ellipse cx="0" cy="480" rx="240" ry="178"/>
            <ellipse cx="1440" cy="480" rx="100" ry="78"/>
            <ellipse cx="1440" cy="480" rx="170" ry="128"/>
            <ellipse cx="1440" cy="480" rx="240" ry="178"/>
            <ellipse cx="720" cy="510" rx="360" ry="64"/>
            <ellipse cx="720" cy="518" rx="500" ry="82"/>
            <ellipse cx="720" cy="526" rx="660" ry="100"/>
          </svg>
        </div>
        <div className="shell footer-grid">

          <div className="footer-brand">
            <Link className="brand brand-footer" to={{ pathname: '/', hash: '#home' }} aria-label="Like A Model — الصفحة الرئيسية">
              <span className="brand-name" lang="en">Like A Model</span>
              <span className="brand-mark" aria-hidden="true">
                <img className="brand-logo" src={assetUrl('/assets/img/logo.svg')} alt="" width="48" height="48" />
              </span>
            </Link>
            <p className="brand-tag">أكثر من تدريب ... أسلوب حياة</p>
            <ul className="socials" aria-label="حسابات التواصل الاجتماعي">
              <li><a href="https://www.tiktok.com/" rel="noopener" data-social="tiktok" aria-label="تيك توك"><svg className="ico" aria-hidden="true"><use href="#i-tiktok"></use></svg></a></li>
              <li><a href="https://www.youtube.com/" rel="noopener" data-social="youtube" aria-label="يوتيوب"><svg className="ico" aria-hidden="true"><use href="#i-youtube"></use></svg></a></li>
              <li><a href="https://www.instagram.com/" rel="noopener" data-social="instagram" aria-label="إنستغرام"><svg className="ico ico-outline" aria-hidden="true"><use href="#i-instagram"></use></svg></a></li>
              <li><a href="https://www.facebook.com/" rel="noopener" data-social="facebook" aria-label="فيسبوك"><svg className="ico" aria-hidden="true"><use href="#i-facebook"></use></svg></a></li>
              <li><a href="https://x.com/" rel="noopener" data-social="x" aria-label="إكس"><svg className="ico" aria-hidden="true"><use href="#i-x"></use></svg></a></li>
              <li><a href="https://www.linkedin.com/" rel="noopener" data-social="linkedin" aria-label="لينكدإن"><svg className="ico" aria-hidden="true"><use href="#i-linkedin"></use></svg></a></li>
            </ul>
          </div>

          <nav className="footer-col" aria-label="روابط سريعة">
            <h2 className="footer-h">روابط سريعة</h2>
            <ul>
              <li><Link to={{ pathname: '/', hash: '#home' }}>الصفحة الرئيسية</Link></li>
              <li><Link to={{ pathname: '/', hash: '#about' }}>من نحن</Link></li>
              <li><Link to={{ pathname: '/', hash: '#journey' }}>رحلة التحول</Link></li>
              <li><Link to={{ pathname: '/', hash: '#ecosystem' }}>خدماتنا</Link></li>
              <li><Link to={{ pathname: '/', hash: '#contact' }}>تواصلي معنا</Link></li>
            </ul>
          </nav>

          <div className="footer-col footer-contact">
            <h2 className="footer-h">اتصل بنا</h2>
            <ul>
              <li><svg className="ico" aria-hidden="true"><use href="#i-telephone"></use></svg> <a href="tel:920031018" id="phoneLink" dir="ltr">920031018</a></li>
              <li><svg className="ico" aria-hidden="true"><use href="#i-whatsapp"></use></svg> <a href="#" rel="noopener" id="waLink" dir="ltr">0542555516</a></li>
              <li><svg className="ico" aria-hidden="true"><use href="#i-mail"></use></svg> <a href="mailto:info@likeamodel.com.sa" id="emailLink" dir="ltr">info@likeamodel.com.sa</a></li>
              <li><svg className="ico" aria-hidden="true"><use href="#i-pin"></use></svg> <a href="https://www.google.com/maps?q=حي%20الورود%2C%20الرياض%2C%20المملكة%20العربية%20السعودية" id="addrText" target="_blank" rel="noopener noreferrer">الرياض – المملكة العربية السعودية</a></li>
            </ul>
          </div>

        </div>

        <div className="shell footer-legal">
          <p className="footer-copy">
            حقوق النشر <span id="year">٢٠٢٦</span> <bdi className="lam" lang="en">Like A Model</bdi> — بدعم من <bdi lang="en">AKED</bdi>
          </p>
          <p className="footer-entity">شركة احتياجات التطوير المحدودة</p>
          <ul className="footer-ids">
            <li><span className="footer-id-k">السجل التجاري</span> <bdi dir="ltr">7041363214</bdi></li>
            <li><span className="footer-id-k">الرقم الضريبي</span> <bdi dir="ltr">312464626900003</bdi></li>
          </ul>
        </div>
      </footer>
    </>
  );
}
