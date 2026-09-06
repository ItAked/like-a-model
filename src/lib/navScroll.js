/** Sole section/hash scroll helper. Route restore: App.jsx. Clicks: Header.jsx. */
export function navScrollOffset() {
  const header = document.getElementById('siteHeader');
  const h = header ? Math.round(header.getBoundingClientRect().height) : 72;
  const fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return h + 1.25 * fs;
}

export function scrollToNavTarget(el, instant) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = instant || reduce ? 'auto' : 'smooth';
  if (!el || el.id === 'home') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const y = Math.max(0, window.scrollY + el.getBoundingClientRect().top - navScrollOffset());
  window.scrollTo({ top: y, behavior });
}

export function scrollToHash(hash, instant) {
  const id = String(hash || '').replace(/^#/, '');
  if (!id) {
    window.scrollTo({ top: 0, behavior: instant ? 'auto' : 'smooth' });
    return;
  }
  scrollToNavTarget(document.getElementById(id), instant);
}
