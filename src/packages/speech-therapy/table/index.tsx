'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { SPEECH_THERAPY_EXERCISE_DETAIL_PAGE_PATH } from '@/config/routes';
import type { TherapyExercise } from '@/model';
import {
  incrementTherapyExerciseLogThunk,
  openTherapyExerciseDetailThunk,
  setTherapyExerciseLogDueThunk,
} from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { getLocalDateKey } from '@/utils/date';
import { buildSpeechTherapyTableRows } from '../build-speech-therapy-table-rows';
import { compareTodayTherapyRows } from '../compare-today-therapy-rows';
import { TherapyExerciseRow } from './row';

/**
 * Single management table for speech therapy exercises (today's progress + log actions).
 */
export const TherapyExercisesTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const exercisesDump = useAppSelector((state) => state.therapyExercises);
  const logsDump = useAppSelector((state) => state.therapyExerciseLogs);
  const [busyId, setBusyId] = useState<string | null>(null);
  const todayKey = useMemo(() => getLocalDateKey(), []);

  const rows = useMemo(() => {
    const built = buildSpeechTherapyTableRows(exercisesDump, logsDump, todayKey);
    const daily = built
      .filter((row) => !row.isInactive && !row.isSessionOnly)
      .sort(compareTodayTherapyRows);
    const sessionOnly = built.filter((row) => row.isSessionOnly);
    const paused = built.filter((row) => row.isInactive);
    return [...daily, ...sessionOnly, ...paused];
  }, [exercisesDump, logsDump, todayKey]);

  const openDetail = (exercise: TherapyExercise) => {
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

  const handleSetDue = async (exerciseId: string, due: boolean) => {
    setBusyId(exerciseId);
    try {
      await dispatch(setTherapyExerciseLogDueThunk(exerciseId, todayKey, due));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className={styles.wrapper}>
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
            <TherapyExerciseRow
              key={row.exercise.id}
              row={row}
              busy={busyId === row.exercise.id}
              onOpenDetail={openDetail}
              onDelta={(exerciseId, completedCount, delta) => {
                void handleDelta(exerciseId, completedCount, delta);
              }}
              onSetDue={(exerciseId, due) => {
                void handleSetDue(exerciseId, due);
              }}
            />
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={3} className={styles.empty}>
                No exercises yet. Add one manually or import from a photo.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  wrapper: `overflow-x-auto rounded-lg border border-gray-200 bg-white`,
  table: `min-w-full divide-y divide-gray-200 text-sm`,
  thead: `bg-gray-50`,
  th: `px-3 py-2 text-left font-medium text-gray-700`,
  thActions: `px-3 py-2 text-right font-medium text-gray-700`,
  empty: `px-3 py-6 text-center text-gray-500`,
} as const;
