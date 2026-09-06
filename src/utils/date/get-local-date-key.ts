/**
 * Returns today's date as YYYY-MM-DD in local timezone.
 */
export const getLocalDateKey = (date: Date = new Date()): string => {
  return date.toLocaleDateString('en-CA');
};
