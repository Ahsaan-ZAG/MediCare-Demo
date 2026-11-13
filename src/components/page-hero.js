import { escapeHtml } from '../utils/dom.js';

export function renderPageHero(mount, { eyebrow, title, lede }) {
  if (!mount) return;
  mount.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <div class="page-hero__content" data-reveal>
          <span class="eyebrow">${escapeHtml(eyebrow)}</span>
          <h1 class="page-hero__title">${escapeHtml(title)}</h1>
          <p class="page-hero__lede">${escapeHtml(lede)}</p>
        </div>
      </div>
    </section>
  `;
}