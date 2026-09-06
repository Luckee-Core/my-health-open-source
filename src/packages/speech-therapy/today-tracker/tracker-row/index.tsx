'use client';

import { useEffect, useRef, useState } from 'react';
import type { TherapyExercise } from '@/model';
import { incrementTherapyExerciseLogThunk } from '@/store/thunks';
import { useAppDispatch } from '@/store';
import { getLocalDateKey } from '@/utils/date/get-local-date-key';
import {
  formatTherapyExerciseProgress,
  isTherapyExerciseComplete,
} from '../../format-therapy-exercise-progress';

type Props = {
  exercise: TherapyExercise;
  completedCount: number;
  variant?: 'full' | 'compact';
  showTimer?: boolean;
};

export const TherapyTrackerRow = ({
  exercise,
  completedCount,
  variant = 'full',
  showTimer = true,
}: Props) => {
  const dispatch = useAppDispatch();
  const todayKey = getLocalDateKey();
  const [isBusy, setIsBusy] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  const isComplete = isTherapyExerciseComplete(exercise, completedCount);

  useEffect(() => {
    return () => {
      if (timerRef.current != null) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  const handleDelta = async (delta: number) => {
    setIsBusy(true);
    await dispatch(incrementTherapyExerciseLogThunk(exercise.id, todayKey, delta));
    setIsBusy(false);
  };

  const handleStartTimer = () => {
    if (exercise.tracking_kind !== 'timed_attempts' || secondsLeft != null) return;
    setSecondsLeft(exercise.unit_size);
    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev == null) return null;
        if (prev <= 1) {
          if (timerRef.current != null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          void handleDelta(1);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const progressLabel = formatTherapyExerciseProgress(exercise, completedCount);

  return (
    <div className={isComplete ? styles.rowComplete : styles.row}>
      <div className={styles.info}>
        <p className={styles.name}>{exercise.name}</p>
        <p className={styles.progress}>{progressLabel}</p>
        {variant === 'full' && exercise.instructions && (
          <p className={styles.instructions}>{exercise.instructions}</p>
        )}
      </div>
      <div className={styles.actions}>
        {showTimer && exercise.tracking_kind === 'timed_attempts' && (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={handleStartTimer}
            disabled={isBusy || secondsLeft != null}
          >
            {secondsLeft != null ? `${secondsLeft}s` : `Start ${exercise.unit_size}s`}
          </button>
        )}
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={() => void handleDelta(-1)}
          disabled={isBusy || completedCount <= 0}
        >
          −1
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => void handleDelta(1)}
          disabled={isBusy}
        >
          +1
        </button>
      </div>
    </div>
  );
};

const styles = {
  row: `
    flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4
    sm:flex-row sm:items-center sm:justify-between
  `,
  rowComplete: `
    flex flex-col gap-3 rounded-lg border border-green-200 bg-green-50 p-4
    sm:flex-row sm:items-center sm:justify-between
  `,
  info: `space-y-1 min-w-0`,
  name: `text-sm font-semibold text-gray-900`,
  progress: `text-sm text-gray-700`,
  instructions: `text-xs text-gray-500`,
  actions: `flex flex-wrap items-center gap-2 shrink-0`,
  primaryButton: `
    rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white
    hover:bg-gray-800 disabled:opacity-50
  `,
  secondaryButton: `
    rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-800
    hover:bg-gray-50 disabled:opacity-50
  `,
} as const;
