import type { WildlifeEvent } from "@/lib/types";

/** Uniform random pick from a pool, optionally excluding one id. */
export function pickRandomEvent(
  pool: WildlifeEvent[],
  excludeId?: string,
): WildlifeEvent | null {
  if (pool.length === 0) return null;

  const candidates =
    excludeId && pool.length > 1
      ? pool.filter((e) => e.id !== excludeId)
      : pool;

  if (candidates.length === 0) return pool[0] ?? null;

  const index = Math.floor(Math.random() * candidates.length);
  return candidates[index] ?? null;
}

/** Hop count scales with pool size (1 → skip, 2 → 5, else 9). */
export function spinHopCount(poolSize: number): number {
  if (poolSize <= 1) return 0;
  const base = poolSize === 2 ? 3 : 6;
  return Math.round(base * 1.5);
}

/**
 * Build a spin path of event ids ending at winnerId.
 * Early hops are random (with replacement); last two hops land on the winner.
 */
export function buildSpinPath(
  pool: WildlifeEvent[],
  winnerId: string,
  hopCount: number,
): string[] {
  if (hopCount <= 0) return [winnerId];
  if (pool.length === 0) return [winnerId];

  const path: string[] = [];
  const randomHops = Math.max(0, hopCount - 2);

  for (let i = 0; i < randomHops; i++) {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    path.push(pick?.id ?? winnerId);
  }

  if (hopCount >= 2) {
    path.push(winnerId);
  }
  path.push(winnerId);

  return path;
}

/** Delay in ms before advancing to hop at index (0-based). */
export function hopDelayMs(hopIndex: number, totalHops: number): number {
  if (totalHops <= 1) return 0;
  const t = hopIndex / (totalHops - 1);
  if (t < 0.5) return 400;
  if (t < 0.85) return 700;
  return 1200;
}

export type RandomizerSpin = {
  key: number;
  path: string[];
  hopIndex: number;
  winnerId: string;
};

export function createRandomizerSpin(pool: WildlifeEvent[]): RandomizerSpin | null {
  const winner = pickRandomEvent(pool);
  if (!winner) return null;
  const hops = spinHopCount(pool.length);
  const path = buildSpinPath(pool, winner.id, hops);
  return {
    key: Date.now(),
    path,
    hopIndex: 0,
    winnerId: winner.id,
  };
}
