import { renderPageHero } from '../components/page-hero.js';
import { serviceCard } from '../components/cards/service-card.js';
import { services } from '../data/services.js';
import { qs } from '../utils/dom.js';

export function init() {
  renderPageHero(qs('#page-hero'), {
    eyebrow: 'Our Services',
    title: 'Medical Services',
    lede: 'Ten illustrative service categories representing the concept of a fully-equipped hospital.'
  });

  const grid = qs('#directory-grid');
  if (grid) {
    grid.innerHTML = services.map(serviceCard).join('');
  }
}