'use client';

import { SymptomLogsBuilderActions } from '@/store/builders';
import { CurrentSymptomLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { SymptomLogFormModal } from './form-modal';
import { SymptomLogsTable } from './table';

export const SymptomLogsPage = () => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.symptomLogsBuilder);
  const current = useAppSelector((state) => state.currentSymptomLog);

  const isEditing = current.id !== '';
  const isOpen = builder.isCreateOpen || isEditing;
  const editingLog = isEditing ? current : null;

  const closeModal = () => {
    dispatch(SymptomLogsBuilderActions.closeModal());
    dispatch(CurrentSymptomLogActions.resetCurrentSymptomLog());
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
        <button
          type="button"
          onClick={() => dispatch(SymptomLogsBuilderActions.setIsCreateOpen(true))}
          className={styles.primaryButton}
        >
          Log symptom
        </button>
      </div>
      <SymptomLogsTable />
      <SymptomLogFormModal isOpen={isOpen} symptomLog={editingLog} onClose={closeModal} />
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
