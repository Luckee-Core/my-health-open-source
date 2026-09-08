'use client';

import { SymptomLogsBuilderActions } from '@/store/builders';
import { CurrentSymptomLogActions } from '@/store/current';
import { useAppDispatch } from '@/store';
import { SymptomLogFormModal } from './form-modal';
import { SymptomLogsTable } from './table';

export const SymptomLogsPage = () => {
  const dispatch = useAppDispatch();

  const openCreate = () => {
    dispatch(CurrentSymptomLogActions.resetCurrentSymptomLog());
    dispatch(
      CurrentSymptomLogActions.patchCurrentSymptomLog({ recorded_at: new Date().toISOString() }),
    );
    dispatch(SymptomLogsBuilderActions.setHasSeverity(false));
    dispatch(SymptomLogsBuilderActions.setIsCreateOpen(true));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Symptoms</h1>
          <p className={styles.subtitle}>
            Log symptom episodes with severity, triggers, and timing — separate from the daily
            journal.
          </p>
        </div>
        <button type="button" onClick={openCreate} className={styles.primaryButton}>
          Log symptom
        </button>
      </div>
      <SymptomLogsTable />
      <SymptomLogFormModal />
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  primaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shrink-0`,
} as const;
