// Procedural point "specimens": one shape per project, plus site states.
// Each returns N×4 floats: xyz + tone (0 malachite, 1 carmine signal, 2 bone highlight).
// Seeded, so posters and live renders match.

export type Shape =
  | 'noise' | 'bizmatch' | 'parallax' | 'qnc' | 'router'
  | 'nishchay' | 'triage' | 'constellation' | 'lattice' | 'sphere';

function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Put = (i: number, x: number, y: number, z: number, tone: number) => void;
type Gen = (n: number, put: Put, r: () => number, g: () => number) => void;

const TAU = Math.PI * 2;

/** Uniform point on a unit sphere into out[0..2]. */
function onSphere(r: () => number, out: number[]) {
  const u = r() * 2 - 1, a = r() * TAU, s = Math.sqrt(1 - u * u);
  out[0] = s * Math.cos(a); out[1] = u; out[2] = s * Math.sin(a);
}

const gens: Record<Shape, Gen> = {
  // "10M noisy records": a wide anisotropic cloud with rare carmine outliers.
  noise(n, put, r, g) {
    for (let i = 0; i < n; i++) {
      const tone = r() < 0.012 ? 1 : r() < 0.05 ? 2 : 0;
      // a lopsided galaxy-ish cloud: dense core, long sparse tails
      const k = r() < 0.7 ? 0.55 : 1.25;
      put(i, g() * 1.5 * k, g() * 0.95 * k, g() * 1.1 * k, tone);
    }
  },

  // Entity resolution: records collapse into tight clusters; decoys sit just outside, in carmine.
  bizmatch(n, put, r, g) {
    const K = 72, c: number[][] = [], v = [0, 0, 0];
    for (let k = 0; k < K; k++) {
      onSphere(r, v);
      const rad = 1.4 + r() * 1.3;
      c.push([v[0] * rad * 1.25, v[1] * rad * 0.85, v[2] * rad]);
    }
    for (let i = 0; i < n; i++) {
      const k = c[(r() * K) | 0];
      if (r() < 0.045) {
        onSphere(r, v);
        const d = 0.28 + r() * 0.12;
        put(i, k[0] + v[0] * d, k[1] + v[1] * d, k[2] + v[2] * d, 1);
      } else {
        const s = 0.055;
        put(i, k[0] + g() * s, k[1] + g() * s, k[2] + g() * s, r() < 0.06 ? 2 : 0);
      }
    }
  },

  // Structure from motion: a stepped terrace point cloud under an arc of 23 camera frustums.
  parallax(n, put, r, g) {
    const cams = 23, camPts = Math.floor(n * 0.12);
    let i = 0;
    for (; i < n - camPts; i++) {
      const x = (r() - 0.5) * 5.2, z = (r() - 0.5) * 3.2;
      const step = Math.floor((z + 1.6) / 0.8);
      let y = -1.1 + step * 0.22 + g() * 0.012;
      if (r() < 0.22) { // retaining walls between steps
        const zw = -1.6 + (1 + Math.floor(r() * 3)) * 0.8;
        y = -1.1 + (Math.floor((zw + 1.6) / 0.8) - 1) * 0.22 + r() * 0.22;
        put(i, x, y, zw, 0);
        continue;
      }
      put(i, x, y, z, r() < 0.03 ? 2 : 0);
    }
    // frustums: apex + 4 edges + image rectangle, sampled as points
    for (let j = 0; i < n; i++, j++) {
      const cam = j % cams, a = (cam / (cams - 1) - 0.5) * 2.2;
      const ax = Math.sin(a) * 3.1, az = Math.cos(a) * 3.1 - 1.2, ay = 1.3 + Math.sin(cam * 1.7) * 0.15;
      // local frame looking at origin
      const fx = -ax / 3.1, fz = -az / 3.1, rx = fz, rz = -fx;
      const t = r(), e = (r() * 8) | 0;
      const cx = e & 1 ? 0.27 : -0.27, cy = e & 2 ? 0.18 : -0.18;
      let px: number, py: number, pz: number;
      if (e < 4) { // edge from apex to corner
        px = ax + (fx * 0.5 + rx * cx) * t; py = ay + (cy - 0.2) * t; pz = az + (fz * 0.5 + rz * cx) * t;
      } else { // image rectangle border
        const u = t * 2 - 1, horiz = e & 4 && e < 6;
        const lx = horiz ? u * 0.27 : cx, ly = horiz ? cy : u * 0.18;
        px = ax + fx * 0.5 + rx * lx; py = ay + ly - 0.2; pz = az + fz * 0.5 + rz * lx;
      }
      put(i, px, py, pz, cam === 11 ? 1 : 2);
    }
  },

  // QNC: class caps on a Bloch sphere (rotate rigidly) beside a classical cloud that scatters.
  qnc(n, put, r, g) {
    const caps = [[0, 1, 0], [0.94, -0.33, 0], [-0.47, -0.33, 0.82], [-0.47, -0.33, -0.82]];
    const v = [0, 0, 0], split = Math.floor(n * 0.78);
    for (let i = 0; i < n; i++) {
      if (i < split) {
        if (r() < 0.35) { // faint sphere shell + equator ring
          onSphere(r, v);
          const ring = r() < 0.25;
          if (ring) { const a = r() * TAU; v[0] = Math.cos(a); v[1] = 0; v[2] = Math.sin(a); }
          put(i, 1.15 + v[0] * 1.7, v[1] * 1.7, v[2] * 1.7, ring ? 2 : 0);
        } else {
          const c = caps[(r() * 4) | 0], s = 0.09;
          let x = c[0] + g() * s, y = c[1] + g() * s, z = c[2] + g() * s;
          const l = Math.hypot(x, y, z);
          x /= l; y /= l; z /= l;
          put(i, 1.15 + x * 1.7, y * 1.7, z * 1.7, c === caps[0] ? 1 : 2);
        }
      } else { // matched classical MLP: within-class scatter grows
        put(i, -2.3 + g() * 0.75, g() * 0.9, g() * 0.75, r() < 0.25 ? 1 : 0);
      }
    }
  },

  // Notification router: one stream splits into notify / digest / mute.
  router(n, put, r, g) {
    for (let i = 0; i < n; i++) {
      const t = r();
      const x = -3 + t * 6;
      if (x < -0.4) {
        put(i, x, g() * 0.16, g() * 0.16, r() < 0.04 ? 2 : 0);
        continue;
      }
      const b = r(), k = (x + 0.4) / 3.4, s = k * k * (3 - 2 * k);
      if (b < 0.3) put(i, x, s * 1.5 + g() * 0.07, g() * 0.07, 1); // notify
      else if (b < 0.72) put(i, x, g() * 0.09, s * 0.4 + g() * 0.09, 2); // digest
      else put(i, x, -s * 1.5 + g() * 0.05 * (1 - s), g() * 0.05, 0); // mute: fades thin
    }
  },

  // Nishchay: a cost surface with the derived decision threshold as a carmine plane.
  nishchay(n, put, r, g) {
    for (let i = 0; i < n; i++) {
      if (r() < 0.16) {
        put(i, 0.35 + g() * 0.01, (r() - 0.5) * 2.6, (r() - 0.5) * 3.6, 1);
        continue;
      }
      const x = (r() - 0.5) * 5, z = (r() - 0.5) * 3.6;
      const y = 1.05 * Math.tanh((x - 0.35) * 1.4) - 0.18 * Math.cos(z * 1.6) + g() * 0.015;
      const grid = Math.abs(((x * 4) % 1)) < 0.06 || Math.abs(((z * 4) % 1)) < 0.06;
      put(i, x, y, z, grid ? 2 : 0);
    }
  },

  // Grounded triage: a 774-document corpus funnels to a grounded answer.
  triage(n, put, r, g) {
    const docs: number[][] = [], v = [0, 0, 0];
    for (let d = 0; d < 774; d++) {
      const a = r() * TAU, rad = Math.sqrt(r()) * 2.4;
      docs.push([Math.cos(a) * rad, 1.4 + g() * 0.08, Math.sin(a) * rad]);
    }
    for (let i = 0; i < n; i++) {
      const u = r();
      if (u < 0.5) {
        const d = docs[(r() * 774) | 0];
        put(i, d[0] + g() * 0.03, d[1] + g() * 0.03, d[2] + g() * 0.03, r() < 0.02 ? 2 : 0);
      } else if (u < 0.93) {
        const t = r(), a = r() * TAU, rad = 2.2 * (1 - t) ** 2 + 0.06;
        put(i, Math.cos(a) * rad, 1.3 - t * 2.6, Math.sin(a) * rad, t > 0.85 ? 2 : 0);
      } else {
        onSphere(r, v);
        put(i, v[0] * 0.12, -1.45 + v[1] * 0.12, v[2] * 0.12, 1);
      }
    }
  },

  // 18 upstream projects; cluster size follows stars (log scale).
  constellation(n, put, r) {
    // stars in K, one per merged-PR project (largest first)
    const stars = [105, 67.6, 52.6, 50.2, 23.4, 10.1, 10, 7.3, 4.8, 2.8, 2.1, 1.3, 0.876, 0.292, 0.157, 0.143, 0.024, 0.018];
    const w = stars.map((s) => Math.log10(s * 1000 + 10));
    const tw = w.reduce((a, b) => a + b, 0);
    const nodes = stars.map((_, k) => {
      const a = k * 2.399, rad = 0.4 + Math.sqrt(k / 18) * 1.9;
      return [Math.cos(a) * rad * 1.2, Math.sin(a) * rad * 0.62, (r() - 0.5) * 1.2];
    });
    const v = [0, 0, 0];
    for (let i = 0; i < n; i++) {
      if (r() < 0.07) { // links between consecutive nodes
        const k = (r() * 17) | 0, t = r(), a = nodes[k], b = nodes[k + 1];
        put(i, a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t, 2);
        continue;
      }
      let pick = r() * tw, k = 0;
      while (pick > w[k] && k < 17) pick -= w[k++];
      onSphere(r, v);
      const size = 0.05 + w[k] * 0.045, d = Math.cbrt(r()) * size;
      put(i, nodes[k][0] + v[0] * d, nodes[k][1] + v[1] * d, nodes[k][2] + v[2] * d, k === 0 ? 1 : 0);
    }
  },

  // Calm ordered lattice for long reading sections.
  lattice(n, put, r, g) {
    const side = Math.ceil(Math.cbrt(n));
    for (let i = 0; i < n; i++) {
      const x = i % side, y = Math.floor(i / side) % side, z = Math.floor(i / (side * side));
      const f = 6 / side;
      put(i, (x - side / 2) * f * 1.1, (y - side / 2) * f * 0.6, (z - side / 2) * f * 0.6 + g() * 0.004, r() < 0.004 ? 1 : 0);
    }
  },

  // Fully resolved: a single sphere, for the contact close.
  sphere(n, put, r) {
    const v = [0, 0, 0];
    for (let i = 0; i < n; i++) {
      onSphere(r, v);
      const band = Math.abs(v[1]) < 0.02;
      put(i, v[0] * 2, v[1] * 2, v[2] * 2, band ? 1 : r() < 0.08 ? 2 : 0);
    }
  },
};

function tiltX(a: Float32Array, t: number) {
  const c = Math.cos(t), s = Math.sin(t);
  for (let i = 0; i < a.length; i += 4) {
    const y = a[i + 1], z = a[i + 2];
    a[i + 1] = y * c - z * s + 0.9;
    a[i + 2] = y * s + z * c;
  }
}

const cache = new Map<string, Float32Array>();

export function specimen(shape: Shape, n: number): Float32Array {
  const key = shape + n;
  let out = cache.get(key);
  if (out) return out;
  out = new Float32Array(n * 4);
  const r = rng(0x9e3779b9 ^ shape.length * 7919 ^ shape.charCodeAt(0) * 104729);
  const g = () => { // Box–Muller
    const u = r() || 1e-9, v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
  };
  const o = out;
  gens[shape](n, (i, x, y, z, tone) => {
    o[i * 4] = x; o[i * 4 + 1] = y; o[i * 4 + 2] = z; o[i * 4 + 3] = tone;
  }, r, g);
  if (shape === 'parallax') tiltX(out, 0.62); // look down onto the terrace, not edge-on
  cache.set(key, out);
  return out;
}
