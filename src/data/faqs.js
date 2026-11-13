/**
 * 20 FAQs across 4 categories. Sample content only.
 */
export const faqs = [
  { id: 'f1', category: 'About the site', q: 'Is this a real hospital?', a: 'No. MediCare Hospital is a fictional demonstration project built to showcase a premium healthcare website concept. Nothing on this site describes a real healthcare provider.' },
  { id: 'f2', category: 'About the site', q: 'Do the doctors exist?', a: 'No. All 12 doctors, their qualifications and biographies are illustrative sample content created for this concept.' },
  { id: 'f3', category: 'About the site', q: 'Are the statistics real?', a: 'No. Every statistic on this site is labelled as illustrative demo data and must not be treated as a factual claim.' },
  { id: 'f4', category: 'About the site', q: 'Can I use the code?', a: 'The code is a demonstration project. Consult the ATTRIBUTION.md file for the current status of each component.' },
  { id: 'f5', category: 'About the site', q: 'Why does the site say "demo" everywhere?', a: 'Because honesty matters. Fictional hospitals, doctors and statistics must never be presented as facts, especially in a medical context.' },

  { id: 'f6', category: 'Appointment form', q: 'Does the appointment form actually book anything?', a: 'No. The form is entirely front-end and does not transmit, store or retain any data. It demonstrates a validation and success-state flow only.' },
  { id: 'f7', category: 'Appointment form', q: 'Is my data collected when I fill out the form?', a: 'No. Nothing is sent to a server. Nothing is saved in browser storage. Nothing leaves your device.' },
  { id: 'f8', category: 'Appointment form', q: 'Can I enter real medical information?', a: 'Please do not. The form is a UI demonstration and is not designed or secured for personal or medical data.' },
  { id: 'f9', category: 'Appointment form', q: 'What happens after I submit?', a: 'You see a demo confirmation message, and nothing else. No appointment exists.' },
  { id: 'f10', category: 'Appointment form', q: 'Why is the form so detailed if it does not submit?', a: 'Because showing a realistic, accessible, well-designed form is part of what this concept is designed to demonstrate.' },

  { id: 'f11', category: 'Technology', q: 'What powers the 3D hero?', a: 'Three.js, running entirely in your browser. The scene is procedurally generated from primitives — no external model files are downloaded.' },
  { id: 'f12', category: 'Technology', q: 'Why does the 3D sometimes not appear?', a: 'On devices without WebGL 2 support, or when motion is reduced, a static SVG illustration replaces the live scene. Everything else on the page continues to work.' },
  { id: 'f13', category: 'Technology', q: 'Does the site work on mobile?', a: 'Yes. Layouts, forms and navigation are responsive. On smaller devices the 3D scene is scaled down or replaced with the static fallback.' },
  { id: 'f14', category: 'Technology', q: 'Does the site use cookies?', a: 'No tracking cookies. The demo notice banner uses sessionStorage to remember that you dismissed it, and nothing else.' },
  { id: 'f15', category: 'Technology', q: 'What browsers are supported?', a: 'Any current evergreen browser — Chrome, Edge, Firefox, Safari. Older browsers may see a reduced experience but the content remains accessible.' },

  { id: 'f16', category: 'Accessibility', q: 'Can I navigate the site with a keyboard?', a: 'Yes. Every interactive element is keyboard reachable, and a visible focus indicator is drawn on every focus state.' },
  { id: 'f17', category: 'Accessibility', q: 'Does the site respect reduced motion?', a: 'Yes. When your operating system requests reduced motion, rotation, parallax, counters and reveal animations are disabled.' },
  { id: 'f18', category: 'Accessibility', q: 'Are the illustrations accessible?', a: 'Yes. Every illustration has descriptive alt text, and decorative shapes are marked aria-hidden.' },
  { id: 'f19', category: 'Accessibility', q: 'Is the colour contrast accessible?', a: 'Text colours are chosen to pass AA contrast against their glass surfaces. Colour is never the only way to communicate a state.' },
  { id: 'f20', category: 'Accessibility', q: 'Can I zoom in without breaking the layout?', a: 'Yes. Layouts are built mobile-first and reflow cleanly when zoomed.' }
];

export const faqCategories = [...new Set(faqs.map((f) => f.category))];

export default faqs;