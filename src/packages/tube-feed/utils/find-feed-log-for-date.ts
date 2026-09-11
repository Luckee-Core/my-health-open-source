import type { FeedLog } from '@/model';
import { normalizeFeedLogDateKey } from './normalize-feed-log-date-key';

/**
 * Finds the pump snapshot for a local calendar date.
 */
export const findFeedLogForDate = (
  logsDump: Record<string, FeedLog>,
  dateKey: string,
): FeedLog | null => {
  return (
    Object.values(logsDump).find(
      (log) => normalizeFeedLogDateKey(log.log_date) === dateKey,
    ) ?? null
  );
};
