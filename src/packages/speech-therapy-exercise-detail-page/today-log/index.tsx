'use client';

import { useMemo, useState } from 'react';
import type { TherapyExercise } from '@/model';
import { formatTherapyExerciseProgress } from '@/packages/speech-therapy/format-therapy-exercise-progress';
import { getTherapyExerciseSchedule } from '@/packages/speech-therapy/get-therapy-exercise-schedule';
import {
  incrementTherapyExerciseLogThunk,
  setTherapyExerciseLogDueThunk,
  skipTherapyExerciseLogThunk,
} from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { getLocalDateKey } from '@/utils/date';
import { normalizeLogDateKey } from '@/packages/speech-therapy/normalize-log-date-key';

type Props = {
  exercise: TherapyExercise;
};

/**
 * Today's log controls for the open therapy exercise.
 */
export const ExerciseTodayLog = ({ exercise }: Props) => {
  const dispatch = useAppDispatch();
  const logsDump = useAppSelector((state) => state.therapyExerciseLogs);
  const [isBusy, setIsBusy] = useState(false);
  const todayKey = useMemo(() => getLocalDateKey(), []);

  const todayLog = useMemo(() => {
    return Object.values(logsDump).find(
      (log) => log.exercise_id === exercise.id && normalizeLogDateKey(log.log_date) === todayKey,
    );
  }, [exercise.id, logsDump, todayKey]);

  const completedCount = todayLog?.completed_count ?? 0;
  const isSkipped = Boolean(todayLog?.skipped);
  const isDue = Boolean(todayLog?.due);
  const schedule = getTherapyExerciseSchedule(exercise);
  const isPaused = schedule === 'paused';
  const isSession = schedule === 'session';
  const isOnTodayList = !isPaused && (!isSession || isDue);
  const canLog = isOnTodayList;

  const handleDelta = async (delta: number) => {
    if (delta < 0 && completedCount <= 0) return;
    setIsBusy(true);
    try {
      await dispatch(incrementTherapyExerciseLogThunk(exercise.id, todayKey, delta));
    } finally {
      setIsBusy(false);
    }
  };

  const handleSkip = async (skipped: boolean) => {
    setIsBusy(true);
    try {
      await dispatch(skipTherapyExerciseLogThunk(exercise.id, todayKey, skipped));
    } finally {
      setIsBusy(false);
    }
  };

  const handleSetDue = async (due: boolean) => {
    setIsBusy(true);
    try {
      await dispatch(setTherapyExerciseLogDueThunk(exercise.id, todayKey, due));
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <section className={styles.section}>
      <div>
        <h2 className={styles.heading}>Today</h2>
        <p className={styles.progress}>
          {isPaused
            ? 'Paused — not on the daily list'
            : isSession && !isDue
              ? 'Session only — not on the daily list'
              : isSkipped
                ? 'Skipped today'
                : formatTherapyExerciseProgress(exercise, completedCount)}
        </p>
        {isSession && (
          <p className={styles.hint}>
            {isDue
              ? 'On today\'s dashboard until you mark it not today.'
              : 'Mark it active today to show it on the dashboard.'}
          </p>
        )}
      </div>
      <div className={styles.actions}>
        {isSession && (
          <button
            type="button"
            className={isDue ? styles.secondaryButton : styles.primaryButton}
            onClick={() => void handleSetDue(!isDue)}
            disabled={isBusy || isPaused}
          >
            {isDue ? 'Not today' : 'Active today'}
          </button>
        )}
        {canLog && (
          <>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => void handleSkip(!isSkipped)}
              disabled={isBusy || !canLog}
            >
              {isSkipped ? 'Undo skip' : 'Skip'}
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => void handleDelta(-1)}
              disabled={isBusy || !canLog || completedCount <= 0 || isSkipped}
            >
              −1
            </button>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => void handleDelta(1)}
              disabled={isBusy || !canLog || isSkipped}
            >
              +1
            </button>
          </>
        )}
      </div>
    </section>
  );
};

const styles = {
  section: `
    flex h-full min-w-0 flex-col justify-between gap-6 rounded-lg border border-gray-200
    bg-white p-4
  `,
  heading: `text-lg font-semibold text-gray-900`,
  progress: `mt-2 text-sm text-gray-700`,
  hint: `mt-1 text-xs text-gray-500`,
  actions: `flex flex-wrap gap-2`,
  primaryButton: `
    rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white
    hover:bg-gray-800 disabled:opacity-50
  `,
  secondaryButton: `
    rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800
    hover:bg-gray-50 disabled:opacity-50
  `,
} as const;
