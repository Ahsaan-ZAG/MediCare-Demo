import { escapeHtml } from '../../utils/dom.js';

/**
 * Generates a unique abstract cover for the article based on its category.
 */
function articleCover(article) {
  const gradients = {
    'Cardiology': 'linear-gradient(135deg, rgba(0,200,150,0.8), rgba(8,127,91,0.4))',
    'Neurology': 'linear-gradient(135deg, rgba(154,245,213,0.8), rgba(0,200,150,0.4))',
    'Orthopedics': 'linear-gradient(135deg, rgba(8,127,91,0.8), rgba(6,25,24,0.6))',
    'Pediatrics': 'linear-gradient(135deg, rgba(154,245,213,0.6), rgba(8,127,91,0.3))',
    'default': 'linear-gradient(135deg, rgba(0,200,150,0.6), rgba(11,40,37,0.4))'
  };
  const bg = gradients[article.category] || gradients['default'];
  
  return `
    <div class="article-cover" style="background: ${bg}">
      <svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true">
        <path d="M0 48L20 32L40 44L64 20V64H0V48Z" fill="rgba(0,0,0,0.15)"/>
        <circle cx="44" cy="16" r="8" fill="rgba(255,255,255,0.2)"/>
      </svg>
      <span class="article-cover__category">${escapeHtml(article.category)}</span>
    </div>
  `;
}

export function articleCard(article) {
  const date = new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  return `
    <article class="card card--article" data-reveal>
      <a href="blog-details.html?article=${encodeURIComponent(article.slug)}" class="card__link-wrapper" aria-label="Read ${article.title}">
        ${articleCover(article)}
      </a>
      <div class="card__body">
        <div class="card__meta">
          <span>${date}</span>
          <span>${article.readMinutes} min read</span>
        </div>
        <h3 class="card__title">
          <a href="blog-details.html?article=${encodeURIComponent(article.slug)}" class="card__title-link">
            ${escapeHtml(article.title)}
          </a>
        </h3>
        <p class="card__lede">${escapeHtml(article.excerpt)}</p>
      </div>
    </article>
  `;
}