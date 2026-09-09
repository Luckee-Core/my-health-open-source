import type { FeedLog } from '@/model';
import { normalizeFeedLogDateKey } from './normalize-feed-log-date-key';

/**
 * Oldest first: calendar date, start row before that date’s morning, then created_at.
 */
export const compareFeedLogsChronological = (a: FeedLog, b: FeedLog): number => {
  const dateCmp = normalizeFeedLogDateKey(a.log_date).localeCompare(
    normalizeFeedLogDateKey(b.log_date),
  );
  if (dateCmp !== 0) return dateCmp;
  if (a.is_start !== b.is_start) return a.is_start ? -1 : 1;
  return a.created_at.localeCompare(b.created_at);
};
