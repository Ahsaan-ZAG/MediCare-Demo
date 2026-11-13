/**
 * Detects WebGL 2 without creating a persistent context.
 * Returns false fast on unsupported devices so the caller can render a
 * static fallback instead of a dead canvas.
 */
let cached = null;

export function isWebGL2Available() {
  if (cached !== null) return cached;

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false });
    cached = Boolean(gl && typeof gl.getParameter === 'function');

    // Release the probe context immediately.
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  } catch {
    cached = false;
  }

  return cached;
}