// Snapshot GitHub stats into src/data/github.json (committed, so builds never need a token).
// Run: npm run stats   (uses GITHUB_TOKEN, or the logged-in `gh` CLI)
import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const LOGIN = 'G26karthik';
const token = process.env.GITHUB_TOKEN || execSync('gh auth token', { encoding: 'utf8' }).trim();

const query = `query($login: String!) {
  user(login: $login) {
    createdAt
    followers { totalCount }
    repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC, first: 100, orderBy: {field: PUSHED_AT, direction: DESC}) {
      totalCount
      nodes { stargazerCount languages(first: 6, orderBy: {field: SIZE, direction: DESC}) { edges { size node { name color } } } }
    }
    mergedPRs: pullRequests(states: MERGED) { totalCount }
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
      contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
    }
  }
}`;

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: { authorization: `bearer ${token}`, 'content-type': 'application/json', 'user-agent': 'portfolio-stats' },
  body: JSON.stringify({ query, variables: { login: LOGIN } }),
});
const { data, errors } = await res.json();
if (errors) throw new Error(JSON.stringify(errors));
const u = data.user;

// language share by bytes across original public repos
const bytes = new Map();
for (const r of u.repositories.nodes)
  for (const e of r.languages.edges) {
    const cur = bytes.get(e.node.name) ?? { name: e.node.name, color: e.node.color, size: 0 };
    cur.size += e.size;
    bytes.set(e.node.name, cur);
  }
const total = [...bytes.values()].reduce((a, b) => a + b.size, 0);
const languages = [...bytes.values()]
  .sort((a, b) => b.size - a.size)
  .slice(0, 6)
  .map((l) => ({ name: l.name, color: l.color, pct: Math.round((l.size / total) * 1000) / 10 }));

const days = u.contributionsCollection.contributionCalendar.weeks.flatMap((w) => w.contributionDays);
let streak = 0, best = 0;
for (const d of days) { streak = d.contributionCount ? streak + 1 : 0; best = Math.max(best, streak); }

const out = {
  asOf: new Date().toISOString().slice(0, 10),
  login: LOGIN,
  since: u.createdAt.slice(0, 4),
  repos: u.repositories.totalCount,
  stars: u.repositories.nodes.reduce((a, r) => a + r.stargazerCount, 0),
  followers: u.followers.totalCount,
  mergedPRs: u.mergedPRs.totalCount,
  contributions: u.contributionsCollection.contributionCalendar.totalContributions,
  commits: u.contributionsCollection.totalCommitContributions,
  prs: u.contributionsCollection.totalPullRequestContributions,
  longestStreak: best,
  activeDays: days.filter((d) => d.contributionCount > 0).length,
  languages,
  // one count per day, oldest first, for the heatmap
  calendar: { start: days[0].date, counts: days.map((d) => d.contributionCount) },
};
console.assert(out.calendar.counts.length >= 364, 'calendar should cover a year');
writeFileSync('src/data/github.json', JSON.stringify(out, null, 1) + '\n');
console.log(`github.json: ${out.contributions} contributions, ${out.repos} repos, ${out.mergedPRs} merged PRs, as of ${out.asOf}`);
