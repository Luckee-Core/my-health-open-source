import { getLocalDateKey } from './get-local-date-key';

export type MonthCalendarCell = {
  dateKey: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
};

/**
 * Returns a Sunday-start 6-week grid of date cells for a calendar month.
 */
export const getMonthCalendarCells = (
  year: number,
  monthIndex: number,
): MonthCalendarCell[] => {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const gridStart = new Date(year, monthIndex, 1 - firstOfMonth.getDay());
  const cells: MonthCalendarCell[] = [];

  for (let offset = 0; offset < 42; offset += 1) {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + offset);
    cells.push({
      dateKey: getLocalDateKey(date),
      dayOfMonth: date.getDate(),
      isCurrentMonth: date.getMonth() === monthIndex,
    });
  }

  return cells;
};
