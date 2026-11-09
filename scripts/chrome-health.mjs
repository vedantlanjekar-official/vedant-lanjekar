// Opens the site in a real Google Chrome window via the DevTools protocol, scrolls the
// whole page, exercises the main interactions, and reports console errors, failed
// requests, broken images and WebGL status.
// Usage: node scripts/chrome-health.mjs [url] [chromePath] [--headed]
// Runs headless by default: a background desktop window may not render frames,
// which would stop scroll-triggered loading during the check.
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const HEADED = process.argv.includes('--headed');
const NO_WEBGL = process.argv.includes('--no-webgl');
const URL_ = args[0] || 'http://127.0.0.1:4321/';
const CHROME = args[1] || path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe');
const PORT = 9333;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const profile = mkdtempSync(path.join(tmpdir(), 'vl-chrome-'));
const chrome = spawn(
  CHROME,
  [
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--window-size=1440,900',
    // Keep rendering even if the window is behind others, so scroll-triggered loading runs.
    '--disable-backgrounding-occluded-windows',
    '--disable-renderer-backgrounding',
    '--disable-background-timer-throttling',
    ...(HEADED ? [] : ['--headless=new']),
    ...(NO_WEBGL ? ['--disable-webgl', '--disable-3d-apis'] : []),
    'about:blank',
  ],
  { detached: true, stdio: 'ignore' },
);
chrome.unref();

let target;
for (let i = 0; i < 60 && !target; i++) {
  await sleep(500);
  try {
    const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    target = list.find((t) => t.type === 'page');
  } catch {}
}
if (!target) throw new Error('Chrome did not expose a debuggable page');

const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));

let id = 0;
const pending = new Map();
const issues = { console: [], exceptions: [], http: [], failed: [] };
let loaded = false;
let requests = 0;

ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
    return;
  }
  const p = msg.params;
  switch (msg.method) {
    case 'Runtime.consoleAPICalled':
      if (p.type === 'error' || p.type === 'warning')
        issues.console.push(`${p.type}: ${p.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 300)}`);
      break;
    case 'Runtime.exceptionThrown':
      issues.exceptions.push((p.exceptionDetails.exception?.description || p.exceptionDetails.text).slice(0, 400));
      break;
    case 'Log.entryAdded':
      if (p.entry.level === 'error') issues.console.push(`log: ${p.entry.text} ${p.entry.url ?? ''}`.slice(0, 300));
      break;
    case 'Network.requestWillBeSent':
      requests++;
      break;
    case 'Network.responseReceived':
      if (p.response.status >= 400) issues.http.push(`${p.response.status} ${p.response.url}`);
      break;
    case 'Network.loadingFailed':
      if (!p.canceled) issues.failed.push(`${p.errorText} (${p.type})`);
      break;
    case 'Page.loadEventFired':
      loaded = true;
      break;
  }
});

const send = (method, params = {}) =>
  new Promise((resolve) => {
    const mid = ++id;
    pending.set(mid, resolve);
    ws.send(JSON.stringify({ id: mid, method, params }));
  });
const evaluate = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description);
  return r.result?.result?.value;
};

await send('Runtime.enable');
await send('Log.enable');
await send('Network.enable');
await send('Page.enable');
// A background tab is "hidden" and renders no frames; make it the visible, focused tab.
await send('Page.bringToFront');
await send('Emulation.setFocusEmulationEnabled', { enabled: true });
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
// Baseline: frame rate of an empty page in this same browser, to separate environment limits from site cost.
const baselineFps = await evaluate(`(async () => { let n = 0; const t = performance.now();
  await Promise.race([new Promise(r => { const f = () => { n++; performance.now() - t < 2000 ? requestAnimationFrame(f) : r(); }; requestAnimationFrame(f); }), new Promise(r => setTimeout(r, 5000))]);
  return Math.round(n / 2); })()`);
await send('Page.navigate', { url: URL_ });
for (let i = 0; i < 60 && !loaded; i++) await sleep(250);
await sleep(4500); // preloader + hero intro

const initial = JSON.parse(
  await evaluate(`JSON.stringify({
    title: document.title,
    preloaderGone: !document.querySelector('[aria-label="Loading portfolio"]'),
    scrollUnlocked: document.body.style.overflow === '' && !document.documentElement.classList.contains('lenis-stopped'),
    sections: document.querySelectorAll('main section[id]').length,
    galleryPhotos: document.querySelectorAll('#gallery button[aria-label^="Open photograph"]').length,
    webglCanvases: [...document.querySelectorAll('canvas')].filter(c => { try { return !!(c.getContext('webgl2') || c.getContext('webgl')) } catch { return false } }).length,
    navLinks: document.querySelectorAll('#site-menu a').length,
  })`),
);

// Optional CPU profile + timing counters over 3s, to find main-thread hot spots.
let cpuProfile = null;
if (process.argv.includes('--profile')) {
  await send('Performance.enable');
  const m0 = Object.fromEntries((await send('Performance.getMetrics')).result.metrics.map((m) => [m.name, m.value]));
  await send('Profiler.enable');
  await send('Profiler.setSamplingInterval', { interval: 500 });
  await send('Profiler.start');
  await sleep(3000);
  const prof = (await send('Profiler.stop')).result.profile;
  const m1 = Object.fromEntries((await send('Performance.getMetrics')).result.metrics.map((m) => [m.name, m.value]));
  const delta = (k) => +(m1[k] - m0[k]).toFixed(3);
  const self = new Map();
  const dt = prof.timeDeltas;
  const byId = new Map(prof.nodes.map((n) => [n.id, n]));
  prof.samples.forEach((sid, i) => {
    const n = byId.get(sid);
    const cf = n.callFrame;
    const key = `${cf.functionName || '(anonymous)'} ${cf.url.split('/').pop()}:${cf.lineNumber}`;
    self.set(key, (self.get(key) || 0) + (dt[i] || 0) / 1000);
  });
  cpuProfile = {
    counters: {
      TaskDuration: delta('TaskDuration'),
      ScriptDuration: delta('ScriptDuration'),
      LayoutDuration: delta('LayoutDuration'),
      RecalcStyleDuration: delta('RecalcStyleDuration'),
      LayoutCount: delta('LayoutCount'),
      RecalcStyleCount: delta('RecalcStyleCount'),
      Nodes: m1.Nodes,
      LayerCount: m1.LayerCount ?? 'n/a',
    },
    topSelfMs: [...self.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14).map(([k, v]) => `${v.toFixed(0)}ms ${k}`),
  };
}

// Steady-state frame rate at the hero and mid-page (after images settle).
const PROBE = process.argv.includes('--probe');
const perf = JSON.parse(
  await evaluate(`(async () => { const process_probe = ${PROBE};
    const fps = async () => { let n = 0; const t = performance.now();
      await Promise.race([new Promise(r => { const f = () => { n++; performance.now() - t < 2000 ? requestAnimationFrame(f) : r(); }; requestAnimationFrame(f); }), new Promise(r => setTimeout(r, 5000))]);
      return Math.round(n / 2); };
    const hero = await fps();
    scrollTo(0, document.getElementById('experience').offsetTop + 400);
    await new Promise(r => setTimeout(r, 5000));
    const mid = await fps();
    const probe = {};
    if (${process.argv.includes('--probe2')}) {
      const st = document.createElement('style'); document.head.appendChild(st);
      st.textContent = '*,*::before,*::after{animation-play-state:paused!important}'; probe.animPaused = await fps();
      st.textContent += '*{mask-image:none!important;-webkit-mask-image:none!important}'; probe.plusNoMasks = await fps();
      st.textContent += '*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}'; probe.plusNoBackdrop = await fps();
      st.textContent += 'header,nav,.grain,.bg-fallback{display:none!important}'; probe.plusNoFixed = await fps();
      st.textContent += '*{filter:none!important;box-shadow:none!important;text-shadow:none!important}'; probe.plusNoFilters = await fps();
      st.remove();
    }
    if (process_probe) {
      const grain = document.querySelector('.grain'); grain.style.display = 'none'; probe.noGrain = await fps();
      const canvases = [...document.querySelectorAll('canvas')]; canvases.forEach(c => c.style.display = 'none'); probe.noGrainNoCanvas = await fps();
      document.querySelectorAll('*').forEach(e => { const cs = getComputedStyle(e); if (cs.backdropFilter !== 'none') e.style.backdropFilter = 'none'; }); probe.plusNoBackdrop = await fps();
      const blank = document.createElement('div'); blank.style.cssText = 'position:fixed;inset:0;background:#000;z-index:999999'; document.body.appendChild(blank); probe.blankOverlay = await fps(); blank.remove();
      grain.style.display = ''; canvases.forEach(c => c.style.display = '');
      scrollTo(0, 0); await new Promise(r => setTimeout(r, 600));
      const main = document.querySelector('main');
      main.style.display = 'none'; probe.noMain = await fps(); main.style.display = '';
      probe.sections = {};
      for (const s of document.querySelectorAll('main > section[id], main > [id]')) {
        s.style.display = 'none'; probe.sections[s.id] = await fps(); s.style.display = '';
      }
    }
    scrollTo(0, 0); await new Promise(r => setTimeout(r, 800));
    return JSON.stringify({ heroFps: hero, midPageFps: mid, probe, gl: (() => { const c = document.createElement('canvas').getContext('webgl'); const d = c && c.getExtension('WEBGL_debug_renderer_info'); return d ? c.getParameter(d.UNMASKED_RENDERER_WEBGL) : 'n/a'; })() });
  })()`),
);

// Scroll the full page in viewport steps so every lazy image and reveal fires.
const scroll = JSON.parse(
  await evaluate(`(async () => {
    let frames = 0; const t0 = performance.now();
    await Promise.race([
      new Promise(r => { const f = () => { frames++; performance.now() - t0 < 1000 ? requestAnimationFrame(f) : r(); }; requestAnimationFrame(f); }),
      new Promise(r => setTimeout(r, 3000)),
    ]);
    scrollTo(0, 4000); await new Promise(r => setTimeout(r, 1200));
    window.__diag = { fps: frames, yAfterJump: Math.round(scrollY), revealedAfterJump: document.querySelectorAll('.is-in').length, vis: document.visibilityState };
    const step = innerHeight * 0.85; let y = 0; const max = () => document.documentElement.scrollHeight - innerHeight;
    while (y < max()) { y += step; scrollTo(0, y); await new Promise(r => setTimeout(r, 450)); }
    await new Promise(r => setTimeout(r, 2500));
    const pending = [...document.querySelectorAll('[data-reveal]')].filter(e => !e.classList.contains('is-in'));
    const unrevealed = pending.length;
    const unrevealedBySection = {};
    pending.forEach(e => {
      const s = e.closest('section[id]')?.id || 'none';
      const hidden = !!e.closest('[hidden], [aria-hidden="true"], [inert]');
      const key = s + (hidden ? ' (inside hidden panel)' : '');
      unrevealedBySection[key] = (unrevealedBySection[key] || 0) + 1;
    });
    scrollTo(0, document.getElementById('experience').offsetTop + 400); await new Promise(r => setTimeout(r, 800));
    let midFrames = 0; const m0 = performance.now();
    await Promise.race([
      new Promise(r => { const f = () => { midFrames++; performance.now() - m0 < 1000 ? requestAnimationFrame(f) : r(); }; requestAnimationFrame(f); }),
      new Promise(r => setTimeout(r, 3000)),
    ]);
    window.__diag.fpsMidPage = midFrames;
    window.__diag.unrevealedBySection = unrevealedBySection;
    return JSON.stringify({ ...window.__diag, finalY: Math.round(scrollY), pageHeight: document.documentElement.scrollHeight, horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth, unrevealed });
  })()`),
);

// Lazy images that never got near the viewport (e.g. inside closed dialogs) are skipped.
const images = JSON.parse(
  await evaluate(`(async () => {
    const imgs = [...document.images];
    await Promise.all(imgs.filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 4000); })));
    return JSON.stringify({ total: imgs.length, loaded: imgs.filter(i => i.complete && i.naturalWidth > 0).length, broken: imgs.filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('loading') !== 'lazy').map(i => i.src) });
  })()`),
);

const interactions = JSON.parse(
  await evaluate(`(async () => {
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const esc = () => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    const out = {};
    [...document.querySelectorAll('#projects button')].find(b => b.textContent.includes('Open full project')).click(); await wait(800);
    out.projectDialog = document.querySelector('[role=dialog]')?.getAttribute('aria-label') || null;
    [...document.querySelectorAll('[role=dialog] button')].find(b => b.textContent.includes('AIVORA Flux'))?.click(); await wait(800);
    out.stackedDialogs = document.querySelectorAll('[role=dialog]').length;
    esc(); await wait(400); esc(); await wait(400);
    out.dialogsClosed = document.querySelectorAll('[role=dialog]').length === 0;
    [...document.querySelectorAll('#gallery button[aria-label^="Open photograph"]')].pop().click(); await wait(800);
    const gimg = document.querySelector('[role=dialog] img'); await new Promise(r => gimg.complete ? r() : (gimg.onload = r, setTimeout(r, 4000)));
    out.galleryViewer = document.querySelector('[role=dialog] [aria-live]')?.textContent || null;
    out.galleryImageLoaded = gimg.naturalWidth > 0;
    esc(); await wait(300);
    document.querySelector('#certifications button[aria-label^="8.1"]').click(); await wait(800);
    const cimg = document.querySelector('[role=dialog] img'); await new Promise(r => cimg.complete ? r() : (cimg.onload = r, setTimeout(r, 4000)));
    out.certificateViewer = document.querySelector('[role=dialog]')?.getAttribute('aria-label') || null;
    out.certificateImageLoaded = cimg.naturalWidth > 0;
    esc(); await wait(300);
    out.scrollRestored = document.body.style.overflow === '';
    scrollTo(0, 0);
    return JSON.stringify(out);
  })()`),
);

console.log(JSON.stringify({ url: URL_, chrome: CHROME, baselineFps, requests, initial, cpuProfile, perf, scroll, images, interactions, issues }, null, 2));
const healthy =
  !issues.exceptions.length && !issues.http.length && !issues.failed.length && !issues.console.length && !images.broken.length;
console.log(healthy ? '[chrome] HEALTHY' : '[chrome] ISSUES FOUND');
try {
  if (!HEADED) {
    await Promise.race([send('Browser.close'), sleep(1500)]);
    chrome.kill();
  }
  ws.close();
} catch {}
process.exit(healthy ? 0 : 1);
