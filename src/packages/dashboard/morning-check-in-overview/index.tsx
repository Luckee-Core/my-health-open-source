'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { MORNING_CHECK_IN_PATH } from '@/config/routes';
import { useAppSelector } from '@/store';

const toLocalDateKey = (iso: string): string => {
  const date = new Date(iso);
  return date.toLocaleDateString('en-CA');
};

export const MorningCheckInOverview = () => {
  const symptomLogsDump = useAppSelector((state) => state.symptomLogs);

  const todayKey = useMemo(() => new Date().toLocaleDateString('en-CA'), []);
  const todayCount = useMemo(() => {
    return Object.values(symptomLogsDump).filter(
      (log) => toLocalDateKey(log.recorded_at) === todayKey,
    ).length;
  }, [symptomLogsDump, todayKey]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Morning check-in</h2>
        <Link href={MORNING_CHECK_IN_PATH} className={styles.link}>
          Open
        </Link>
      </div>
      <p className={styles.body}>
        {todayCount === 0
          ? 'No symptom logs recorded today yet.'
          : `${todayCount} symptom log${todayCount === 1 ? '' : 's'} logged today.`}
      </p>
    </section>
  );
};

const styles = {
  section: `
    rounded-lg border border-gray-200 bg-white p-4
    space-y-2
  `,
  sectionHeader: `flex items-center justify-between gap-3`,
  sectionTitle: `text-base font-semibold text-gray-900`,
  link: `text-sm text-gray-700 underline-offset-2 hover:underline`,
  body: `text-sm text-gray-600`,
} as const;
