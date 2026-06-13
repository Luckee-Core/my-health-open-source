'use client';

import { HospitalsBuilderActions } from '@/store/builders';
import { CurrentHospitalActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { HospitalFormModal } from './form-modal';
import { HospitalsTable } from './table';

export const HospitalsPage = () => {
  const dispatch = useAppDispatch();
  const hospitalsBuilder = useAppSelector((state) => state.hospitalsBuilder);
  const currentHospital = useAppSelector((state) => state.currentHospital);

  const isEditing = currentHospital.id !== '';
  const isOpen = hospitalsBuilder.isCreateOpen || isEditing;
  const editingHospital = isEditing ? currentHospital : null;

  const closeModal = () => {
    dispatch(HospitalsBuilderActions.closeModal());
    dispatch(CurrentHospitalActions.resetCurrentHospital());
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Facilities</h1>
          <p className={styles.subtitle}>
            Hospitals and medical practices where your doctors work.
          </p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(HospitalsBuilderActions.setIsCreateOpen(true))}
          className={styles.primaryButton}
        >
          Add facility
        </button>
      </div>
      <HospitalsTable />
      <HospitalFormModal
        isOpen={isOpen}
        hospital={editingHospital}
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
