/**
 * Primary navigation.
 * `children` renders as a desktop dropdown.
 * All targets are root-level HTML entry points.
 */
export const primaryNav = [
  { label: 'Home', href: 'index.html' },
  { label: 'About', href: 'about.html' },
  {
    label: 'Departments',
    href: 'departments.html',
    children: [
      { label: 'Cardiology', href: 'departments.html#cardiology' },
      { label: 'Neurology', href: 'departments.html#neurology' },
      { label: 'Orthopedics', href: 'departments.html#orthopedics' },
      { label: 'Pediatrics', href: 'departments.html#pediatrics' },
      { label: 'Gynecology', href: 'departments.html#gynecology' },
      { label: 'Dermatology', href: 'departments.html#dermatology' },
      { label: 'ENT', href: 'departments.html#ent' },
      { label: 'General Medicine', href: 'departments.html#general-medicine' },
      { label: 'Ophthalmology', href: 'departments.html#ophthalmology' },
      { label: 'Urology', href: 'departments.html#urology' },
      { label: 'Psychiatry', href: 'departments.html#psychiatry' },
      { label: 'Dentistry', href: 'departments.html#dentistry' }
    ]
  },
  { label: 'Doctors', href: 'doctors.html' },
  {
    label: 'Explore',
    href: 'services.html',
    children: [
      { label: 'Medical Services', href: 'services.html' },
      { label: 'Facilities', href: 'facilities.html' },
      { label: 'Gallery', href: 'gallery.html' },
      { label: 'Health Articles', href: 'blog.html' },
      { label: 'FAQ', href: 'faq.html' },
      { label: 'Contact', href: 'contact.html' }
    ]
  }
];

export const footerNav = [
  {
    title: 'Hospital',
    links: [
      { label: 'About MediCare', href: 'about.html' },
      { label: 'Departments', href: 'departments.html' },
      { label: 'Our Doctors', href: 'doctors.html' },
      { label: 'Facilities', href: 'facilities.html' }
    ]
  },
  {
    title: 'Patients',
    links: [
      { label: 'Appointment', href: 'appointment.html' },
      { label: 'Medical Services', href: 'services.html' },
      { label: 'Health Articles', href: 'blog.html' },
      { label: 'FAQ', href: 'faq.html' }
    ]
  },
  {
    title: 'More',
    links: [
      { label: 'Gallery', href: 'gallery.html' },
      { label: 'Contact', href: 'contact.html' },
      { label: 'Privacy Policy', href: 'privacy-policy.html' },
      { label: 'Home', href: 'index.html' }
    ]
  }
];