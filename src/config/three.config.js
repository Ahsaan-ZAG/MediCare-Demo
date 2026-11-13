/**
 * Tuned for lower-powered hardware. Every value here is a performance lever.
 */
export const threeConfig = {
  camera: { fov: 40, near: 0.1, far: 60, position: [0, 0.4, 11] },

  pixelRatio: {
    desktop: 1.75,
    mobile: 1.25,
    mobileBreakpoint: 768
  },

  helix: {
    turns: 3,
    nodesPerTurn: 22,
    radius: 2.05,
    height: 7.4,
    nodeRadius: 0.135,
    rungRadius: 0.026,
    rotateSpeed: 0.16
  },

  particles: { count: 240, radius: 8.5, size: 0.055 },

  parallax: { strength: 0.32, damping: 0.055 },

  colors: {
    emerald: 0x00c896,
    deepEmerald: 0x087f5b,
    mint: 0x9af5d5,
    navy: 0x0b2825,
    text: 0xf4fffb
  }
};

export default threeConfig;