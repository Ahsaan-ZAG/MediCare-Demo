import { departmentIllustration } from '../../utils/illustrations.js';
import { escapeHtml } from '../../utils/dom.js';

export function departmentCard(department) {
    return `
    <!-- Yahan id add ki gayi hai -->
    <article class="card card--dept" id="${escapeHtml(department.slug)}" data-reveal>
      <div class="card__art">
        ${departmentIllustration(department)}
      </div>
      <div class="card__body">
        <span class="card__eyebrow">Department</span>
        <h3 class="card__title">${escapeHtml(department.name)}</h3>
        <p class="card__lede">${escapeHtml(department.tagline)}</p>
        <a class="card__link" href="department-details.html?dept=${escapeHtml(department.slug)}">
          View department
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
            <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor"
                  stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  `;
}