import { serviceIllustration } from '../../utils/illustrations.js';
import { escapeHtml } from '../../utils/dom.js';

export function serviceCard(service) {
  return `
    <article class="card card--service" data-reveal>
      <div class="card__art card__art--sm">
        ${serviceIllustration(service)}
      </div>
      <div class="card__body">
        <span class="card__eyebrow">Service</span>
        <h3 class="card__title">${escapeHtml(service.name)}</h3>
        <p class="card__lede">${escapeHtml(service.tagline)}</p>
      </div>
    </article>
  `;
}