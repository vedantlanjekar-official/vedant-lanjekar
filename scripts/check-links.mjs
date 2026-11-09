// Requests every file the built site references and reports anything that isn't HTTP 200.
// Usage: node scripts/check-links.mjs [baseUrl]
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = (process.argv[2] || 'http://127.0.0.1:4321').replace(/\/$/, '');

const urls = new Set(['/', '/favicon.svg', '/apple-touch-icon.png', '/og-image.jpg', '/robots.txt']);

const html = await readFile(path.join(ROOT, 'dist', 'index.html'), 'utf8');
for (const m of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) urls.add(m[1]);

for (const f of await readdir(path.join(ROOT, 'dist', 'assets'))) urls.add(`/assets/${f}`);

const manifest = await readFile(path.join(ROOT, 'src', 'data', 'assets.generated.ts'), 'utf8');
for (const m of manifest.matchAll(/"(?:thumb|large)": "([^"]+)"/g)) urls.add(m[1]);

const failures = [];
let ok = 0;
const list = [...urls];
for (let i = 0; i < list.length; i += 16) {
  await Promise.all(
    list.slice(i, i + 16).map(async (u) => {
      try {
        const res = await fetch(BASE + encodeURI(u));
        await res.arrayBuffer();
        if (res.status === 200) ok++;
        else failures.push(`${res.status} ${u}`);
      } catch (e) {
        failures.push(`ERR ${u} ${e.message}`);
      }
    }),
  );
}

console.log(`[links] ${ok}/${list.length} files returned 200 from ${BASE}`);
failures.forEach((f) => console.error('   ' + f));
process.exit(failures.length ? 1 : 0);
