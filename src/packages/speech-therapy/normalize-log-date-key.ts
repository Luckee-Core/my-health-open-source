/**
 * Normalizes a therapy log date to YYYY-MM-DD.
 */
export const normalizeLogDateKey = (value: string): string => value.slice(0, 10);
