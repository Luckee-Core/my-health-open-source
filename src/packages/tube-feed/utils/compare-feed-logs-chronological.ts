import type { FeedLog } from '@/model';
import { normalizeFeedLogDateKey } from './normalize-feed-log-date-key';

/**
 * Oldest first: calendar date, then created_at.
 */
export const compareFeedLogsChronological = (a: FeedLog, b: FeedLog): number => {
  const dateCmp = normalizeFeedLogDateKey(a.log_date).localeCompare(
    normalizeFeedLogDateKey(b.log_date),
  );
  if (dateCmp !== 0) return dateCmp;
  return a.created_at.localeCompare(b.created_at);
};
