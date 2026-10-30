// Content audit: the site claims "measured, not claimed", so every number it shows must appear
// verbatim in 29-10-26/, UPDATES.md (newer facts), the optional gitignored sources/ folder
// (plain-text facts extracted from the master CV, the Amazon ML docs and the RAIT paper) or the
// GitHub snapshot (src/data/github.json, minus its daily calendar). Run: npm run audit
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';

const dirs = ['29-10-26', 'sources']; // sources/ is gitignored: skipped when absent
const { calendar: _calendar, ...githubStats } = JSON.parse(readFileSync('src/data/github.json', 'utf8'));
const sources = [
  ...dirs.filter(existsSync).flatMap((d) => readdirSync(d).filter((f) => /\.(md|txt)$/.test(f)).map((f) => readFileSync(`${d}/${f}`, 'utf8'))),
  readFileSync('UPDATES.md', 'utf8'),
  JSON.stringify(githubStats),
].join('\n');

const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]));
const files = [
  ...walk('src/data').filter((f) => !f.endsWith('github.json')), // the snapshot is a source, not a claim
  ...walk('src/content'),
  ...walk('src/sections'),
  ...walk('src/components'),
  ...walk('src/layouts'),
  ...walk('src/pages').filter((f) => !f.endsWith('poster.astro')), // poster is a render target, not content
  'public/llms.txt',
];

// Numbers that are layout, dates or URLs rather than claims.
const ignore = new Set(['2023', '2024', '2025', '2026', '2027', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '01', '02', '03', '04', '05', '06', '07', '100', '1200', '630' /* OG image size */, '400' /* font weight */]);

let problems = [];
for (const file of files) {
  const text = readFileSync(file, 'utf8')
    .replace(/https?:\/\/\S+/g, '') // URLs
    .replace(/\b(viewBox|x\d?|y\d?|width|height|stroke-width|font-size|cx|cy|r|d|transform)="[^"]*"/g, '') // SVG geometry
    .replace(/#[0-9a-f]{6}\b/gi, '') // colours
    .replace(/gh\('[^']+', \d+\)/g, '') // PR URL builders
    .replace(/tel:\+?\d+|\+91[ \d]+/g, '') // the contact phone number, published with consent
    .replace(/^\s*\/\/.*$/gm, '') // code comments
    .replace(/^(year|order|date|updated):.*$/gm, '');
  for (const m of text.matchAll(/\d[\d,.]*\d|\d/g)) {
    const n = m[0].replace(/[.,]$/, '');
    // whole-number match: "24" must not pass on "124", "1,024" or "3.24"
    const whole = new RegExp(`(?<![\\d.,])${n.replace(/[.]/g, '\\.')}(?![\\d]|[.,]\\d)`);
    if (ignore.has(n) || whole.test(sources)) continue;
    problems.push(`${file}: "${n}" not found in ${dirs.join('/, ')}/, UPDATES.md or github.json`);
  }
}

// Rules from the source files.
const all = [...files, 'src/worker.ts', 'src/scripts/app.ts'].map((f) => readFileSync(f, 'utf8').replace(/^\s*\/\/.*$/gm, '')).join('\n');
for (const repo of ['deployment-op03-ten-times-cheaper', 'retail-scope', 'rlgym-266-durable-workflow-engine', 'Tic-Tac-Toe']) {
  if (all.includes(repo)) problems.push(`private repo linked: ${repo}`);
}
if (/\brejected\b/i.test(all)) problems.push('uses the word "rejected" (use Closed-Unmerged)');
if (/orcid/i.test(all)) problems.push('ORCID must not appear: the publications are not public');
if (/codeforces/i.test(all)) problems.push('Codeforces must not appear anywhere');
if (/sole[- ]author/i.test(all)) problems.push('QNC must never be called sole-author');
const nish = readFileSync('src/content/work/nishchay.md', 'utf8');
if (/^placement:/m.test(nish)) problems.push('Nishchay must cite no placement');
const oss = readFileSync('src/data/oss.ts', 'utf8');
const hof = oss.slice(oss.indexOf('export const hallOfFame'));
if (/14789|15040|cache/i.test(hof.slice(0, hof.indexOf('};')))) problems.push('Langfuse Hall of Fame and cache-fix stories must stay separate');

// Merged PR count on the site must match the ledger.
const mergedRows = (oss.match(/^\s+\{ project: '/gm) ?? []).length - 3; // minus the 3 credited rows
assert.equal(mergedRows, 24, `oss.ts merged rows = ${mergedRows}, expected 24`);

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`audit ok: ${files.length} files, every number traced to ${dirs.filter(existsSync).join('/, ')}/, UPDATES.md or github.json`);
