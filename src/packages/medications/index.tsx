'use client';

import { useState } from 'react';
import { MedicationsBuilderActions } from '@/store/builders';
import { CurrentMedicationActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { MedicationFormModal } from './form-modal';
import { MedicationsPasteImportModal } from './paste-import-modal';
import { MedicationsTable } from './table';

export const MedicationsPage = () => {
  const dispatch = useAppDispatch();
  const medicationsBuilder = useAppSelector((state) => state.medicationsBuilder);
  const currentMedication = useAppSelector((state) => state.currentMedication);
  const [isPasteOpen, setIsPasteOpen] = useState(false);

  const isEditing = currentMedication.id !== '';
  const isOpen = medicationsBuilder.isCreateOpen || isEditing;
  const editingMedication = isEditing ? currentMedication : null;

  const closeModal = () => {
    dispatch(MedicationsBuilderActions.closeModal());
    dispatch(CurrentMedicationActions.resetCurrentMedication());
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Medications</h1>
          <p className={styles.subtitle}>Active and historical medications.</p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            onClick={() => setIsPasteOpen(true)}
            className={styles.secondaryButton}
          >
            Paste from MyChart
          </button>
          <button
            type="button"
            onClick={() => dispatch(MedicationsBuilderActions.setIsCreateOpen(true))}
            className={styles.primaryButton}
          >
            Add medication
          </button>
        </div>
      </div>
      <MedicationsTable />
      <MedicationFormModal isOpen={isOpen} medication={editingMedication} onClose={closeModal} />
      <MedicationsPasteImportModal
        isOpen={isPasteOpen}
        onClose={() => setIsPasteOpen(false)}
      />
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  headerActions: `flex items-center gap-2 shrink-0`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  primaryButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white`,
  secondaryButton: `rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-800`,
} as const;
