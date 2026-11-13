import { getDoctorBySlug } from '../data/doctors.js';
import { getDepartmentById } from '../data/departments.js';
import { doctorIllustration } from '../utils/illustrations.js';
import { escapeHtml, qs } from '../utils/dom.js';

export function init() {
  const root = qs('#profile-root');
  if (!root) return;

  // URL se doctor ka slug nikalein (?doctor=aria-voss)
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('doctor');
  const doctor = getDoctorBySlug(slug);

  // Agar doctor nahi mila (galat URL)
  if (!doctor) {
    root.innerHTML = `
      <div class="empty-state">
        <h1>Doctor Not Found</h1>
        <p>We couldn't find the profile you were looking for.</p>
        <a href="doctors.html" class="btn btn--primary" style="margin-top: 1rem;">Back to Directory</a>
      </div>
    `;
    return;
  }

  const department = getDepartmentById(doctor.departmentId);

  // Profile Render Karein
  root.innerHTML = `
    <div class="profile-layout">
      <!-- Left Side: Portrait & Action -->
      <div class="profile-sidebar glass-panel">
        <div class="profile-image">
          ${doctorIllustration(doctor)}
        </div>
        <div class="profile-actions">
          <a href="appointment.html?doctor=${doctor.slug}" class="btn btn--primary" style="width: 100%;">
            Book Demo Appointment
          </a>
        </div>
      </div>

      <!-- Right Side: Details -->
      <div class="profile-content">
        <div class="profile-header">
          <span class="eyebrow">${escapeHtml(department?.name ?? 'Specialist')}</span>
          <h1 class="profile-name">${escapeHtml(doctor.name)}</h1>
          <p class="profile-specialty">${escapeHtml(doctor.specialization)}</p>
        </div>

        <div class="profile-meta-grid">
          <div class="meta-box glass">
            <span class="meta-box__label">Experience</span>
            <span class="meta-box__value">${escapeHtml(doctor.experience)}</span>
          </div>
          <div class="meta-box glass">
            <span class="meta-box__label">Qualification</span>
            <span class="meta-box__value">${escapeHtml(doctor.qualification)}</span>
          </div>
        </div>

        <div class="profile-bio">
          <h2>Biography</h2>
          <p>${escapeHtml(doctor.biography)}</p>
        </div>

        <div class="profile-schedule">
          <h2>Consultation Schedule</h2>
          <div class="schedule-tags">
            ${doctor.consultationDays.map(day => `
              <span class="schedule-tag glass">${escapeHtml(day)}</span>
            `).join('')}
          </div>
          <p class="schedule-time">Timing: ${escapeHtml(doctor.consultationTimings)}</p>
        </div>
      </div>
    </div>
  `;
}