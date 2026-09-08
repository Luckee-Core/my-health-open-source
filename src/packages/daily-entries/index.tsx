'use client';

import { DailyEntriesBuilderActions } from '@/store/builders';
import { CurrentDailyEntryActions } from '@/store/current';
import { useAppDispatch } from '@/store';
import { getTodayEntryDate } from './format-entry-date';
import { DailyEntryFormModal } from './form-modal';
import { DailyEntriesTable } from './table';

export const DailyEntriesPage = () => {
  const dispatch = useAppDispatch();

  const openCreate = (entryDate: string) => {
    dispatch(CurrentDailyEntryActions.resetCurrentDailyEntry());
    dispatch(CurrentDailyEntryActions.patchCurrentDailyEntry({ entry_date: entryDate }));
    dispatch(DailyEntriesBuilderActions.openCreate());
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Daily log</h1>
          <p className={styles.subtitle}>
            Record how each focus area went on a given day — one note per area per day.
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={() => openCreate(getTodayEntryDate())}
            className={styles.secondaryButton}
          >
            Log today
          </button>
          <button
            type="button"
            onClick={() => openCreate(getTodayEntryDate())}
            className={styles.primaryButton}
          >
            Add entry
          </button>
        </div>
      </div>
      <DailyEntriesTable />
      <DailyEntryFormModal />
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  headerActions: `flex shrink-0 gap-2`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  primaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white`,
  secondaryButton: `rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-800`,
} as const;
