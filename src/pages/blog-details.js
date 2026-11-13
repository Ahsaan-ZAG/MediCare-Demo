import { getArticleBySlug, articles } from '../data/articles.js';
import { articleCard } from '../components/cards/article-card.js';
import { escapeHtml, qs } from '../utils/dom.js';

export function init() {
  const root = qs('#article-root');
  if (!root) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('article');
  const article = getArticleBySlug(slug);

  if (!article) {
    root.innerHTML = `<div class="empty-state"><h1>Article Not Found</h1><a href="blog.html" class="btn btn--primary" style="margin-top:1rem;">Back to Blog</a></div>`;
    return;
  }

  const date = new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  // Related articles (same category, exclude current)
  const related = articles.filter(a => a.category === article.category && a.slug !== article.slug).slice(0, 2);

  root.innerHTML = `
    <div class="article-header" data-reveal>
      <span class="eyebrow">${escapeHtml(article.category)}</span>
      <h1 class="article-title">${escapeHtml(article.title)}</h1>
      <div class="article-meta">
        <span>By ${escapeHtml(article.author)}</span>
        <span>•</span>
        <span>${date}</span>
        <span>•</span>
        <span>${article.readMinutes} min read</span>
      </div>
    </div>

    <div class="article-content glass-panel" data-reveal>
      <p class="article-lead">${escapeHtml(article.excerpt)}</p>
      <div class="article-body">
        <p>${escapeHtml(article.body)}</p>
        <!-- Demo content placeholder for structure -->
        <h2>Understanding the Context</h2>
        <p>This is a fictional demonstration article. The content is designed to show how text, headings, and paragraphs flow within the premium glassmorphism UI. It is not medical advice.</p>
        <ul>
          <li>Always consult a qualified professional for health concerns.</li>
          <li>Do not use this demonstration site for diagnosis.</li>
          <li>Information provided here is illustrative.</li>
        </ul>
      </div>
    </div>

    ${related.length > 0 ? `
      <div class="related-articles section" data-reveal>
        <h2 class="related-title">Related Articles</h2>
        <div class="grid grid--articles">
          ${related.map(articleCard).join('')}
        </div>
      </div>
    ` : ''}
  `;
}