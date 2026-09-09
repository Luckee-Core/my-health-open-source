import type { FeedLog } from '@/model';
import { compareFeedLogsChronological } from './compare-feed-logs-chronological';

/**
 * Returns the most recent pump snapshot (morning preferred over start on the same date).
 */
export const findLatestFeedLog = (logsDump: Record<string, FeedLog>): FeedLog | null => {
  const chronological = Object.values(logsDump).sort(compareFeedLogsChronological);
  return chronological[chronological.length - 1] ?? null;
};
