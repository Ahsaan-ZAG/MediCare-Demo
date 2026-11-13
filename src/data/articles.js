/**
 * 12 educational health-awareness articles.
 * Content is general, cautious and clearly non-diagnostic.
 */
export const articles = [
  {
    id: 'heart-healthy-habits',
    slug: 'heart-healthy-habits',
    title: 'Everyday habits that support heart health',
    category: 'Cardiology',
    date: '2025-09-12',
    readMinutes: 5,
    author: 'MediCare Editorial (demo)',
    excerpt: 'A gentle look at movement, rest and diet patterns commonly associated with cardiovascular wellbeing — educational, not a prescription.',
    body: 'This article is illustrative. It is not medical advice. Common habits that people adopt to support heart health include regular movement, reducing prolonged sitting, prioritising sleep, and choosing a varied diet. Anyone considering change should consult a qualified clinician in their area.'
  },
  {
    id: 'understanding-sleep',
    slug: 'understanding-sleep',
    title: 'Understanding sleep and why it matters',
    category: 'General Medicine',
    date: '2025-09-03',
    readMinutes: 6,
    author: 'MediCare Editorial (demo)',
    excerpt: 'Why rest is part of health, and how everyday routines can shape sleep quality.',
    body: 'Illustrative educational content only. Sleep is a complex, individual pattern. This article summarises widely known information about sleep hygiene and must not be used as guidance for any medical decision.'
  },
  {
    id: 'hydration-basics',
    slug: 'hydration-basics',
    title: 'Hydration basics for everyday wellbeing',
    category: 'General Medicine',
    date: '2025-08-27',
    readMinutes: 4,
    author: 'MediCare Editorial (demo)',
    excerpt: 'Simple, general awareness about water and the body.',
    body: 'Educational illustration only. Individual fluid needs vary. This page is not medical advice.'
  },
  {
    id: 'childhood-vaccination-awareness',
    slug: 'childhood-vaccination-awareness',
    title: 'Childhood vaccination — a general awareness overview',
    category: 'Pediatrics',
    date: '2025-08-19',
    readMinutes: 5,
    author: 'MediCare Editorial (demo)',
    excerpt: 'An educational summary of why vaccination schedules exist. Not clinical guidance.',
    body: 'Illustrative content. Any decision about childhood vaccination belongs to the family and their qualified pediatric clinician. This article cannot substitute for that relationship.'
  },
  {
    id: 'mindful-movement',
    slug: 'mindful-movement',
    title: 'Mindful movement for everyday mental wellbeing',
    category: 'Psychiatry',
    date: '2025-08-11',
    readMinutes: 4,
    author: 'MediCare Editorial (demo)',
    excerpt: 'A general reflection on how gentle movement relates to mood and attention.',
    body: 'Educational content only. Mental health is individual. If you are concerned about your mental health, please reach out to a qualified professional where you live.'
  },
  {
    id: 'eye-care-basics',
    slug: 'eye-care-basics',
    title: 'Everyday eye care awareness',
    category: 'Ophthalmology',
    date: '2025-08-02',
    readMinutes: 3,
    author: 'MediCare Editorial (demo)',
    excerpt: 'General awareness about screen time, lighting and eye comfort.',
    body: 'Illustrative, non-diagnostic content. Vision changes and eye discomfort should always be reviewed by a qualified professional.'
  },
  {
    id: 'skin-awareness',
    slug: 'skin-awareness',
    title: 'Skin awareness: noticing change without alarm',
    category: 'Dermatology',
    date: '2025-07-25',
    readMinutes: 4,
    author: 'MediCare Editorial (demo)',
    excerpt: 'Why monitoring your skin over time is a general health habit.',
    body: 'Educational illustration only. Changes in the skin or moles should be reviewed by a qualified dermatologist. This article provides no diagnostic guidance.'
  },
  {
    id: 'bone-health',
    slug: 'bone-health',
    title: 'Bone health across life stages',
    category: 'Orthopedics',
    date: '2025-07-16',
    readMinutes: 5,
    author: 'MediCare Editorial (demo)',
    excerpt: 'A gentle overview of how movement and diet contribute to bone strength.',
    body: 'Illustrative educational content. For personalised guidance, consult a qualified clinician.'
  },
  {
    id: 'womens-health-overview',
    slug: 'womens-health-overview',
    title: "Women's health — a general awareness overview",
    category: 'Gynecology',
    date: '2025-07-05',
    readMinutes: 5,
    author: 'MediCare Editorial (demo)',
    excerpt: 'Educational, cautious content around routine health awareness.',
    body: 'Illustrative content only. This is not medical guidance.'
  },
  {
    id: 'oral-hygiene-basics',
    slug: 'oral-hygiene-basics',
    title: 'Oral hygiene basics and why they matter',
    category: 'Dentistry',
    date: '2025-06-27',
    readMinutes: 3,
    author: 'MediCare Editorial (demo)',
    excerpt: 'General awareness about everyday dental care.',
    body: 'Educational illustration only. Dental concerns should be reviewed by a qualified dentist.'
  },
  {
    id: 'ear-care-awareness',
    slug: 'ear-care-awareness',
    title: 'Ear care awareness for everyday life',
    category: 'ENT',
    date: '2025-06-15',
    readMinutes: 3,
    author: 'MediCare Editorial (demo)',
    excerpt: 'General information around noise and ear comfort.',
    body: 'Illustrative, non-diagnostic. Hearing or ear discomfort should always be reviewed by a qualified clinician.'
  },
  {
    id: 'preventive-screening-overview',
    slug: 'preventive-screening-overview',
    title: 'A general look at preventive screening',
    category: 'General Medicine',
    date: '2025-06-02',
    readMinutes: 6,
    author: 'MediCare Editorial (demo)',
    excerpt: 'How routine check-ups generally fit into a health-aware lifestyle. Not a prescription.',
    body: 'Educational illustration only. Screening schedules vary and should always be discussed with a qualified clinician.'
  }
];

export const getArticleBySlug = (slug) =>
  articles.find((a) => a.slug === slug) ?? null;

export const articleCategories = [...new Set(articles.map((a) => a.category))];

export default articles;