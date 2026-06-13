'use client';

import { DailyEntriesBuilderActions } from '@/store/builders';
import { CurrentDailyEntryActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { getTodayEntryDate } from './format-entry-date';
import { DailyEntryFormModal } from './form-modal';
import { DailyEntriesTable } from './table';

export const DailyEntriesPage = () => {
  const dispatch = useAppDispatch();
  const dailyEntriesBuilder = useAppSelector((state) => state.dailyEntriesBuilder);
  const currentDailyEntry = useAppSelector((state) => state.currentDailyEntry);

  const isEditing = currentDailyEntry.id !== '';
  const isOpen = dailyEntriesBuilder.isCreateOpen || isEditing;
  const editingEntry = isEditing ? currentDailyEntry : null;
  const defaultEntryDate =
    dailyEntriesBuilder.defaultEntryDate !== ''
      ? dailyEntriesBuilder.defaultEntryDate
      : undefined;

  const closeModal = () => {
    dispatch(DailyEntriesBuilderActions.closeModal());
    dispatch(CurrentDailyEntryActions.resetCurrentDailyEntry());
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
            onClick={() => dispatch(DailyEntriesBuilderActions.openCreate(getTodayEntryDate()))}
            className={styles.secondaryButton}
          >
            Log today
          </button>
          <button
            type="button"
            onClick={() => dispatch(DailyEntriesBuilderActions.openCreate(undefined))}
            className={styles.primaryButton}
          >
            Add entry
          </button>
        </div>
      </div>
      <DailyEntriesTable />
      <DailyEntryFormModal
        isOpen={isOpen}
        dailyEntry={editingEntry}
        defaultEntryDate={defaultEntryDate}
        onClose={closeModal}
      />
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
