import { qs } from '../utils/dom.js';
import { departmentIllustration } from '../utils/illustrations.js';

export function init() {
  const root = qs('#error-root');
  if (!root) return;

  // Use a broken-heart illustration for the 404 page
  const errorArt = departmentIllustration({ 
    id: 'cardiology', 
    name: 'MediCare', 
    slug: '404', 
    accent: '#ff6b6b' 
  });

  root.innerHTML = `
    <div class="error-page">
      <div class="error-page__art">
        ${errorArt}
      </div>
      <h1 class="error-page__code">404</h1>
      <h2 class="error-page__title">Page Not Found</h2>
      <p class="error-page__text">The page you are looking for might have been removed or is temporarily unavailable in this demo.</p>
      <a href="index.html" class="btn btn--primary" style="margin-top: 2rem;">Return to Homepage</a>
    </div>
  `;
}