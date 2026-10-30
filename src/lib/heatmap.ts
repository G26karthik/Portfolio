// Contribution heatmap geometry, computed at build time from the github.json calendar.
// Weeks are columns (Sunday first), 7 rows; level 0 is an empty day.

const CELL = 10, GAP = 3;

const level = (n: number) => (n === 0 ? 0 : n < 3 ? 1 : n < 6 ? 2 : n < 12 ? 3 : 4);
// fill opacity per level; the colours come from CSS (.heat .h0 to .h4), so both themes work
const opacity = [1, 0.25, 0.45, 0.7, 1];

export function heatmap(start: string, counts: number[]) {
  const offset = new Date(`${start}T00:00:00Z`).getUTCDay(); // calendar begins on a Sunday, but stay correct if not
  const cells = counts.map((n, i) => {
    const d = i + offset;
    return { x: Math.floor(d / 7) * (CELL + GAP), y: (d % 7) * (CELL + GAP), l: level(n) };
  });
  const weeks = Math.ceil((counts.length + offset) / 7);
  const fmt = (t: number) => new Date(t).toLocaleDateString('en', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  const t0 = Date.parse(`${start}T00:00:00Z`);
  return {
    groups: opacity.map((o, l) => ({ l, opacity: o, cells: cells.filter((c) => c.l === l) })),
    cell: CELL,
    width: weeks * (CELL + GAP) - GAP,
    height: 7 * (CELL + GAP) - GAP,
    from: fmt(t0),
    to: fmt(t0 + (counts.length - 1) * 86400000),
  };
}
