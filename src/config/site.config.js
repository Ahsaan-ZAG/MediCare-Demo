/**
 * MediCare Hospital — global site configuration.
 * This project is a FICTIONAL demonstration. Nothing here describes a real
 * healthcare provider, real clinicians, or real medical outcomes.
 */
export const site = {
  name: 'MediCare Hospital',
  shortName: 'MediCare',
  tagline: 'Your Health, Our Priority.',
  description:
    'MediCare Hospital is a fictional multi-specialty healthcare website concept built as a premium 3D glassmorphism front-end demonstration.',
  baseUrl: 'https://medicare-hospital-demo.example.com',
  locale: 'en',
  themeColor: '#061918',

  demoNotice:
    'Demonstration website — all doctors, departments, statistics and facilities are fictional sample content. No appointment is booked, stored or transmitted.',

  contact: {
    phoneLabel: '+00 (000) 000-0000',
    emailLabel: 'hello@medicare-demo.example',
    addressLabel: '12 Meridian Health Avenue, Demo District, Fictional City',
    hoursLabel: 'Mon – Sat · 08:00 – 20:00 (illustrative)'
  },

  /** Illustrative demo statistics. Never presented as verified facts. */
  stats: [
    { value: 42, suffix: '+', label: 'Specialist departments & units', note: 'Sample data' },
    { value: 180, suffix: '+', label: 'Illustrative clinical staff', note: 'Sample data' },
    { value: 24, suffix: '/7', label: 'Conceptual emergency intake', note: 'Sample data' },
    { value: 98, suffix: '%', label: 'Demo patient satisfaction score', note: 'Sample data' }
  ],

  disclaimer:
    'This is a fictional demonstration project. It is not affiliated with any real hospital, clinic or healthcare provider and must not be used for medical decisions.'
};

export default site;