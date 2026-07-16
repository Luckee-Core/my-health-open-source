'use client';

import { VitalSignsTable } from './table';

export const VitalSignsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Vital signs</h1>
          <p className={styles.subtitle}>Recorded vitals from clinical visits and imports.</p>
        </div>
      </div>
      <VitalSignsTable />
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
} as const;
