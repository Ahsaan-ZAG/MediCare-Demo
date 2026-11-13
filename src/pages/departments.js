import { renderPageHero } from '../components/page-hero.js';
import { renderDirectoryControls } from '../components/directory-controls.js';
import { departmentCard } from '../components/cards/department-card.js';
import { departments } from '../data/departments.js';
import { qs } from '../utils/dom.js';

export function init() {
  // 1. Render UI
  renderPageHero(qs('#page-hero'), {
    eyebrow: 'Directory',
    title: 'Our Departments',
    lede: 'Explore our 12 fictional specialty departments. Use the search to find what you need.'
  });

  renderDirectoryControls(qs('#directory-controls'), {
    searchPlaceholder: 'Search departments (e.g., Cardiology)...'
    // No categories for departments, since they are the categories themselves
  });

  // 2. Initial Grid Render
  const grid = qs('#directory-grid');
  const emptyState = qs('#directory-empty');
  
  const renderGrid = (items) => {
    if (items.length === 0) {
      grid.innerHTML = '';
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      grid.innerHTML = items.map(departmentCard).join('');
    }
  };

  renderGrid(departments);

  // ====================================================
  // 3. URL Hash Handling (Naya Code Add Hua Hai)
  // ====================================================
  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Thora sa delay taake DOM mein cards properly render ho jayein
      setTimeout(() => {
        // Smooth scroll to the specific card
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Us card ko highlight karein
        targetElement.classList.add('card--highlight');
        
        // 3 second baad highlight remove kar dein
        setTimeout(() => {
          targetElement.classList.remove('card--highlight');
        }, 3000);
      }, 300);
    }
  }

  // 4. Search Logic
  const searchInput = qs('#directory-search');
  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const filtered = departments.filter(
      (d) => d.name.toLowerCase().includes(term) || d.tagline.toLowerCase().includes(term)
    );
    renderGrid(filtered);
  });
}