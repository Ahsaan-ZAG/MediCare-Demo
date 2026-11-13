import { getDepartmentById } from '../data/departments.js';
import { doctors } from '../data/doctors.js';
import { departmentIllustration } from '../utils/illustrations.js';
import { doctorCard } from '../components/cards/doctor-card.js';
import { escapeHtml, qs } from '../utils/dom.js';

export function init() {
  const root = qs('#dept-root');
  if (!root) return;

  // URL se department id nikalein (?dept=cardiology)
  const params = new URLSearchParams(window.location.search);
  const deptId = params.get('dept');
  
  // Fallback: Agar purane hash wale link se koi aaya hai (#cardiology)
  const hashId = window.location.hash.substring(1);
  
  const department = getDepartmentById(deptId || hashId);

  if (!department) {
    root.innerHTML = `<div class="empty-state"><h1>Department Not Found</h1><a href="departments.html" class="btn btn--primary" style="margin-top:1rem;">Back to Directory</a></div>`;
    return;
  }

  // Us department ke doctors filter karein
  const deptDoctors = doctors.filter(d => d.departmentId === department.id);

  root.innerHTML = `
    <div class="dept-header glass-panel" data-reveal>
      <div class="dept-header__art">
        ${departmentIllustration(department)}
      </div>
      <div class="dept-header__content">
        <span class="eyebrow">Department</span>
        <h1 class="dept-title">${escapeHtml(department.name)}</h1>
        <p class="dept-tagline">${escapeHtml(department.tagline)}</p>
        <p class="dept-desc">This is a fictional demonstration of the ${escapeHtml(department.name)} department. Our conceptual specialists focus on advanced, evidence-based care in a modern glassmorphism environment.</p>
      </div>
    </div>

    <div class="section" data-reveal>
      <div class="section-head">
        <h2 class="section-head__title">Our ${escapeHtml(department.name)} Specialists</h2>
        <p class="section-head__lede">Meet the fictional doctors working in this department.</p>
      </div>
      
      ${deptDoctors.length > 0 ? `
        <div class="grid grid--doctors">
          ${deptDoctors.map(doctorCard).join('')}
        </div>
      ` : `
        <div class="empty-state glass" style="padding: 3rem; border-radius: var(--r-lg);">
          <p>No demo doctors currently listed for this department.</p>
        </div>
      `}
    </div>
  `;
}