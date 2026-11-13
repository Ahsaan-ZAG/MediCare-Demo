import { escapeHtml } from '../utils/dom.js';

export function renderDirectoryControls(mount, { searchPlaceholder, filters = [] }) {
  if (!mount) return;

  const filterHTML = filters.length > 0 ? `
    <div class="filter-chips" role="group" aria-label="Filter options">
      <button class="filter-chip is-active" data-filter="all">All</button>
      ${filters.map(f => `
        <button class="filter-chip" data-filter="${escapeHtml(f.value)}">
          ${escapeHtml(f.label)}
        </button>
      `).join('')}
    </div>
  ` : '';

  mount.innerHTML = `
    <div class="directory-controls glass">
      <div class="search-wrap">
        <svg viewBox="0 0 24 24" class="search-icon" aria-hidden="true">
          <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M16 16L22 22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input type="search" id="directory-search" class="search-input" placeholder="${escapeHtml(searchPlaceholder)}" aria-label="Search directory">
      </div>
      ${filterHTML}
    </div>
  `;
}