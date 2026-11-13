import { doctorIllustration } from '../../utils/illustrations.js';
import { escapeHtml } from '../../utils/dom.js';
import { getDepartmentById } from '../../data/departments.js';

export function doctorCard(doctor) {
  const department = getDepartmentById(doctor.departmentId);

  return `
    <article class="card card--doctor" data-reveal>
      <div class="card__portrait">
        ${doctorIllustration(doctor)}
      </div>
      <div class="card__body">
        <span class="card__eyebrow">${escapeHtml(department?.name ?? 'Demo')}</span>
        <h3 class="card__title">${escapeHtml(doctor.name)}</h3>
        <p class="card__lede">${escapeHtml(doctor.specialization)}</p>
        <div class="card__meta">
          <span>${escapeHtml(doctor.experience)}</span>
          <span>${escapeHtml(doctor.consultationDays.join(' · '))}</span>
        </div>
        <a class="card__link" href="doctor-details.html?doctor=${encodeURIComponent(doctor.slug)}">
          View profile
          <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
            <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor"
                  stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </article>
  `;
}