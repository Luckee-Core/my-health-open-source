'use client';

import { AllergiesBuilderActions } from '@/store/builders';
import { CurrentAllergyActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { AllergyFormModal } from './form-modal';
import { AllergiesTable } from './table';

export const AllergiesPage = () => {
  const dispatch = useAppDispatch();
  const allergiesBuilder = useAppSelector((state) => state.allergiesBuilder);
  const currentAllergy = useAppSelector((state) => state.currentAllergy);

  const isEditing = currentAllergy.id !== '';
  const isOpen = allergiesBuilder.isCreateOpen || isEditing;
  const editingAllergy = isEditing ? currentAllergy : null;

  const closeModal = () => {
    dispatch(AllergiesBuilderActions.closeModal());
    dispatch(CurrentAllergyActions.resetCurrentAllergy());
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Allergies</h1>
          <p className={styles.subtitle}>Allergies and reactions from your health record.</p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(AllergiesBuilderActions.setIsCreateOpen(true))}
          className={styles.primaryButton}
        >
          Add allergy
        </button>
      </div>
      <AllergiesTable />
      <AllergyFormModal isOpen={isOpen} allergy={editingAllergy} onClose={closeModal} />
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
