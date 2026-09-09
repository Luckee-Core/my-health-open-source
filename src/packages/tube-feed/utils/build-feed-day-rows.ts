import type { FeedFormula, FeedLog } from '@/model';
import { compareFeedLogsChronological } from './compare-feed-logs-chronological';
import { computeFeedCalories } from './compute-feed-calories';
import { computeVolumeSincePrior } from './compute-volume-since-prior';
import { resolveFeedCaloriesPer1000Ml } from './resolve-feed-calories-per-1000-ml';

export type FeedDayRow = {
  log: FeedLog;
  formulaLabel: string;
  volumeMl: number | null;
  calories: number | null;
  isBaseline: boolean;
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
    const milliliters = volume.volumeMl ?? log.total_fed_ml;

    return {
      log,
      formulaLabel,
      volumeMl: volume.volumeMl,
      calories: computeFeedCalories(
        milliliters,
        resolveFeedCaloriesPer1000Ml(log, formula),
      ),
      isBaseline: volume.isBaseline,
      isImplicitReset: volume.isImplicitReset,
    };
  });

  return rows.reverse();
};
