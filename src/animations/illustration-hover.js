import { gsap } from './gsap-init.js';

/**
 * Adds a gentle floating/rotating animation to card illustrations on hover.
 * The animation completes its cycle even if the user moves the mouse away.
 */
export function initIllustrationHover() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach((card) => {
    const svg = card.querySelector('.illus');
    if (!svg) return;

    let isAnimating = false;

    card.addEventListener('mouseenter', () => {
      // Agar pehle se animation chal rahi hai, to nayi trigger na karein
      if (isAnimating) return;
      isAnimating = true;

      // Ek smooth "float" animation jo apna cycle khud complete karegi
      gsap.to(svg, {
        keyframes: [
          { y: -10, rotation: 4, scale: 1.06, duration: 0.5, ease: 'sine.out' },
          { y: 10, rotation: -4, scale: 1.06, duration: 0.5, ease: 'sine.inOut' },
          { y: -5, rotation: 2, scale: 1.03, duration: 0.5, ease: 'sine.inOut' },
          { y: 0, rotation: 0, scale: 1, duration: 0.5, ease: 'sine.in' }
        ],
        onComplete: () => {
          isAnimating = false; // Cycle mukammal, ab nayi trigger ho sakti hai
        }
      });
    });
  });
}