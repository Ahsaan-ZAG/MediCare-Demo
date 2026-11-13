import * as THREE from 'three';
import { threeConfig } from '../../config/three.config.js';

export function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: window.devicePixelRatio < 2,
    powerPreference: 'high-performance',
    stencil: false,
    depth: true
  });

  const maxDpr = window.innerWidth < threeConfig.pixelRatio.mobileBreakpoint
    ? threeConfig.pixelRatio.mobile
    : threeConfig.pixelRatio.desktop;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearAlpha(0);

  return renderer;
}

export function resizeRendererToDisplaySize(renderer, camera, container) {
  const width = Math.max(container.clientWidth, 1);
  const height = Math.max(container.clientHeight, 1);

  const canvas = renderer.domElement;
  if (canvas.width === Math.floor(width * renderer.getPixelRatio()) &&
      canvas.height === Math.floor(height * renderer.getPixelRatio())) {
    return false;
  }

  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  return true;
}