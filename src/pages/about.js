import { renderPageHero } from '../components/page-hero.js';
import { qs } from '../utils/dom.js';

export function init() {
  renderPageHero(qs('#page-hero'), {
    eyebrow: 'Our Story',
    title: 'About MediCare',
    lede: 'A fictional healthcare concept built to demonstrate how modern medical spaces can present themselves online with clarity, calm, and premium technology.'
  });

  const content = qs('#about-content');
  if (!content) return;

  content.innerHTML = `
    <div class="about-mv-grid" data-reveal>
      <div class="mv-card glass">
        <h2 class="mv-card__title">Our Mission</h2>
        <p class="mv-card__text">To explore how a modern, multi-specialty hospital could present itself online with clarity, calm and technological sophistication — without overpromising or misleading.</p>
      </div>
      <div class="mv-card glass">
        <h2 class="mv-card__title">Our Vision</h2>
        <p class="mv-card__text">A healthcare web experience that is genuinely accessible, honest about its purpose, and beautiful enough to feel trustworthy at first glance.</p>
      </div>
    </div>

    <div class="about-values section" data-reveal>
      <h2 class="about-values__title">Core Values of the Concept</h2>
      <div class="values-grid">
        <div class="value-item">
          <span class="value-item__icon">✦</span>
          <h3>Clarity</h3>
          <p>Information before decoration. Every screen earns its place.</p>
        </div>
        <div class="value-item">
          <span class="value-item__icon">✦</span>
          <h3>Accessibility</h3>
          <p>Keyboard navigation, contrast, motion awareness — by default.</p>
        </div>
        <div class="value-item">
          <span class="value-item__icon">✦</span>
          <h3>Honesty</h3>
          <p>Fictional content is always clearly labelled as demonstration data.</p>
        </div>
        <div class="value-item">
          <span class="value-item__icon">✦</span>
          <h3>Craft</h3>
          <p>Real 3D, real animation, real performance budgets.</p>
        </div>
      </div>
    </div>
  `;
}