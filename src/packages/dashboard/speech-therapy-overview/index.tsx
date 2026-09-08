'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { SPEECH_THERAPY_PATH } from '@/config/routes';
import { buildTodayTherapyRows } from '@/packages/speech-therapy/build-today-therapy-rows';
import { compareTodayTherapyRows } from '@/packages/speech-therapy/compare-today-therapy-rows';
import { useAppSelector } from '@/store';
import { getLocalDateKey } from '@/utils/date';
import { SpeechTherapyTodayTable } from './today';

export const SpeechTherapyOverview = () => {
  const exercisesDump = useAppSelector((state) => state.therapyExercises);
  const logsDump = useAppSelector((state) => state.therapyExerciseLogs);
  const todayKey = useMemo(() => getLocalDateKey(), []);

  const rows = useMemo(() => {
    const built = buildTodayTherapyRows(exercisesDump, logsDump, todayKey);
    return [...built].sort(compareTodayTherapyRows);
  }, [exercisesDump, logsDump, todayKey]);

  const incompleteCount = useMemo(
    () => rows.filter((row) => !row.isComplete && !row.isSkipped).length,
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
        <h2 className={styles.sectionTitle}>
          Speech therapy
          {incompleteCount === 0 ? (
            <span className={styles.completeBadge}>Done</span>
          ) : (
            <span className={styles.badge}>{incompleteCount} left</span>
          )}
        </h2>
        <Link href={SPEECH_THERAPY_PATH} className={styles.link}>
          Open
        </Link>
      </div>
      <SpeechTherapyTodayTable rows={rows} />
    </section>
  );
};

const styles = {
  section: `
    rounded-lg border border-gray-200 bg-white p-3
    space-y-2
  `,
  sectionHeader: `flex items-center justify-between gap-3`,
  sectionTitle: `text-sm font-semibold text-gray-900 flex items-center gap-2`,
  badge: `rounded-full bg-gray-800 px-2 py-0.5 text-xs font-medium text-white`,
  completeBadge: `rounded-full bg-green-700 px-2 py-0.5 text-xs font-medium text-white`,
  link: `text-xs text-gray-700 underline-offset-2 hover:underline`,
  body: `text-xs text-gray-600`,
} as const;
