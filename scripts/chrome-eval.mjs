// Evaluates an expression in the page of an already-running debuggable Chrome.
// Usage: node scripts/chrome-eval.mjs "<expression>" [port]
const expr = process.argv[2];
const port = process.argv[3] || 9333;
const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const target = list.find((t) => t.type === 'page' && t.url.startsWith('http'));
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id === 1) {
    console.log(m.result?.result?.value ?? JSON.stringify(m.result));
    process.exit(0);
  }
});
ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression: expr, awaitPromise: true, returnByValue: true } }));
