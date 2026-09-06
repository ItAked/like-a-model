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
      className="sp-card"
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
      <div className="sp-card-top">
        <p className="sp-card-name">{item.name}، {item.age} سنة</p>
        <span className="sp-card-tag">{goalLabel(item.goal)}</span>
      </div>
      <p className="sp-card-excerpt">{item.excerpt}</p>
      <div className="sp-card-foot">
        <span className="sp-card-duration">{item.duration}</span>
        <span className="sp-card-more">اقرئي قصتها <svg className="ico" aria-hidden="true"><use href="#i-arrow"></use></svg></span>
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
      <section className="sp-page" id="storiesPage" aria-labelledby="spTitle">
        <div className="sp-hero">
          <div className="shell sp-hero-inner">
            <Link className="sp-back" to={{ pathname: '/', hash: '#stories' }}>
              <svg className="ico" aria-hidden="true"><use href="#i-arrow"></use></svg>
              العودة للرئيسية
            </Link>
            <div className="sp-hero-copy">
              <h1 className="sp-title" id="spTitle">{goal.title}</h1>
              <p className="sp-lead">رحلات حقيقية بدأت بهدف يشبه هدفكِ.</p>
              <p className="sp-count" id="spCount">{queue.length} قصص ملهمة</p>
              <p className="sec-ornament sp-hero-ornament" aria-hidden="true">
                <span className="sec-ornament-line"></span>
                <svg className="ico" aria-hidden="true"><use href="#i-heart"></use></svg>
                <span className="sec-ornament-line"></span>
              </p>
            </div>
          </div>
        </div>

        <div className="shell sp-filters-wrap">
          <div className="sp-filters" id="spFilters" role="toolbar" aria-label="فلاتر القصص">
            {Object.keys(GOALS).map((id) => (
              <m.button
                key={id}
                type="button"
                className={'sp-pill' + (id === current ? ' is-active' : '')}
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

        <div className="shell sp-main">
          <div className="sp-layout">
            <aside className="sp-visual">
              <div className="sp-visual-frame">
                <img className="sp-visual-img" src={goal.image} alt={goal.label} width="900" height="1200" />
                <div className="sp-visual-overlay" aria-hidden="true"></div>
                <div className="sp-visual-copy">
                  <p className="sp-visual-name">{goal.label}</p>
                  <p className="sp-visual-sub">رحلات حقيقية بدأت من هنا</p>
                </div>
              </div>
            </aside>

            <div className="sp-content">
              <AnimatePresence mode="wait">
                {queue.length === 0 ? (
                  <m.div
                    key="empty"
                    className="sp-empty"
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
                    className="sp-list"
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
            className="sp-modal"
            key="sp-modal"
            aria-hidden="false"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.4 }}
          >
            <m.div
              className="sp-modal-backdrop"
              tabIndex={-1}
              onClick={closeModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={tween(reduce ? 0 : dur.fade, easeUi)}
            />
            <div className="sp-modal-shell">
              <button className="sp-modal-nav sp-modal-prev" type="button" aria-label="القصة السابقة" disabled={modalIndex <= 0} onClick={() => go(-1)}>
                <svg className="ico" aria-hidden="true"><use href="#i-arrow"></use></svg>
              </button>
              <m.div
                className="sp-modal-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="spModalTitle"
                tabIndex={-1}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={tween(reduce ? 0 : 0.4, easeOut)}
              >
                <button className="sp-modal-close" type="button" aria-label="إغلاق" onClick={closeModal}>
                  <svg className="ico" aria-hidden="true"><use href="#i-close"></use></svg>
                </button>
                <div className="sp-modal-scroll">
                  <AnimatePresence mode="wait">
                    <m.div
                      className="sp-modal-panel"
                      key={story.id}
                      id="spModalPanel"
                      initial={reduce ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={tween(reduce ? 0 : dur.modalSwap, easeOut)}
                    >
                      <p className="sp-modal-index" id="spModalTitle">{modalIndex + 1} من {queue.length} قصص</p>
                      <div className="sp-modal-media">
                        <img src={story.image} alt="" width="760" height="420" loading="lazy" />
                      </div>
                      <div className="sp-modal-nav-mobile" aria-label="التنقل بين القصص">
                        <button className="sp-modal-nav sp-modal-nav-m" type="button" aria-label="القصة السابقة" disabled={modalIndex <= 0} onClick={() => go(-1)}>
                          <svg className="ico" aria-hidden="true"><use href="#i-arrow"></use></svg>
                        </button>
                        <button className="sp-modal-nav sp-modal-nav-m" type="button" aria-label="القصة التالية" disabled={modalIndex >= queue.length - 1} onClick={() => go(1)}>
                          <svg className="ico sp-modal-nav-flip" aria-hidden="true"><use href="#i-arrow"></use></svg>
                        </button>
                      </div>
                      <header className="sp-modal-head">
                        <p className="sp-modal-name">{story.name}، {story.age} سنة</p>
                        <span className="sp-card-tag">{goalLabel(story.goal)}</span>
                      </header>
                      <div className="sp-modal-story">
                        <p>{story.story}</p>
                      </div>
                      <section className="sp-modal-metrics" aria-label="رحلتها في أرقام">
                        <h3>رحلتها في أرقام</h3>
                        <ul>
                          <li><span>المدة</span><strong>{story.metrics?.duration || story.duration}</strong></li>
                          <li><span>الجلسات</span><strong>{story.metrics?.sessions || '—'}</strong></li>
                          <li><span>المحصلة</span><strong>{story.metrics?.result || '—'}</strong></li>
                        </ul>
                      </section>
                      <button className="btn btn-primary sp-modal-cta" type="button" data-bk-open onClick={onOpenBooking} aria-haspopup="dialog" aria-controls="bookingModal">
                        ابدئي رحلتكِ المشابهة
                        <svg className="ico btn-ico" aria-hidden="true"><use href="#i-arrow"></use></svg>
                      </button>
                    </m.div>
                  </AnimatePresence>
                </div>
              </m.div>
              <button className="sp-modal-nav sp-modal-next" type="button" aria-label="القصة التالية" disabled={modalIndex >= queue.length - 1} onClick={() => go(1)}>
                <svg className="ico sp-modal-nav-flip" aria-hidden="true"><use href="#i-arrow"></use></svg>
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </main>
  );
}
