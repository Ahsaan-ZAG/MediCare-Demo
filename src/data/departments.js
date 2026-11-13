/**
 * 12 fictional departments.
 * Fictional demo content — see site.config.js disclaimer.
 * Illustrations, summaries and detail content are added in Phase 3.
 */
export const departments = [
  { id: 'cardiology', name: 'Cardiology', slug: 'cardiology', tagline: 'Heart & vascular care' },
  { id: 'neurology', name: 'Neurology', slug: 'neurology', tagline: 'Brain, spine & nerves' },
  { id: 'orthopedics', name: 'Orthopedics', slug: 'orthopedics', tagline: 'Bones, joints & mobility' },
  { id: 'pediatrics', name: 'Pediatrics', slug: 'pediatrics', tagline: 'Child & adolescent health' },
  { id: 'gynecology', name: 'Gynecology', slug: 'gynecology', tagline: "Women's health" },
  { id: 'dermatology', name: 'Dermatology', slug: 'dermatology', tagline: 'Skin, hair & nails' },
  { id: 'ent', name: 'ENT', slug: 'ent', tagline: 'Ear, nose & throat' },
  { id: 'general-medicine', name: 'General Medicine', slug: 'general-medicine', tagline: 'Everyday internal care' },
  { id: 'ophthalmology', name: 'Ophthalmology', slug: 'ophthalmology', tagline: 'Vision & eye health' },
  { id: 'urology', name: 'Urology', slug: 'urology', tagline: 'Urinary & renal care' },
  { id: 'psychiatry', name: 'Psychiatry', slug: 'psychiatry', tagline: 'Mental wellbeing' },
  { id: 'dentistry', name: 'Dentistry', slug: 'dentistry', tagline: 'Oral & dental health' }
];

export const getDepartmentById = (id) => departments.find((d) => d.id === id) ?? null;

export default departments;