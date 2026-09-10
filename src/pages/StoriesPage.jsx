import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { GOALS, goalLabel, normalizeGoal, storiesFor } from '../data/stories.js';
import { useFinePointer } from '../motion/pointer.js';
import { dur, easeOut, easeUi, tween } from '../motion/tokens.js';

function StoryCard({ item, onOpen, reduce, fine }) {
  const [hov, setHov] = useState(false);
  const lift = Boolean(fine && !reduce && hov);

  return (
    <m.article
      className="grid cursor-pointer gap-[.7rem] rounded-[18px] border border-[rgba(68,35,26,.12)] bg-white px-6 py-[22px] text-start shadow-[0_8px_22px_rgba(68,35,26,.07)] transition-shadow duration-200 hover:shadow-[0_14px_30px_rgba(68,35,26,.12)] lg:px-6 lg:py-[22px] max-lg:px-[1.15rem] max-lg:py-[1.1rem]"
      tabIndex={0}
      role="button"
      aria-label={`اقرئي قصة ${item.name}`}
      onClick={() => onOpen(item.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(item.id);
        }
      }}
      initial={false}
      animate={{ y: lift ? -2 : 0 }}
      transition={tween(reduce ? 0 : dur.hover, easeUi)}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      onFocus={() => setHov(true)}
      onBlur={() => setHov(false)}
    >
      <div className="flex flex-wrap items-center justify-between gap-[.55rem]">
        <p className="text-[1.02rem] leading-[1.4] font-bold text-lam-brown">{item.name}، {item.age} سنة</p>
        <span className="inline-flex items-center rounded-lam-pill bg-[color-mix(in_srgb,var(--color-primary)_22%,white)] px-[.7rem] py-[.28rem] text-[.78rem] font-bold text-lam-primary">{goalLabel(item.goal)}</span>
      </div>
      <p className="line-clamp-2 text-(length:--fs-body) leading-[1.75] text-lam-muted">{item.excerpt}</p>
      <div className="mt-[.15rem] flex items-center justify-between gap-3">
        <span className="text-[.88rem] text-lam-subtle">{item.duration}</span>
        <span className="inline-flex items-center gap-[.35rem] text-[.9rem] font-bold text-lam-primary">اقرئي قصتها <svg className="ico size-[.78rem]" aria-hidden="true"><use href="#i-arrow"></use></svg></span>
      </div>
    </m.article>
  );
}

export default function StoriesPage({ onOpenBooking }) {
  const [params, setParams] = useSearchParams();
  const current = normalizeGoal(params.get('goal'));
  const [modalIndex, setModalIndex] = useState(-1);
  const reduce = useReducedMotion();
  const fine = useFinePointer();

  const queue = useMemo(() => storiesFor(current).slice(0, 6), [current]);
  const goal = GOALS[current] || GOALS.all;
  const story = modalIndex >= 0 ? queue[modalIndex] : null;

  const setGoal = (id) => {
    const next = normalizeGoal(id);
    const nextParams = new URLSearchParams(params);
    if (next === 'all') nextParams.delete('goal');
    else nextParams.set('goal', next);
    setParams(nextParams, { replace: true });
    setModalIndex(-1);
  };

  const openStory = (id) => {
    const i = queue.findIndex((s) => s.id === id);
    if (i >= 0) setModalIndex(i);
  };

  const go = useCallback((delta) => {
    setModalIndex((i) => {
      if (i < 0) return i;
      const next = i + delta;
      if (next < 0 || next >= queue.length) return i;
      return next;
    });
  }, [queue.length]);

  const closeModal = () => setModalIndex(-1);

  useEffect(() => {
    document.documentElement.classList.toggle('is-sp-modal-open', modalIndex >= 0);
    return () => document.documentElement.classList.remove('is-sp-modal-open');
  }, [modalIndex]);

  useEffect(() => {
    if (modalIndex < 0) return undefined;
    const onKey = (e) => {
      if (document.body.classList.contains('is-bk-open')) return;
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalIndex, go]);

  return (
    <main id="main">
      <section className="pt-[calc(var(--header-measured,var(--header-h))+env(safe-area-inset-top,0px))]" id="storiesPage" aria-labelledby="spTitle">
        <div className="relative min-h-[250px] overflow-hidden bg-[radial-gradient(ellipse_48%_70%_at_50%_35%,rgba(224,174,175,.26)_0%,rgba(255,252,250,.35)_42%,transparent_72%),linear-gradient(180deg,var(--section-white)_0%,var(--section-blush)_100%)] py-[clamp(1.35rem,2.4vw,1.75rem)] max-lg:min-h-55 max-lg:py-[1.15rem]">
          <div className="shell relative min-h-[250px] max-lg:min-h-55" dir="rtl">
            <Link className="absolute start-0 top-0 z-2 inline-flex items-center gap-[.4rem] text-[.88rem] font-bold text-lam-brown opacity-80 hover:text-lam-primary-active hover:opacity-100" to={{ pathname: '/', hash: '#stories' }}>
              <svg className="ico size-[.82rem]" aria-hidden="true"><use href="#i-arrow"></use></svg>
              العودة للرئيسية
            </Link>
            <div className="mx-auto flex min-h-[250px] max-w-160 flex-col items-center justify-center pb-[.35rem] pt-7 text-center max-lg:min-h-55 max-lg:pb-1 max-lg:pt-[2.1rem]">
              <h1 className="relative z-0 mb-[.45rem] font-lam-heading text-(length:--fs-h1) leading-[1.35] font-bold text-lam-brown before:pointer-events-none before:absolute before:start-1/2 before:top-[40%] before:-z-10 before:h-[4.5rem] before:w-[min(22rem,92%)] before:-translate-x-1/2 before:-translate-y-1/2 before:bg-[radial-gradient(ellipse_closest-side,rgba(224,174,175,.22)_0%,rgba(255,252,250,.15)_55%,transparent_78%)]" id="spTitle">{goal.title}</h1>
              <p className="mb-2 max-w-md text-(length:--fs-body) leading-[1.7] text-lam-muted">رحلات حقيقية بدأت بهدف يشبه هدفكِ.</p>
              <p className="mb-[.55rem] text-[.9rem] font-bold text-lam-primary" id="spCount">{queue.length} قصص ملهمة</p>
              <p className="flex items-center justify-center gap-3 text-lam-primary" aria-hidden="true">
                <span className="h-px w-[2.1rem] bg-lam-primary opacity-70"></span>
                <svg className="ico size-3" aria-hidden="true"><use href="#i-heart"></use></svg>
                <span className="h-px w-[2.1rem] bg-lam-primary opacity-70"></span>
              </p>
            </div>
          </div>
        </div>

        <div className="shell mt-6 max-lg:mt-5">
          <div className="grid grid-cols-5 gap-[.65rem] max-nav:grid-cols-4 max-lg:grid-cols-2" id="spFilters" role="toolbar" aria-label="فلاتر القصص">
            {Object.keys(GOALS).map((id) => (
              <m.button
                key={id}
                type="button"
                className={'grid h-11 min-h-11 w-full cursor-pointer place-items-center whitespace-normal rounded-lam-pill border px-[.55rem] py-[.45rem] text-center text-[.86rem] leading-[1.25] font-bold transition-colors duration-200 ' + (id === current ? 'is-active border-lam-primary bg-lam-primary text-white' : 'border-[rgba(68,35,26,.14)] bg-white text-lam-brown hover:border-[rgba(68,35,26,.28)]')}
                aria-pressed={id === current ? 'true' : 'false'}
                onClick={() => setGoal(id)}
                whileTap={reduce ? undefined : { scale: 0.99 }}
                transition={tween(reduce ? 0 : dur.tap, easeUi)}
              >
                {GOALS[id].label}
              </m.button>
            ))}
          </div>
        </div>

        <div className="shell py-8 pb-[clamp(3rem,6vw,4.5rem)] max-lg:py-7 max-lg:pb-12">
          <div className="grid grid-cols-[minmax(0,44%)_minmax(0,56%)] items-start gap-8 max-lg:grid-cols-1 max-lg:gap-5" dir="ltr">
            <aside className="min-w-0" dir="rtl">
              <div className="relative h-[min(620px,70vh)] overflow-hidden rounded-[22px] bg-lam-blush shadow-[0_14px_36px_rgba(68,35,26,.12)] max-lg:h-[clamp(300px,58vw,360px)]">
                <img className="size-full object-cover object-center" src={goal.image} alt={goal.label} width="900" height="1200" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(68,35,26,.58)_0%,rgba(68,35,26,.18)_38%,transparent_68%)]" aria-hidden="true"></div>
                <div className="absolute inset-x-5 bottom-[1.2rem] z-1 text-white">
                  <p className="mb-[.2rem] text-[1.2rem] leading-[1.35] font-bold">{goal.label}</p>
                  <p className="text-[.92rem] leading-[1.5] opacity-90">رحلات حقيقية بدأت من هنا</p>
                </div>
              </div>
            </aside>

            <div className="min-w-0" dir="rtl">
              <AnimatePresence mode="wait">
                {queue.length === 0 ? (
                  <m.div
                    key="empty"
                    className="grid justify-items-center gap-4 rounded-[18px] border border-dashed border-[rgba(68,35,26,.14)] bg-[color-mix(in_srgb,var(--color-surface-blush)_55%,white)] px-5 py-10 text-center text-lam-muted"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={tween(reduce ? 0 : dur.modalSwap, easeUi)}
                  >
                    <p>قريبًا ستجدين قصصًا ملهمة لهذا الهدف 🤍</p>
                    <button className="btn btn-primary" type="button" onClick={() => setGoal('all')}>شاهدي كل القصص</button>
                  </m.div>
                ) : (
                  <m.div
                    key={current}
                    className="grid gap-4"
                    aria-live="polite"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={tween(reduce ? 0 : dur.modalSwap, easeUi)}
                  >
                    {queue.map((item) => (
                      <StoryCard key={item.id} item={item} onOpen={openStory} reduce={reduce} fine={fine} />
                    ))}
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {story && (
          <m.div
            className="fixed inset-0 z-80 grid place-items-center px-[4.5rem] py-4 max-lg:p-[.55rem]"
            key="sp-modal"
            aria-hidden="false"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          >
            <m.div
              className="absolute inset-0 bg-[rgba(68,35,26,.42)]"
              tabIndex={-1}
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={tween(reduce ? 0 : dur.fade, easeUi)}
            />
            <div className="relative z-1 w-[min(760px,92vw)] max-lg:w-[min(100%,96vw)]">
              <button className="absolute top-1/2 left-[-64px] z-2 grid size-12 -translate-y-1/2 place-items-center rounded-lam-pill bg-white text-lam-primary shadow-[0_8px_22px_rgba(68,35,26,.14)] transition-colors hover:bg-lam-primary hover:text-white disabled:pointer-events-none disabled:opacity-40 max-lg:hidden" type="button" aria-label="القصة السابقة" disabled={modalIndex <= 0} onClick={() => go(-1)}>
                <svg className="ico" aria-hidden="true"><use href="#i-arrow"></use></svg>
              </button>
              <m.div
                className="relative z-1 flex max-h-[min(88vh,920px)] w-full flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_24px_60px_rgba(68,35,26,.22)] outline-none max-lg:max-h-[92vh] max-lg:rounded-[18px]"
                role="dialog"
                aria-modal="true"
                aria-labelledby="spModalTitle"
                tabIndex={-1}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={tween(reduce ? 0 : 0.4, easeOut)}
              >
                <button className="absolute start-[.85rem] top-[.85rem] z-2 grid size-10 place-items-center rounded-lam-pill bg-[rgba(255,252,250,.92)] text-lam-brown hover:bg-white" type="button" aria-label="إغلاق" onClick={closeModal}>
                  <svg className="ico size-[1.05rem]" aria-hidden="true"><use href="#i-close"></use></svg>
                </button>
                <div className="overflow-auto px-[1.35rem] pb-6 pt-5 overscroll-contain">
                  <AnimatePresence mode="wait">
                    <m.div
                      className=""
                      key={story.id}
                      id="spModalPanel"
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={tween(reduce ? 0 : dur.modalSwap, easeOut)}
                    >
                      <p className="mb-3 text-center text-[.86rem] font-bold text-lam-primary" id="spModalTitle">{modalIndex + 1} من {queue.length} قصص</p>
                      <div className="-mx-[1.35rem] mb-[1.1rem] aspect-video overflow-hidden bg-lam-blush max-lg:mb-0">
                        <img className="size-full object-cover" src={story.image} alt="" width="760" height="420" loading="lazy" />
                      </div>
                      <div className="my-[.85rem] mb-[1.1rem] hidden justify-center gap-3 max-lg:flex" dir="ltr" aria-label="التنقل بين القصص">
                        <button className="grid size-12 place-items-center rounded-lam-pill bg-white text-lam-primary shadow-[0_8px_22px_rgba(68,35,26,.14)] disabled:pointer-events-none disabled:opacity-40" type="button" aria-label="القصة السابقة" disabled={modalIndex <= 0} onClick={() => go(-1)}>
                          <svg className="ico" aria-hidden="true"><use href="#i-arrow"></use></svg>
                        </button>
                        <button className="grid size-12 place-items-center rounded-lam-pill bg-white text-lam-primary shadow-[0_8px_22px_rgba(68,35,26,.14)] disabled:pointer-events-none disabled:opacity-40" type="button" aria-label="القصة التالية" disabled={modalIndex >= queue.length - 1} onClick={() => go(1)}>
                          <svg className="ico scale-x-[-1]" aria-hidden="true"><use href="#i-arrow"></use></svg>
                        </button>
                      </div>
                      <header className="mb-[.85rem] flex flex-wrap items-center justify-between gap-[.65rem]">
                        <p className="text-[1.25rem] font-bold text-lam-brown">{story.name}، {story.age} سنة</p>
                        <span className="inline-flex items-center rounded-lam-pill bg-[color-mix(in_srgb,var(--color-primary)_22%,white)] px-[.7rem] py-[.28rem] text-[.78rem] font-bold text-lam-primary">{goalLabel(story.goal)}</span>
                      </header>
                      <div className="text-(length:--fs-body) leading-[1.9] text-lam-muted">
                        <p className="mb-[.8rem]">{story.story}</p>
                      </div>
                      <section className="mb-[1.35rem] mt-5 rounded-lam-lg bg-[color-mix(in_srgb,var(--color-surface-blush)_70%,white)] px-[1.1rem] py-4" aria-label="رحلتها في أرقام">
                        <h3 className="mb-3 text-base text-lam-brown">رحلتها في أرقام</h3>
                        <ul className="grid gap-[.55rem]">
                          <li className="flex justify-between gap-4 text-[.92rem] text-lam-muted"><span>المدة</span><strong className="font-bold text-lam-brown">{story.metrics?.duration || story.duration}</strong></li>
                          <li className="flex justify-between gap-4 text-[.92rem] text-lam-muted"><span>الجلسات</span><strong className="font-bold text-lam-brown">{story.metrics?.sessions || '—'}</strong></li>
                          <li className="flex justify-between gap-4 text-[.92rem] text-lam-muted"><span>المحصلة</span><strong className="font-bold text-lam-brown">{story.metrics?.result || '—'}</strong></li>
                        </ul>
                      </section>
                      <button className="btn btn-primary w-full justify-center" type="button" data-bk-open onClick={onOpenBooking} aria-haspopup="dialog" aria-controls="bookingModal">
                        ابدئي رحلتكِ المشابهة
                        <svg className="ico btn-ico" aria-hidden="true"><use href="#i-arrow"></use></svg>
                      </button>
                    </m.div>
                  </AnimatePresence>
                </div>
              </m.div>
              <button className="absolute top-1/2 right-[-64px] z-2 grid size-12 -translate-y-1/2 place-items-center rounded-lam-pill bg-white text-lam-primary shadow-[0_8px_22px_rgba(68,35,26,.14)] transition-colors hover:bg-lam-primary hover:text-white disabled:pointer-events-none disabled:opacity-40 max-lg:hidden" type="button" aria-label="القصة التالية" disabled={modalIndex >= queue.length - 1} onClick={() => go(1)}>
                <svg className="ico scale-x-[-1]" aria-hidden="true"><use href="#i-arrow"></use></svg>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </main>
  );
}
