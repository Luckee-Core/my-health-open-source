import type { FeedFormula, FeedLog } from '@/model';

/**
 * Uses the formula on the log for kcal per 1000 mL, then the snapshotted value.
 */
export const resolveFeedCaloriesPer1000Ml = (
  log: FeedLog,
  formula: FeedFormula | undefined,
): number => {
  if (formula != null && formula.calories_per_1000_ml > 0) {
    return formula.calories_per_1000_ml;
  }
  return log.calories_per_1000_ml;
};
