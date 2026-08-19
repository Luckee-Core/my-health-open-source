'use client';

import { useState } from 'react';
import { ConditionsBuilderActions } from '@/store/builders';
import { CurrentConditionActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { ConditionFormModal } from './form-modal';
import { ConditionsPasteImportModal } from './paste-import-modal';
import { ConditionsTable } from './table';

export const ConditionsPage = () => {
  const dispatch = useAppDispatch();
  const conditionsBuilder = useAppSelector((state) => state.conditionsBuilder);
  const currentCondition = useAppSelector((state) => state.currentCondition);
  const [isPasteOpen, setIsPasteOpen] = useState(false);

  const isEditing = currentCondition.id !== '';
  const isOpen = conditionsBuilder.isCreateOpen || isEditing;
  const editingCondition = isEditing ? currentCondition : null;

  const closeModal = () => {
    dispatch(ConditionsBuilderActions.closeModal());
    dispatch(CurrentConditionActions.resetCurrentCondition());
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Conditions</h1>
          <p className={styles.subtitle}>Diagnoses and problem list entries.</p>
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
            onClick={() => dispatch(ConditionsBuilderActions.setIsCreateOpen(true))}
            className={styles.primaryButton}
          >
            Add condition
          </button>
        </div>
      </div>
      <ConditionsTable />
      <ConditionFormModal isOpen={isOpen} condition={editingCondition} onClose={closeModal} />
      <ConditionsPasteImportModal isOpen={isPasteOpen} onClose={() => setIsPasteOpen(false)} />
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
