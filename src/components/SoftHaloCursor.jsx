import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const FINE_MQ = '(hover: hover) and (pointer: fine)';
const REDUCE_MQ = '(prefers-reduced-motion: reduce)';
const NATIVE_SEL = 'input, textarea, select, iframe, [contenteditable]:not([contenteditable="false"]), .map-frame';
const INTERACTIVE_SEL = 'a[href], button, [role="button"], .fab, [data-social]';
const LINKED_CARD_SEL = '.story-card, .sp-card';
const RING_REST = 32;
const RING_HOVER = 42;
const HOVER_SCALE = RING_HOVER / RING_REST;
const RING_FOLLOW = 0.22;
const SCALE_FOLLOW = 0.16;
const FADE_FOLLOW = 0.2;
const DOT_HALF = 4;
const HEART_HALF = 5.5;
const RING_HALF = 16;

function canUseSoftHalo() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(FINE_MQ).matches && !window.matchMedia(REDUCE_MQ).matches;
}

function asElement(node) {
  if (!node) return null;
  if (node.nodeType === Node.ELEMENT_NODE) return node;
  return node.parentElement;
}

function isNativeSurface(el) {
  if (!el) return false;
  return Boolean(el.closest(NATIVE_SEL));
}

function isDisabledControl(el) {
  return el.matches('button:disabled, [disabled], [aria-disabled="true"]');
}

function isInteractive(el) {
  if (!el || isNativeSurface(el)) return false;
  const hit = el.closest(INTERACTIVE_SEL);
  if (hit && !isDisabledControl(hit)) return true;
  const card = el.closest(LINKED_CARD_SEL);
  if (!card) return false;
  if (card.matches('a, [role="button"]')) return !isDisabledControl(card);
  return Boolean(card.querySelector('a[href], button, [role="button"]'));
}

function hasTextSelection() {
  const sel = document.getSelection();
  return Boolean(sel && sel.type === 'Range' && String(sel).length > 0);
}

export default function SoftHaloCursor() {
  const [enabled, setEnabled] = useState(canUseSoftHalo);
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const heartRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia(FINE_MQ);
    const reduce = window.matchMedia(REDUCE_MQ);
    const sync = () => setEnabled(fine.matches && !reduce.matches);
    sync();
    fine.addEventListener('change', sync);
    reduce.addEventListener('change', sync);
    return () => {
      fine.removeEventListener('change', sync);
      reduce.removeEventListener('change', sync);
    };
  }, []);

  useLayoutEffect(() => {
    if (!enabled) return undefined;

    const html = document.documentElement;
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const heart = heartRef.current;
    if (!root || !dot || !ring || !heart) return undefined;

    html.classList.add('has-soft-halo');

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let hasPoint = false;
    let hovering = false;
    let native = false;
    let selecting = false;
    let visible = false;
    let pressing = false;
    let pressInteractive = false;
    let scale = 1;
    let heartOp = 0;
    let visOp = 0;
    let raf = 0;

    const setSelectingClass = (on) => {
      html.classList.toggle('is-soft-halo-selecting', on);
    };

    const apply = () => {
      const hide = native || selecting || !visible;
      const targetVis = hide ? 0 : 1;
      const targetScale = !hide && hovering ? HOVER_SCALE : 1;
      const targetHeart = !hide && hovering ? 1 : 0;

      ringX += (mouseX - ringX) * RING_FOLLOW;
      ringY += (mouseY - ringY) * RING_FOLLOW;
      scale += (targetScale - scale) * SCALE_FOLLOW;
      heartOp += (targetHeart - heartOp) * FADE_FOLLOW;
      visOp += (targetVis - visOp) * FADE_FOLLOW;

      root.style.opacity = visOp < 0.012 ? '0' : visOp.toFixed(3);
      dot.style.opacity = (1 - heartOp).toFixed(3);
      heart.style.opacity = heartOp.toFixed(3);
      dot.style.transform = `translate3d(${mouseX - DOT_HALF}px, ${mouseY - DOT_HALF}px, 0)`;
      heart.style.transform = `translate3d(${mouseX - HEART_HALF}px, ${mouseY - HEART_HALF}px, 0)`;
      ring.style.transform = `translate3d(${ringX - RING_HALF}px, ${ringY - RING_HALF}px, 0) scale(${scale})`;
    };

    const tick = () => {
      apply();
      raf = window.requestAnimationFrame(tick);
    };

    const updateFromTarget = (node, pointerType) => {
      if (pointerType === 'touch') {
        native = true;
        hovering = false;
        selecting = false;
        visible = false;
        setSelectingClass(false);
        return;
      }
      const el = asElement(node);
      native = isNativeSurface(el);
      hovering = !native && isInteractive(el);
      const rangeSel = hasTextSelection();
      selecting = !native && !hovering && ((pressing && !pressInteractive) || rangeSel);
      setSelectingClass(selecting);
    };

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch') {
        updateFromTarget(e.target, e.pointerType);
        return;
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!hasPoint) {
        ringX = mouseX;
        ringY = mouseY;
        hasPoint = true;
      }
      visible = true;
      updateFromTarget(e.target, e.pointerType);
    };

    const onPointerOver = (e) => {
      if (e.pointerType === 'touch') return;
      visible = true;
      updateFromTarget(e.target, e.pointerType);
    };

    const onPointerDown = (e) => {
      if (e.pointerType === 'touch' || e.button !== 0) return;
      pressing = true;
      const el = asElement(e.target);
      pressInteractive = isNativeSurface(el) || isInteractive(el);
      updateFromTarget(e.target, e.pointerType);
    };

    const onPointerUp = (e) => {
      pressing = false;
      pressInteractive = false;
      updateFromTarget(e.target, e.pointerType);
    };

    const onWindowOut = (e) => {
      if (e.relatedTarget || e.toElement) return;
      visible = false;
      hovering = false;
    };

    const onBlur = () => {
      visible = false;
      pressing = false;
    };

    const onSelectionChange = () => {
      const rangeSel = hasTextSelection();
      selecting = !native && !hovering && ((pressing && !pressInteractive) || rangeSel);
      setSelectingClass(selecting);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, true);
    document.addEventListener('pointerdown', onPointerDown, true);
    document.addEventListener('pointerup', onPointerUp, true);
    document.addEventListener('mouseout', onWindowOut);
    window.addEventListener('blur', onBlur);
    document.addEventListener('selectionchange', onSelectionChange);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver, true);
      document.removeEventListener('pointerdown', onPointerDown, true);
      document.removeEventListener('pointerup', onPointerUp, true);
      document.removeEventListener('mouseout', onWindowOut);
      window.removeEventListener('blur', onBlur);
      document.removeEventListener('selectionchange', onSelectionChange);
      html.classList.remove('has-soft-halo', 'is-soft-halo-selecting');
    };
  }, [enabled]);

  if (!enabled || typeof document === 'undefined') return null;

  return createPortal(
    <div className="soft-halo" id="soft-halo" ref={rootRef} aria-hidden="true">
      <svg
        ref={ringRef}
        className="soft-halo__layer soft-halo__ring"
        viewBox="0 0 32 32"
        width="32"
        height="32"
        focusable="false"
      >
        <circle cx="16" cy="16" r="15.5" />
      </svg>
      <span ref={dotRef} className="soft-halo__layer soft-halo__dot" />
      <svg
        ref={heartRef}
        className="soft-halo__layer soft-halo__heart"
        viewBox="0 0 24 24"
        width="11"
        height="11"
        focusable="false"
      >
        <path d="M12 20.4S4.4 15.6 4.4 10.2A4.4 4.4 0 0 1 12 7.6a4.4 4.4 0 0 1 7.6 2.6C19.6 15.6 12 20.4 12 20.4Z" />
      </svg>
    </div>,
    document.body,
  );
}
