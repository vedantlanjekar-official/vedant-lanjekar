// Data-integrity check: every content line of the source Markdown must appear,
// verbatim, in the site data (src/data/*.ts). Author-facing editorial notes that
// were intentionally omitted are listed in OMITTED and reported separately.
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(ROOT, 'Vedant_Lanjekar_Raw_Data.md');
const DATA_DIR = path.join(ROOT, 'src', 'data');

// Intentionally omitted author-facing notes (prefix match on the cleaned line).
const OMITTED = [
  'Editorial note:',
  'Editorial distinction:',
  'Portfolio structuring note:',
  'The amount above is retained as supplied.',
  'Technology Presentation Requirement:',
  'Presentation requirement:',
  'Organization Logo:',
  'Organization Logos:',
  'Organization / Program Logos:',
  'Optional Portfolio Detail',
  'Professional Portfolio — Master Content',
  // Removed at the owner's request (BuildWyse and Stack Notes team notes).
  'Formal co-founder designations should be confirmed by both members before publication.',
  'The supplied information identifies both individuals as collaborators.',
];

// Source values the portfolio owner explicitly asked to remove from the site.
const OWNER_REMOVED = new Set(['Java', 'C++']);

// Spelling corrections made by the portfolio owner: source value -> value on the site.
const OWNER_CORRECTIONS = new Map([['Pranav Shined', 'Pranav Shinde']]);

// Sections whose bullets are author instructions rather than portfolio content.
const OMITTED_BLOCKS = [
  { start: /^6\.3\.9 Additional Information to Establish/, end: /^Portfolio structuring note/ },
  { start: /^Content Source: Galary Folder/, end: /^15\. Professional References/ },
];

// Section labels in the source that are rendered as UI headings, not data.
const LABELS = new Set(
  [
    'Overview', 'Vision', 'Mission', 'Objectives', 'Technical Stack', 'Repository:', 'Seven Applications',
    'Application-Level Vision, Mission, and Objectives', 'Ecosystem Access', 'Technology Areas',
    'Research Publication', 'Key Learning Areas:', 'Key Responsibilities', 'Organization Overview',
    'Role Overview', 'Applications Developed', 'Core Contributions', 'Key Contributions', 'Manager Contact',
    'Organizations:', 'Founding Team:', 'Proposed Founding Team:', 'Semester-wise Academic Performance',
    'Reported Cumulative Prize Money',
  ].map((s) => s.toLowerCase()),
);

const norm = (s) =>
  s
    .replace(/\\'/g, "'")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const stripUtm = (u) => u.replace(/\?utm_source=chatgpt\.com/g, '');

function clean(line) {
  return line
    .replace(/\\\|/g, '|')
    .replace(/\\-/g, '-')
    .replace(/\\\./g, '.')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t) => stripUtm(t))
    .replace(/<(https?:[^>]+)>/g, (_, u) => stripUtm(u))
    .replace(/<([^>@\s]+@[^>\s]+)>/g, '$1')
    .replace(/\*\*/g, '')
    .trim();
}

async function main() {
  const md = await readFile(SOURCE, 'utf8');
  const files = (await readdir(DATA_DIR)).filter((f) => f.endsWith('.ts') && !f.includes('generated'));
  const dataRaw = (await Promise.all(files.map((f) => readFile(path.join(DATA_DIR, f), 'utf8')))).join('\n');
  const data = norm(dataRaw);
  const has = (s) => data.includes(norm(s));

  const missing = [];
  const omitted = [];
  let checked = 0;
  let inOmittedBlock = null;

  const check = (s, ctx) => {
    let t = s.trim().replace(/^[-–]\s*/, '');
    for (const [from, to] of OWNER_CORRECTIONS) t = t.split(from).join(to);
    if (!t || t.length < 2) return;
    if (LABELS.has(t.toLowerCase())) return;
    if (OWNER_REMOVED.has(t)) {
      omitted.push(`(removed by owner) ${t}`);
      return;
    }
    checked++;
    if (has(t)) return;
    // Titles are stored as separate name / subtitle fields.
    if (t.includes(' — ') && t.split(' — ').every((p) => has(p))) return;
    missing.push({ text: t, ctx });
  };

  const lines = md.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    if (!raw.trim()) continue;
    let line = clean(raw);
    const plain = line.replace(/^\*([^*].*[^*])\*$/, '$1').trim();

    if (inOmittedBlock) {
      if (inOmittedBlock.end.test(plain)) inOmittedBlock = null;
      else {
        omitted.push(plain);
        continue;
      }
    }
    const block = OMITTED_BLOCKS.find((b) => b.start.test(plain));
    if (block) {
      inOmittedBlock = block;
      omitted.push(plain);
      continue;
    }
    if (OMITTED.some((p) => plain.startsWith(p) || plain.includes(p))) {
      omitted.push(plain);
      if (!plain.includes('Optional Portfolio Detail')) continue;
    }

    const ctx = `line ${i + 1}`;

    // Tables: check every non-header cell.
    if (line.startsWith('|')) {
      if (/^\|[-\s|]+\|$/.test(line)) continue;
      const cells = line.split('|').map((c) => c.trim()).filter(Boolean);
      const header = cells.every((c) => /^(No\.|Technical Domain|Semester|SGPA|Academic Period|Board|Overall Grade|Member|Designation|Detail|Information|Platform|Profile \/ Identifier)$/.test(c));
      if (!header) cells.forEach((c) => check(c, ctx));
      continue;
    }

    // Headings (whole line was bold).
    const wasHeading = /^\*\*.*\*\*$/.test(raw.trim());
    if (wasHeading) {
      let h = plain.replace(/^\d+(\.\d+)*\.?\s+/, '');
      const dur = h.match(/\(([^)]*\d{4}[^)]*)\)$/);
      if (dur) {
        check(dur[1], ctx + ' (duration)');
        h = h.replace(dur[0], '').trim();
      }
      const isEntry = /^(2\.\d|4\.\d+|5\.\d |6\.\d |7\.\d|8\.\d|9\.\d\.\d|9\.\d |10\.\d|11\.\d|12\.\d|13\.\d|15\.\d)/.test(plain + ' ');
      if (isEntry) {
        h.replace(' — Optional Portfolio Detail', '')
          .split(/ — | \| /)
          .forEach((p) => check(p, ctx + ' (heading)'));
      }
      continue;
    }

    // List markers.
    line = plain.replace(/^(\d+\.\s+|-\s+)/, '');

    // "Label: value" pairs.
    const kv = line.match(/^([A-Za-z /&()-]{2,40}):\s+(.+)$/);
    if (kv && !/^https?$/.test(kv[1])) {
      const value = kv[2].trim();
      if (/·/.test(value)) value.split(' · ').forEach((v) => check(v, ctx));
      else check(value, ctx);
      continue;
    }
    if (/ · /.test(line)) {
      line.split(' · ').forEach((v) => check(v, ctx));
      continue;
    }
    if (/\*[^*]+\*/.test(line)) {
      line.split(/\*/).forEach((v) => check(v, ctx));
      continue;
    }
    check(line, ctx);
  }

  // Structural counts.
  const count = (re) => (dataRaw.match(re) || []).length;
  const counts = {
    projects: count(/^\s{4}num: '4\.\d+',/gm),
    achievements: count(/num: '9\.\d\.\d+'/g),
    certifications: count(/num: '8\.\d+'/g),
    leadership: count(/num: '10\.\d'/g),
    strengths: count(/num: '11\.\d+'/g),
    references: count(/num: '15\.\d'/g),
  };
  const expected = { projects: 19, achievements: 28, certifications: 10, leadership: 5, strengths: 10, references: 3 };
  const countErrors = Object.entries(expected).filter(([k, v]) => counts[k] !== v);

  console.log(`[verify] ${checked} source values checked against src/data`);
  console.log(`[verify] counts: ${JSON.stringify(counts)}`);
  console.log(`[verify] ${omitted.length} author-facing note lines intentionally omitted`);
  if (process.argv.includes('--show-omitted')) omitted.forEach((o) => console.log('   omitted: ' + o.slice(0, 110)));

  if (missing.length || countErrors.length) {
    missing.forEach((m) => console.error(`   MISSING (${m.ctx}): ${m.text}`));
    countErrors.forEach(([k, v]) => console.error(`   COUNT ${k}: expected ${v}, found ${counts[k]}`));
    console.error(`[verify] FAILED: ${missing.length} missing values, ${countErrors.length} count errors`);
    process.exit(1);
  }
  console.log('[verify] OK — all source content present');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
