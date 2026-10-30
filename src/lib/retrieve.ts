// BM25 over the site's own published content. Shared by the Ask worker and the
// offline fallback in the browser, so both rank passages identically.

export interface Passage {
  title: string;
  href: string;
  text: string;
}

const STOP = new Set(
  'a an and are as at be by did do does for from has have he his how i in is it its me my of on or so that the their them this to was what when where which who why with you your karthik koundinya g about tell'.split(' '),
);

export function tokens(s: string): string[] {
  return s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9.%+#]+/g, ' ').split(' ')
    .map((t) => t.replace(/^[.]+|[.]+$/g, ''))
    .filter((t) => t.length > 1 && !STOP.has(t));
}

// Index built once per corpus array: re-tokenizing every passage per query costs more CPU than a free Worker gets.
const indexes = new WeakMap<Passage[], { docs: string[][]; df: Map<string, number>; avg: number }>();

function index(corpus: Passage[]) {
  let ix = indexes.get(corpus);
  if (ix) return ix;
  const docs = corpus.map((p) => tokens(`${p.title} ${p.title} ${p.text}`)); // title counted twice
  const avg = docs.reduce((a, d) => a + d.length, 0) / docs.length;
  const df = new Map<string, number>();
  for (const d of docs) for (const t of new Set(d)) df.set(t, (df.get(t) ?? 0) + 1);
  indexes.set(corpus, (ix = { docs, df, avg }));
  return ix;
}

export function retrieve(corpus: Passage[], query: string, k = 5): (Passage & { score: number })[] {
  const q = [...new Set(tokens(query))];
  if (!q.length) return [];
  const { docs, df, avg } = index(corpus);
  const N = docs.length, k1 = 1.4, b = 0.75;
  return docs
    .map((d, i) => {
      let score = 0;
      for (const t of q) {
        const n = df.get(t);
        if (!n) continue;
        let tf = 0;
        for (const w of d) if (w === t) tf++;
        if (!tf) continue;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        score += idf * ((tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * d.length) / avg)));
      }
      return { ...corpus[i], score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
