'use client';

import { MedicalHistoryEventsBuilderActions } from '@/store/builders';
import { CurrentMedicalHistoryEventActions } from '@/store/current';
import { useAppDispatch } from '@/store';
import { MedicalHistoryEventFormModal } from './form-modal';
import { MedicalHistoryEventsTable } from './table';

export const MedicalHistoryEventsPage = () => {
  const dispatch = useAppDispatch();

  const openCreate = () => {
    dispatch(CurrentMedicalHistoryEventActions.resetCurrentMedicalHistoryEvent());
    dispatch(MedicalHistoryEventsBuilderActions.setIsCreateOpen(true));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Medical history</h1>
          <p className={styles.subtitle}>
            Document diagnoses, surgeries, radiation, imaging milestones, and other significant
            health events on a timeline.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className={styles.primaryButton}
        >
          Add event
        </button>
      </div>
      <MedicalHistoryEventsTable />
      <MedicalHistoryEventFormModal />
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
