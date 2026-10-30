// Everything the "Ask about my work" feature may quote, emitted at build time.
// The Worker (src/worker.ts) and the browser fallback both rank this with lib/retrieve.ts.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import type { Passage } from '../lib/retrieve';
import { profile, about, now, proof } from '../data/profile';
import { experience, education, anchor } from '../data/experience';
import { merged, credited, hallOfFame, ossStats } from '../data/oss';
import { placements, ofText, also, issuers, featuredCerts, certCount } from '../data/credentials';
import { indexProjects, archive } from '../data/projects';
import { papers, notes } from '../data/research';
import gh from '../data/github.json';

const plain = (s: string) => s.replace(/[*`]/g, '').replace(/\s+/g, ' ').trim();

export const GET: APIRoute = async () => {
  const out: Passage[] = [];
  const add = (title: string, href: string, text: string) => out.push({ title, href, text: plain(text) });

  add('About Karthik', '/', `${profile.name}, ${profile.role}, based in ${profile.location}. ${profile.description}`);
  about.forEach((t) => add('About Karthik', '/', t));
  add('What Karthik is doing now', '/', now);
  add('Headline results', '/', proof.map((p) => `${p.value} ${p.of}: ${p.label} (${p.note})`).join('. '));
  add('Contact', '/#contact', `Email ${profile.email}. Phone ${profile.phone}. Open to applied AI and ML roles.`);

  for (const w of (await getCollection('work')).sort((a, b) => a.data.order - b.data.order)) {
    const d = w.data, href = `/work/${w.id}/`, kind = d.kind === 'case' ? 'case study' : 'product';
    add(`${d.title}: overview`, href, `${d.title} is a ${kind}. ${d.hook} ${d.users ? `Who it is for: ${d.users}` : ''} ${d.placement ?? ''} Role: ${d.role}. Year ${d.year}. Skills: ${d.skills.join(', ')}. Stack: ${d.stack.join(', ')}.`);
    add(`${d.title}: key results`, href, d.metrics.map((m) => `${m.value} ${m.label}`).join('. '));
    add(`${d.title}: pipeline`, href, d.pipeline.map((p) => `${p.name}: ${p.detail}`).join('. '));
    add(`${d.title}: ${d.kind === 'case' ? 'what I carry forward' : 'next on the roadmap'}`, href, d.next.join(' '));
    let heading = '';
    for (const block of (w.body ?? '').split(/\n\s*\n/)) {
      const t = block.trim();
      if (t.startsWith('## ')) heading = t.slice(3).trim();
      else if (t) add(`${d.title}: ${heading || 'details'}`, href, t);
    }
  }

  for (const x of experience) {
    const href = `/experience#${anchor(x.org)}`;
    add(`${x.org}: ${x.role}`, href, `${x.when}. Stack: ${x.stack}.`);
    x.points.forEach((p) => add(`${x.org}: ${x.role}`, href, p));
  }
  add('Education', '/experience#education', `${education.degree}, ${education.school}, ${education.when}. Coursework: ${education.coursework}.`);

  add('Open source overview', '/open-source', `${ossStats.merged} merged pull requests across ${ossStats.projects} projects, ${ossStats.stars} combined stars, including PyTorch, pandas and mem0.`);
  for (const p of merged) add(`${p.project} pull request ${p.n}`, '/open-source', `Merged in ${p.project} (${p.stars} stars). ${p.what}`);
  for (const c of credited) add(`${c.project}: credited fix`, '/open-source', c.text);
  add('Langfuse security Hall of Fame', '/open-source', hallOfFame.text);

  for (const p of placements) add(p.event, '/achievements#placements', `${p.rank} ${ofText(p.of)}. ${p.note}`);
  add(also.event, '/achievements#placements', `${also.rank} ${also.note}`);
  add('Featured certifications', '/achievements#certifications', `Most relevant for applied AI: ${featuredCerts.map(([i, n]) => `${n} (${i})`).join('; ')}.`);
  for (const i of issuers) add(`Certifications: ${i.name}`, '/achievements#certifications', `${certCount} certifications in all. ${i.name}: ${i.certs.map((c) => c.name + (c.note ? ` (${c.note})` : '')).join('; ')}.`);

  for (const p of papers) {
    add(`Research paper: ${p.title}`, `/research#${p.id}`, `${p.venue}, ${p.status}. ${p.authors}. Topics: ${p.topics.join(', ')}.`);
    p.abstract.forEach((t) => add(`Research paper: ${p.title}`, `/research#${p.id}`, t));
  }
  for (const n of notes) add(`${n.kind}: ${n.name}`, '/research', n.text);

  for (const p of indexProjects) add(`Project: ${p.name}`, '/projects', `${p.what} For: ${p.who} ${p.fact}. Stack: ${p.stack.join(', ')}. Skills: ${p.skills.join(', ')}. Areas: ${p.roles.join(', ')}.${p.live ? ` Live: ${p.live}.` : ''}`);
  for (const a of archive) add(`Earlier project: ${a.name}`, '/projects', `${a.what} Stack: ${a.stack}.`);

  for (const w of (await getCollection('writing'))) {
    const href = `/writing/${w.id}/`;
    add(`Post: ${w.data.title}`, href, `${w.data.description} Skills and techniques: ${w.data.skills.join(', ')}.`);
    let heading = '';
    for (const block of (w.body ?? '').split(/\n\s*\n/)) {
      const t = block.trim();
      if (t.startsWith('## ')) heading = t.slice(3).trim();
      else if (t && !t.startsWith('<') && !t.startsWith('|') && !t.startsWith('```')) add(`Post: ${w.data.title}, ${heading || 'intro'}`, href, t);
    }
  }

  add('GitHub activity', '/open-source', `As of ${gh.asOf}: ${gh.contributions} contributions in the past year, ${gh.commits} commits, ${gh.prs} pull requests opened, ${gh.mergedPRs} merged across all repositories, ${gh.activeDays} active days, longest streak ${gh.longestStreak} days. Languages: ${gh.languages.map((l) => `${l.name} ${l.pct}%`).join(', ')}.`);

  return new Response(JSON.stringify(out), { headers: { 'content-type': 'application/json' } });
};
