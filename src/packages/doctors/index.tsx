'use client';

import { useState } from 'react';
import type { Doctor } from '@/model/doctor';
import { DoctorFormModal } from './form-modal';
import { DoctorsTable } from './table';

export const DoctorsPage = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Doctors</h1>
          <p className={styles.subtitle}>Your care team linked to facilities and specialties.</p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className={styles.primaryButton}>
          Add doctor
        </button>
      </div>
      <DoctorsTable onEdit={setEditingDoctor} />
      <DoctorFormModal
        isOpen={isCreateOpen || editingDoctor !== null}
        doctor={editingDoctor}
        onClose={() => {
          setIsCreateOpen(false);
          setEditingDoctor(null);
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
