'use client';

import { AllergiesBuilderActions } from '@/store/builders';
import { CurrentAllergyActions } from '@/store/current';
import { useAppDispatch } from '@/store';
import { AllergyFormModal } from './form-modal';
import { AllergiesTable } from './table';

export const AllergiesPage = () => {
  const dispatch = useAppDispatch();

  const openCreate = () => {
    dispatch(CurrentAllergyActions.resetCurrentAllergy());
    dispatch(AllergiesBuilderActions.setIsCreateOpen(true));
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
          onClick={openCreate}
          className={styles.primaryButton}
        >
          Add allergy
        </button>
      </div>
      <AllergiesTable />
      <AllergyFormModal />
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
