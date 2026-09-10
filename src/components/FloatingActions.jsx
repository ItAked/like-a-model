import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { CHAT_FAQ } from '../data/chatFaq.js';
import { useFinePointer } from '../motion/pointer.js';
import { dur, easeOut, easeUi, tween } from '../motion/tokens.js';

const WELCOME = 'أهلًا بكِ 🤍 كيف يمكنني مساعدتكِ اليوم؟';

export default function FloatingActions() {
  const location = useLocation();
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const { scrollY } = useScroll();
  const threadRef = useRef(null);
  const panelRef = useRef(null);
  const lastFocus = useRef(null);
  const answerTimer = useRef(0);
  const idRef = useRef(0);

  const [y, setY] = useState(() => (typeof window === 'undefined' ? 0 : window.scrollY));
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [messages, setMessages] = useState([]);
  const [replies, setReplies] = useState('questions');
  const [busy, setBusy] = useState(false);

  const pageSyj = location.pathname === '/start-your-journey';
  const hideNearHero = pageSyj ? false : y < 40;
  const hideTop = y < 700;
  const hasFaq = Array.isArray(CHAT_FAQ) && CHAT_FAQ.length > 0;
  const hoverY = fine && !reduce ? { y: -3 } : undefined;

  if (open && !shown) setShown(true);

  useMotionValueEvent(scrollY, 'change', (value) => setY(value));

  const uid = () => {
    idRef.current += 1;
    return `chat-${idRef.current}`;
  };

  const resetThread = () => {
    window.clearTimeout(answerTimer.current);
    setBusy(false);
    setMessages([{ id: uid(), kind: 'bot', text: WELCOME }]);
    setReplies('questions');
  };

  const closeChat = () => setOpen(false);

  const openChat = () => {
    if (document.body.classList.contains('is-bk-open')) return;
    lastFocus.current = document.activeElement;
    resetThread();
    setOpen(true);
  };

  useEffect(() => {
    if (hideNearHero && open) closeChat();
  }, [hideNearHero, open]);

  useEffect(() => {
    document.body.classList.toggle('is-chat-open', open);
    return () => document.body.classList.remove('is-chat-open');
  }, [open]);

  useEffect(() => {
    const onClose = () => closeChat();
    window.addEventListener('lam:close-chatbot', onClose);
    return () => window.removeEventListener('lam:close-chatbot', onClose);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      if (document.body.classList.contains('is-bk-open')) return;
      e.preventDefault();
      closeChat();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open || !panelRef.current) return undefined;
    panelRef.current.focus({ preventScroll: true });
    return undefined;
  }, [open]);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, replies]);

  const onAsk = (item) => {
    if (busy) return;
    setBusy(true);
    setReplies('none');
    setMessages((prev) => [...prev, { id: uid(), kind: 'user', text: item.q }]);
    window.clearTimeout(answerTimer.current);
    answerTimer.current = window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: uid(), kind: 'bot', text: item.a }]);
      setReplies('again');
      setBusy(false);
    }, reduce ? 0 : 300);
  };

  const bubbleTween = tween(reduce ? 0 : dur.bubble, easeOut);

  return (
    <>
      {hasFaq ? (
        <m.button className={`fab fab-chat group fixed inset-s-[calc(1.25rem+env(safe-area-inset-right))] bottom-[calc(1.25rem+56px+16px+env(safe-area-inset-bottom))] z-90 grid size-14
          place-items-center rounded-lam-pill bg-lam-primary text-white shadow-lam-2 transition-colors hover:bg-(--color-btn-primary-hover) active:bg-(--color-btn-primary-active)`}
          id="chatbotOpen" type="button" aria-label="كيف نساعدكِ؟" aria-haspopup="dialog" aria-controls="chatbot" aria-expanded={open ? 'true' : 'false'} hidden={hideNearHero ? true : undefined}
          onClick={() => (open ? closeChat() : openChat())} whileHover={hoverY} transition={tween(dur.hover, easeUi)}>
          <span className={`pointer-events-none absolute inset-s-[calc(100%+.55rem)] top-1/2 -translate-x-1.5 -translate-y-1/2 whitespace-nowrap rounded-lam-sm bg-lam-brown px-[.7rem]
            py-[.35rem] text-xs leading-[1.3] font-medium text-white opacity-0 shadow-lam-1 transition-[opacity,transform] duration-200 after:absolute after:inset-e-full after:top-1/2
            after:-translate-y-1/2 after:border-[.35rem] after:border-transparent after:border-e-lam-brown group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0
            group-focus-visible:opacity-100 max-sm:hidden`} aria-hidden="true">كيف نساعدكِ؟</span>
          <svg className="ico size-6.5" aria-hidden="true"><use href="#i-chat"></use></svg>
        </m.button>
      ) : (
        <button id="chatbotOpen" type="button" aria-label="كيف نساعدكِ؟" hidden />
      )}
      <m.a className={`fab fab-wa fixed inset-s-[calc(1.25rem+env(safe-area-inset-right))] bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-90 grid size-14 place-items-center
        rounded-lam-pill bg-lam-whatsapp text-white shadow-lam-2 hover:bg-(--color-whatsapp-hover)`} id="fabWhatsapp" href="#" rel="noopener" aria-label="تواصلي عبر واتساب"
        hidden={hideNearHero ? true : undefined} whileHover={hoverY} transition={tween(dur.hover, easeUi)}>
        <svg className="ico size-6.5" aria-hidden="true"><use href="#i-whatsapp"></use></svg>
      </m.a>
      <m.button className={`fab fab-top fixed inset-e-[calc(1.25rem+env(safe-area-inset-left))] bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-90 grid size-14 place-items-center
        rounded-lam-pill border border-(--color-border) bg-lam-surface text-lam-brown shadow-lam-2`} id="toTop" type="button" aria-label="العودة للأعلى" hidden={hideTop ? true : undefined}
        whileHover={hoverY} transition={tween(dur.hover, easeUi)}>
        <svg className="ico size-6.5" aria-hidden="true"><use href="#i-arrowup"></use></svg>
      </m.button>

      <div className={`chatbot fixed inset-0 z-100 flex items-end justify-start p-[max(.75rem,env(safe-area-inset-top))] pb-[calc(1.25rem+56px+16px+56px+12px+env(safe-area-inset-bottom))]
        pointer-events-none max-sm:items-stretch max-sm:justify-stretch max-sm:p-2 max-sm:pb-[calc(.75rem+env(safe-area-inset-bottom))]' + (shown ? ' is-open pointer-events-auto' : '')`}
        id="chatbot" hidden={shown ? undefined : true} aria-hidden={open ? 'false' : 'true'}>
        <AnimatePresence
          onExitComplete={() => {
            setShown(false);
            const focusEl = lastFocus.current;
            if (focusEl && typeof focusEl.focus === 'function') {
              focusEl.focus({ preventScroll: true });
            }
          }}
        >
          {open ? (
            <m.div key="chat-backdrop" className="pointer-events-auto absolute inset-0 bg-[color-mix(in_srgb,var(--color-brown)_28%,transparent)]" data-chat-close tabIndex="-1"
              onClick={closeChat} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={tween(reduce ? 0 : dur.chatBack, easeUi)} />
          ) : null}
          {open ? (
            <m.div key="chat-panel" className={`pointer-events-auto relative z-1 ms-0 flex max-h-[min(560px,calc(100dvh-7.5rem))] w-[min(380px,calc(100vw-1.5rem))] flex-col overflow-hidden
              rounded-[18px] border border-[color-mix(in_srgb,var(--color-primary-border)_70%,var(--color-neutral-border))] bg-white font-lam-ar shadow-lam-3 outline-none max-sm:mt-auto
              max-sm:max-h-[min(78dvh,560px)] max-sm:w-full max-sm:rounded-[16px_16px_12px_12px]`} role="dialog" aria-modal="true" aria-labelledby="chatbotTitle" tabIndex="-1" ref={panelRef}
              initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={tween(reduce ? 0 : dur.chatPanel, easeOut)}>
              <header className="flex shrink-0 items-start gap-3 border-b border-[color-mix(in_srgb,var(--color-brand-rose)_40%,transparent)] bg-lam-primary px-4 pb-[.9rem] pt-4 text-white">
                <div className="min-w-0 flex-1">
                  <h2 className="font-lam-heading text-(length:--fs-h3) leading-[1.35] font-bold text-white" id="chatbotTitle">مساعدة <bdi className="lam" lang="en">Like A Model</bdi></h2>
                  <p className="mt-[.2rem] text-[.8rem] leading-[1.45] text-[color-mix(in_srgb,white_82%,transparent)]">اختاري سؤالكِ وسنجيبكِ فورًا</p>
                </div>
                <button className={`grid size-9 shrink-0 place-items-center rounded-lam-pill bg-[color-mix(in_srgb,white_18%,transparent)] text-white transition-colors
                  hover:bg-[color-mix(in_srgb,white_28%,transparent)]`} type="button" data-chat-close aria-label="إغلاق" onClick={closeChat}>
                  <svg className="ico size-4.5" aria-hidden="true"><use href="#i-close"></use></svg>
                </button>
              </header>
              <div className="flex min-h-0 flex-1 flex-col gap-[.65rem] overflow-y-auto overscroll-contain bg-white px-[.9rem] pb-[1.1rem] pt-4 scroll-smooth" id="chatbotThread"
                ref={threadRef} role="log" aria-live="polite" aria-relevant="additions">
                {messages.map((msg) => (
                  <m.div key={msg.id} className={`max-w-[88%] whitespace-pre-line rounded-[14px] px-[.9rem] py-[.7rem] text-[.875rem] leading-[1.65] text-lam-brown ' + (msg.kind === 'bot' ?
                    'self-start rounded-se-sm border border-[color-mix(in_srgb,var(--color-primary)_28%,transparent)] bg-[color-mix(in_srgb,var(--color-primary)_22%,white)]' : 'max-w-[82%]
                    self-end rounded-ss-sm bg-[color-mix(in_srgb,var(--color-primary-soft)_70%,
                    white)] text-[.8125rem]')`} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={bubbleTween}>
                    {msg.text}
                  </m.div>
                ))}
                {replies === 'questions' && (
                  <m.div className="mt-[.15rem] flex w-full flex-col gap-[.45rem]" role="group" aria-label="أسئلة شائعة" initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }} transition={{ ...bubbleTween, delay: reduce ? 0 : 0.05 }}>
                    {CHAT_FAQ.map((item, idx) => (
                      <button key={item.q} type="button" className={`block w-full rounded-lam-md border border-lam-primary bg-transparent px-[.85rem] py-[.65rem] text-start text-[.8125rem]
                        leading-[1.45] font-medium text-lam-brown transition-colors hover:bg-lam-primary-hover focus-visible:bg-lam-primary-hover focus-visible:outline-none
                        disabled:cursor-default disabled:opacity-55`} data-faq={String(idx)} onClick={() => onAsk(item)}>
                        {item.q}
                      </button>
                    ))}
                  </m.div>
                )}
                {replies === 'again' && (
                  <m.button type="button" className={`mt-1 self-center rounded-lam-pill border border-lam-primary bg-transparent px-[1.1rem] py-[.55rem] text-[.8125rem] font-semibold
                    text-lam-brown transition-colors hover:bg-lam-primary-hover`} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={bubbleTween}
                    onClick={() => {
                      setReplies('questions');
                    }}
                  >
                    سؤال آخر
                  </m.button>
                )}
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}