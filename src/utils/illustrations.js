/**
 * Genuinely distinct SVG illustrations.
 *
 * Composition strategy — each category has its OWN visual language so cards
 * never look interchangeable:
 *
 *   • Department glyphs  → organic/medical, single subject, glass disc frame
 *   • Service glyphs     → isometric or object-flat, no disc, angled light
 *   • Facility glyphs    → architectural/room-context, corner-bracket frame
 *   • Doctor portraits   → initials card with department colour
 *
 * Every illustration is hand-authored SVG. No icon library, no downloads,
 * no emoji, no template swapping.
 */

/* ---------------------------------------------------------- utilities */
const hash = (str) => {
    let h = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(36);
};

const hexRgb = (hex) => {
    const n = parseInt(hex.replace('#', ''), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

/* -------------------------------------------------- shared SVG wrappers */

/** Common <defs>: per-instance gradients + glow + speculars. */
function defs(id, accent) {
    return `
  <defs>
    <linearGradient id="g-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#9AF5D5"/>
      <stop offset="50%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="#087F5B"/>
    </linearGradient>
    <linearGradient id="g2-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#087F5B" stop-opacity="0.6"/>
    </linearGradient>
    <radialGradient id="gl-${id}" cx="32%" cy="28%" r="72%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.5"/>
      <stop offset="60%" stop-color="${accent}" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sp-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F4FFFB" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#F4FFFB" stop-opacity="0"/>
    </linearGradient>
    <filter id="bl-${id}" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="1.4"/>
    </filter>
  </defs>`;
}

/** Shared backdrop: glass disc + rings. Used by departments only. */
function discBackdrop(id, accent) {
    return `
  <circle cx="32" cy="32" r="30" fill="#0B2825" opacity="0.94"/>
  <circle cx="32" cy="32" r="30" fill="url(#gl-${id})"/>
  <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="0.5"/>
  <circle cx="32" cy="32" r="26" fill="none" stroke="${accent}" stroke-opacity="0.16" stroke-width="0.4" stroke-dasharray="1.2 3"/>`;
}

/** Corner brackets — used by facilities. */
function bracketFrame(id, accent) {
    return `
  <rect x="2" y="2" width="60" height="60" rx="10" fill="#08221f" opacity="0.94"/>
  <rect x="2" y="2" width="60" height="60" rx="10" fill="url(#gl-${id})" opacity="0.7"/>
  <path d="M8 14V8H14" stroke="${accent}" stroke-width="0.8" stroke-opacity="0.7" fill="none"/>
  <path d="M50 8H56V14" stroke="${accent}" stroke-width="0.8" stroke-opacity="0.7" fill="none"/>
  <path d="M8 50V56H14" stroke="${accent}" stroke-width="0.8" stroke-opacity="0.7" fill="none"/>
  <path d="M50 56H56V50" stroke="${accent}" stroke-width="0.8" stroke-opacity="0.7" fill="none"/>`;
}

/* ============================================================ DEPARTMENT
   Each is a distinct organic/medical composition. Same disc frame,
   but the subject inside is fundamentally different per department. */

const DEPT_ART = {
    cardiology: (id) => `
    <!-- Anatomical heart with chambers and aorta -->
    <ellipse cx="22" cy="28" rx="6" ry="8" fill="url(#sp-${id})" opacity="0.5"/>
    <path d="M22 20C15 20 12 26 12 32C12 42 22 50 32 54C42 50 52 42 52 32C52 26 49 20 42 20C38 20 35 22 32 25C29 22 26 20 22 20Z"
          fill="url(#g-${id})" stroke="rgba(255,255,255,0.35)" stroke-width="0.5"/>
    <!-- Aorta arch -->
    <path d="M28 24C28 16 24 10 18 8" stroke="#9AF5D5" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <path d="M36 24C36 16 40 10 46 8" stroke="#9AF5D5" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    <circle cx="18" cy="8" r="1.5" fill="#9AF5D5"/>
    <circle cx="46" cy="8" r="1.5" fill="#9AF5D5"/>
    <!-- Chamber shadows -->
    <path d="M22 34C20 38 22 42 26 44" stroke="#087F5B" stroke-width="0.7" fill="none" opacity="0.6"/>
    <path d="M42 34C44 38 42 42 38 44" stroke="#087F5B" stroke-width="0.7" fill="none" opacity="0.6"/>
  `,

    neurology: (id) => `
    <!-- Folded brain with gyri -->
    <ellipse cx="20" cy="26" rx="5" ry="6" fill="url(#sp-${id})" opacity="0.4"/>
    <path d="M22 18C14 18 12 26 15 30C11 32 11 40 17 42C17 48 26 50 30 46C32 50 40 48 42 44C48 44 50 36 46 32C50 28 48 20 42 18C40 14 30 14 28 18C26 15 24 17 22 18Z"
          fill="url(#g-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <!-- Gyri folds -->
    <path d="M20 24C24 26 26 24 28 22M20 32C24 34 28 32 30 30M34 24C38 26 42 26 44 24M34 32C38 34 42 32 44 30M24 40C28 40 30 42 34 40"
          stroke="#087F5B" stroke-width="0.9" fill="none" stroke-linecap="round" opacity="0.7"/>
    <!-- Brainstem -->
    <path d="M32 46V52" stroke="#9AF5D5" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="32" cy="52" r="1.2" fill="#9AF5D5"/>
  `,

    orthopedics: (id) => `
    <!-- Femur bone with condyles -->
    <ellipse cx="20" cy="20" rx="4" ry="3" fill="url(#sp-${id})" opacity="0.5"/>
    <path d="M18 10C14 10 12 14 14 18C16 20 18 20 20 18L44 46C42 48 42 52 46 52C50 52 52 48 50 44C48 42 46 42 44 44L20 16C22 14 22 10 18 10Z"
          fill="url(#g-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <!-- Condyle highlight -->
    <circle cx="16" cy="13" r="2" fill="#9AF5D5" opacity="0.6"/>
    <circle cx="48" cy="48" r="2" fill="#9AF5D5" opacity="0.6"/>
    <!-- Shaft ridge -->
    <path d="M24 22L40 40" stroke="#F4FFFB" stroke-width="0.6" opacity="0.3"/>
  `,

    pediatrics: (id) => `
    <!-- Small child silhouette with balloon -->
    <ellipse cx="28" cy="26" rx="5" ry="6" fill="url(#sp-${id})" opacity="0.4"/>
    <circle cx="32" cy="20" r="6" fill="url(#g-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M26 26C24 32 24 40 26 46H38C40 40 40 32 38 26C36 24 28 24 26 26Z"
          fill="url(#g-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M26 46V52M38 46V52" stroke="#9AF5D5" stroke-width="2" stroke-linecap="round"/>
    <!-- Balloon -->
    <circle cx="48" cy="14" r="5" fill="#9AF5D5" opacity="0.9"/>
    <path d="M48 19C48 24 42 24 40 28" stroke="#9AF5D5" stroke-width="0.7" fill="none"/>
  `,

    gynecology: (id) => `
    <!-- Uterus + ovaries -->
    <ellipse cx="28" cy="24" rx="5" ry="6" fill="url(#sp-${id})" opacity="0.4"/>
    <path d="M20 22C20 18 24 16 28 16H36C40 16 44 18 44 22V30C44 36 40 42 36 46H28C24 42 20 36 20 30V22Z"
          fill="url(#g-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <!-- Ovaries -->
    <ellipse cx="14" cy="26" rx="4" ry="5" fill="#9AF5D5" opacity="0.85"/>
    <ellipse cx="50" cy="26" rx="4" ry="5" fill="#9AF5D5" opacity="0.85"/>
    <!-- Fallopian tubes -->
    <path d="M20 26C16 26 16 26 14 26M44 26C48 26 48 26 50 26"
          stroke="#F4FFFB" stroke-width="1" fill="none" opacity="0.5"/>
    <!-- Interior -->
    <path d="M32 22V40" stroke="#087F5B" stroke-width="0.8" opacity="0.6"/>
  `,

    dermatology: (id) => `
    <!-- Skin cross-section layers -->
    <ellipse cx="24" cy="22" rx="5" ry="3" fill="url(#sp-${id})" opacity="0.4"/>
    <rect x="8" y="14" width="48" height="8" rx="2" fill="url(#g-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="8" y="24" width="48" height="10" rx="2" fill="#9AF5D5" opacity="0.55"/>
    <rect x="8" y="36" width="48" height="14" rx="2" fill="#087F5B" opacity="0.7"/>
    <!-- Surface highlights -->
    <circle cx="16" cy="18" r="1" fill="#F4FFFB" opacity="0.7"/>
    <circle cx="28" cy="18" r="1" fill="#F4FFFB" opacity="0.7"/>
    <circle cx="42" cy="18" r="1" fill="#F4FFFB" opacity="0.7"/>
    <!-- Cells in dermis -->
    <circle cx="20" cy="29" r="1.3" fill="#F4FFFB" opacity="0.7"/>
    <circle cx="32" cy="31" r="1.3" fill="#F4FFFB" opacity="0.7"/>
    <circle cx="44" cy="28" r="1.3" fill="#F4FFFB" opacity="0.7"/>
  `,

    ent: (id) => `
    <!-- Ear shell + inner spiral -->
    <ellipse cx="24" cy="22" rx="5" ry="4" fill="url(#sp-${id})" opacity="0.4"/>
    <path d="M30 12C22 12 16 18 16 26C16 34 20 38 24 42C26 46 24 50 20 52"
          fill="none" stroke="url(#g-${id})" stroke-width="6" stroke-linecap="round"/>
    <path d="M30 12C22 12 16 18 16 26C16 34 20 38 24 42C26 46 24 50 20 52"
          fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="0.5" stroke-linecap="round"/>
    <!-- Spiral cochlea -->
    <path d="M42 20C46 20 48 24 46 27C44 30 40 30 38 27C36 24 40 22 42 24C44 26 42 28 40 27"
          fill="none" stroke="#9AF5D5" stroke-width="1.5" stroke-linecap="round" opacity="0.9"/>
  `,

    'general-medicine': (id) => `
    <!-- Stethoscope -->
    <ellipse cx="22" cy="18" rx="4" ry="3" fill="url(#sp-${id})" opacity="0.4"/>
    <path d="M18 12C14 14 14 20 18 22C24 26 30 30 34 38"
          fill="none" stroke="url(#g-${id})" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M46 12C50 14 50 20 46 22C40 26 34 30 30 38"
          fill="none" stroke="url(#g-${id})" stroke-width="2.6" stroke-linecap="round"/>
    <circle cx="18" cy="12" r="3" fill="#9AF5D5"/>
    <circle cx="46" cy="12" r="3" fill="#9AF5D5"/>
    <!-- Chest piece -->
    <circle cx="32" cy="46" r="10" fill="url(#g-${id})" stroke="rgba(255,255,255,0.4)" stroke-width="0.6"/>
    <circle cx="32" cy="46" r="6" fill="#08221f"/>
    <circle cx="32" cy="46" r="3" fill="#9AF5D5"/>
  `,

    ophthalmology: (id) => `
    <!-- Eye with iris -->
    <ellipse cx="26" cy="20" rx="4" ry="3" fill="url(#sp-${id})" opacity="0.4"/>
    <path d="M8 32C14 22 24 18 32 18C40 18 50 22 56 32C50 42 40 46 32 46C24 46 14 42 8 32Z"
          fill="url(#g-${id})" stroke="rgba(255,255,255,0.35)" stroke-width="0.6"/>
    <circle cx="32" cy="32" r="9" fill="#F4FFFB" opacity="0.95"/>
    <circle cx="32" cy="32" r="9" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="0.6"/>
    <circle cx="32" cy="32" r="5.5" fill="#00C896"/>
    <circle cx="32" cy="32" r="5.5" fill="none" stroke="#087F5B" stroke-width="0.5"/>
    <circle cx="32" cy="32" r="2.5" fill="#08221f"/>
    <circle cx="29" cy="29" r="1.2" fill="#F4FFFB" opacity="0.85"/>
  `,

    urology: (id) => `
    <!-- Kidney + ureter -->
    <ellipse cx="20" cy="22" rx="4" ry="3" fill="url(#sp-${id})" opacity="0.4"/>
    <path d="M20 14C14 14 12 20 12 28C12 38 18 44 24 46C28 46 30 42 28 38C26 34 26 30 28 26C30 22 28 14 20 14Z"
          fill="url(#g-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M28 38C32 42 36 46 40 50"
          stroke="#9AF5D5" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <!-- Hilum notch -->
    <path d="M22 28C24 28 24 32 22 32" stroke="#087F5B" stroke-width="0.9" fill="none"/>
    <circle cx="14" cy="22" r="1.2" fill="#9AF5D5" opacity="0.7"/>
  `,

    psychiatry: (id) => `
    <!-- Profile head with neural signals -->
    <ellipse cx="22" cy="24" rx="5" ry="4" fill="url(#sp-${id})" opacity="0.4"/>
    <path d="M20 14C14 14 10 20 10 28C10 34 12 38 16 42C18 44 18 48 20 50H32V42C38 42 42 38 42 32C42 28 40 24 36 22C36 16 28 12 20 14Z"
          fill="url(#g-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <!-- Neural dots -->
    <circle cx="20" cy="26" r="1.4" fill="#9AF5D5"/>
    <circle cx="26" cy="22" r="1.2" fill="#9AF5D5"/>
    <circle cx="30" cy="28" r="1.4" fill="#9AF5D5"/>
    <circle cx="24" cy="34" r="1.2" fill="#9AF5D5"/>
    <path d="M20 26L26 22L30 28L24 34L20 26Z" stroke="#9AF5D5" stroke-width="0.5" fill="none" opacity="0.7"/>
    <!-- Signal arcs -->
    <path d="M44 18C48 18 50 22 48 26M46 12C52 12 54 18 52 24"
          stroke="#9AF5D5" stroke-width="0.8" fill="none" stroke-linecap="round" opacity="0.7"/>
  `,

    dentistry: (id) => `
    <!-- Molar tooth with roots -->
    <ellipse cx="24" cy="18" rx="4" ry="3" fill="url(#sp-${id})" opacity="0.4"/>
    <path d="M16 12C10 12 8 18 10 24C12 28 14 32 16 40C16 46 18 50 22 50C24 50 26 46 26 42V38H38V42C38 46 40 50 42 50C46 50 48 46 48 40C50 32 52 28 54 24C56 18 54 12 48 12C42 12 40 14 32 14C24 14 22 12 16 12Z"
          fill="url(#g-${id})" stroke="rgba(255,255,255,0.35)" stroke-width="0.5"/>
    <!-- Bite surface highlight -->
    <path d="M22 18C26 20 38 20 42 18" stroke="#F4FFFB" stroke-width="0.7" fill="none" opacity="0.6"/>
    <!-- Roots -->
    <path d="M22 50V44M42 50V44" stroke="#087F5B" stroke-width="1.2" opacity="0.6"/>
  `
};

/* ============================================================ SERVICE
   Isometric / object-flat equipment. NO disc — different template. */

const SERVICE_ART = {
    'emergency-care': (id) => `
    <!-- Cross inside shield -->
    <path d="M32 6L54 14V32C54 44 44 54 32 58C20 54 10 44 10 32V14L32 6Z"
          fill="url(#g2-${id})" stroke="rgba(255,255,255,0.4)" stroke-width="0.6"/>
    <path d="M26 22H38V30H46V42H38V50H26V42H18V30H26V22Z" fill="#F4FFFB" opacity="0.95"/>
    <path d="M26 22H38V30H46V42H38V50H26V42H18V30H26V22Z" fill="none" stroke="#087F5B" stroke-width="0.4"/>
    <circle cx="18" cy="14" r="2" fill="#F4FFFB" opacity="0.5"/>
  `,

    icu: (id) => `
    <!-- Monitor with heartbeat -->
    <rect x="6" y="12" width="52" height="36" rx="3" fill="#08221f" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>
    <rect x="8" y="14" width="48" height="32" rx="2" fill="url(#g2-${id})" opacity="0.35"/>
    <path d="M10 30H18L22 22L26 38L30 30H40L44 24L48 36L52 30H54"
          stroke="#9AF5D5" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="24" y="48" width="16" height="4" fill="url(#g2-${id})"/>
    <rect x="20" y="52" width="24" height="3" rx="1" fill="rgba(255,255,255,0.2)"/>
    <circle cx="12" cy="18" r="1.2" fill="#9AF5D5"/>
    <circle cx="16" cy="18" r="1.2" fill="#F4FFFB" opacity="0.5"/>
  `,

    laboratory: (id) => `
    <!-- Erlenmeyer flask with liquid -->
    <path d="M26 8H38V22L52 48C54 52 52 56 48 56H16C12 56 10 52 12 48L26 22V8Z"
          fill="url(#g2-${id})" stroke="rgba(255,255,255,0.35)" stroke-width="0.6"/>
    <path d="M26 8H38V10H26Z" fill="#F4FFFB" opacity="0.4"/>
    <path d="M18 42C22 40 26 44 30 42C34 40 38 44 42 42C46 40 48 44 50 46V50C50 54 48 54 44 54H20C16 54 14 52 14 50V46C16 44 16 42 18 42Z"
          fill="#9AF5D5" opacity="0.85"/>
    <circle cx="30" cy="48" r="1.2" fill="#F4FFFB" opacity="0.8"/>
    <circle cx="42" cy="46" r="0.8" fill="#F4FFFB" opacity="0.8"/>
    <circle cx="24" cy="46" r="0.6" fill="#F4FFFB" opacity="0.8"/>
  `,

    radiology: (id) => `
    <!-- CT scanner — isometric tube -->
    <ellipse cx="32" cy="18" rx="18" ry="7" fill="url(#g2-${id})" opacity="0.5"/>
    <ellipse cx="32" cy="18" rx="18" ry="7" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.6"/>
    <ellipse cx="32" cy="18" rx="11" ry="4" fill="#08221f" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M14 18V46M50 18V46" stroke="url(#g2-${id})" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="32" cy="46" rx="18" ry="7" fill="url(#g2-${id})" opacity="0.35"/>
    <ellipse cx="32" cy="46" rx="18" ry="7" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>
    <rect x="20" y="46" width="24" height="4" fill="rgba(255,255,255,0.25)"/>
    <circle cx="32" cy="18" r="1.5" fill="#9AF5D5"/>
  `,

    surgery: (id) => `
    <!-- Scalpel with blade -->
    <path d="M10 54L24 40L28 42L14 56Z" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M24 40L40 24L48 16L44 26L40 32L28 42L24 40Z"
          fill="#F4FFFB" opacity="0.92"/>
    <path d="M24 40L40 24L48 16L44 26L40 32L28 42L24 40Z"
          fill="none" stroke="#087F5B" stroke-width="0.4"/>
    <path d="M40 24L28 42" stroke="#9AF5D5" stroke-width="0.5" opacity="0.6"/>
    <circle cx="14" cy="50" r="1" fill="#9AF5D5"/>
  `,

    pharmacy: (id) => `
    <!-- Pill bottle -->
    <rect x="18" y="16" width="28" height="38" rx="3" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.35)" stroke-width="0.6"/>
    <rect x="20" y="10" width="24" height="8" rx="2" fill="#9AF5D5"/>
    <rect x="20" y="10" width="24" height="3" fill="#F4FFFB" opacity="0.5"/>
    <rect x="24" y="26" width="16" height="14" rx="1" fill="#F4FFFB" opacity="0.85"/>
    <path d="M28 33H36M32 29V37" stroke="#087F5B" stroke-width="1.6" stroke-linecap="round"/>
    <circle cx="24" cy="48" r="1" fill="#F4FFFB" opacity="0.6"/>
    <circle cx="40" cy="48" r="1" fill="#F4FFFB" opacity="0.6"/>
  `,

    ambulance: (id) => `
    <!-- Ambulance (side view) -->
    <path d="M6 40V26C6 24 8 22 10 22H34V40H6Z" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M34 26H46L54 34V40H34V26Z" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="38" y="28" width="8" height="6" fill="#9AF5D5" opacity="0.85"/>
    <path d="M14 30H26V36H14Z" fill="#F4FFFB" opacity="0.7"/>
    <path d="M18 30V36M14 33H26" stroke="#087F5B" stroke-width="1.2"/>
    <circle cx="14" cy="44" r="4" fill="#08221f" stroke="#9AF5D5" stroke-width="0.6"/>
    <circle cx="46" cy="44" r="4" fill="#08221f" stroke="#9AF5D5" stroke-width="0.6"/>
    <circle cx="6" cy="32" r="1.5" fill="#F4FFFB" opacity="0.8"/>
  `,

    physiotherapy: (id) => `
    <!-- Figure stretching -->
    <circle cx="32" cy="14" r="5" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.35)" stroke-width="0.5"/>
    <path d="M32 20V36M32 24L20 20M32 24L46 18M32 36L24 50M32 36L42 48"
          stroke="url(#g2-${id})" stroke-width="2.6" stroke-linecap="round" fill="none"/>
    <path d="M32 20V36M32 24L20 20M32 24L46 18M32 36L24 50M32 36L42 48"
          stroke="#9AF5D5" stroke-width="0.6" stroke-linecap="round" fill="none" opacity="0.5"/>
    <circle cx="20" cy="20" r="1.2" fill="#9AF5D5"/>
    <circle cx="46" cy="18" r="1.2" fill="#9AF5D5"/>
  `,

    maternity: (id) => `
    <!-- Mother holding baby -->
    <circle cx="26" cy="16" r="6" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.35)" stroke-width="0.5"/>
    <path d="M20 24C18 30 18 40 20 46C22 48 24 50 26 52H36C38 50 40 48 42 44C44 38 44 30 42 24C36 22 26 22 20 24Z"
          fill="url(#g2-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <!-- Baby -->
    <circle cx="38" cy="38" r="4" fill="#F4FFFB" opacity="0.9"/>
    <path d="M34 42C34 44 36 46 38 46C40 46 42 44 42 42" stroke="#087F5B" stroke-width="0.5" fill="none"/>
    <circle cx="36" cy="37" r="0.5" fill="#08221f"/>
    <circle cx="40" cy="37" r="0.5" fill="#08221f"/>
  `,

    diagnostics: (id) => `
    <!-- Magnifier over sample dots -->
    <rect x="8" y="40" width="48" height="10" rx="2" fill="#08221f" stroke="rgba(255,255,255,0.2)" stroke-width="0.4"/>
    <circle cx="16" cy="45" r="1.5" fill="#9AF5D5" opacity="0.7"/>
    <circle cx="24" cy="45" r="1.5" fill="#9AF5D5" opacity="0.7"/>
    <circle cx="32" cy="45" r="1.5" fill="#9AF5D5" opacity="0.7"/>
    <circle cx="40" cy="45" r="1.5" fill="#9AF5D5" opacity="0.7"/>
    <circle cx="48" cy="45" r="1.5" fill="#9AF5D5" opacity="0.7"/>
    <!-- Magnifier -->
    <circle cx="34" cy="26" r="14" fill="url(#g2-${id})" opacity="0.5"/>
    <circle cx="34" cy="26" r="14" fill="none" stroke="url(#g-${id})" stroke-width="2.5"/>
    <circle cx="34" cy="26" r="12" fill="none" stroke="#F4FFFB" stroke-width="0.6" opacity="0.6"/>
    <circle cx="30" cy="22" r="4" fill="#F4FFFB" opacity="0.4"/>
    <path d="M44 36L50 42" stroke="url(#g-${id})" stroke-width="3" stroke-linecap="round"/>
    <!-- Cell inside -->
    <circle cx="34" cy="28" r="3" fill="#9AF5D5" opacity="0.9"/>
    <circle cx="34" cy="28" r="1.2" fill="#08221f"/>
  `
};

/* ============================================================ FACILITY
   Architectural / spatial compositions. Corner-bracket frame. */

const FACILITY_ART = {
    'medical-lab': (id) => `
    <!-- Microscope isometric -->
    <ellipse cx="32" cy="54" rx="16" ry="3" fill="#F4FFFB" opacity="0.15"/>
    <rect x="18" y="50" width="28" height="3" rx="1" fill="url(#g2-${id})"/>
    <path d="M28 50V32L20 22" stroke="url(#g2-${id})" stroke-width="4" stroke-linecap="round" fill="none"/>
    <path d="M20 22L16 18" stroke="#9AF5D5" stroke-width="3" stroke-linecap="round"/>
    <circle cx="14" cy="16" r="3" fill="#9AF5D5" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <rect x="30" y="34" width="14" height="10" rx="1" fill="url(#g-${id})" stroke="rgba(255,255,255,0.35)" stroke-width="0.5"/>
    <ellipse cx="37" cy="44" rx="4" ry="1" fill="#F4FFFB" opacity="0.4"/>
  `,

    icu: (id) => `
    <!-- Bed with heart monitor -->
    <path d="M6 32H54V42H6Z" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="6" y="26" width="14" height="8" rx="2" fill="#9AF5D5"/>
    <rect x="22" y="24" width="16" height="8" rx="2" fill="#F4FFFB" opacity="0.55"/>
    <path d="M6 42V50M54 42V50" stroke="url(#g2-${id})" stroke-width="3" stroke-linecap="round"/>
    <!-- Monitor -->
    <rect x="38" y="10" width="20" height="14" rx="2" fill="#08221f" stroke="rgba(255,255,255,0.35)" stroke-width="0.5"/>
    <path d="M40 18H44L46 14L48 22L50 16H56" stroke="#9AF5D5" stroke-width="1.4" fill="none"/>
    <path d="M46 24V26" stroke="#9AF5D5" stroke-width="1.4"/>
  `,

    'operation-theatre': (id) => `
    <!-- Operating table with light -->
    <path d="M4 30H60V38H4Z" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M14 38V48M50 38V48" stroke="url(#g2-${id})" stroke-width="3" stroke-linecap="round"/>
    <path d="M8 48H20M44 48H56" stroke="#9AF5D5" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
    <rect x="18" y="28" width="28" height="4" fill="#F4FFFB" opacity="0.55"/>
    <!-- Surgical light -->
    <path d="M28 6C20 6 16 12 18 18H46C48 12 44 6 36 6Z" fill="url(#g-${id})" stroke="rgba(255,255,255,0.4)" stroke-width="0.5"/>
    <path d="M22 18L24 28M42 18L40 28M32 18V28" stroke="#9AF5D5" stroke-width="0.8" opacity="0.8"/>
    <circle cx="32" cy="32" r="1.5" fill="#9AF5D5" opacity="0.7"/>
  `,

    'diagnostic-imaging': (id) => `
    <!-- MRI machine isometric -->
    <ellipse cx="32" cy="52" rx="20" ry="4" fill="#F4FFFB" opacity="0.12"/>
    <ellipse cx="32" cy="20" rx="18" ry="8" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.4)" stroke-width="0.6"/>
    <ellipse cx="32" cy="20" rx="11" ry="5" fill="#08221f"/>
    <path d="M14 20V48M50 20V48" stroke="url(#g2-${id})" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="32" cy="48" rx="18" ry="8" fill="url(#g2-${id})" opacity="0.5"/>
    <ellipse cx="32" cy="48" rx="18" ry="8" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="0.6"/>
    <!-- Table sliding into bore -->
    <rect x="20" y="24" width="24" height="3" fill="#F4FFFB" opacity="0.5"/>
    <circle cx="32" cy="20" r="1.5" fill="#9AF5D5"/>
  `,

    'patient-rooms': (id) => `
    <!-- Hospital bed + side table -->
    <rect x="10" y="30" width="36" height="14" rx="2" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <rect x="10" y="26" width="10" height="8" rx="2" fill="#9AF5D5"/>
    <rect x="20" y="26" width="10" height="6" rx="1" fill="#F4FFFB" opacity="0.55"/>
    <path d="M10 44V50M46 44V50" stroke="url(#g2-${id})" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="48" y="40" width="10" height="10" rx="1" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.4"/>
    <circle cx="53" cy="45" r="1.2" fill="#9AF5D5"/>
    <!-- IV pole -->
    <path d="M52 8V40M52 14H56M52 22H56" stroke="#9AF5D5" stroke-width="0.8"/>
    <rect x="55" y="14" width="3" height="8" rx="1" fill="#9AF5D5" opacity="0.8"/>
  `,

    'emergency-department': (id) => `
    <!-- Emergency entrance -->
    <path d="M8 56V24L32 10L56 24V56Z" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.35)" stroke-width="0.6"/>
    <path d="M24 56V40C24 36 28 34 32 34C36 34 40 36 40 40V56" fill="#08221f"/>
    <!-- Cross sign -->
    <circle cx="32" cy="22" r="8" fill="#F4FFFB" opacity="0.9"/>
    <path d="M29 18H35V21H38V27H35V30H29V27H26V21H29V18Z" fill="#00C896"/>
    <!-- Door light -->
    <rect x="28" y="44" width="8" height="2" fill="#9AF5D5" opacity="0.8"/>
  `,

    pharmacy: (id) => `
    <!-- Pill shelf -->
    <rect x="6" y="16" width="52" height="40" rx="2" fill="#08221f" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>
    <path d="M6 28H58M6 40H58" stroke="url(#g2-${id})" stroke-width="1.5"/>
    <!-- Bottles on shelf 1 -->
    <rect x="10" y="20" width="6" height="8" rx="1" fill="url(#g2-${id})"/>
    <rect x="18" y="20" width="6" height="8" rx="1" fill="#9AF5D5" opacity="0.8"/>
    <rect x="26" y="20" width="6" height="8" rx="1" fill="url(#g2-${id})"/>
    <rect x="34" y="20" width="6" height="8" rx="1" fill="#9AF5D5" opacity="0.8"/>
    <rect x="42" y="20" width="6" height="8" rx="1" fill="url(#g2-${id})"/>
    <rect x="50" y="20" width="6" height="8" rx="1" fill="#9AF5D5" opacity="0.8"/>
    <!-- Bottles on shelf 2 -->
    <rect x="10" y="32" width="6" height="8" rx="1" fill="#9AF5D5" opacity="0.8"/>
    <rect x="18" y="32" width="6" height="8" rx="1" fill="url(#g2-${id})"/>
    <rect x="26" y="32" width="6" height="8" rx="1" fill="#9AF5D5" opacity="0.8"/>
    <rect x="34" y="32" width="6" height="8" rx="1" fill="url(#g2-${id})"/>
    <!-- Pill on shelf 3 -->
    <rect x="10" y="44" width="12" height="5" rx="2.5" fill="#F4FFFB" opacity="0.8"/>
    <path d="M16 44V49" stroke="#087F5B" stroke-width="0.8"/>
  `,

    equipment: (id) => `
    <!-- Syringe -->
    <path d="M4 46L18 32L22 36L8 50Z" fill="url(#g2-${id})" stroke="rgba(255,255,255,0.3)" stroke-width="0.4"/>
    <rect x="18" y="24" width="24" height="10" rx="2" fill="#F4FFFB" opacity="0.9" transform="rotate(-45 30 29)"/>
    <path d="M22 20L26 24M38 32L42 36M44 14L50 20" stroke="#9AF5D5" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M30 26L36 32" stroke="#087F5B" stroke-width="0.6" opacity="0.6"/>
    <!-- Liquid inside -->
    <path d="M20 22L26 28" stroke="#9AF5D5" stroke-width="3" opacity="0.5"/>
  `
};

/* ============================================================ RENDERERS */

/**
 * Render a department card illustration.
 * Frame: glass disc + concentric rings (organic anatomy subject inside).
 */
export function departmentIllustration(department) {
    const id = hash(`${department.slug || department.id}dep`);
    const accent = department.accent || '#00C896';
    const renderArt = DEPT_ART[department.id];
    const inner = renderArt ? renderArt(id) : DEPT_ART['general-medicine'](id);

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
     role="img" aria-label="${department.name} — illustration" class="illus">
  ${defs(id, accent)}
  ${discBackdrop(id, accent)}
  ${inner}
</svg>`.trim();
}

/**
 * Render a service card illustration.
 * Frame: NONE — free-floating equipment on a subtle radial glow (different
 * visual language to departments, so the two grids never look the same).
 */
export function serviceIllustration(service) {
    const id = hash(`${service.id}svc`);
    const accent = service.accent || '#00C896';
    const renderArt = SERVICE_ART[service.id];
    const inner = renderArt ? renderArt(id) : SERVICE_ART['emergency-care'](id);

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
     role="img" aria-label="${service.name} — illustration" class="illus">
  ${defs(id, accent)}
  <ellipse cx="32" cy="52" rx="22" ry="5" fill="#F4FFFB" opacity="0.08"/>
  <circle cx="32" cy="30" r="28" fill="url(#gl-${id})"/>
  ${inner}
</svg>`.trim();
}

/**
 * Render a facility card illustration.
 * Frame: corner-bracket panel (architectural framing, distinct from both
 * discs and free-floating services).
 */
export function facilityIllustration(facility) {
    const id = hash(`${facility.id}fac`);
    const accent = facility.accent || '#00C896';
    const renderArt = FACILITY_ART[facility.id];
    const inner = renderArt ? renderArt(id) : FACILITY_ART['medical-lab'](id);

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"
     role="img" aria-label="${facility.name} — illustration" class="illus">
  ${defs(id, accent)}
  ${bracketFrame(id, accent)}
  ${inner}
</svg>`.trim();
}

/**
 * Doctor portrait — already distinct per doctor (initials + department accent).
 * This is its own composition, deliberately different from the three above.
 */
/**
 * Premium 3D-styled doctor avatar.
 * Generates a stylized doctor silhouette with a white coat, stethoscope,
 * surgical cap, and neon rim lighting to match the 3D hero scene.
 */
export function doctorIllustration(doctor) {
    const id = hash(`${doctor.slug || doctor.id}doc`);
    const accent = doctor.accent || '#00C896';

    // Extract initials
    const initials = doctor.name
        .replace(/^Dr\.\s*/, '')
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('');

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 140"
     role="img" aria-label="Illustrative 3D avatar for ${doctor.name}"
     class="doctor-portrait">
  <defs>
    <!-- Background Glow -->
    <radialGradient id="gl-${id}" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.4"/>
      <stop offset="60%" stop-color="${accent}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    
    <!-- Doctor Coat Gradient -->
    <linearGradient id="coat-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F4FFFB" stop-opacity="0.95"/>
      <stop offset="40%" stop-color="#C2E3D6" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#0B2825" stop-opacity="0.9"/>
    </linearGradient>

    <!-- Skin / Face Gradient (Stylized Mannequin) -->
    <linearGradient id="skin-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#2A4F48"/>
      <stop offset="100%" stop-color="#08221f"/>
    </linearGradient>

    <!-- Stethoscope Gradient -->
    <linearGradient id="steth-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="#087F5B"/>
    </linearGradient>
  </defs>

  <!-- Card Background -->
  <rect width="120" height="140" rx="18" fill="#061918"/>
  <circle cx="60" cy="50" r="56" fill="url(#gl-${id})"/>

  <!-- Shoulders / Body -->
  <path d="M 8 140 Q 12 95 40 85 L 60 100 L 80 85 Q 108 95 112 140 Z" fill="url(#coat-${id})"/>
  
  <!-- Coat Lapels (V-neck) -->
  <path d="M 40 85 L 60 105 L 80 85 L 85 95 L 60 120 L 35 95 Z" fill="#0B2825" stroke="${accent}" stroke-width="0.5" stroke-opacity="0.4"/>
  
  <!-- Inner Shirt -->
  <path d="M 52 100 L 60 110 L 68 100 L 65 140 L 55 140 Z" fill="#08221f"/>

  <!-- Neck -->
  <rect x="48" y="65" width="24" height="25" rx="4" fill="url(#skin-${id})"/>

  <!-- Head (Mannequin style) -->
  <ellipse cx="60" cy="55" rx="22" ry="26" fill="url(#skin-${id})"/>
  
  <!-- Surgical Cap / Hair -->
  <path d="M 38 55 Q 38 25 60 25 Q 82 25 82 55 Q 82 40 60 40 Q 38 40 38 55 Z" fill="${accent}" opacity="0.85"/>
  <path d="M 38 55 Q 38 25 60 25 Q 82 25 82 55 Q 82 40 60 40 Q 38 40 38 55 Z" fill="#F4FFFB" opacity="0.15"/>

  <!-- Stethoscope -->
  <!-- Tube -->
  <path d="M 46 86 C 42 105 48 120 60 120 C 72 120 78 105 74 86" fill="none" stroke="url(#steth-${id})" stroke-width="3" stroke-linecap="round"/>
  <!-- Chest Piece -->
  <circle cx="60" cy="122" r="6" fill="#F4FFFB" stroke="url(#steth-${id})" stroke-width="2"/>
  <circle cx="60" cy="122" r="3" fill="#08221f"/>

  <!-- Neon Rim Light (Left Edge) -->
  <path d="M 38 55 Q 38 25 60 25 M 8 140 Q 12 95 40 85" stroke="${accent}" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7"/>
  <path d="M 45 140 Q 42 100 38 90" stroke="${accent}" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.4"/>

  <!-- Initials Glass Badge -->
  <rect x="38" y="115" width="44" height="16" rx="8" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="0.5"/>
  <text x="60" y="126" text-anchor="middle"
        font-family="Sora, sans-serif" font-size="9" font-weight="700"
        fill="#F4FFFB" letter-spacing="1">${initials}</text>
        
  <!-- Small online/active dot -->
  <circle cx="88" cy="40" r="4" fill="${accent}"/>
  <circle cx="88" cy="40" r="6.5" fill="none" stroke="${accent}" stroke-opacity="0.3" stroke-width="1"/>
</svg>`.trim();
}

export function galleryIllustration(item) {
  const id = hash(item.id || item.title);
  const accent = item.accent || '#00C896';
  
  let inner = '';
  
  // Gallery ke IDs ko asal art se map kar rahe hain
  switch(item.id) {
    case 'g1': inner = DEPT_ART['cardiology'](id); break;       // Heart
    case 'g2': inner = DEPT_ART['neurology'](id); break;        // Brain
    case 'g3': inner = DEPT_ART['general-medicine'](id); break; // Lungs (Fallback to stethoscope for now)
    case 'g4': inner = DEPT_ART['orthopedics'](id); break;      // Skeleton/Bone
    case 'g5': inner = SERVICE_ART['radiology'](id); break;     // Scanner
    case 'g6': inner = SERVICE_ART['laboratory'](id); break;    // Flask
    case 'g7': inner = SERVICE_ART['surgery'](id); break;       // Scalpel
    case 'g8': inner = SERVICE_ART['emergency-care'](id); break;// Cross
    case 'g9': inner = FACILITY_ART['patient-rooms'](id); break;// Bed
    case 'g10': inner = DEPT_ART['dentistry'](id); break;       // Tooth
    case 'g11': inner = DEPT_ART['ophthalmology'](id); break;   // Eye
    case 'g12': inner = SERVICE_ART['pharmacy'](id); break;     // Pharmacy/Pill
    default: inner = FACILITY_ART['medical-lab'](id);
  }

  // Gallery frame (corner brackets) ke sath unique illustration render karein
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="${item.title}" class="illus">
  ${defs(id, accent)}
  <rect x="2" y="2" width="60" height="60" rx="12" fill="#08221f" opacity="0.94"/>
  <rect x="2" y="2" width="60" height="60" rx="12" fill="url(#gl-${id})" opacity="0.7"/>
  <path d="M8 14V8H14" stroke="${accent}" stroke-width="0.8" stroke-opacity="0.7" fill="none"/>
  <path d="M50 8H56V14" stroke="${accent}" stroke-width="0.8" stroke-opacity="0.7" fill="none"/>
  <path d="M8 50V56H14" stroke="${accent}" stroke-width="0.8" stroke-opacity="0.7" fill="none"/>
  <path d="M50 56H56V50" stroke="${accent}" stroke-width="0.8" stroke-opacity="0.7" fill="none"/>
  ${inner}
</svg>`.trim();
}

export default {
    departmentIllustration,
    serviceIllustration,
    facilityIllustration,
    doctorIllustration,
    galleryIllustration
};