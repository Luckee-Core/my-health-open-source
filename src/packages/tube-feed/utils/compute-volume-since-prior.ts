import type { FeedLog } from '@/model';

export type VolumeSincePrior = {
  volumeMl: number | null;
  isBaseline: boolean;
  isImplicitReset: boolean;
};

/**
 * Derives milliliters since the previous morning snapshot.
 */
export const computeVolumeSincePrior = (
  current: FeedLog,
  previous: FeedLog | null,
): VolumeSincePrior => {
  if (current.is_start || !previous) {
    return { volumeMl: null, isBaseline: true, isImplicitReset: false };
  }

  const implicitReset = !current.pump_reset && current.total_fed_ml < previous.total_fed_ml;
  if (current.pump_reset || implicitReset) {
    return {
      volumeMl: current.total_fed_ml,
      isBaseline: false,
      isImplicitReset: implicitReset,
    };
  }

  return {
    volumeMl: current.total_fed_ml - previous.total_fed_ml,
    isBaseline: false,
    isImplicitReset: false,
  };
};
