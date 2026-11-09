// Generates web-ready WebP derivatives of the source assets into public/media
// and writes a typed manifest to src/data/assets.generated.ts.
// Source files are only ever read, never modified.
import { readdir, stat, mkdir, writeFile, readFile, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');
const MEDIA = path.join(PUBLIC, 'media');
const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

const GROUPS = [
  { key: 'gallery', dir: 'Gallery', thumb: 900, large: 2200, quality: 78 },
  { key: 'logos', dir: 'Logos', thumb: 480, large: 960, quality: 90 },
  { key: 'certWorkshop', dir: 'Workshop & Course Certificates', thumb: 900, large: 2400, quality: 84 },
  { key: 'certHackathon', dir: 'Hackathon, Ideathon, Project Exibition, Conference Certificates', thumb: 900, large: 2400, quality: 84 },
  {
    key: 'certInternship',
    dir: 'Internship Certificates',
    thumb: 900,
    large: 2400,
    quality: 84,
    // Logo files in this folder duplicate the ones in Logos/
    exclude: (name) => /logo/i.test(name),
  },
  { key: 'certSocial', dir: 'Social Activity Certificates', thumb: 900, large: 2400, quality: 84 },
  { key: 'certCouncil', dir: 'Student Council', thumb: 900, large: 2400, quality: 84 },
  { key: 'certEducational', dir: 'Educational Certificates', thumb: 900, large: 2400, quality: 84 },
];

const SINGLES = [
  { key: 'heroPortrait', file: 'Hero Section.png', thumb: 1100, large: 2400, quality: 86 },
  { key: 'profilePortrait', file: 'Vedant Lanjekar.jpg', thumb: 800, large: 1600, quality: 86 },
];

const slug = (s) =>
  s
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

async function isFresh(out, srcMtime) {
  if (!existsSync(out)) return false;
  const s = await stat(out);
  return s.mtimeMs >= srcMtime;
}

async function derive(srcAbs, outDir, base, cfg) {
  await mkdir(outDir, { recursive: true });
  const srcStat = await stat(srcAbs);
  const thumbOut = path.join(outDir, `${base}-thumb.webp`);
  const largeOut = path.join(outDir, `${base}-large.webp`);

  const meta = await sharp(srcAbs).rotate().metadata();
  // .rotate() applies EXIF orientation; metadata width/height are pre-rotation
  const swap = meta.orientation && meta.orientation >= 5;
  const width = swap ? meta.height : meta.width;
  const height = swap ? meta.width : meta.height;

  const jobs = [
    [thumbOut, cfg.thumb],
    [largeOut, cfg.large],
  ];
  for (const [out, size] of jobs) {
    if (await isFresh(out, srcStat.mtimeMs)) continue;
    await sharp(srcAbs)
      .rotate()
      .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: cfg.quality, effort: 4 })
      .toFile(out);
  }

  const rel = (p) => '/' + path.relative(PUBLIC, p).split(path.sep).join('/');
  return {
    id: base,
    file: path.basename(srcAbs),
    source: path.relative(ROOT, srcAbs).split(path.sep).join('/'),
    thumb: rel(thumbOut),
    large: rel(largeOut),
    w: width,
    h: height,
    bytes: srcStat.size,
  };
}

const OG_VERSION = 2;

async function buildSocialAssets() {
  const hero = path.join(ROOT, 'Hero Section.png');
  const og = path.join(PUBLIC, 'og-image.jpg');
  const stamp = path.join(MEDIA, `.og-v${OG_VERSION}`);
  const heroStat = await stat(hero);
  if (!(await isFresh(og, heroStat.mtimeMs)) || !existsSync(stamp)) {
    const overlay = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
        <defs>
          <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stop-color="#0B0F12" stop-opacity="0.95"/>
            <stop offset="0.45" stop-color="#0B0F12" stop-opacity="0.75"/>
            <stop offset="0.7" stop-color="#0B0F12" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#fade)"/>
        <rect x="72" y="200" width="44" height="3" fill="#80E3C5"/>
        <text x="72" y="300" font-family="Arial, Helvetica, sans-serif" font-size="78" font-weight="700" fill="#F2F2ED" letter-spacing="-2">VEDANT</text>
        <text x="72" y="380" font-family="Arial, Helvetica, sans-serif" font-size="78" font-weight="700" fill="none" stroke="#F2F2ED" stroke-width="1.6" letter-spacing="-2">LANJEKAR</text>
        <text x="72" y="440" font-family="Consolas, 'Courier New', monospace" font-size="19" fill="#A4ADB5" letter-spacing="1">AI SYSTEMS ENGINEER | FULL-STACK DEVELOPER</text>
        <text x="72" y="470" font-family="Consolas, 'Courier New', monospace" font-size="19" fill="#A4ADB5" letter-spacing="1">COMPUTER VISION &amp; EDGE AI</text>
      </svg>`);
    await sharp(hero)
      .resize({ width: 1200, height: 630, fit: 'cover', position: 'right' })
      .composite([{ input: overlay, top: 0, left: 0 }])
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(og);
    await mkdir(MEDIA, { recursive: true });
    await writeFile(stamp, '');
  }
  const fav = path.join(PUBLIC, 'favicon.svg');
  const touch = path.join(PUBLIC, 'apple-touch-icon.png');
  if (existsSync(fav) && !existsSync(touch)) {
    await sharp(await readFile(fav)).resize(180, 180).png().toFile(touch);
  }
}

/** Documents published as-is (source file in the project root -> public path). */
const DOCUMENTS = [{ file: 'CV.pdf', out: 'documents/Vedant-Lanjekar-CV.pdf' }];

async function copyDocuments() {
  for (const d of DOCUMENTS) {
    const src = path.join(ROOT, d.file);
    if (!existsSync(src)) throw new Error(`Missing document: ${d.file}`);
    const dest = path.join(MEDIA, d.out);
    await mkdir(path.dirname(dest), { recursive: true });
    await copyFile(src, dest);
  }
}

async function main() {
  const t0 = Date.now();
  await copyDocuments();
  const manifest = {};
  let count = 0;

  for (const g of GROUPS) {
    const dirAbs = path.join(ROOT, g.dir);
    const names = (await readdir(dirAbs))
      .filter((n) => IMAGE_RE.test(n))
      .filter((n) => !(g.exclude && g.exclude(n)))
      .sort(naturalSort);
    const out = [];
    for (const n of names) {
      out.push(await derive(path.join(dirAbs, n), path.join(MEDIA, slug(g.key)), slug(n), g));
      count++;
    }
    manifest[g.key] = out;
  }

  for (const s of SINGLES) {
    manifest[s.key] = await derive(path.join(ROOT, s.file), path.join(MEDIA, 'portrait'), slug(s.file), s);
    count++;
  }

  await buildSocialAssets();

  const header =
    '// AUTO-GENERATED by scripts/build-assets.mjs. Do not edit by hand.\n' +
    "import type { ImageAsset } from './types';\n\n";
  const body = Object.entries(manifest)
    .map(([k, v]) => {
      const type = Array.isArray(v) ? 'ImageAsset[]' : 'ImageAsset';
      return `export const ${k}: ${type} = ${JSON.stringify(v, null, 2)};\n`;
    })
    .join('\n');
  await writeFile(path.join(ROOT, 'src', 'data', 'assets.generated.ts'), header + body);

  console.log(`[assets] ${count} images processed in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
