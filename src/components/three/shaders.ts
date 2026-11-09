import * as THREE from 'three';

export const COLORS = {
  ivory: new THREE.Color('#F2F2ED'),
  silver: new THREE.Color('#7D8790'),
  mint: new THREE.Color('#80E3C5'),
  bg: new THREE.Color('#0B0F12'),
};

/** Soft round points with per-vertex glow and size; additive. */
export function createNodeMaterial(pixelRatio: number) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uPixelRatio: { value: pixelRatio },
      uOpacity: { value: 1 },
      uScale: { value: 1 },
      uColor: { value: COLORS.ivory.clone() },
      uAccent: { value: COLORS.mint.clone() },
    },
    vertexShader: /* glsl */ `
      attribute float aGlow;
      attribute float aSize;
      uniform float uPixelRatio;
      uniform float uScale;
      varying float vGlow;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uScale * (1.0 + aGlow * 1.2) * uPixelRatio * (7.0 / -mv.z);
        vGlow = aGlow;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform vec3 uAccent;
      uniform float uOpacity;
      varying float vGlow;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float halo = smoothstep(0.5, 0.0, d);
        float core = smoothstep(0.16, 0.0, d);
        vec3 col = mix(uColor, uAccent, clamp(vGlow, 0.0, 1.0));
        float a = (halo * 0.35 + core * 0.85) * uOpacity;
        if (a < 0.01) discard;
        gl_FragColor = vec4(col, a);
      }
    `,
  });
}

/** Mulberry32: deterministic layouts across renders. */
export function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
