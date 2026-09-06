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
        <m.button
          className="fab fab-chat"
          id="chatbotOpen"
          type="button"
          aria-label="كيف نساعدكِ؟"
          aria-haspopup="dialog"
          aria-controls="chatbot"
          aria-expanded={open ? 'true' : 'false'}
          hidden={hideNearHero ? true : undefined}
          onClick={() => (open ? closeChat() : openChat())}
          whileHover={hoverY}
          transition={tween(dur.hover, easeUi)}
        >
          <span className="fab-chat-tip" aria-hidden="true">كيف نساعدكِ؟</span>
          <svg className="ico" aria-hidden="true"><use href="#i-chat"></use></svg>
        </m.button>
      ) : (
        <button className="fab fab-chat" id="chatbotOpen" type="button" aria-label="كيف نساعدكِ؟" hidden />
      )}
      <m.a
        className="fab fab-wa"
        id="fabWhatsapp"
        href="#"
        rel="noopener"
        aria-label="تواصلي عبر واتساب"
        hidden={hideNearHero ? true : undefined}
        whileHover={hoverY}
        transition={tween(dur.hover, easeUi)}
      >
        <svg className="ico" aria-hidden="true"><use href="#i-whatsapp"></use></svg>
      </m.a>
      <m.button
        className="fab fab-top"
        id="toTop"
        type="button"
        aria-label="العودة للأعلى"
        hidden={hideTop ? true : undefined}
        whileHover={hoverY}
        transition={tween(dur.hover, easeUi)}
      >
        <svg className="ico" aria-hidden="true"><use href="#i-arrowup"></use></svg>
      </m.button>

      <div
        className={'chatbot' + (shown ? ' is-open' : '')}
        id="chatbot"
        hidden={shown ? undefined : true}
        aria-hidden={open ? 'false' : 'true'}
      >
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
            <m.div
              key="chat-backdrop"
              className="chatbot-backdrop"
              data-chat-close
              tabIndex="-1"
              onClick={closeChat}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={tween(reduce ? 0 : dur.chatBack, easeUi)}
            />
          ) : null}
          {open ? (
            <m.div
              key="chat-panel"
              className="chatbot-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="chatbotTitle"
              tabIndex="-1"
              ref={panelRef}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={tween(reduce ? 0 : dur.chatPanel, easeOut)}
            >
                <header className="chatbot-head">
                  <div className="chatbot-head-text">
                    <h2 className="chatbot-title" id="chatbotTitle">مساعدة <bdi className="lam" lang="en">Like A Model</bdi></h2>
                    <p className="chatbot-sub">اختاري سؤالكِ وسنجيبكِ فورًا</p>
                  </div>
                  <button className="chatbot-close" type="button" data-chat-close aria-label="إغلاق" onClick={closeChat}>
                    <svg className="ico" aria-hidden="true"><use href="#i-close"></use></svg>
                  </button>
                </header>
                <div className="chatbot-thread" id="chatbotThread" ref={threadRef} role="log" aria-live="polite" aria-relevant="additions">
                  {messages.map((msg) => (
                    <m.div
                      key={msg.id}
                      className={'chat-bubble chat-bubble--' + msg.kind}
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={bubbleTween}
                    >
                      {msg.text}
                    </m.div>
                  ))}
                  {replies === 'questions' && (
                    <m.div
                      className="chat-replies"
                      role="group"
                      aria-label="أسئلة شائعة"
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ ...bubbleTween, delay: reduce ? 0 : 0.05 }}
                    >
                      {CHAT_FAQ.map((item, idx) => (
                        <button
                          key={item.q}
                          type="button"
                          className="chat-reply"
                          data-faq={String(idx)}
                          onClick={() => onAsk(item)}
                        >
                          {item.q}
                        </button>
                      ))}
                    </m.div>
                  )}
                  {replies === 'again' && (
                    <m.button
                      type="button"
                      className="chat-again"
                      initial={reduce ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={bubbleTween}
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
