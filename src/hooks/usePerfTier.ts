import { useMemo } from 'react';

export type PerfTier = 'high' | 'low' | 'static';

export interface PerfProfile {
  tier: PerfTier;
  lines: number;
  particles: number;
  dpr: [number, number];
  reduced: boolean;
}

/** Device capability tiering, computed once. */
export function usePerfTier(): PerfProfile {
  return useMemo(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      return { tier: 'static', lines: 60, particles: 300, dpr: [1, 1.5], reduced: true };
    }
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const mem = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
    const cores = navigator.hardwareConcurrency ?? 8;
    const small = window.innerWidth < 768;
    const low = coarse || small || mem <= 4 || cores <= 4;
    return low
      ? { tier: 'low', lines: 120, particles: 600, dpr: [1, 1.75], reduced: false }
      : { tier: 'high', lines: 260, particles: 1400, dpr: [1, 2], reduced: false };
  }, []);
}
