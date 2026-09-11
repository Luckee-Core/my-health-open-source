import type { FeedFormula, FeedLog } from '@/model';
import { compareFeedLogsChronological } from './compare-feed-logs-chronological';
import { computeFeedCalories } from './compute-feed-calories';
import { computeVolumeSincePrior } from './compute-volume-since-prior';

export type FeedDayRow = {
  log: FeedLog;
  formulaLabel: string;
  volumeMl: number;
  calories: number | null;
  isImplicitReset: boolean;
};

/**
 * Joins feed logs with formulas and derives volume/calories newest first.
 */
export const buildFeedDayRows = (
  logsDump: Record<string, FeedLog>,
  formulasDump: Record<string, FeedFormula>,
): FeedDayRow[] => {
  const chronological = Object.values(logsDump).sort(compareFeedLogsChronological);

  const rows = chronological.map((log, index) => {
    const previous = index === 0 ? null : chronological[index - 1];
    const volume = computeVolumeSincePrior(log, previous);
    const formula = formulasDump[log.formula_id];
    const formulaLabel = formula
      ? `${formula.brand} ${formula.name}`.trim()
      : 'Unknown formula';
    const caloriesPer1000Ml = formula?.calories_per_1000_ml ?? log.calories_per_1000_ml;

    return {
      log,
      formulaLabel,
      volumeMl: volume.volumeMl,
      calories: computeFeedCalories(volume.volumeMl, caloriesPer1000Ml),
      isImplicitReset: volume.isImplicitReset,
    };
  });

  return rows.reverse();
};
