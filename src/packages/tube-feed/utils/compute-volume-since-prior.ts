import type { FeedLog } from '@/model';

export type VolumeSincePrior = {
  volumeMl: number;
  isImplicitReset: boolean;
};

/**
 * Derives milliliters fed since the previous snapshot.
 */
export const computeVolumeSincePrior = (
  current: FeedLog,
  previous: FeedLog | null,
): VolumeSincePrior => {
  const currentTotal = Number(current.total_fed_ml);

  if (!previous) {
    return { volumeMl: currentTotal, isImplicitReset: false };
  }

  const previousTotal = Number(previous.total_fed_ml);
  const implicitReset = !current.pump_reset && currentTotal < previousTotal;
  if (current.pump_reset || implicitReset) {
    return {
      volumeMl: currentTotal,
      isImplicitReset: implicitReset,
    };
  }

  return {
    volumeMl: currentTotal - previousTotal,
    isImplicitReset: false,
  };
};
