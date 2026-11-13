import * as THREE from 'three';
import { threeConfig } from '../../config/three.config.js';

/**
 * Four lights, no shadow maps. Coloured rim lights do the heavy lifting so the
 * emissive materials read as "studio-lit" without a costly environment map.
 */
export function createHeroLights() {
  const group = new THREE.Group();
  const c = threeConfig.colors;

  const hemi = new THREE.HemisphereLight(c.mint, c.navy, 1.05);
  hemi.position.set(0, 1, 0);
  group.add(hemi);

  const key = new THREE.DirectionalLight(c.text, 1.5);
  key.position.set(4, 6, 6);
  group.add(key);

  const rimEmerald = new THREE.PointLight(c.emerald, 26, 26, 2);
  rimEmerald.position.set(-5.5, -1.5, 3.5);
  group.add(rimEmerald);

  const rimMint = new THREE.PointLight(c.mint, 16, 24, 2);
  rimMint.position.set(5.5, 3.5, -2.5);
  group.add(rimMint);

  return group;
}