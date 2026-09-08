'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { SPEECH_THERAPY_EXERCISE_DETAIL_PAGE_PATH } from '@/config/routes';
import type { TodayTherapyRow } from '@/packages/speech-therapy/build-today-therapy-rows';
import { incrementTherapyExerciseLogThunk, openTherapyExerciseDetailThunk } from '@/store/thunks';
import { useAppDispatch } from '@/store';
import { getLocalDateKey } from '@/utils/date';
import { SpeechTherapyTodayRow } from './row';

type Props = {
  rows: TodayTherapyRow[];
};

/**
 * Compact dashboard table for today's speech therapy exercises.
 */
export const SpeechTherapyTodayTable = ({ rows }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const todayKey = useMemo(() => getLocalDateKey(), []);

  const openDetail = (exercise: TodayTherapyRow['exercise']) => {
    void dispatch(openTherapyExerciseDetailThunk(exercise)).then((status) => {
      if (status === 200) {
        router.push(SPEECH_THERAPY_EXERCISE_DETAIL_PAGE_PATH);
      }
    });
  };

  const handleDelta = async (exerciseId: string, completedCount: number, delta: number) => {
    if (delta < 0 && completedCount <= 0) return;
    setBusyId(exerciseId);
    try {
      await dispatch(incrementTherapyExerciseLogThunk(exerciseId, todayKey, delta));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>Exercise</th>
          <th className={styles.th}>Progress</th>
          <th className={styles.thActions}>Log</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <SpeechTherapyTodayRow
            key={row.exercise.id}
            row={row}
            busy={busyId === row.exercise.id}
            onOpen={openDetail}
            onDelta={(exerciseId, completedCount, delta) =>
              void handleDelta(exerciseId, completedCount, delta)
            }
          />
        ))}
      </tbody>
    </table>
  );
};

const styles = {
  table: `w-full divide-y divide-gray-200 text-xs`,
  thead: `bg-gray-50`,
  th: `px-2 py-0.5 text-left font-medium text-gray-700`,
  thActions: `px-2 py-0.5 text-right font-medium text-gray-700`,
} as const;
