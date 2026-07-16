'use client';

import { ReferralsTable } from './table';

export const ReferralsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Referrals</h1>
          <p className={styles.subtitle}>Specialty referrals from your care team.</p>
        </div>
      </div>
      <ReferralsTable />
    </div>
  );
};

const styles = {
  page: `space-y-4`,
  header: `flex items-center justify-between gap-4`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
} as const;
