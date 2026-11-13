import { footerNav } from '../config/navigation.config.js';
import { site } from '../config/site.config.js';
import { escapeHtml } from '../utils/dom.js';

export function renderFooter(mount) {
  if (!mount) return;

  const year = new Date().getFullYear();

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__about">
            <a class="brand" href="index.html" aria-label="${site.name} — home">
              <span class="brand__mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3z" fill="#00261d"/>
                </svg>
              </span>
              <span class="brand__text">
                <span class="brand__name">${site.name}</span>
                <span class="brand__sub">Multi-Specialty · Demo</span>
              </span>
            </a>
            <p>${escapeHtml(site.tagline)} A fictional healthcare concept built to demonstrate a premium, accessible, interactive 3D web experience.</p>
          </div>

          ${footerNav
            .map(
              (column) => `
            <div class="footer__col">
              <h2>${escapeHtml(column.title)}</h2>
              <ul>
                ${column.links
                  .map((link) => `<li><a href="${link.href}">${escapeHtml(link.label)}</a></li>`)
                  .join('')}
              </ul>
            </div>`
            )
            .join('')}
        </div>

        <div class="footer__disclaimer">
          <p><strong>Demonstration notice.</strong> ${escapeHtml(site.disclaimer)}</p>
          <p>All doctors, departments, statistics, facilities, testimonials and articles are illustrative sample content. No medical advice is provided and no form submission is stored or transmitted.</p>
        </div>

        <div class="footer__bottom">
          <p>© ${year} ${escapeHtml(site.name)} — fictional demo project. All rights reserved by their respective concept owners.</p>
          <div class="footer__legal">
            <a href="privacy-policy.html">Privacy Policy</a>
            <a href="faq.html">FAQ</a>
            <a href="contact.html">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}