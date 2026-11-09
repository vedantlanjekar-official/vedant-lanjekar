import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { prefersReducedMotion } from '../../lib/motion';
import { COLORS, createNodeMaterial, smoothstep } from './shaders';

interface Spin {
  vx: number;
  vy: number;
  dragging: boolean;
  lastX: number;
  lastY: number;
  pulse: number;
}

function Geodesic({ spin, hovering }: { spin: React.MutableRefObject<Spin>; hovering: React.MutableRefObject<boolean> }) {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Group>(null);
  const core = useRef<THREE.LineSegments>(null);
  const ring = useRef<THREE.LineLoop>(null);
  const { camera, gl, pointer } = useThree();
  const reduced = useMemo(prefersReducedMotion, []);

  const { nodes, nodeGeo, nodeMat, edgeGeo, edgeMat, coreGeo, ringGeo } = useMemo(() => {
    const base = mergeVertices(new THREE.IcosahedronGeometry(1.55, 2).deleteAttribute('normal').deleteAttribute('uv'));
    const pos = base.getAttribute('position') as THREE.BufferAttribute;
    const nodes: THREE.Vector3[] = [];
    for (let i = 0; i < pos.count; i++) nodes.push(new THREE.Vector3().fromBufferAttribute(pos, i));

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodes.flatMap((v) => [v.x, v.y, v.z]), 3));
    nodeGeo.setAttribute('aSize', new THREE.Float32BufferAttribute(nodes.map(() => 4.5), 1));
    nodeGeo.setAttribute('aGlow', new THREE.Float32BufferAttribute(new Array(nodes.length).fill(0), 1));
    const nodeMat = createNodeMaterial(Math.min(gl.getPixelRatio(), 1.5));

    const edgeGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.55, 2), 1);
    const edgeMat = new THREE.LineBasicMaterial({
      color: COLORS.silver,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const coreGeo = new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.5, 0));
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 128; i++) {
      const a = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * 2.05, 0, Math.sin(a) * 2.05));
    }
    const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
    base.dispose();
    return { nodes, nodeGeo, nodeMat, edgeGeo, edgeMat, coreGeo, ringGeo };
  }, [gl]);

  useEffect(
    () => () => {
      [nodeGeo, edgeGeo, coreGeo, ringGeo].forEach((g) => g.dispose());
      [nodeMat, edgeMat].forEach((m) => m.dispose());
    },
    [nodeGeo, edgeGeo, coreGeo, ringGeo, nodeMat, edgeMat],
  );

  const glow = useMemo(() => new Float32Array(nodes.length), [nodes]);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const inv = useMemo(() => new THREE.Matrix4(), []);
  const ray = useMemo(() => new THREE.Ray(), []);
  const tilt = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const g = group.current;
    const s = shell.current;
    if (!g || !s) return;
    const dt = Math.min(delta, 1 / 30);
    const sp = spin.current;

    // Auto-rotation plus drag momentum.
    if (!sp.dragging) {
      sp.vx *= 0.95;
      sp.vy *= 0.95;
    }
    s.rotation.y += (reduced ? 0 : dt * 0.18) + sp.vy;
    s.rotation.x += sp.vx;

    // Whole object leans toward the cursor while hovered.
    const tx = hovering.current ? -pointer.y * 0.35 : 0;
    const ty = hovering.current ? pointer.x * 0.45 : 0;
    tilt.current.x += (tx - tilt.current.x) * 0.06;
    tilt.current.y += (ty - tilt.current.y) * 0.06;
    g.rotation.set(tilt.current.x, tilt.current.y, 0);

    sp.pulse = Math.max(0, sp.pulse - dt * 1.6);
    const pulse = Math.sin(sp.pulse * Math.PI) * 0.12;
    g.scale.setScalar(1 + pulse);

    // Nodes near the pointer ray glow mint.
    s.updateMatrixWorld();
    inv.copy(s.matrixWorld).invert();
    raycaster.setFromCamera(pointer, camera);
    ray.copy(raycaster.ray).applyMatrix4(inv);
    const attr = nodeGeo.getAttribute('aGlow') as THREE.BufferAttribute;
    for (let i = 0; i < nodes.length; i++) {
      const d = hovering.current ? Math.sqrt(ray.distanceSqToPoint(nodes[i])) : 9;
      const target = (1 - smoothstep(0.1, 0.75, d)) + sp.pulse * 0.6;
      glow[i] += (target - glow[i]) * 0.15;
      attr.array[i] = glow[i];
    }
    attr.needsUpdate = true;
    edgeMat.opacity = 0.28 + (hovering.current ? 0.08 : 0) + sp.pulse * 0.3;

    if (core.current) {
      core.current.rotation.x -= dt * 0.5;
      core.current.rotation.y -= dt * 0.7;
    }
    if (ring.current) {
      ring.current.rotation.x = 1.15 + Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      ring.current.rotation.z += dt * 0.1;
    }
  });

  return (
    <group ref={group}>
      <group ref={shell}>
        <lineSegments geometry={edgeGeo} material={edgeMat} />
        <points geometry={nodeGeo} material={nodeMat} />
      </group>
      <lineSegments ref={core} geometry={coreGeo}>
        <lineBasicMaterial color={COLORS.mint} transparent opacity={0.85} depthWrite={false} />
      </lineSegments>
      <lineLoop ref={ring} geometry={ringGeo}>
        <lineBasicMaterial color={COLORS.mint} transparent opacity={0.22} depthWrite={false} />
      </lineLoop>
    </group>
  );
}

/** Rotating geodesic sphere: tilts toward the cursor, drag to spin, click to pulse. */
export default function GeodesicScene({ className }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const spin = useRef<Spin>({ vx: 0, vy: 0, dragging: false, lastX: 0, lastY: 0, pulse: 0 });
  const hovering = useRef(false);

  useEffect(() => {
    const el = wrap.current!;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '120px' });
    io.observe(el);

    const s = spin.current;
    const down = (e: PointerEvent) => {
      s.dragging = true;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      s.pulse = 1;
    };
    const move = (e: PointerEvent) => {
      if (!s.dragging) return;
      s.vy = (e.clientX - s.lastX) * 0.006;
      s.vx = (e.clientY - s.lastY) * 0.006;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
    };
    const up = () => (s.dragging = false);
    const enter = () => (hovering.current = true);
    const leave = () => {
      hovering.current = false;
      s.dragging = false;
    };
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerup', up);
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    return () => {
      io.disconnect();
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
    };
  }, []);

  return (
    <div ref={wrap} className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 38 }}
        frameloop={inView ? 'always' : 'never'}
      >
        <Geodesic spin={spin} hovering={hovering} />
      </Canvas>
    </div>
  );
}
