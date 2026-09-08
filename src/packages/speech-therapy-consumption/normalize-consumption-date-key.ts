/**
 * Normalizes a consumption log date to YYYY-MM-DD.
 */
export const normalizeConsumptionDateKey = (value: string): string => value.slice(0, 10);
