'use client';

import { HospitalsBuilderActions } from '@/store/builders';
import { CurrentHospitalActions } from '@/store/current';
import { useAppDispatch } from '@/store';
import { HospitalFormModal } from './form-modal';
import { HospitalsTable } from './table';

export const HospitalsPage = () => {
  const dispatch = useAppDispatch();

  const openCreate = () => {
    dispatch(CurrentHospitalActions.resetCurrentHospital());
    dispatch(HospitalsBuilderActions.setIsCreateOpen(true));
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
          onClick={openCreate}
          className={styles.primaryButton}
        >
          Add facility
        </button>
      </div>
      <HospitalsTable />
      <HospitalFormModal />
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
