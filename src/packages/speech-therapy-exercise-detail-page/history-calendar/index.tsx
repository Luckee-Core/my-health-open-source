'use client';

import { useMemo, useState } from 'react';
import type { TherapyExercise } from '@/model';
import { addCalendarMonths, formatMonthYear, getLocalDateKey } from '@/utils/date';
import { useAppSelector } from '@/store';
import { buildExerciseCalendarDays } from '../build-exercise-calendar-days';

type Props = {
  exercise: TherapyExercise;
};

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const;

/**
 * Month calendar of completed units for one speech therapy exercise.
 */
export const ExerciseHistoryCalendar = ({ exercise }: Props) => {
  const logsDump = useAppSelector((state) => state.therapyExerciseLogs);
  const todayKey = useMemo(() => getLocalDateKey(), []);
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState({
    year: today.getFullYear(),
    monthIndex: today.getMonth(),
  });

  const days = useMemo(
    () =>
      buildExerciseCalendarDays(
        visibleMonth.year,
        visibleMonth.monthIndex,
        todayKey,
        exercise,
        logsDump,
      ),
    [exercise, logsDump, todayKey, visibleMonth.monthIndex, visibleMonth.year],
  );

  const monthSummary = useMemo(() => {
    const inMonth = days.filter((day) => day.isCurrentMonth && day.hasLog);
    const completeCount = inMonth.filter((day) => day.isComplete).length;
    const skippedCount = inMonth.filter((day) => day.skipped).length;
    return {
      loggedCount: inMonth.length,
      completeCount,
      skippedCount,
    };
  }, [days]);

  const goToMonth = (delta: number) => {
    setVisibleMonth((prev) => addCalendarMonths(prev.year, prev.monthIndex, delta));
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.heading}>History</h2>
        <div className={styles.nav}>
          <button type="button" className={styles.navButton} onClick={() => goToMonth(-1)}>
            Previous
          </button>
          <p className={styles.monthLabel}>
            {formatMonthYear(visibleMonth.year, visibleMonth.monthIndex)}
          </p>
          <button type="button" className={styles.navButton} onClick={() => goToMonth(1)}>
            Next
          </button>
        </div>
      </div>
      <p className={styles.summary}>
        {`${monthSummary.loggedCount} ${monthSummary.loggedCount === 1 ? 'day' : 'days'} logged · ${monthSummary.completeCount} complete · ${monthSummary.skippedCount} skipped`}
      </p>
      <div className={styles.calendar}>
        <div className={styles.weekdays}>
          {WEEKDAY_LABELS.map((label) => (
            <div key={label} className={styles.weekday}>
              {label}
            </div>
          ))}
        </div>
        <div className={styles.grid}>
          {days.map((day) => (
            <div key={day.dateKey} className={cellClassName(day)}>
              <span className={styles.dayNumber}>{day.dayOfMonth}</span>
              <span className={styles.count}>{cellCountLabel(day)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.legend}>
        <span className={styles.legendComplete}>Complete</span>
        <span className={styles.legendPartial}>Partial</span>
        <span className={styles.legendSkipped}>Skipped</span>
      </div>
    </section>
  );
};

const cellClassName = (day: {
  isCurrentMonth: boolean;
  isToday: boolean;
  skipped: boolean;
  isComplete: boolean;
  hasLog: boolean;
  completedCount: number;
}): string => {
  if (!day.isCurrentMonth) return styles.cellMuted;
  if (day.skipped) return day.isToday ? styles.cellSkippedToday : styles.cellSkipped;
  if (day.isComplete) return day.isToday ? styles.cellCompleteToday : styles.cellComplete;
  if (day.hasLog && day.completedCount > 0) {
    return day.isToday ? styles.cellPartialToday : styles.cellPartial;
  }
  return day.isToday ? styles.cellToday : styles.cell;
};

const cellCountLabel = (day: {
  isCurrentMonth: boolean;
  skipped: boolean;
  hasLog: boolean;
  completedCount: number;
}): string => {
  if (!day.isCurrentMonth) return '';
  if (day.skipped) return 'Skip';
  if (day.hasLog) return String(day.completedCount);
  return '';
};

const styles = {
  section: `min-w-0 space-y-3 rounded-lg border border-gray-200 bg-white p-4`,
  header: `
    flex flex-col gap-3
    sm:flex-row sm:items-center sm:justify-between
  `,
  heading: `text-lg font-semibold text-gray-900`,
  nav: `flex items-center gap-2`,
  navButton: `
    rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800
    hover:bg-gray-50
  `,
  monthLabel: `min-w-36 text-center text-sm font-medium text-gray-900`,
  summary: `text-sm text-gray-600`,
  calendar: `min-w-0 overflow-x-auto`,
  weekdays: `grid w-full min-w-80 grid-cols-7 gap-1`,
  weekday: `min-w-0 truncate text-center text-xs font-medium text-gray-500`,
  grid: `grid w-full min-w-80 grid-cols-7 gap-1`,
  cell: `
    flex h-14 min-w-0 flex-col items-center justify-between overflow-hidden rounded-md
    border border-gray-200 bg-white px-0.5 py-0.5 text-gray-900
  `,
  cellToday: `
    flex h-14 min-w-0 flex-col items-center justify-between overflow-hidden rounded-md
    border-2 border-gray-900 bg-white px-0.5 py-0.5 text-gray-900
  `,
  cellComplete: `
    flex h-14 min-w-0 flex-col items-center justify-between overflow-hidden rounded-md
    border border-green-200 bg-green-50 px-0.5 py-0.5 text-gray-900
  `,
  cellCompleteToday: `
    flex h-14 min-w-0 flex-col items-center justify-between overflow-hidden rounded-md
    border-2 border-gray-900 bg-green-50 px-0.5 py-0.5 text-gray-900
  `,
  cellPartial: `
    flex h-14 min-w-0 flex-col items-center justify-between overflow-hidden rounded-md
    border border-amber-200 bg-amber-50 px-0.5 py-0.5 text-gray-900
  `,
  cellPartialToday: `
    flex h-14 min-w-0 flex-col items-center justify-between overflow-hidden rounded-md
    border-2 border-gray-900 bg-amber-50 px-0.5 py-0.5 text-gray-900
  `,
  cellSkipped: `
    flex h-14 min-w-0 flex-col items-center justify-between overflow-hidden rounded-md
    border border-gray-200 bg-gray-100 px-0.5 py-0.5 text-gray-500
  `,
  cellSkippedToday: `
    flex h-14 min-w-0 flex-col items-center justify-between overflow-hidden rounded-md
    border-2 border-gray-900 bg-gray-100 px-0.5 py-0.5 text-gray-500
  `,
  cellMuted: `
    flex h-14 min-w-0 flex-col items-center justify-between overflow-hidden rounded-md
    border border-transparent px-0.5 py-0.5 text-gray-300
  `,
  dayNumber: `text-xs font-medium`,
  count: `text-sm font-semibold`,
  legend: `flex flex-wrap gap-3 text-xs text-gray-600`,
  legendComplete: `inline-flex items-center gap-1 before:content-[''] before:block before:h-3 before:w-3 before:rounded-sm before:border before:border-green-200 before:bg-green-50`,
  legendPartial: `inline-flex items-center gap-1 before:content-[''] before:block before:h-3 before:w-3 before:rounded-sm before:border before:border-amber-200 before:bg-amber-50`,
  legendSkipped: `inline-flex items-center gap-1 before:content-[''] before:block before:h-3 before:w-3 before:rounded-sm before:border before:border-gray-200 before:bg-gray-100`,
} as const;
