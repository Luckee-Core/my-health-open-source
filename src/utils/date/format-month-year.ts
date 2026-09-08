/**
 * Formats a calendar month as "September 2026".
 */
export const formatMonthYear = (year: number, monthIndex: number): string =>
  new Date(year, monthIndex, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
