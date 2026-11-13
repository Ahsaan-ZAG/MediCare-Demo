import { primaryNav } from '../config/navigation.config.js';
import { site } from '../config/site.config.js';
import { qs, qsa, on, escapeHtml } from '../utils/dom.js';

const currentPage = () => {
    const file = window.location.pathname.split('/').pop() || 'index.html';
    return file === '' ? 'index.html' : file;
};

const chevron = `
  <svg class="nav-link__chevron" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
    <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

function buildDesktopItem(item) {
    const isActive = currentPage() === item.href;

    if (!item.children) {
        return `
      <li class="nav-item">
        <a class="nav-link" href="${item.href}"${isActive ? ' aria-current="page"' : ''}>${escapeHtml(item.label)}</a>
      </li>`;
    }

    const children = item.children
        .map((child) => `<a href="${child.href}">${escapeHtml(child.label)}</a>`)
        .join('');

    return `
    <li class="nav-item" data-dropdown>
      <a class="nav-link" href="${item.href}"${isActive ? ' aria-current="page"' : ''}
         aria-haspopup="true" aria-expanded="false">
        ${escapeHtml(item.label)}${chevron}
      </a>
      <div class="nav-dropdown glass-strong">
        <div class="nav-dropdown__grid">${children}</div>
      </div>
    </li>`;
}

export function renderNavbar(mount) {
    if (!mount) return;

    mount.innerHTML = `
    <div class="container">
      <nav class="navbar" aria-label="Primary">
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

        <ul class="nav-list">
          ${primaryNav.map(buildDesktopItem).join('')}
        </ul>

        <div class="nav-actions">
          <a class="btn btn--primary btn--sm" href="appointment.html">
            Book a Demo Visit
            <svg class="btn__arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              <path d="M3 8h9M8.5 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
            <span class="nav-toggle__bars" aria-hidden="true"><span></span><span></span><span></span></span>
          </button>
        </div>
      </nav>
    </div>

    <!-- Mobile Menu Drawer -->
    <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
      ${primaryNav
            .map((item) => `<a href="${item.href}">${escapeHtml(item.label)} ${chevron}</a>`)
            .join('')}
      <a class="btn btn--primary" href="appointment.html">Book a Demo Visit</a>
    </div>
  `;
}

export function initNavbar(mount) {
    if (!mount) return;

    const header = mount.closest('.site-header') || mount;
    const toggle = qs('.nav-toggle', mount);
    const mobileNav = qs('#mobile-nav', mount);

    /* ---- Scroll State ---- */
    let ticking = false;
    const applyScrollState = () => {
        const scrolled = window.scrollY > 18;
        header.classList.toggle('is-scrolled', scrolled);
        ticking = false;
    };
    on(window, 'scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(applyScrollState);
    }, { passive: true });
    applyScrollState();

    /* ---- Mobile Drawer Logic ---- */
    const setDrawer = (open) => {
        mobileNav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        mobileNav.setAttribute('aria-hidden', String(!open));

        // Lock body scroll when menu is open
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    on(toggle, 'click', () => setDrawer(!mobileNav.classList.contains('is-open')));

    // Close menu when clicking a link
    on(mobileNav, 'click', (event) => {
        if (event.target.closest('a')) setDrawer(false);
    });

    // Close menu on Escape key
    on(document, 'keydown', (event) => {
        if (event.key === 'Escape' && mobileNav.classList.contains('is-open')) {
            setDrawer(false);
            toggle.focus();
        }
    });

    // Reset menu if screen is resized to desktop
    on(window, 'resize', () => {
        if (window.innerWidth > 900 && mobileNav.classList.contains('is-open')) {
            setDrawer(false);
        }
    });

    /* ---- Desktop Dropdown Keyboard Support ---- */
    qsa('[data-dropdown]', mount).forEach((item) => {
        const trigger = qs('.nav-link', item);
        if (!trigger) return;

        on(trigger, 'keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
                if (window.innerWidth <= 900) return;
                event.preventDefault();
                item.classList.add('is-open');
                trigger.setAttribute('aria-expanded', 'true');
                const firstLink = qs('.nav-dropdown a', item);
                firstLink?.focus();
            }
        });

        on(item, 'keydown', (event) => {
            if (event.key === 'Escape') {
                item.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.focus();
            }
        });

        on(item, 'focusout', (event) => {
            if (!item.contains(event.relatedTarget)) {
                item.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
            }
        });
    });
}