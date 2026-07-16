'use client';

import { InsuranceCoveragesTable } from './table';

export const InsuranceCoveragesPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Insurance</h1>
          <p className={styles.subtitle}>Coverage and plan details from imported records.</p>
        </div>
      </div>
      <InsuranceCoveragesTable />
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
} as const;
