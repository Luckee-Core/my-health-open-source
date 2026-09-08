import type { FeedFormula, FeedLog } from '@/model';
import { computeFeedCalories } from './compute-feed-calories';
import { computeVolumeSincePrior } from './compute-volume-since-prior';
import { normalizeFeedLogDateKey } from './normalize-feed-log-date-key';

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
  const chronological = Object.values(logsDump).sort((a, b) =>
    normalizeFeedLogDateKey(a.log_date).localeCompare(normalizeFeedLogDateKey(b.log_date)),
  );

  const rows = chronological.map((log, index) => {
    const previous = index === 0 ? null : chronological[index - 1];
    const volume = computeVolumeSincePrior(log, previous);
    const formula = formulasDump[log.formula_id];
    const formulaLabel = formula
      ? `${formula.brand} ${formula.name}`.trim()
      : 'Unknown formula';

    return {
      log,
      formulaLabel,
      volumeMl: volume.volumeMl,
      calories: computeFeedCalories(volume.volumeMl, log.calories_per_1000_ml),
      isBaseline: volume.isBaseline,
      isImplicitReset: volume.isImplicitReset,
    };
  });

  return rows.reverse();
};
