import { gsap } from '../animations/gsap-init.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initHeroScene } from '../three/scenes/hero-scene.js';
import { qs, qsa, prefersReducedMotion } from '../utils/dom.js';
import { site } from '../config/site.config.js';
import { departments } from '../data/departments.js';
import { doctors } from '../data/doctors.js';
import { services } from '../data/services.js';
import { departmentCard } from '../components/cards/department-card.js';
import { doctorCard } from '../components/cards/doctor-card.js';
import { serviceCard } from '../components/cards/service-card.js';
import { initIllustrationHover } from '../animations/illustration-hover.js';
import { facilities } from '../data/facilities.js';
import { articles } from '../data/articles.js';
import { faqs } from '../data/faqs.js';
import { facilityIllustration } from '../utils/illustrations.js';
import { articleCard } from '../components/cards/article-card.js';
import { initTestimonialSlider } from '../components/sliders/testimonial-slider.js';
import { initAccordions } from '../components/accordion.js';
import { escapeHtml } from '../utils/dom.js';

/* ------------------------------------------------------------------ hero */
function playHeroReveal() {
    const hero = qs('.hero');
    if (!hero) return;

    hero.classList.add('is-ready');

    if (prefersReducedMotion()) {
        gsap.set(
            ['.hero__badge', '.hero__title', '.hero__lede', '.hero__actions', '.hero__trust'],
            { opacity: 1, y: 0 }
        );
        return;
    }

    /* Reset starting states explicitly so nothing flashes. */
    gsap.set(['.hero__badge', '.hero__title', '.hero__lede'], { opacity: 0 });
    gsap.set('.hero__actions > *', { opacity: 0 });
    gsap.set('.hero__trust li', { opacity: 0 });
    gsap.set('.stage', { opacity: 0 });
    gsap.set('.stage-card', { opacity: 0 });

    const timeline = gsap.timeline({
        defaults: { ease: 'power3.out', force3D: true }
    });

    timeline
        .fromTo('.hero__badge',
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.75 }
        )
        .fromTo('.hero__title',
            { opacity: 0, y: 34 },
            { opacity: 1, y: 0, duration: 1.15 },
            '-=0.45'
        )
        .fromTo('.hero__lede',
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.95 },
            '-=0.75'
        )
        .fromTo('.hero__actions > *',
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.14 },
            '-=0.6'
        )
        .fromTo('.hero__trust li',
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.1 },
            '-=0.45'
        )
        .fromTo('.stage',
            { opacity: 0, scale: 0.92, y: 12 },
            { opacity: 1, scale: 1, y: 0, duration: 1.25 },
            0.15
        )
        .fromTo('.stage-card',
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.16 },
            0.85
        );
}

/* -------------------------------------------------------------- counters */
function initCounters() {
    const values = qsa('[data-count]');
    if (!values.length) return;
    const reduce = prefersReducedMotion();

    const animate = (element) => {
        const end = Number(element.dataset.count) || 0;
        const suffix = element.dataset.suffix || '';
        if (reduce) {
            element.textContent = `${end}${suffix}`;
            return;
        }
        const state = { value: 0 };
        gsap.to(state, {
            value: end,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => { element.textContent = `${Math.round(state.value)}${suffix}`; }
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animate(entry.target);
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.4 }
    );
    values.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------- hydrate */
function hydrateStats() {
    const panel = qs('#stats-panel');
    if (!panel) return;
    panel.innerHTML = site.stats
        .map(
            (stat) => `
      <div class="stat">
        <span class="stat__value" data-count="${stat.value}" data-suffix="${stat.suffix}">0${stat.suffix}</span>
        <span class="stat__label">${stat.label}</span>
        <span class="stat__note">${stat.note}</span>
      </div>`
        )
        .join('');
}

function hydrateCardGrids() {
    const dep = qs('#grid-departments');
    if (dep) dep.innerHTML = departments.slice(0, 6).map(departmentCard).join('');

    const doc = qs('#grid-doctors');
    if (doc) doc.innerHTML = doctors.slice(0, 4).map(doctorCard).join('');

    const svc = qs('#grid-services');
    if (svc) svc.innerHTML = services.slice(0, 6).map(serviceCard).join('');
    const facGrid = qs('#grid-facilities');
    if (facGrid) {
        facGrid.innerHTML = facilities.slice(0, 4).map((fac) => `
      <article class="card card--facility" data-reveal>
        <div class="card__art">
          ${facilityIllustration(fac)}
        </div>
        <div class="card__body">
          <h3 class="card__title">${escapeHtml(fac.name)}</h3>
          <p class="card__lede">${escapeHtml(fac.caption)}</p>
        </div>
      </article>
    `).join('');
    }

    const artGrid = qs('#grid-articles');
    if (artGrid) {
        artGrid.innerHTML = articles.slice(0, 3).map(articleCard).join('');
    }

    const faqAcc = qs('#faq-accordion');
    if (faqAcc) {
        // Show first 4 questions
        faqAcc.innerHTML = faqs.slice(0, 4).map((faq) => `
      <div class="accordion__item">
        <button class="accordion__trigger" aria-expanded="false">
          <span>${escapeHtml(faq.q)}</span>
          <svg class="accordion__icon" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="accordion__panel" data-open="false">
          <div class="accordion__content">${escapeHtml(faq.a)}</div>
        </div>
      </div>
    `).join('');
    }
}

/* -------------------------------------------------- scroll reveals (batch) */
function initScrollReveals() {
    const targets = qsa('[data-reveal]');
    if (!targets.length) return;

    if (prefersReducedMotion()) {
        targets.forEach((el) => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    /* Establish initial state — GSAP owns this, not CSS, so a JS failure
       leaves content fully visible. */
    gsap.set(targets, { opacity: 0, y: 32, force3D: true });

    /* ScrollTrigger.batch handles viewport-entry staggering elegantly: only
       the elements that enter together are staggered, so above-the-fold content
       doesn't fire all at once with off-screen content. */
    ScrollTrigger.batch(targets, {
        start: 'top 88%',
        once: true,
        interval: 0.12,
        batchMax: 4,
        onEnter: (batch) =>
            gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: 'power3.out',
                force3D: true,
                overwrite: true
            })
    });

    /* Section heads get a slightly softer, faster reveal. */
    const heads = qsa('.section-head[data-reveal]');
    if (heads.length) {
        gsap.set(heads, { opacity: 0, y: 24, force3D: true });
        ScrollTrigger.batch(heads, {
            start: 'top 85%',
            once: true,
            onEnter: (batch) =>
                gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: 0.85,
                    stagger: 0.08,
                    ease: 'power2.out',
                    overwrite: true
                })
        });
    }
}

/* ---------------------------------------------------------------- scene */
function bootHeroScene() {
    const canvas = qs('#hero-canvas');
    const fallback = qs('#hero-fallback');
    if (!canvas) return;

    const scene = initHeroScene(canvas);

    if (!scene) {
        canvas.remove();
        if (fallback) {
            fallback.hidden = false;
            const status = qs('.stage-status');
            if (status) status.textContent = 'Static illustration · 3D unavailable';
        }
        return;
    }

    if (fallback) fallback.hidden = true;
    const status = qs('.stage-status');
    if (status) status.textContent = 'Live 3D · move your pointer';

    window.addEventListener('pagehide', () => scene.dispose(), { once: true });
}

/* ------------------------------------------------------------------ entry */
export function init() {
  document.documentElement.classList.add('js');

  hydrateStats();
  hydrateCardGrids();
  initCounters();
  bootHeroScene();

  const startVisuals = () => {
    playHeroReveal();
    initScrollReveals();
    initIllustrationHover();
    
    // Interactive components load karein
    initTestimonialSlider();
    initAccordions();

    // Swiper load hone ke baad ScrollTrigger ko refresh karein
    // taake scroll height sahi calculate ho aur koi jump na aaye.
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  if (document.documentElement.dataset.preloader === 'done') {
    startVisuals();
  } else {
    window.addEventListener('preloader:done', startVisuals, { once: true });
  }
}