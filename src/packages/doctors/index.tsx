'use client';

import { DoctorsBuilderActions } from '@/store/builders';
import { CurrentDoctorActions } from '@/store/current';
import { useAppDispatch } from '@/store';
import { DoctorFormModal } from './form-modal';
import { DoctorsTable } from './table';

export const DoctorsPage = () => {
  const dispatch = useAppDispatch();

  const openCreate = () => {
    dispatch(CurrentDoctorActions.resetCurrentDoctor());
    dispatch(DoctorsBuilderActions.setIsCreateOpen(true));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Doctors</h1>
          <p className={styles.subtitle}>Your care team linked to facilities and specialties.</p>
        </div>
        <button type="button" onClick={openCreate} className={styles.primaryButton}>
          Add doctor
        </button>
      </div>
      <DoctorsTable />
      <DoctorFormModal />
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
