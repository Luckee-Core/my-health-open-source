import { EMPTY_FEED_LOG, type FeedFormula, type FeedLog } from '@/model';
import { findFeedStartLog } from './find-feed-start-log';

/**
 * Empty morning form: formula and rate from the start row when present; totals start at 0.
 */
export const buildEmptyMorningFeedLog = (
  logsDump: Record<string, FeedLog>,
  formulasDump: Record<string, FeedFormula>,
  todayKey: string,
): FeedLog => {
  const startLog = findFeedStartLog(logsDump);
  const formulas = Object.values(formulasDump);
  const active = formulas.filter((row) => row.is_active);
  const pool = active.length > 0 ? active : formulas;
  const sorted = [...pool].sort((a, b) => {
    const brand = a.brand.localeCompare(b.brand);
    if (brand !== 0) return brand;
    return a.name.localeCompare(b.name);
  });

  return {
    ...EMPTY_FEED_LOG,
    log_date: todayKey,
    formula_id: startLog?.formula_id || sorted[0]?.id || '',
    intermittent_rate_ml_per_hr:
      startLog?.intermittent_rate_ml_per_hr ?? EMPTY_FEED_LOG.intermittent_rate_ml_per_hr,
  };
};
