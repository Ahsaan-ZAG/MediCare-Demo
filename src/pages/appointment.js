import { departments } from '../data/departments.js';
import { doctors } from '../data/doctors.js';
import { escapeHtml, qs } from '../utils/dom.js';

export function init() {
  const root = qs('#appointment-root');
  if (!root) return;

  // Agar user Doctor profile se aaya hai, to usko auto-select karein
  const params = new URLSearchParams(window.location.search);
  const preselectedDoctorSlug = params.get('doctor') || '';
  
  // Pre-selected doctor ka data dhoondein
  const preselectedDoctor = doctors.find(d => d.slug === preselectedDoctorSlug);
  const preselectedDeptId = preselectedDoctor ? preselectedDoctor.departmentId : '';

  // 1. Initial Departments Render
  const deptOptions = departments.map(d => 
    `<option value="${d.id}" ${d.id === preselectedDeptId ? 'selected' : ''}>${escapeHtml(d.name)}</option>`
  ).join('');

  // 2. Initial Doctors Render (Agar Department pre-selected hai to sirf uske doctors dikhayein)
  const initialDoctors = preselectedDeptId 
    ? doctors.filter(d => d.departmentId === preselectedDeptId) 
    : doctors;

  const doctorOptions = initialDoctors.map(d => 
    `<option value="${d.slug}" ${d.slug === preselectedDoctorSlug ? 'selected' : ''}>${escapeHtml(d.name)} (${escapeHtml(d.specialization)})</option>`
  ).join('');

  root.innerHTML = `
    <div class="section-head section-head--center" data-reveal>
      <span class="eyebrow">Appointment</span>
      <h1 class="section-head__title">Reserve a Demo Visit</h1>
      <p class="section-head__lede">This form is for demonstration only. No real bookings are made, and no data is transmitted or stored.</p>
    </div>

    <div class="form-wrapper glass-panel" id="form-container">
      <form id="appointment-form" novalidate>
        <div class="form-grid">
          <!-- Name -->
          <div class="form-group">
            <label for="p-name">Patient Name *</label>
            <input type="text" id="p-name" name="name" class="form-input" required placeholder="John Doe">
            <span class="form-error" id="error-name">Please enter your name.</span>
          </div>
          
          <!-- Email -->
          <div class="form-group">
            <label for="p-email">Email Address *</label>
            <input type="email" id="p-email" name="email" class="form-input" required placeholder="john@example.com">
            <span class="form-error" id="error-email">Please enter a valid email address.</span>
          </div>

          <!-- Department -->
          <div class="form-group">
            <label for="p-dept">Department</label>
            <select id="p-dept" name="department" class="form-input">
              <option value="">Select a department...</option>
              ${deptOptions}
            </select>
          </div>

          <!-- Doctor -->
          <div class="form-group">
            <label for="p-doctor">Doctor (Optional)</label>
            <select id="p-doctor" name="doctor" class="form-input">
              <option value="">Any available doctor</option>
              ${doctorOptions}
            </select>
          </div>

          <!-- Date -->
          <div class="form-group">
            <label for="p-date">Preferred Date *</label>
            <input type="date" id="p-date" name="date" class="form-input" required>
            <span class="form-error" id="error-date">Please select a valid future date.</span>
          </div>

          <!-- Time -->
          <div class="form-group">
            <label for="p-time">Preferred Time *</label>
            <select id="p-time" name="time" class="form-input" required>
              <option value="">Select a time...</option>
              <option value="morning">Morning (08:00 - 12:00)</option>
              <option value="afternoon">Afternoon (12:00 - 16:00)</option>
              <option value="evening">Evening (16:00 - 20:00)</option>
            </select>
            <span class="form-error" id="error-time">Please select a time slot.</span>
          </div>
        </div>

        <!-- Message -->
        <div class="form-group" style="margin-top: var(--sp-4);">
          <label for="p-msg">Message (Optional)</label>
          <textarea id="p-msg" name="message" class="form-input" rows="4" placeholder="Any specific concerns?"></textarea>
        </div>

        <!-- Notice -->
        <div class="form-notice glass-soft">
          <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
            <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <path d="M8 4V8M8 11V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <p>By clicking submit, you acknowledge this is a fictional demo. No data will be sent.</p>
        </div>

        <div style="margin-top: var(--sp-6); text-align: center;">
          <button type="submit" class="btn btn--primary" style="min-width: 200px;">Submit Demo Request</button>
        </div>
      </form>
    </div>

    <!-- Success State -->
    <div class="form-success glass-panel" id="form-success" hidden>
      <div class="form-success__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <h2>Demo Request Received</h2>
      <p>Thank you, <strong id="success-name">Patient</strong>. This is a demonstration. No actual appointment has been booked, and no data was stored.</p>
      <a href="index.html" class="btn btn--glass" style="margin-top: var(--sp-4);">Back to Home</a>
    </div>
  `;

  // ==========================================
  // DYNAMIC DOCTOR FILTERING LOGIC
  // ==========================================
  const deptSelect = qs('#p-dept');
  const doctorSelect = qs('#p-doctor');

  deptSelect.addEventListener('change', (e) => {
    const selectedDeptId = e.target.value;
    
    // Agar department select kiya hai, to uske doctors filter karein
    const filteredDoctors = selectedDeptId 
      ? doctors.filter(d => d.departmentId === selectedDeptId) 
      : doctors; // Agar "Select Department" khali kiya hai, to sab dikhayein

    // Doctor dropdown ko update karein
    doctorSelect.innerHTML = `
      <option value="">Any available doctor</option>
      ${filteredDoctors.map(d => 
        `<option value="${d.slug}">${escapeHtml(d.name)} (${escapeHtml(d.specialization)})</option>`
      ).join('')}
    `;
  });

  // ==========================================
  // FORM VALIDATION LOGIC
  // ==========================================
  const form = qs('#appointment-form');
  const dateInput = qs('#p-date');

  // Aaj ki date se pehle ki dates disable karein
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const toggleError = (inputId, errorId, show) => {
      const input = qs(`#${inputId}`);
      const error = qs(`#${errorId}`);
      if (show) {
        input.classList.add('is-invalid');
        error.style.display = 'block';
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
        error.style.display = 'none';
      }
    };

    const name = qs('#p-name').value.trim();
    toggleError('p-name', 'error-name', name === '');

    const email = qs('#p-email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    toggleError('p-email', 'error-email', !emailRegex.test(email));

    const dateVal = dateInput.value;
    const dateValid = dateVal && dateVal >= today;
    toggleError('p-date', 'error-date', !dateValid);

    const time = qs('#p-time').value;
    toggleError('p-time', 'error-time', time === '');

    if (isValid) {
      qs('#form-container').hidden = true;
      const successBox = qs('#form-success');
      qs('#success-name').textContent = name;
      successBox.hidden = false;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Real-time validation
  qs('#p-name').addEventListener('input', () => toggleError('p-name', 'error-name', false));
  qs('#p-email').addEventListener('input', () => toggleError('p-email', 'error-email', false));
  dateInput.addEventListener('change', () => toggleError('p-date', 'error-date', false));
  qs('#p-time').addEventListener('change', () => toggleError('p-time', 'error-time', false));
}