import { qsa, on } from '../utils/dom.js';

export function initAccordions() {
  const accordions = qsa('.accordion');
  
  accordions.forEach((acc) => {
    const triggers = qsa('.accordion__trigger', acc);
    
    triggers.forEach((trigger) => {
      on(trigger, 'click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        
        // Optional: Close others in the same accordion (accordion behavior)
        // triggers.forEach(t => {
        //   t.setAttribute('aria-expanded', 'false');
        //   t.nextElementSibling.setAttribute('data-open', 'false');
        // });

        trigger.setAttribute('aria-expanded', !isExpanded);
        const panel = trigger.nextElementSibling;
        panel.setAttribute('data-open', !isExpanded);
      });
    });
  });
}