import { qs } from '../utils/dom.js';

export function renderPreloader(mount) {
  if (!mount) return;
  mount.innerHTML = `
    <div class="preloader" id="preloader" role="status" aria-live="polite">
      <div class="preloader__ring" aria-hidden="true"></div>
      <span class="preloader__label">MediCare</span>
      <span class="sr-only">Loading the MediCare Hospital demonstration experience</span>
    </div>
  `;
}

export function initPreloader() {
  const preloader = qs('#preloader');
  if (!preloader) {
    document.documentElement.dataset.preloader = 'done';
    window.dispatchEvent(new CustomEvent('preloader:done'));
    return;
  }

  const finish = () => {
    if (preloader.classList.contains('is-done')) return;
    preloader.classList.add('is-done');
    document.documentElement.dataset.preloader = 'done';
    window.dispatchEvent(new CustomEvent('preloader:done'));
    window.setTimeout(() => preloader.remove(), 600);
  };

  if (document.readyState === 'complete') {
    /* Small delay so the user actually sees the preloader briefly — 
       prevents the hero animation from being hidden behind a flicker. */
    window.setTimeout(finish, 260);
  } else {
    window.addEventListener('load', () => window.setTimeout(finish, 200), { once: true });
    window.setTimeout(finish, 4000); /* safety net */
  }
}