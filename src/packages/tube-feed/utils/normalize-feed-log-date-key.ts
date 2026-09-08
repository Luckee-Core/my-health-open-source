/**
 * Normalizes a feed log date to YYYY-MM-DD.
 */
export const normalizeFeedLogDateKey = (value: string): string => value.slice(0, 10);
