import { renderDemoBanner } from './components/demo-banner.js';
import { renderNavbar, initNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderPreloader, initPreloader } from './components/preloader.js';
import { renderBackToTop, initBackToTop } from './components/back-to-top.js';
import { qs } from './utils/dom.js';

const pageModules = {
  home: () => import('./pages/home.js'),
  about: () => import('./pages/about.js'),
  departments: () => import('./pages/departments.js'),
  doctors: () => import('./pages/doctors.js'),
  'doctor-details': () => import('./pages/doctor-details.js'),
  services: () => import('./pages/services.js'),
  facilities: () => import('./pages/facilities.js'),
  appointment: () => import('./pages/appointment.js'),
  blog: () => import('./pages/blog.js'),
  'blog-details': () => import('./pages/blog-details.js'),
  gallery: () => import('./pages/gallery.js'),
  
  // Yahan 'contact' ke samne 'contact.js' hona chahiye
  contact: () => import('./pages/contact.js'), 
  
  faq: () => import('./pages/faq.js'),
  'privacy-policy': () => import('./pages/privacy-policy.js'),
  'not-found': () => import('./pages/not-found.js')
};

import { renderDemoBanner } from './components/demo-banner.js';
import { renderNavbar, initNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderPreloader, initPreloader } from './components/preloader.js';
import { renderBackToTop, initBackToTop } from './components/back-to-top.js';
import { initPwaPrompt } from './components/pwa-prompt.js'; // <--- Naya Import
import { qs } from './utils/dom.js';

// ... pageModules same rahenge ...

function mountSharedChrome() {
  const bannerMount = qs('#demo-banner');
  const headerMount = qs('#site-header');
  const footerMount = qs('#site-footer');
  const utilityMount = qs('#site-utilities');
  const preloaderMount = qs('#site-preloader');

  renderPreloader(preloaderMount);
  renderDemoBanner(bannerMount);
  renderNavbar(headerMount);
  initNavbar(headerMount);
  renderFooter(footerMount);
  renderBackToTop(utilityMount);
  initBackToTop(utilityMount);
  initPreloader();
  
  // Yahan PWA Prompt initialize karein
  initPwaPrompt(); 
}
// ... baqi code same rahega ...

function markActiveNav() {
  const file = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === file) link.setAttribute('aria-current', 'page');
  });
}

async function bootPage() {
  const page = document.body.dataset.page;
  if (!page || !pageModules[page]) return;

  try {
    const module = await pageModules[page]();
    module.init?.();
  } catch (error) {
    console.error(`[MediCare] Failed to initialise page "${page}"`, error);
  }
}

export function initApp() {
  mountSharedChrome();
  markActiveNav();
  bootPage();
}

export default initApp;