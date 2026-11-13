import { renderPageHero } from '../components/page-hero.js';
import { facilityIllustration } from '../utils/illustrations.js';
import { facilities } from '../data/facilities.js';
import { escapeHtml, qs } from '../utils/dom.js';

export function init() {
  renderPageHero(qs('#page-hero'), {
    eyebrow: 'Our Spaces',
    title: 'Hospital Facilities',
    lede: 'A conceptual look at the physical environments that support modern patient care.'
  });

  const grid = qs('#directory-grid');
  if (grid) {
    grid.innerHTML = facilities.map((fac) => `
      <article class="card card--facility" data-reveal>
        <div class="card__art">
          ${facilityIllustration(fac)}
        </div>
        <div class="card__body">
          <h3 class="card__title">${escapeHtml(fac.name)}</h3>
          <p class="card__lede">${escapeHtml(fac.caption)}</p>
        </div>
      </article>
    `).join('');
  }
}