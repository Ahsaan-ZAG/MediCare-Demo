import { site } from '../config/site.config.js';
import { rememberDismissal, persistDismissal, on } from '../utils/dom.js';

const STORAGE_KEY = 'medicare:demo-banner-dismissed';

export function renderDemoBanner(mount) {
  if (!mount) return;
  if (rememberDismissal(STORAGE_KEY)) return;

  mount.innerHTML = `
    <div class="demo-banner" role="status">
      <span><strong>Demo notice:</strong> ${site.demoNotice}</span>
      <button class="demo-banner__close" type="button" aria-label="Dismiss demo notice">
        <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true" focusable="false">
          <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>
        </svg>
      </button>
    </div>
  `;

  const banner = mount.firstElementChild;
  on(banner.querySelector('.demo-banner__close'), 'click', () => {
    persistDismissal(STORAGE_KEY);
    banner.remove();
  });
}