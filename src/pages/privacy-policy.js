import { renderPageHero } from '../components/page-hero.js';
import { qs } from '../utils/dom.js';

export function init() {
  renderPageHero(qs('#page-hero'), {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    lede: 'How this demonstration website handles data (Spoiler: It doesn\'t collect any).'
  });

  qs('#privacy-content').innerHTML = `
    <div class="legal-content glass-panel" data-reveal>
      <h2>1. Introduction</h2>
      <p>MediCare Hospital is a <strong>fictional demonstration project</strong>. It is not a real healthcare provider. This policy explains how this static website interacts with your browser.</p>
      
      <h2>2. No Data Collection</h2>
      <p>This website does not contain a backend database. Every form on this site (Appointment, Contact) is purely front-end. When you click "Submit," the data stays entirely in your browser's memory and is immediately discarded when the page is refreshed or closed. <strong>No personal or medical data is transmitted, stored, or sold.</strong></p>
      
      <h2>3. Cookies and Local Storage</h2>
      <p>We do not use tracking cookies. The only client-side storage used is <code>sessionStorage</code>, which remembers if you clicked "Dismiss" on the top demo banner so it doesn't reappear during the same browsing session.</p>
      
      <h2>4. Third-Party Links</h2>
      <p>This site does not embed real third-party trackers. The fonts are loaded from Google Fonts, which may log basic request data (like IP addresses) according to Google's own privacy policy.</p>

      <h2>5. Contact</h2>
      <p>If you have concerns about this demonstration concept, please reach out via the fictional contact form on the Contact page.</p>
    </div>
  `;
}