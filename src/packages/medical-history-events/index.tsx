'use client';

import { MedicalHistoryEventsBuilderActions } from '@/store/builders';
import { CurrentMedicalHistoryEventActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { MedicalHistoryEventFormModal } from './form-modal';
import { MedicalHistoryEventsTable } from './table';

export const MedicalHistoryEventsPage = () => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.medicalHistoryEventsBuilder);
  const current = useAppSelector((state) => state.currentMedicalHistoryEvent);

  const isEditing = current.id !== '';
  const isOpen = builder.isCreateOpen || isEditing;
  const editingEvent = isEditing ? current : null;

  const closeModal = () => {
    dispatch(MedicalHistoryEventsBuilderActions.closeModal());
    dispatch(CurrentMedicalHistoryEventActions.resetCurrentMedicalHistoryEvent());
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
          onClick={() => dispatch(MedicalHistoryEventsBuilderActions.setIsCreateOpen(true))}
          className={styles.primaryButton}
        >
          Add event
        </button>
      </div>
      <MedicalHistoryEventsTable />
      <MedicalHistoryEventFormModal
        isOpen={isOpen}
        medicalHistoryEvent={editingEvent}
        onClose={closeModal}
      />
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
