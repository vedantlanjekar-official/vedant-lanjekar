// Control experiment: frame rate of a plain, effect-free page of similar size in the
// same automated Chrome, to tell environment limits apart from site rendering cost.
import { spawn } from 'node:child_process';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const CHROME = path.join(process.env.LOCALAPPDATA || '', 'Google', 'Chrome', 'Application', 'chrome.exe');
const PORT = 9334;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const chrome = spawn(
  CHROME,
  [`--remote-debugging-port=${PORT}`, `--user-data-dir=${mkdtempSync(path.join(tmpdir(), 'vl-chrome-'))}`, '--headless=new', '--no-first-run', 'about:blank'],
  { stdio: 'ignore' },
);
let target;
for (let i = 0; i < 60 && !target; i++) {
  await sleep(500);
  try {
    target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === 'page');
  } catch {}
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let id = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (pending.has(m.id)) pending.get(m.id)(m), pending.delete(m.id);
});
const send = (method, params = {}) => new Promise((r) => (pending.set(++id, r), ws.send(JSON.stringify({ id, method, params }))));
const ev = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.result.value;

await send('Page.bringToFront');
await send('Emulation.setFocusEmulationEnabled', { enabled: true });
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
const fps = `(async () => { let n = 0; const t = performance.now();
  await Promise.race([new Promise(r => { const f = () => { n++; performance.now() - t < 2000 ? requestAnimationFrame(f) : r(); }; requestAnimationFrame(f); }), new Promise(r => setTimeout(r, 5000))]);
  return Math.round(n / 2); })()`;
const out = { blank: await ev(fps) };
await ev(`(() => { document.body.style.cssText='margin:0;background:#0B0F12;color:#eee;font:16px sans-serif';
  for (let i = 0; i < 8000; i++) { const d = document.createElement('div'); d.textContent = 'Line ' + i + ' lorem ipsum dolor sit amet'; d.style.height = '5px'; document.body.appendChild(d); }
  return true; })()`);
out.longPageTop = await ev(fps);
await ev('scrollTo(0, 20000), true');
await sleep(1500);
out.longPageMid = await ev(fps);
await ev(`(() => { const s = document.createElement('div'); s.style.cssText='position:fixed;inset:0;pointer-events:none'; document.body.appendChild(s);
  const st = document.createElement('style'); st.textContent='@keyframes spin{to{transform:rotate(360deg)}} .sp{animation:spin 2s linear infinite}'; document.head.appendChild(st);
  for (let i=0;i<20;i++){const b=document.createElement('div'); b.className='sp'; b.style.cssText='position:absolute;width:40px;height:40px;background:#80E3C5;left:'+(i*60)+'px;top:100px'; s.appendChild(b);} return true })()`);
out.withAnimations = await ev(fps);
console.log(JSON.stringify(out));
chrome.kill();
process.exit(0);
