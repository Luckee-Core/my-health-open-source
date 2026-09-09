import type { FeedLog } from '@/model';
import { normalizeFeedLogDateKey } from './normalize-feed-log-date-key';

/**
 * Finds the morning snapshot for a local calendar date (excludes the start row).
 */
export const findFeedLogForDate = (
  logsDump: Record<string, FeedLog>,
  dateKey: string,
): FeedLog | null => {
  return (
    Object.values(logsDump).find(
      (log) => !log.is_start && normalizeFeedLogDateKey(log.log_date) === dateKey,
    ) ?? null
  );
};

