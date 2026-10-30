// All page behaviour. Content is complete HTML without this; everything here is enhancement.
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import type { Field } from '../three/field';
import type { Shape } from '../three/specimens';
import type { Passage } from '../lib/retrieve';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;
const root = document.documentElement;
const isLight = () => root.dataset.theme !== 'dark';

// ── Device tier ───────────────────────────────────────────────────────────
const mem = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
const cores = navigator.hardwareConcurrency ?? 8;
const narrow = innerWidth <= 768; // phones: the field is confined to the top of the page (see global.css)
const low = !fine || narrow || mem <= 4 || cores <= 4;

// ── Field: one fixed full-viewport canvas behind every page ───────────────
let field: Field | null = null;
const canvas = document.getElementById('field') as HTMLCanvasElement;
const page = document.body.dataset.shape as Shape;
const live = document.querySelector<HTMLElement>('[data-live]');
const liveIdle = live?.textContent ?? '';

// Camera sits at z 8.5 with a 40° fov: world x of a screen x. Narrow screens keep the shape centred.
const worldX = (px: number) => (innerWidth >= 1024 ? ((px / innerWidth) * 2 - 1) * Math.tan(Math.PI / 9) * 8.5 * (innerWidth / innerHeight) : 0);

/** The page's own shape, parked to the right of the hero text on wide screens. */
function rest() {
  field?.setShape(page, worldX(innerWidth * 0.76));
  field?.setAttract(document.body.dataset.attract ? 1 : 0);
  if (live) live.textContent = liveIdle;
}

/** Morph to an element's specimen and name it in the live label. */
function use(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  field?.setShape(el.dataset.shape as Shape, fine ? worldX(r.left + r.width / 2) : 0);
  field?.setAttract(0);
  if (live) live.textContent = el.dataset.title ? `Field now showing: ${el.dataset.title}, ${el.dataset.field}` : liveIdle;
}

const atEnd = () => innerHeight + scrollY >= document.documentElement.scrollHeight - 4;

function watchShapes() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-shape]:not(body)')];
  if (!els.length) return;
  if (fine) {
    // mouse and keyboard: hovering or focusing a project card puts its specimen behind it
    for (const el of els.filter((e) => e.dataset.title)) {
      el.addEventListener('pointerenter', () => use(el));
      el.addEventListener('pointerleave', rest);
      el.addEventListener('focusin', () => use(el));
      el.addEventListener('focusout', rest);
    }
    return;
  }
  // touch: the shape follows whatever sits on the centre line of the screen
  const io = new IntersectionObserver(
    (entries) => { for (const e of entries) if (e.isIntersecting && !atEnd()) use(e.target as HTMLElement); },
    { rootMargin: '-48% 0px -48% 0px' },
  );
  els.forEach((el) => io.observe(el));
  // the last block can't scroll up to the centre line, so claim it at the bottom of the page
  addEventListener('scroll', () => { if (atEnd()) use(els[els.length - 1]); }, { passive: true });
}

async function startField() {
  if (narrow && !document.body.dataset.attract) return; // phones: the field lives behind the home hero only
  if (!document.createElement('canvas').getContext('webgl2')) return;
  const { createField } = await import('../three/field');
  field = createField(canvas, {
    count: narrow ? 12000 : low ? 26000 : 70000,
    dpr: low ? 1 : Math.min(2, devicePixelRatio),
    still: reduced,
    light: isLight(),
  });
  rest();
  requestAnimationFrame(() => canvas.classList.add('on'));
  if (narrow) new IntersectionObserver(([e]) => field?.setVisible(e.isIntersecting)).observe(canvas); // no shape-following either: it sits behind the hero only
  else watchShapes();
  addEventListener('resize', rest);
}

// idle start so text paints first and three.js never blocks LCP
const idle = (window as { requestIdleCallback?: (cb: () => void, o?: object) => void }).requestIdleCallback;
idle ? idle(startField, { timeout: 1200 }) : setTimeout(startField, 300);

// ── Theme: light by default, dark on request (the head script set the saved one) ─
const themeBtn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]')!;
themeBtn.setAttribute('aria-pressed', String(!isLight()));
themeBtn.addEventListener('click', () => {
  root.dataset.theme = isLight() ? 'dark' : 'light';
  try { localStorage.setItem('theme', root.dataset.theme); } catch { /* private mode: the choice just won't persist */ }
  themeBtn.setAttribute('aria-pressed', String(!isLight()));
  document.querySelector('meta[name=theme-color]')?.setAttribute('content', getComputedStyle(document.body).backgroundColor);
  field?.setTheme(isLight());
});

// ── Scroll ────────────────────────────────────────────────────────────────
let lenis: Lenis | null = null;
if (!reduced) {
  lenis = new Lenis({ duration: 1.1, anchors: true });
  lenis.on('scroll', (l: Lenis) => {
    field?.setVelocity(Math.max(-1.5, Math.min(1.5, l.velocity / 40)));
    field?.setProgress(l.progress);
  });
  const raf = (t: number) => { lenis!.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

// the cursor gathers nearby points of the field
addEventListener('pointermove', (e) => {
  field?.setMouse((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
}, { passive: true });

// ── Reveal and counters ──────────────────────────────────────────────────
function count(el: HTMLElement) {
  const end = parseFloat(el.dataset.count!);
  const dec = (el.dataset.count!.split('.')[1] ?? '').length;
  const t0 = performance.now(), dur = 1400;
  const tick = (now: number) => {
    const k = Math.min(1, (now - t0) / dur), e = 1 - (1 - k) ** 4;
    el.textContent = (end * e).toFixed(dec);
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const seen = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    const el = e.target as HTMLElement;
    el.classList.add('in');
    if (!reduced) {
      el.querySelectorAll<HTMLElement>('[data-count]').forEach(count);
    }
    seen.unobserve(el);
  }
}, { rootMargin: '0px 0px -12% 0px' });
document.querySelectorAll('[data-reveal]').forEach((el) => seen.observe(el));
// ── Cursor (fine pointers only) ────────────────────────────────
if (fine && !reduced) {
  const cur = document.querySelector<HTMLElement>('.cursor')!;
  const dot = cur.querySelector<HTMLElement>('.cdot')!, ring = cur.querySelector<HTMLElement>('.ring')!;
  document.documentElement.classList.add('has-cursor');
  let mx = -100, my = -100, rx = -100, ry = -100;

  addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
  }, { passive: true });

  addEventListener('pointerover', (e) => {
    const t = e.target as Element;
    cur.classList.toggle('hover', !!t.closest('a, button, [role="option"]'));
    cur.classList.toggle('hidden', !!t.closest('input, textarea'));
  }, { passive: true });

  const loop = () => {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    dot.style.transform = `translate3d(${mx}px,${my}px,0)`;
    ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
    requestAnimationFrame(loop);
  };
  loop();
}

// ── Dialogs: mobile menu + command palette (native <dialog> traps focus) ──
function dialog(sel: string) {
  const d = document.querySelector<HTMLDialogElement>(sel)!;
  d.addEventListener('close', () => lenis?.start());
  return {
    d,
    open() { lenis?.stop(); d.showModal(); },
    close() { d.close(); },
  };
}

const menu = dialog('[data-menu]');
document.querySelector('[data-menu-open]')?.addEventListener('click', menu.open);
menu.d.querySelectorAll('[data-menu-close], a:not([target])').forEach((b) => b.addEventListener('click', menu.close));

// ── Palette: search commands, or ask a question ───────────────────────────
interface Item { label: string; hint: string; href?: string; ask?: string }
const pal = dialog('[data-palette]');
const input = pal.d.querySelector('input')!, list = pal.d.querySelector('ul')!;
const answerEl = pal.d.querySelector<HTMLElement>('[data-answer]')!;
const commands: Item[] = JSON.parse(document.getElementById('commands')!.textContent!);
let hits: Item[] = commands, sel = 0, req = 0;

function render() {
  const q = input.value.trim();
  const found = commands.filter((c) => `${c.label} ${c.hint}`.toLowerCase().includes(q.toLowerCase()));
  const ask: Item | null = q.length >= 3 ? { label: `Ask: “${q}”`, hint: 'Answer from my portfolio', ask: q } : null;
  // a sentence-like query defaults to Ask; a short keyword defaults to navigation
  const askFirst = ask && (q.includes('?') || q.split(/\s+/).length >= 3 || !found.length);
  hits = ask ? (askFirst ? [ask, ...found] : [...found, ask]) : found;
  sel = Math.min(sel, Math.max(0, hits.length - 1));
  list.innerHTML = '';
  hits.forEach((c, i) => {
    const li = document.createElement('li');
    li.id = `cmd-${i}`;
    li.className = c.ask ? 'ask' : '';
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', String(i === sel));
    li.innerHTML = `<span></span><small></small>`;
    li.firstChild!.textContent = c.label;
    li.lastChild!.textContent = c.hint;
    li.addEventListener('click', () => choose(c));
    list.append(li);
  });
  input.setAttribute('aria-activedescendant', hits.length ? `cmd-${sel}` : '');
}

function choose(c: Item) {
  if (c.ask) return void ask(c.ask);
  pal.close();
  if (c.href!.startsWith('http')) open(c.href!, '_blank', 'noopener');
  else location.href = c.href!;
}

const snippet = (t: string) => (t.length > 200 ? `${t.slice(0, 200).replace(/\s+\S*$/, '')}…` : t);

async function ask(q: string) {
  const mine = ++req;
  list.hidden = true;
  answerEl.hidden = false;
  answerEl.innerHTML = '<p class="q"></p><p class="a wait"></p><p class="how"></p><ol></ol>';
  const [qe, a, how, ol] = [...answerEl.children] as HTMLElement[];
  qe.textContent = `Question: ${q}`;
  const show = (text: string, note: string, src: { title: string; href: string }[] = []) => {
    if (mine !== req) return;
    a.classList.remove('wait');
    a.textContent = text;
    how.textContent = note;
    src.forEach((s, i) => {
      const l = ol.appendChild(document.createElement('li')).appendChild(document.createElement('a'));
      l.href = s.href;
      l.innerHTML = `<b>${i + 1}</b>`;
      l.append(s.title);
    });
  };
  try {
    const r = await fetch('/api/ask', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ q }), signal: AbortSignal.timeout(20000) });
    if (!r.ok) throw new Error(String(r.status)); // 429, 5xx, or no worker (local preview): fall back below
    const d = (await r.json()) as { answer: string; sources: { title: string; href: string }[] };
    show(d.answer, 'AI answer written from the numbered passages below. Check the sources.', d.sources);
  } catch {
    try {
      const [{ retrieve }, corpus] = await Promise.all([import('../lib/retrieve'), fetch('/corpus.json').then((r) => r.json() as Promise<Passage[]>)]);
      const top = retrieve(corpus, q, 3);
      show(top.length ? top.map((p, i) => `${i + 1}. ${p.title}: ${snippet(p.text)}`).join('\n\n') : "I don't have that in my portfolio.", 'Showing matching passages (AI answer offline).', top);
    } catch {
      show("I couldn't load my notes just now.", 'Offline. Try the search list instead.');
    }
  }
}

function openPalette() {
  input.value = '';
  sel = 0;
  list.hidden = false;
  answerEl.hidden = true;
  render();
  pal.open();
  input.focus();
}
document.querySelectorAll('[data-palette-open]').forEach((b) => b.addEventListener('click', () => openPalette()));
addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); pal.d.open ? pal.close() : openPalette(); }
});
answerEl.addEventListener('click', (e) => { if ((e.target as Element).closest('a')) pal.close(); });
input.addEventListener('input', () => {
  req++; // drop any answer still in flight
  sel = 0;
  list.hidden = false;
  answerEl.hidden = true;
  render();
});
input.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + hits.length) % Math.max(1, hits.length);
    render();
    list.children[sel]?.scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'Enter' && hits[sel]) choose(hits[sel]);
});
pal.d.addEventListener('click', (e) => { if (e.target === pal.d) pal.close(); }); // backdrop

// ── Filters (projects index + OSS ledger) ─────────────────────────────────
document.querySelectorAll<HTMLElement>('[data-filters]').forEach((group) => {
  const items = document.querySelectorAll<HTMLElement>(`#${group.dataset.filters} > li`);
  group.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>('button[data-filter]');
    if (!b) return;
    const f = b.dataset.filter!;
    const apply = () => {
      group.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      items.forEach((li) => { li.hidden = f !== 'all' && !li.dataset.tags!.split('|').includes(f); });
      lenis?.resize();
    };
    const doc = document as { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
    if (reduced || !doc.startViewTransition) return apply();
    // name each card so the browser animates them like a Flip; the page itself stays put
    const root = document.documentElement;
    root.classList.add('vt-filter');
    items.forEach((li, i) => { li.style.viewTransitionName = `f${i}`; });
    doc.startViewTransition(apply).finished.finally(() => {
      root.classList.remove('vt-filter');
      items.forEach((li) => { li.style.viewTransitionName = ''; });
    });
  });
});
