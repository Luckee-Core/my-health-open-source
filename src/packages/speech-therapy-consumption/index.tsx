'use client';

import { IceCubeHistoryTable } from './history';
import { IceCubeTodayLog } from './today-log';

export const SpeechTherapyConsumptionPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Consumption</h1>
          <p className={styles.subtitle}>Track ice cubes each day.</p>
        </div>
      </div>

      <IceCubeTodayLog />

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>History</h2>
        <IceCubeHistoryTable />
      </section>
    </div>
  );
};

const styles = {
  page: `space-y-6`,
  header: `flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between`,
  title: `text-2xl font-semibold text-gray-900`,
  subtitle: `text-sm text-gray-600 max-w-2xl`,
  section: `rounded-lg border border-gray-200 bg-white p-4 space-y-3`,
  sectionTitle: `text-base font-semibold text-gray-900`,
} as const;
