import { renderPageHero } from '../components/page-hero.js';
import { renderDirectoryControls } from '../components/directory-controls.js';
import { doctorCard } from '../components/cards/doctor-card.js';
import { doctors } from '../data/doctors.js';
import { departments } from '../data/departments.js';
import { qs } from '../utils/dom.js';

export function init() {
  // 1. Render UI
  renderPageHero(qs('#page-hero'), {
    eyebrow: 'Our Team',
    title: 'Find a Specialist',
    lede: 'Browse our fictional roster of doctors. All profiles are illustrative demo content.'
  });

  // Build department filters dynamically
  const deptFilters = departments.map((d) => ({
    value: d.id,
    label: d.name
  }));

  renderDirectoryControls(qs('#directory-controls'), {
    searchPlaceholder: 'Search doctors by name or specialty...',
    filters: deptFilters
  });

  // 2. Grid Render
  const grid = qs('#directory-grid');
  const emptyState = qs('#directory-empty');
  let currentFilter = 'all';
  let currentSearch = '';

  const updateGrid = () => {
    let filtered = doctors;

    // Apply department filter
    if (currentFilter !== 'all') {
      filtered = filtered.filter((d) => d.departmentId === currentFilter);
    }

    // Apply search term
    if (currentSearch) {
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(currentSearch) ||
          d.specialization.toLowerCase().includes(currentSearch)
      );
    }

    // Render
    if (filtered.length === 0) {
      grid.innerHTML = '';
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      grid.innerHTML = filtered.map(doctorCard).join('');
    }
  };

  updateGrid();

  // 3. Event Listeners
  // Search
  qs('#directory-search').addEventListener('input', (e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    updateGrid();
  });

  // Filters (Chips)
  const chips = document.querySelectorAll('.filter-chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      // Update active state
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');

      // Update state and re-render
      currentFilter = chip.dataset.filter;
      updateGrid();
    });
  });
}