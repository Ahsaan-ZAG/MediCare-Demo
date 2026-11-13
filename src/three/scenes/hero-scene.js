import * as THREE from 'three';
import { threeConfig } from '../../config/three.config.js';
import { createRenderer, resizeRendererToDisplaySize } from '../core/renderer.js';
import { createHeroLights } from '../core/lights.js';
import { isWebGL2Available } from '../utils/webgl-check.js';
import { disposeObject3D, forceContextLoss } from '../utils/dispose-scene.js';

const UP = new THREE.Vector3(0, 1, 0);

/* ---------------------------------------------------------------- builders */

function buildHelix() {
  const cfg = threeConfig.helix;
  const group = new THREE.Group();

  const nodes = cfg.turns * cfg.nodesPerTurn;
  const total = nodes * 2;

  const nodeGeo = new THREE.IcosahedronGeometry(cfg.nodeRadius, 1);
  const nodeMat = new THREE.MeshStandardMaterial({
    roughness: 0.24,
    metalness: 0.35,
    emissive: new THREE.Color(threeConfig.colors.emerald),
    emissiveIntensity: 0.55
  });

  const instanced = new THREE.InstancedMesh(nodeGeo, nodeMat, total);
  instanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

  const dummy = new THREE.Object3D();
  const colorA = new THREE.Color(threeConfig.colors.emerald);
  const colorB = new THREE.Color(threeConfig.colors.mint);

  const strandA = [];
  const strandB = [];

  for (let i = 0; i < nodes; i += 1) {
    const t = i / (nodes - 1);
    const angle = (i / cfg.nodesPerTurn) * Math.PI * 2;
    const y = (t - 0.5) * cfg.height;

    const ax = Math.cos(angle) * cfg.radius;
    const az = Math.sin(angle) * cfg.radius;
    const bx = Math.cos(angle + Math.PI) * cfg.radius;
    const bz = Math.sin(angle + Math.PI) * cfg.radius;

    strandA.push(new THREE.Vector3(ax, y, az));
    strandB.push(new THREE.Vector3(bx, y, bz));

    dummy.position.set(ax, y, az);
    dummy.updateMatrix();
    instanced.setMatrixAt(i, dummy.matrix);

    dummy.position.set(bx, y, bz);
    dummy.updateMatrix();
    instanced.setMatrixAt(nodes + i, dummy.matrix);
  }

  for (let i = 0; i < total; i += 1) {
    const t = (i % nodes) / nodes;
    instanced.setColorAt(i, colorA.clone().lerp(colorB, t));
  }
  instanced.instanceColor.needsUpdate = true;
  group.add(instanced);

  /* --- rungs: one instanced cylinder mesh, every 2nd node --- */
  const rungPairs = [];
  for (let i = 0; i < nodes; i += 2) rungPairs.push([strandA[i], strandB[i]]);

  const rungGeo = new THREE.CylinderGeometry(cfg.rungRadius, cfg.rungRadius, 1, 5, 1, true);
  const rungMat = new THREE.MeshStandardMaterial({
    color: threeConfig.colors.mint,
    roughness: 0.5,
    metalness: 0.1,
    transparent: true,
    opacity: 0.42
  });

  const rungs = new THREE.InstancedMesh(rungGeo, rungMat, rungPairs.length);
  const quat = new THREE.Quaternion();
  const scale = new THREE.Vector3();
  const mid = new THREE.Vector3();
  const dir = new THREE.Vector3();

  rungPairs.forEach(([a, b], index) => {
    mid.addVectors(a, b).multiplyScalar(0.5);
    dir.subVectors(b, a);
    const length = dir.length();
    quat.setFromUnitVectors(UP, dir.normalize());
    scale.set(1, length, 1);
    dummy.position.copy(mid);
    dummy.quaternion.copy(quat);
    dummy.scale.copy(scale);
    dummy.updateMatrix();
    rungs.setMatrixAt(index, dummy.matrix);
  });

  dummy.quaternion.identity();
  dummy.scale.set(1, 1, 1);
  group.add(rungs);

  return group;
}

function buildOrbs() {
  const orbs = [];
  const group = new THREE.Group();

  const specs = [
    { radius: 0.55, position: [-2.9, 2.5, 1.2], color: threeConfig.colors.emerald },
    { radius: 0.38, position: [3.0, -2.2, 1.6], color: threeConfig.colors.mint },
    { radius: 0.26, position: [2.6, 2.9, -0.6], color: threeConfig.colors.emerald }
  ];

  specs.forEach((spec, index) => {
    const geo = new THREE.IcosahedronGeometry(spec.radius, 2);
    const mat = new THREE.MeshStandardMaterial({
      color: spec.color,
      roughness: 0.14,
      metalness: 0.55,
      emissive: new THREE.Color(spec.color),
      emissiveIntensity: 0.28
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.fromArray(spec.position);
    mesh.userData.baseScale = 1;
    mesh.userData.phase = index * 1.7;
    mesh.userData.hovered = false;
    mesh.userData.baseY = spec.position[1];

    group.add(mesh);
    orbs.push(mesh);
  });

  return { group, orbs };
}

function buildRing() {
  const geo = new THREE.TorusGeometry(3.35, 0.012, 6, 128);
  const mat = new THREE.MeshBasicMaterial({
    color: threeConfig.colors.mint,
    transparent: true,
    opacity: 0.28
  });
  const ring = new THREE.Mesh(geo, mat);
  ring.rotation.x = Math.PI * 0.42;
  ring.rotation.z = Math.PI * 0.16;
  return ring;
}

function buildParticles() {
  const { count, radius, size } = threeConfig.particles;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const r = radius * (0.42 + Math.random() * 0.58);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.cos(phi) * 0.72;
    positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    color: threeConfig.colors.mint,
    size,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  });

  return new THREE.Points(geo, mat);
}

/* ------------------------------------------------------------------- scene */

/**
 * Boots the interactive hero scene.
 * @returns {{ dispose: () => void } | null} null when WebGL2 is unavailable
 *          or the renderer fails to initialise — the caller must then show the
 *          static fallback image.
 */
export function initHeroScene(canvas) {
  if (!canvas) return null;
  if (!isWebGL2Available()) return null;

  let renderer;
  try {
    renderer = createRenderer(canvas);
  } catch (error) {
    console.warn('[MediCare] 3D renderer unavailable, using static fallback.', error);
    return null;
  }

  const container = canvas.parentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    threeConfig.camera.fov,
    1,
    threeConfig.camera.near,
    threeConfig.camera.far
  );
  camera.position.fromArray(threeConfig.camera.position);

  scene.add(createHeroLights());

  const world = new THREE.Group();
  const spinner = new THREE.Group();
  const helix = buildHelix();
  const { group: orbsGroup, orbs } = buildOrbs();
  const ring = buildRing();
  const particles = buildParticles();

  spinner.add(helix, ring);
  world.add(spinner, orbsGroup, particles);
  world.scale.setScalar(window.innerWidth < 768 ? 0.82 : 0.92);
  scene.add(world);

  /* ------------------------------------------------------------ interaction */
  const pointer = new THREE.Vector2(0, 0);
  const target = new THREE.Vector2(0, 0);
  const raycaster = new THREE.Raycaster();
  let activeOrb = null;

  const setPointerFromEvent = (event) => {
    const rect = canvas.getBoundingClientRect();
    target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    target.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const onPointerMove = (event) => {
    setPointerFromEvent(event);
    raycaster.setFromCamera(target, camera);
    const hits = raycaster.intersectObjects(orbs, false);
    const next = hits.length ? hits[0].object : null;

    if (next !== activeOrb) {
      if (activeOrb) activeOrb.userData.hovered = false;
      activeOrb = next;
      if (activeOrb) activeOrb.userData.hovered = true;
      canvas.style.cursor = activeOrb ? 'pointer' : 'default';
    }
  };

  const onPointerLeave = () => {
    target.set(0, 0);
    if (activeOrb) activeOrb.userData.hovered = false;
    activeOrb = null;
    canvas.style.cursor = 'default';
  };

  if (!reduceMotion) {
    canvas.addEventListener('pointermove', onPointerMove, { passive: true });
    canvas.addEventListener('pointerleave', onPointerLeave, { passive: true });
  }

  /* ------------------------------------------------------------------ loop */
  const clock = new THREE.Clock();
  let rafId = 0;
  let elapsed = 0;
  let running = false;
  let visible = true;

  const renderFrame = () => {
    const dt = Math.min(clock.getDelta(), 0.05);
    elapsed += dt;

    if (!reduceMotion) {
      pointer.x += (target.x - pointer.x) * threeConfig.parallax.damping;
      pointer.y += (target.y - pointer.y) * threeConfig.parallax.damping;

      world.rotation.y = pointer.x * threeConfig.parallax.strength;
      world.rotation.x = -pointer.y * threeConfig.parallax.strength * 0.55;

      spinner.rotation.y += dt * threeConfig.helix.rotateSpeed;
      world.position.y = Math.sin(elapsed * 0.55) * 0.12;
      particles.rotation.y += dt * 0.028;
      ring.rotation.z += dt * 0.05;

      orbs.forEach((orb) => {
        const targetScale = orb.userData.hovered ? 1.28 : 1;
        orb.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.12);
        orb.material.emissiveIntensity +=
          ((orb.userData.hovered ? 0.95 : 0.28) - orb.material.emissiveIntensity) * 0.12;
        orb.position.y = orb.userData.baseY + Math.sin(elapsed * 0.9 + orb.userData.phase) * 0.22;
        orb.rotation.x += dt * 0.25;
        orb.rotation.y += dt * 0.18;
      });
    }

    resizeRendererToDisplaySize(renderer, camera, container);
    renderer.render(scene, camera);
  };

  const tick = () => {
    rafId = requestAnimationFrame(tick);
    renderFrame();
  };

  const start = () => {
    if (running || !visible) return;
    running = true;
    clock.getDelta();
    tick();
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(rafId);
    rafId = 0;
  };

  /* -------------------------------------------------------------- observers */
  const resizeObserver = new ResizeObserver(() => {
    if (resizeRendererToDisplaySize(renderer, camera, container) && !running) {
      renderer.render(scene, camera);
    }
  });
  resizeObserver.observe(container);

  const intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    },
    { threshold: 0.02 }
  );
  intersectionObserver.observe(canvas);

  const onVisibilityChange = () => {
    if (document.hidden) stop();
    else if (visible) start();
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  /* ------------------------------------------------------------- first paint */
  resizeRendererToDisplaySize(renderer, camera, container);
  renderer.render(scene, camera);
  start();

  /* ---------------------------------------------------------------- teardown */
  return {
    dispose() {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerleave', onPointerLeave);

      disposeObject3D(scene);
      scene.clear();
      forceContextLoss(renderer);
    }
  };
}