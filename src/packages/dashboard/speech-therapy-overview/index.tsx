'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { SPEECH_THERAPY_PATH } from '@/config/routes';
import { TodayTracker } from '@/packages/speech-therapy/today-tracker';
import { buildTodayTherapyRows } from '@/packages/speech-therapy/build-today-therapy-rows';
import { useAppSelector } from '@/store';
import { getLocalDateKey } from '@/utils/date/get-local-date-key';

export const SpeechTherapyOverview = () => {
  const exercisesDump = useAppSelector((state) => state.therapyExercises);
  const logsDump = useAppSelector((state) => state.therapyExerciseLogs);
  const todayKey = useMemo(() => getLocalDateKey(), []);

  const rows = useMemo(
    () => buildTodayTherapyRows(exercisesDump, logsDump, todayKey),
    [exercisesDump, logsDump, todayKey],
  );

  const incompleteCount = useMemo(
    () => rows.filter((row) => !row.isComplete).length,
    [rows],
  );

  if (rows.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Speech therapy</h2>
          <Link href={SPEECH_THERAPY_PATH} className={styles.link}>
            Open
          </Link>
        </div>
        <p className={styles.body}>No daily exercises yet.</p>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Speech therapy</h2>
        <Link href={SPEECH_THERAPY_PATH} className={styles.link}>
          Open
        </Link>
      </div>
      <p className={styles.body}>
        {incompleteCount === 0
          ? 'All exercises complete for today.'
          : `${incompleteCount} exercise${incompleteCount === 1 ? '' : 's'} remaining today.`}
      </p>
      <TodayTracker variant="compact" showTimer={false} incompleteFirst />
    </section>
  );
};

const styles = {
  section: `
    rounded-lg border border-gray-200 bg-white p-4
    space-y-3
  `,
  sectionHeader: `flex items-center justify-between gap-3`,
  sectionTitle: `text-base font-semibold text-gray-900`,
  link: `text-sm text-gray-700 underline-offset-2 hover:underline`,
  body: `text-sm text-gray-600`,
} as const;
