/**
 * Shifts a calendar month by `delta` months.
 */
export const addCalendarMonths = (
  year: number,
  monthIndex: number,
  delta: number,
): { year: number; monthIndex: number } => {
  const date = new Date(year, monthIndex + delta, 1);
  return { year: date.getFullYear(), monthIndex: date.getMonth() };
};
