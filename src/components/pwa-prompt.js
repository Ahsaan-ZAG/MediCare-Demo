import { qs } from '../utils/dom.js';

let deferredPrompt = null;

export function initPwaPrompt() {
  // Agar user pehle hi dismiss kar chuka hai (session mein), to wapis na dikhayein
  if (sessionStorage.getItem('pwa-dismissed') === 'true') return;

  const promptContainer = document.createElement('div');
  promptContainer.id = 'pwa-prompt';
  promptContainer.className = 'pwa-prompt glass-strong';
  promptContainer.innerHTML = `
    <button class="pwa-prompt__close" id="pwa-close-btn" aria-label="Dismiss install prompt">
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/>
      </svg>
    </button>
    
    <div class="pwa-prompt__icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    
    <div class="pwa-prompt__content">
      <h4 class="pwa-prompt__title">Install MediCare App</h4>
      <p class="pwa-prompt__text">Experience this demonstration completely offline. Add it to your device for instant access.</p>
    </div>
    
    <div class="pwa-prompt__actions">
      <button class="btn btn--primary" id="pwa-install-btn">Install App</button>
    </div>
  `;
  document.body.appendChild(promptContainer);

  const installBtn = qs('#pwa-install-btn');
  const closeBtn = qs('#pwa-close-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Preloader ke khatam hone ke baad prompt dikhayein
    setTimeout(() => {
      promptContainer.classList.add('is-visible');
    }, 2500);
  });

  installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    deferredPrompt = null;
    promptContainer.classList.remove('is-visible');
  });

  const dismissPrompt = () => {
    promptContainer.classList.remove('is-visible');
    sessionStorage.setItem('pwa-dismissed', 'true'); // Session ke liye yaad rakhein
  };

  closeBtn.addEventListener('click', dismissPrompt);

  window.addEventListener('appinstalled', () => {
    promptContainer.classList.remove('is-visible');
    deferredPrompt = null;
    sessionStorage.setItem('pwa-dismissed', 'true');
  });
}