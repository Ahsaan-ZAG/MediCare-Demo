/**
 * Recursively releases GPU resources for a scene subtree.
 * Called on teardown to prevent leaks during hot reloads and page changes.
 */
export function disposeObject3D(root) {
  if (!root) return;

  root.traverse((node) => {
    if (node.geometry) node.geometry.dispose();

    const materials = Array.isArray(node.material)
      ? node.material
      : node.material
        ? [node.material]
        : [];

    materials.forEach((material) => {
      Object.values(material).forEach((value) => {
        if (value && value.isTexture) value.dispose();
      });
      material.dispose();
    });

    if (node.isInstancedMesh) node.dispose();
  });
}

export function forceContextLoss(renderer) {
  if (!renderer) return;
  try {
    renderer.dispose();
    renderer.forceContextLoss();
  } catch {
    /* already lost */
  }
}