'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { SPEECH_THERAPY_EXERCISE_DETAIL_PAGE_PATH } from '@/config/routes';
import {
  incrementTherapyExerciseLogThunk,
  openTherapyExerciseDetailThunk,
  skipTherapyExerciseLogThunk,
} from '@/store/thunks';
import { useAppDispatch } from '@/store';
import { getLocalDateKey } from '@/utils/date';
import type { TodayTherapyRow } from '../../build-today-therapy-rows';
import {
  formatTherapyExerciseProgress,
  isTherapyExerciseComplete,
} from '../../format-therapy-exercise-progress';

type Props = {
  row: TodayTherapyRow;
  variant?: 'full' | 'compact';
  showTimer?: boolean;
};

export const TherapyTrackerRow = ({
  row,
  variant = 'full',
  showTimer = true,
}: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const todayKey = getLocalDateKey();
  const [isBusy, setIsBusy] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const { exercise, completedCount, isSkipped } = row;

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

  const progressLabel = isSkipped
    ? 'Skipped today'
    : formatTherapyExerciseProgress(exercise, completedCount);
  const incrementLabel =
    exercise.tracking_kind === 'sets_reps' ? 'Log rep' : 'Log attempt';
  const decrementLabel =
    exercise.tracking_kind === 'sets_reps' ? 'Undo rep' : 'Undo attempt';

  return (
    <div
      className={isSkipped ? styles.rowSkipped : isComplete ? styles.rowComplete : styles.row}
      onClick={() => {
        void dispatch(openTherapyExerciseDetailThunk(exercise)).then((status) => {
          if (status === 200) {
            router.push(SPEECH_THERAPY_EXERCISE_DETAIL_PAGE_PATH);
          }
        });
      }}
    >
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
            onClick={(event) => {
              event.stopPropagation();
              handleStartTimer();
            }}
            disabled={isBusy || secondsLeft != null || isSkipped}
          >
            {secondsLeft != null ? `${secondsLeft}s` : `Start ${exercise.unit_size}s`}
          </button>
        )}
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={(event) => {
            event.stopPropagation();
            void handleSkip(!isSkipped);
          }}
          disabled={isBusy}
        >
          {isSkipped ? 'Do today' : 'Skip today'}
        </button>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={(event) => {
            event.stopPropagation();
            void handleDelta(-1);
          }}
          disabled={isBusy || completedCount <= 0 || isSkipped}
        >
          {decrementLabel}
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={(event) => {
            event.stopPropagation();
            void handleDelta(1);
          }}
          disabled={isBusy || isSkipped}
        >
          {incrementLabel}
        </button>
      </div>
    </div>
  );
};

const styles = {
  row: `
    flex cursor-pointer flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4
    sm:flex-row sm:items-center sm:justify-between
  `,
  rowComplete: `
    flex cursor-pointer flex-col gap-3 rounded-lg border border-green-200 bg-green-50 p-4
    sm:flex-row sm:items-center sm:justify-between
  `,
  rowSkipped: `
    flex cursor-pointer flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4
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
