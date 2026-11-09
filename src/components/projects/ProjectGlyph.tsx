import { useMemo } from 'react';

function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A deterministic circuit-like mark generated from the project name.
 * Used as a typographic visual where no project imagery exists.
 */
export function ProjectGlyph({ seed, className, animate = true }: { seed: string; className?: string; animate?: boolean }) {
  const { nodes, links, hub } = useMemo(() => {
    const r = rng(hash(seed));
    const N = 7;
    const cell = 100 / (N + 1);
    const nodes: { x: number; y: number; on: boolean }[] = [];
    for (let y = 0; y < N; y++)
      for (let x = 0; x < N; x++) nodes.push({ x: (x + 1) * cell, y: (y + 1) * cell, on: r() > 0.55 });
    const links: [number, number][] = [];
    nodes.forEach((n, i) => {
      if (!n.on) return;
      const x = i % N;
      const y = Math.floor(i / N);
      if (x < N - 1 && nodes[i + 1].on && r() > 0.25) links.push([i, i + 1]);
      if (y < N - 1 && nodes[i + N].on && r() > 0.3) links.push([i, i + N]);
      if (x < N - 1 && y < N - 1 && nodes[i + N + 1].on && r() > 0.75) links.push([i, i + N + 1]);
    });
    const onNodes = nodes.map((n, i) => (n.on ? i : -1)).filter((i) => i >= 0);
    const hub = onNodes[Math.floor(r() * onNodes.length)] ?? 24;
    return { nodes, links, hub };
  }, [seed]);

  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={0.55} fill="rgba(242,242,237,0.16)" />
      ))}
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="rgba(242,242,237,0.38)"
          strokeWidth={0.45}
          strokeDasharray={animate ? '20' : undefined}
          strokeDashoffset={animate ? 20 : undefined}
          style={animate ? { animation: `glyph-draw 1.4s ${(i % 12) * 40}ms cubic-bezier(.16,1,.3,1) forwards` } : undefined}
        />
      ))}
      {nodes.map((n, i) =>
        n.on ? <circle key={`on${i}`} cx={n.x} cy={n.y} r={i === hub ? 2.2 : 1.1} fill={i === hub ? '#80E3C5' : '#F2F2ED'} /> : null,
      )}
      <circle cx={nodes[hub].x} cy={nodes[hub].y} r={5} fill="none" stroke="#80E3C5" strokeOpacity={0.5} strokeWidth={0.4} />
    </svg>
  );
}
