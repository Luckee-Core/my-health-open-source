import type { FeedLog } from '@/model';

/**
 * Returns the one-time starting pump snapshot, if tracking has begun.
 */
export const findFeedStartLog = (logsDump: Record<string, FeedLog>): FeedLog | null => {
  return Object.values(logsDump).find((log) => log.is_start === true) ?? null;
};
