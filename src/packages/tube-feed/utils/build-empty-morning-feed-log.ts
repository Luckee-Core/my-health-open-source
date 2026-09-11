import { EMPTY_FEED_LOG, type FeedFormula, type FeedLog } from '@/model';
import { findLatestFeedLog } from './find-latest-feed-log';

/**
 * Empty morning form: formula and rate from the latest log when present.
 */
export const buildEmptyMorningFeedLog = (
  logsDump: Record<string, FeedLog>,
  formulasDump: Record<string, FeedFormula>,
  todayKey: string,
): FeedLog => {
  const latestLog = findLatestFeedLog(logsDump);
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
    formula_id: latestLog?.formula_id || sorted[0]?.id || '',
    intermittent_rate_ml_per_hr:
      latestLog?.intermittent_rate_ml_per_hr ?? EMPTY_FEED_LOG.intermittent_rate_ml_per_hr,
  };
};
