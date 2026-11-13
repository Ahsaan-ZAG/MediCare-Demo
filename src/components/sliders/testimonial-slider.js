import Swiper from 'swiper';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { testimonials } from '../../data/testimonials.js';
import { escapeHtml } from '../../utils/dom.js';

import 'swiper/css';
import 'swiper/css/pagination';

export function initTestimonialSlider() {
  const container = document.querySelector('#testimonial-slider');
  if (!container) return;

  container.innerHTML = `
    <div class="swiper-wrapper">
      ${testimonials.map((t) => `
        <div class="swiper-slide">
          <div class="testimonial-card glass">
            <p class="testimonial-card__quote">"${escapeHtml(t.quote)}"</p>
            <div class="testimonial-card__author">
              <span class="testimonial-card__name">${escapeHtml(t.author)}</span>
              <span class="testimonial-card__label">${escapeHtml(t.label)}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
    <div class="swiper-pagination"></div>
  `;

  new Swiper('#testimonial-slider', {
    modules: [Navigation, Pagination, A11y],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 5000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    },
    a11y: { enabled: true }
  });
}