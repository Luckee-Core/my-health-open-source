'use client';

import { useState } from 'react';
import type { Appointment } from '@/model/appointment';
import { AppointmentFormModal } from './form-modal';
import { AppointmentsTable } from './table';

export const AppointmentsPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Appointments</h1>
          <p className={styles.subtitle}>
            Scheduled visits with your doctors. Location comes from the doctor&apos;s facility.
          </p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className={styles.primaryButton}>
          Add appointment
        </button>
      </div>
      <AppointmentsTable onEdit={setEditingAppointment} />
      <AppointmentFormModal
        isOpen={isCreateOpen || editingAppointment !== null}
        appointment={editingAppointment}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingAppointment(null);
        }}
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
