import { renderPageHero } from '../components/page-hero.js';
import { initAccordions } from '../components/accordion.js';
import { faqs, faqCategories } from '../data/faqs.js';
import { escapeHtml, qs } from '../utils/dom.js';

export function init() {
  renderPageHero(qs('#page-hero'), {
    eyebrow: 'Support',
    title: 'Frequently Asked Questions',
    lede: 'Find answers about the site, the demo form, the technology, and accessibility.'
  });

  const list = qs('#faq-list');
  
  // Group by category
  const grouped = faqCategories.map(cat => {
    const catFaqs = faqs.filter(f => f.category === cat);
    return `
      <div class="faq-group" data-reveal>
        <h2 class="faq-group-title">${escapeHtml(cat)}</h2>
        <div class="accordion">
          ${catFaqs.map(faq => `
            <div class="accordion__item">
              <button class="accordion__trigger" aria-expanded="false">
                <span>${escapeHtml(faq.q)}</span>
                <svg class="accordion__icon" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <div class="accordion__panel" data-open="false">
                <div class="accordion__content">${escapeHtml(faq.a)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  list.innerHTML = grouped;
  initAccordions();
}