'use client';

import { AppointmentsBuilderActions } from '@/store/builders';
import { CurrentAppointmentActions } from '@/store/current';
import { useAppDispatch } from '@/store';
import { AppointmentFormModal } from './form-modal';
import { AppointmentsTable } from './table';

export const AppointmentsPage = () => {
  const dispatch = useAppDispatch();

  const openCreate = () => {
    dispatch(CurrentAppointmentActions.resetCurrentAppointment());
    dispatch(AppointmentsBuilderActions.setIsCreateOpen(true));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Appointments</h1>
          <p className={styles.subtitle}>
            Scheduled visits with your doctors. Location comes from the doctor&apos;s facility.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className={styles.primaryButton}
        >
          Add appointment
        </button>
      </div>
      <AppointmentsTable />
      <AppointmentFormModal />
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
