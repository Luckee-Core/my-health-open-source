'use client';

import { ClinicalNotesTable } from './table';

export const ClinicalNotesPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Clinical notes</h1>
          <p className={styles.subtitle}>Visit notes and clinical documentation.</p>
        </div>
      </div>
      <ClinicalNotesTable />
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
} as const;
