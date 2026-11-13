/**
 * 12 gallery entries. All illustrations are generated procedurally (SVG).
 */
export const gallery = [
  { id: 'g1', title: 'Heart Study', category: 'Organs', glyph: 'heart', accent: '#00C896' },
  { id: 'g2', title: 'Brain Study', category: 'Organs', glyph: 'brain', accent: '#9AF5D5' },
  { id: 'g3', title: 'Lung Study', category: 'Organs', glyph: 'lungs', accent: '#00C896' },
  { id: 'g4', title: 'Skeleton Reference', category: 'Organs', glyph: 'bone', accent: '#9AF5D5' },
  { id: 'g5', title: 'Diagnostic Scanner', category: 'Equipment', glyph: 'scan', accent: '#00C896' },
  { id: 'g6', title: 'Laboratory Flask', category: 'Equipment', glyph: 'flask', accent: '#9AF5D5' },
  { id: 'g7', title: 'Surgical Instrument', category: 'Equipment', glyph: 'scalpel', accent: '#00C896' },
  { id: 'g8', title: 'Emergency Cross', category: 'Facilities', glyph: 'cross', accent: '#9AF5D5' },
  { id: 'g9', title: 'Patient Room', category: 'Facilities', glyph: 'bed', accent: '#00C896' },
  { id: 'g10', title: 'Dental Reference', category: 'Organs', glyph: 'tooth', accent: '#9AF5D5' },
  { id: 'g11', title: 'Vision Study', category: 'Organs', glyph: 'eye', accent: '#00C896' },
  { id: 'g12', title: 'Pharmacy Study', category: 'Equipment', glyph: 'pill', accent: '#9AF5D5' }
];

export const galleryCategories = [...new Set(gallery.map((item) => item.category))];

export default gallery;