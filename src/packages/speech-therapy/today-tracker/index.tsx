'use client';

import { useMemo } from 'react';
import { useAppSelector } from '@/store';
import { getLocalDateKey } from '@/utils/date/get-local-date-key';
import { buildTodayTherapyRows } from '../build-today-therapy-rows';
import { TherapyTrackerRow } from './tracker-row';

type Props = {
  variant?: 'full' | 'compact';
  showTimer?: boolean;
  incompleteFirst?: boolean;
};

export const TodayTracker = ({
  variant = 'full',
  showTimer = true,
  incompleteFirst = false,
}: Props) => {
  const exercisesDump = useAppSelector((state) => state.therapyExercises);
  const logsDump = useAppSelector((state) => state.therapyExerciseLogs);
  const todayKey = useMemo(() => getLocalDateKey(), []);

  const rows = useMemo(() => {
    const built = buildTodayTherapyRows(exercisesDump, logsDump, todayKey);
    if (!incompleteFirst) return built;
    return [...built].sort((a, b) => {
      if (a.isComplete === b.isComplete) return 0;
      return a.isComplete ? 1 : -1;
    });
  }, [exercisesDump, logsDump, todayKey, incompleteFirst]);

  if (rows.length === 0) {
    return <p className={styles.empty}>No active daily exercises yet.</p>;
  }

  return (
    <div className={styles.list}>
      {rows.map((row) => (
        <TherapyTrackerRow
          key={row.exercise.id}
          exercise={row.exercise}
          completedCount={row.completedCount}
          variant={variant}
          showTimer={showTimer}
        />
      ))}
    </div>
  );
};

const styles = {
  list: `space-y-3`,
  empty: `text-sm text-gray-600`,
} as const;
