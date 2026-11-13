import { renderPageHero } from '../components/page-hero.js';
import { renderDirectoryControls } from '../components/directory-controls.js';
import { articleCard } from '../components/cards/article-card.js';
import { articles, articleCategories } from '../data/articles.js';
import { qs } from '../utils/dom.js';

export function init() {
  renderPageHero(qs('#page-hero'), {
    eyebrow: 'Health Awareness',
    title: 'Educational Articles',
    lede: 'General, cautious health information to support awareness. Not medical advice.'
  });

  const filters = articleCategories.map(cat => ({ value: cat, label: cat }));

  renderDirectoryControls(qs('#directory-controls'), {
    searchPlaceholder: 'Search articles by title...',
    filters: filters
  });

  const grid = qs('#directory-grid');
  let currentFilter = 'all';
  let currentSearch = '';

  const updateGrid = () => {
    let filtered = articles;
    if (currentFilter !== 'all') filtered = filtered.filter(a => a.category === currentFilter);
    if (currentSearch) filtered = filtered.filter(a => a.title.toLowerCase().includes(currentSearch));
    
    grid.innerHTML = filtered.length > 0 
      ? filtered.map(articleCard).join('')
      : '<div class="empty-state" style="grid-column: 1 / -1;"><p>No articles found.</p></div>';
  };

  updateGrid();

  qs('#directory-search').addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    updateGrid();
  });

  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      currentFilter = chip.dataset.filter;
      updateGrid();
    });
  });
}