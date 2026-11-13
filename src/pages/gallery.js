import { renderPageHero } from '../components/page-hero.js';
import { renderDirectoryControls } from '../components/directory-controls.js';
import { galleryIllustration } from '../utils/illustrations.js';
import { gallery, galleryCategories } from '../data/gallery.js';
import { escapeHtml, qs } from '../utils/dom.js';

export function init() {
  renderPageHero(qs('#page-hero'), {
    eyebrow: 'Visual Library',
    title: 'Media Gallery',
    lede: 'Explore our collection of illustrative 3D medical assets and facility concepts.'
  });

  const filters = galleryCategories.map(cat => ({ value: cat, label: cat }));

  renderDirectoryControls(qs('#directory-controls'), {
    searchPlaceholder: 'Search gallery...',
    filters: filters
  });

  const grid = qs('#directory-grid');
  const lightbox = qs('#lightbox');
  const lightboxContent = qs('#lightbox-content');
  const closeBtn = qs('#lightbox-close');

  let currentFilter = 'all';
  let currentSearch = '';

  const updateGrid = () => {
    let filtered = gallery;
    if (currentFilter !== 'all') filtered = filtered.filter(g => g.category === currentFilter);
    if (currentSearch) filtered = filtered.filter(g => g.title.toLowerCase().includes(currentSearch));

    grid.innerHTML = filtered.map(item => `
      <div class="gallery-item glass" data-id="${item.id}" role="button" tabindex="0" aria-label="View ${escapeHtml(item.title)}">
        <div class="gallery-item__art">
          ${galleryIllustration(item)}
        </div>
        <span class="gallery-item__title">${escapeHtml(item.title)}</span>
      </div>
    `).join('');

    // Attach Lightbox events
    document.querySelectorAll('.gallery-item').forEach(card => {
      card.addEventListener('click', () => openLightbox(card.dataset.id));
      card.addEventListener('keydown', (e) => { if(e.key === 'Enter') openLightbox(card.dataset.id); });
    });
  };

  const openLightbox = (id) => {
    const item = gallery.find(g => g.id === id);
    if (!item) return;
    
    lightboxContent.innerHTML = `
      <div class="lightbox__art">${galleryIllustration(item)}</div>
      <h3 class="lightbox__title">${escapeHtml(item.title)}</h3>
      <span class="lightbox__cat">${escapeHtml(item.category)}</span>
    `;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden'; // Stop background scrolling
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.hidden) closeLightbox(); });

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