import { qs, on } from '../utils/dom.js';

export function renderBackToTop(mount) {
  if (!mount) return;
  mount.innerHTML = `
    <button class="back-to-top" type="button" aria-label="Back to top">
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `;
}

export function initBackToTop(mount) {
  const button = qs('.back-to-top', mount);
  if (!button) return;

  let ticking = false;
  const update = () => {
    button.classList.toggle('is-visible', window.scrollY > 620);
    ticking = false;
  };

  on(window, 'scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }, { passive: true });
  update();

  on(button, 'click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
}