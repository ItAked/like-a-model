import { Link } from 'react-router-dom';
import { assetUrl } from '../lib/asset.js';

const footerLinkClass = `relative inline-flex min-h-0 w-max max-w-full items-end gap-[.35rem] pb-1 font-lam-ar text-base leading-[1.8] font-medium text-(--footer-text) no-underline
transition-colors duration-250 ease-out after:pointer-events-none after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0
after:bg-lam-brown after:opacity-0 after:transition-[transform,opacity] after:duration-250 after:ease-out hover:text-lam-brown hover:after:scale-x-100 hover:after:opacity-100
focus-visible:text-lam-brown focus-visible:after:scale-x-100 focus-visible:after:opacity-100 motion-reduce:transition-none motion-reduce:after:transition-none`;

const footerItemClass = 'flex items-center gap-[.55rem] font-lam-ar text-base leading-[1.8] font-medium text-(--footer-text)';

const socialLinkClass = `grid size-9 place-items-center rounded-lam-pill border border-[color-mix(in_srgb,var(--color-white)_85%,transparent)] text-white
transition-[color,border-color] duration-(--t-fast) ease-(--ease) hover:border-[var(--footer-heading)] hover:text-(--footer-heading)`;

export default function Footer() {
  return (
    <>
      <footer className="site-footer relative isolate overflow-hidden bg-lam-primary px-(--s-5) pt-(--s-8) pb-(--s-5) text-(--footer-text) md:px-0 md:pt-14 md:pb-(--s-6)">
        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden="true">
          <svg className={`size-full [&_ellipse]:fill-none [&_ellipse]:stroke-[color-mix(in_srgb,var(--color-white)_13%,transparent)]
            [&_ellipse]:stroke-1 [&_ellipse]:[vector-effect:non-scaling-stroke]`} viewBox="0 0 1440 480" preserveAspectRatio="none" focusable="false">
            <ellipse cx="0" cy="240" rx="72" ry="170" />
            <ellipse cx="0" cy="240" rx="128" ry="250" />
            <ellipse cx="0" cy="240" rx="184" ry="330" />
            <ellipse cx="1440" cy="240" rx="72" ry="170" />
            <ellipse cx="1440" cy="240" rx="128" ry="250" />
            <ellipse cx="1440" cy="240" rx="184" ry="330" />
            <ellipse cx="0" cy="480" rx="100" ry="78" />
            <ellipse cx="0" cy="480" rx="170" ry="128" />
            <ellipse cx="0" cy="480" rx="240" ry="178" />
            <ellipse cx="1440" cy="480" rx="100" ry="78" />
            <ellipse cx="1440" cy="480" rx="170" ry="128" />
            <ellipse cx="1440" cy="480" rx="240" ry="178" />
            <ellipse cx="720" cy="510" rx="360" ry="64" />
            <ellipse cx="720" cy="518" rx="500" ry="82" />
            <ellipse cx="720" cy="526" rx="660" ry="100" />
          </svg>
        </div>
        <div className="relative z-1 mx-auto grid w-full max-w-(--shell) items-start gap-5.5 px-0 md:grid-cols-[1.15fr_1fr_1.2fr] md:gap-(--s-7) md:px-(--gutter)">

          <div className="flex flex-col items-center text-center">
            <Link className="flex min-h-0 flex-row items-center justify-center gap-[.55rem] text-(--footer-heading) [direction:ltr]" to={{ pathname: '/', hash: '#home' }}
              aria-label="Like A Model — الصفحة الرئيسية">
              <span className="font-lam-brand text-[1.15rem] font-semibold tracking-normal text-white md:text-[1.2rem]" lang="en">Like A Model</span>
              <span className="grid h-16 w-auto flex-none place-items-center text-white" aria-hidden="true">
                <img className="block h-16 w-auto object-contain object-center" src={assetUrl('/assets/img/logo.svg')} alt="" width="48" height="48" />
              </span>
            </Link>
            <p className="mt-[.55rem] p-0 font-lam-ar text-[.9rem] leading-normal font-normal whitespace-normal text-white">أكثر من تدريب ... أسلوب حياة</p>
            <ul className={`mt-3.5 flex flex-nowrap justify-center gap-[.45rem] p-0 md:mt-4.5 [&_.ico]:size-5.5 [&_.ico]:fill-current [&_.ico]:stroke-none [&_.ico-outline]:fill-none
              [&_.ico-outline]:stroke-current [&_.ico-outline]:stroke-[2.5]`} aria-label="حسابات التواصل الاجتماعي">
              <li><a className={socialLinkClass} href="https://www.tiktok.com/" rel="noopener" data-social="tiktok" aria-label="تيك توك"><svg className="ico" aria-hidden="true">
                <use href="#i-tiktok"></use></svg></a></li>
              <li><a className={socialLinkClass} href="https://www.youtube.com/" rel="noopener" data-social="youtube" aria-label="يوتيوب"><svg className="ico" aria-hidden="true">
                <use href="#i-youtube"></use></svg></a></li>
              <li><a className={socialLinkClass} href="https://www.instagram.com/" rel="noopener" data-social="instagram" aria-label="إنستغرام"><svg className="ico ico-outline"
                aria-hidden="true"><use href="#i-instagram"></use></svg></a></li>
              <li><a className={socialLinkClass} href="https://www.facebook.com/" rel="noopener" data-social="facebook" aria-label="فيسبوك"><svg className="ico" aria-hidden="true">
                <use href="#i-facebook"></use></svg></a></li>
              <li><a className={socialLinkClass} href="https://x.com/" rel="noopener" data-social="x" aria-label="إكس"><svg className="ico" aria-hidden="true"><use href="#i-x"></use></svg>
              </a></li>
              <li><a className={socialLinkClass} href="https://www.linkedin.com/" rel="noopener" data-social="linkedin" aria-label="لينكدإن"><svg className="ico" aria-hidden="true">
                <use href="#i-linkedin"></use></svg></a></li>
            </ul>
          </div>

          <nav aria-label="روابط سريعة">
            <h2 className="mb-(--s-3) font-lam-heading text-(length:--fs-h3) leading-[1.35] font-(--w-head) tracking-normal text-(--footer-heading)">روابط سريعة</h2>
            <ul className="grid gap-(--s-3) md:gap-3.25">
              <li className={footerItemClass}><Link className={footerLinkClass} to={{ pathname: '/', hash: '#home' }}>الصفحة الرئيسية</Link></li>
              <li className={footerItemClass}><Link className={footerLinkClass} to={{ pathname: '/', hash: '#about' }}>من نحن</Link></li>
              <li className={footerItemClass}><Link className={footerLinkClass} to={{ pathname: '/', hash: '#journey' }}>رحلة التحول</Link></li>
              <li className={footerItemClass}><Link className={footerLinkClass} to={{ pathname: '/', hash: '#ecosystem' }}>خدماتنا</Link></li>
              <li className={footerItemClass}><Link className={footerLinkClass} to={{ pathname: '/', hash: '#contact' }}>تواصلي معنا</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-(--s-3) font-lam-heading text-(length:--fs-h3) leading-[1.35] font-(--w-head) tracking-normal text-(--footer-heading)">اتصل بنا</h2>
            <ul className="grid gap-3.5 md:gap-3.75">
              <li className={footerItemClass}><svg className="ico size-[1.05rem] flex-none text-(--footer-line) opacity-100" aria-hidden="true"><use href="#i-telephone"></use></svg>
                <a className={footerLinkClass} href="tel:920031018" id="phoneLink" dir="ltr">920031018</a></li>
              <li className={footerItemClass}><svg className="ico size-[1.05rem] flex-none text-(--footer-line) opacity-100" aria-hidden="true"><use href="#i-whatsapp"></use></svg>
                <a className={footerLinkClass} href="#" rel="noopener" id="waLink" dir="ltr">0542555516</a></li>
              <li className={footerItemClass}><svg className="ico size-[1.05rem] flex-none text-(--footer-line) opacity-100" aria-hidden="true"><use href="#i-mail"></use></svg>
                <a className={footerLinkClass} href="mailto:info@likeamodel.com.sa" id="emailLink" dir="ltr">info@likeamodel.com.sa</a></li>
              <li className={footerItemClass}><svg className="ico size-[1.05rem] flex-none text-(--footer-line) opacity-100" aria-hidden="true"><use href="#i-pin"></use></svg>
                <a className={footerLinkClass} href="https://www.google.com/maps?q=حي%20الورود%2C%20الرياض%2C%20المملكة%20العربية%20السعودية" id="addrText" target="_blank"
                  rel="noopener noreferrer">الرياض – المملكة العربية السعودية</a></li>
            </ul>
          </div>

        </div>

        <div className={`relative z-1 mx-auto mt-(--s-6) grid w-full max-w-(--shell) gap-[.45rem] border-t border-(--footer-line) px-0 pt-3.5 pb-1.5 text-center font-lam-ar text-[.8rem]
          font-normal text-(--footer-muted) md:mt-(--s-7) md:px-(--gutter) md:pt-4.5 md:pb-(--s-2)`}>
          <p className="leading-normal font-normal text-(--footer-muted)">
            حقوق النشر <span id="year">٢٠٢٦</span> <bdi className="font-lam-brand" lang="en">Like A Model</bdi> — بدعم من <bdi className="font-lam-brand" lang="en">AKED</bdi>
          </p>
          <p className="text-[.8rem] text-(--footer-muted)">شركة احتياجات التطوير المحدودة</p>
          <ul className="m-0 flex flex-wrap justify-center gap-x-(--s-6) gap-y-[.35rem] p-0 text-[.8rem] text-(--footer-muted)">
            <li className="inline-flex items-center gap-[.4rem]"><span className="text-(--footer-muted)">السجل التجاري</span> <bdi dir="ltr">7041363214</bdi></li>
            <li className="inline-flex items-center gap-[.4rem]"><span className="text-(--footer-muted)">الرقم الضريبي</span> <bdi dir="ltr">312464626900003</bdi></li>
          </ul>
        </div>
      </footer>
    </>
  );
}