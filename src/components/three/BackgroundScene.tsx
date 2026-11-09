import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { pointerState, prefersReducedMotion, scrollState } from '../../lib/motion';
import { COLORS, seeded, smoothstep } from './shaders';
import styles from './BackgroundScene.module.css';

const DEPTH = 46;

function makeDotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.6)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Environment({ count }: { count: number }) {
  const { camera, scene, gl } = useThree();
  const field = useRef<THREE.Points>(null);
  const forms = useRef<THREE.Group>(null);
  const grid = useRef<THREE.LineSegments>(null);
  const reduced = useMemo(prefersReducedMotion, []);

  const { fieldGeo, fieldMat, gridGeo, gridMat, formDefs, formMat, dot } = useMemo(() => {
    const rand = seeded(42);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 22;
      pos[i * 3 + 1] = -rand() * DEPTH + 4;
      pos[i * 3 + 2] = -rand() * 14 - 2;
    }
    const fieldGeo = new THREE.BufferGeometry();
    fieldGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const dot = makeDotTexture();
    const fieldMat = new THREE.PointsMaterial({
      size: 0.07,
      map: dot,
      color: COLORS.silver.clone(),
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      fog: true,
    });

    // Perspective floor grid that the camera descends over.
    const lines: number[] = [];
    const span = 30;
    const step = 1.5;
    for (let x = -span; x <= span; x += step) lines.push(x, 0, -span, x, 0, span);
    for (let z = -span; z <= span; z += step) lines.push(-span, 0, z, span, 0, z);
    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));
    const gridMat = new THREE.LineBasicMaterial({ color: COLORS.silver, transparent: true, opacity: 0.11, fog: true, depthWrite: false });

    // Abstract wireframe forms placed along the descent.
    const shapes = [
      new THREE.IcosahedronGeometry(1.6, 1),
      new THREE.TorusGeometry(1.5, 0.02, 6, 64),
      new THREE.OctahedronGeometry(1.4, 0),
      new THREE.DodecahedronGeometry(1.3, 0),
      new THREE.TorusKnotGeometry(1.0, 0.03, 90, 6, 2, 3),
      new THREE.IcosahedronGeometry(1.2, 0),
    ];
    const formDefs = shapes.map((geo, i) => ({
      geo: new THREE.EdgesGeometry(geo, 1),
      position: new THREE.Vector3(i % 2 ? -4.6 : 4.8, -4 - i * 7.2, -7 - (i % 3) * 1.6),
      speed: 0.04 + (i % 3) * 0.02,
    }));
    shapes.forEach((s) => s.dispose());
    const formMat = new THREE.LineBasicMaterial({ color: COLORS.ivory, transparent: true, opacity: 0.12, fog: true, depthWrite: false });
    return { fieldGeo, fieldMat, gridGeo, gridMat, formDefs, formMat, dot };
  }, [count]);

  useEffect(() => {
    scene.fog = new THREE.Fog(COLORS.bg, 5, 20);
    return () => {
      scene.fog = null;
      fieldGeo.dispose();
      fieldMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      formMat.dispose();
      dot.dispose();
      formDefs.forEach((f) => f.geo.dispose());
    };
  }, [scene, fieldGeo, fieldMat, gridGeo, gridMat, formMat, dot, formDefs]);

  const cam = useRef({ x: 0, y: 0, rx: 0 });
  const tint = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const vh = window.innerHeight || 1;
    const max = Math.max(1, document.documentElement.scrollHeight - vh);
    const progress = Math.min(1, Math.max(0, scrollState.y / max));
    const t = state.clock.elapsedTime;

    // Hidden behind the hero, then fades in as content begins.
    const visible = smoothstep(vh * 0.35, vh * 1.05, scrollState.y);
    gl.domElement.style.opacity = String(visible);

    const c = cam.current;
    const tx = reduced ? 0 : pointerState.nx * 0.6;
    const ty = -progress * (DEPTH - 10) + (reduced ? 0 : pointerState.ny * 0.3);
    c.x += (tx - c.x) * 0.04;
    c.y += (ty - c.y) * 0.06;
    c.rx += ((reduced ? 0 : -pointerState.ny * 0.03) - 0.08 - c.rx) * 0.04;
    camera.position.set(c.x, c.y, 6);
    camera.rotation.set(c.rx, c.x * -0.02, 0);

    if (grid.current) grid.current.position.set(0, c.y - 3.2, -6);

    // Subtle tint shift: cooler early, faint mint through the middle of the page.
    const mintAmount = 0.12 + 0.3 * Math.sin(progress * Math.PI);
    tint.copy(COLORS.silver).lerp(COLORS.mint, mintAmount);
    fieldMat.color.copy(tint);

    if (!reduced && field.current) field.current.rotation.y = Math.sin(t * 0.05) * 0.05;
    if (forms.current) {
      forms.current.children.forEach((child, i) => {
        const speed = formDefs[i].speed * (reduced ? 0 : 1);
        child.rotation.x += delta * speed;
        child.rotation.y += delta * speed * 1.3;
      });
    }
  });

  return (
    <>
      <points ref={field} geometry={fieldGeo} material={fieldMat} />
      <lineSegments ref={grid} geometry={gridGeo} material={gridMat} />
      <group ref={forms}>
        {formDefs.map((f, i) => (
          <lineSegments key={i} geometry={f.geo} material={formMat} position={f.position} />
        ))}
      </group>
    </>
  );
}

export default function BackgroundScene({ active }: { active: boolean }) {
  const mobile = typeof window !== 'undefined' && window.innerWidth < 760;
  const reduced = prefersReducedMotion();
  // The canvas is fully transparent over the hero, so don't render it there.
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const check = () => setPastHero(window.scrollY > window.innerHeight * 0.3);
    check();
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);
  const running = active && pastHero;
  return (
    <div className={styles.root} aria-hidden="true">
      <Canvas
        dpr={mobile ? [1, 1] : [1, 1.5]}
        gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 60 }}
        frameloop={running ? (reduced ? 'demand' : 'always') : 'never'}
      >
        <Environment count={mobile ? 260 : 700} />
      </Canvas>
    </div>
  );
}
