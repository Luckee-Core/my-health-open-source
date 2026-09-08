import type { TodayTherapyRow } from './build-today-therapy-rows';

const rowRank = (row: TodayTherapyRow): number => {
  if (row.isSkipped) return 2;
  if (row.isComplete) return 1;
  return 0;
};

/**
 * Sorts remaining exercises first, then complete, then skipped-for-today.
 */
export const compareTodayTherapyRows = (a: TodayTherapyRow, b: TodayTherapyRow): number =>
  rowRank(a) - rowRank(b);
