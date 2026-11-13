import { renderPageHero } from '../components/page-hero.js';
import { site } from '../config/site.config.js';
import { qs, escapeHtml } from '../utils/dom.js';

export function init() {
  renderPageHero(qs('#page-hero'), {
    eyebrow: 'Get in Touch',
    title: 'Contact Us',
    lede: 'Have a question about this demonstration concept? Fill out the form below or use the illustrative contact details.'
  });

  const root = qs('#contact-content');
  if (!root) return;

  root.innerHTML = `
    <div class="contact-grid">
      <div class="contact-form-wrap glass-panel" id="contact-form-wrap">
        <h2 class="contact-title">Send a Demo Message</h2>
        <form id="contact-form" novalidate>
          <div class="form-group">
            <label for="c-name">Name *</label>
            <input type="text" id="c-name" class="form-input" required>
            <span class="form-error" id="c-error-name">Please enter your name.</span>
          </div>
          <div class="form-group">
            <label for="c-email">Email *</label>
            <input type="email" id="c-email" class="form-input" required>
            <span class="form-error" id="c-error-email">Please enter a valid email.</span>
          </div>
          <div class="form-group">
            <label for="c-msg">Message *</label>
            <textarea id="c-msg" class="form-input" rows="5" required></textarea>
            <span class="form-error" id="c-error-msg">Please enter a message.</span>
          </div>
          <div class="form-notice glass-soft" style="margin-top: 1rem;">
            <p>This form does not transmit or store data.</p>
          </div>
          <button type="submit" class="btn btn--primary" style="margin-top: 1.5rem; width: 100%;">Send Message</button>
        </form>
      </div>

      <div class="contact-info-wrap">
        <div class="contact-info glass">
          <h3>Demo Contact Info</h3>
          <ul>
            <li><strong>Phone:</strong> ${escapeHtml(site.contact.phoneLabel)}</li>
            <li><strong>Email:</strong> ${escapeHtml(site.contact.emailLabel)}</li>
            <li><strong>Address:</strong> ${escapeHtml(site.contact.addressLabel)}</li>
            <li><strong>Hours:</strong> ${escapeHtml(site.contact.hoursLabel)}</li>
          </ul>
        </div>
        
        <div class="map-placeholder glass">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path d="M12 21.5C12 21.5 20 14 20 9C20 4.5 16.5 1 12 1C7.5 1 4 4.5 4 9C4 14 12 21.5 12 21.5Z"/>
            <circle cx="12" cy="9" r="3"/>
          </svg>
          <p>Fictional Location Map</p>
        </div>
      </div>
    </div>

    <div class="form-success glass-panel" id="contact-success" hidden style="max-width: 600px; margin-inline: auto; margin-top: 2rem;">
      <h2>Message Sent (Demo)</h2>
      <p>Thank you. This is a demonstration — no actual message was transmitted.</p>
    </div>
  `;

  const form = qs('#contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const toggleError = (inputId, errorId, show) => {
      qs(`#${inputId}`).classList.toggle('is-invalid', show);
      qs(`#${errorId}`).style.display = show ? 'block' : 'none';
      if (show) isValid = false;
    };

    toggleError('c-name', 'c-error-name', qs('#c-name').value.trim() === '');
    toggleError('c-email', 'c-error-email', !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(qs('#c-email').value.trim()));
    toggleError('c-msg', 'c-error-msg', qs('#c-msg').value.trim() === '');

    if (isValid) {
      qs('#contact-form-wrap').hidden = true;
      qs('#contact-success').hidden = false;
    }
  });
}