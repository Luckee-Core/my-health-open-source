'use client';

import { ClinicalResultsTable } from './table';

export const ClinicalResultsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Clinical results</h1>
          <p className={styles.subtitle}>Lab and imaging results from your health record.</p>
        </div>
      </div>
      <ClinicalResultsTable />
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
} as const;
