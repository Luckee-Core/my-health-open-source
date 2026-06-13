'use client';

import { SpecialtiesBuilderActions } from '@/store/builders';
import { CurrentSpecialtyActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { SpecialtyFormModal } from './form-modal';
import { SpecialtiesTable } from './table';

export const SpecialtiesPage = () => {
  const dispatch = useAppDispatch();
  const specialtiesBuilder = useAppSelector((state) => state.specialtiesBuilder);
  const currentSpecialty = useAppSelector((state) => state.currentSpecialty);

  const isEditing = currentSpecialty.id !== '';
  const isOpen = specialtiesBuilder.isCreateOpen || isEditing;
  const editingSpecialty = isEditing ? currentSpecialty : null;

  const closeModal = () => {
    dispatch(SpecialtiesBuilderActions.closeModal());
    dispatch(CurrentSpecialtyActions.resetCurrentSpecialty());
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Specialties</h1>
          <p className={styles.subtitle}>Medical specialties for your care team.</p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(SpecialtiesBuilderActions.setIsCreateOpen(true))}
          className={styles.primaryButton}
        >
          Add specialty
        </button>
      </div>
      <SpecialtiesTable />
      <SpecialtyFormModal
        isOpen={isOpen}
        specialty={editingSpecialty}
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
