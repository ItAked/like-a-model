/** Framer tweens copied from CSS --ease / --ease-out. Do not change :root tokens. */
export const easeOut = [0.16, 1, 0.3, 1];
export const easeUi = [0.22, 0.61, 0.36, 1];

export const dur = {
  hover: 0.18,
  tap: 0.16,
  overlay: 0.32,
  fade: 0.18,
  enter: 0.48,
  enterSlow: 0.52,
  panel: 0.42,
  panelExit: 0.32,
  chatPanel: 0.4,
  chatBack: 0.28,
  bubble: 0.32,
  modalSwap: 0.2,
};

export const inViewOnce = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -10% 0px',
};

export const tween = (duration, ease = easeOut) => ({
  type: 'tween',
  duration,
  ease,
});
