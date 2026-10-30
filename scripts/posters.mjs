// Renders OG images (1200×630) into public/og/ from the /poster/ page.
// Needs a built site being served: `npm run build && npm run preview`, then `npm run posters`.
// Uses the system Chrome via playwright-core (no browser download).
import { chromium } from 'playwright-core';
import { readFileSync, readdirSync, mkdirSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4321';
const field = (src, key) => src.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'))?.[1] ?? '';

// first metric as "value label", label cut to 8 words
const lead = (src) => {
  const m = src.match(/value: "([^"]+)", label: "([^"]+)"/);
  return m ? `${m[1]} · ${m[2].split(' ').slice(0, 8).join(' ')}` : '';
};

const jobs = [{ id: 'home', shape: 'constellation', title: 'G. Karthik Koundinya', kicker: 'Applied AI Engineer and Researcher', metric: 'Measured, not claimed.' }];
for (const f of readdirSync('src/content/work')) {
  const src = readFileSync(`src/content/work/${f}`, 'utf8');
  jobs.push({
    id: f.replace(/\.md$/, ''),
    shape: field(src, 'specimen'),
    title: field(src, 'title'),
    kicker: field(src, 'kicker'),
    metric: field(src, 'placement') || lead(src),
  });
}

mkdirSync('public/og', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', args: ['--use-angle=d3d11', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const j of jobs) {
  const q = new URLSearchParams({ shape: j.shape, title: j.title, kicker: j.kicker, metric: j.metric, offset: '2.4' });
  await page.goto(`${base}/poster/?${q}`, { waitUntil: 'networkidle' });
  await page.waitForSelector('html[data-ready]');
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/${j.id}.png` });
  console.log('og', j.id);
}
await browser.close();
