'use client';

import { CurrentTherapyExerciseActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const UnitSizeInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentTherapyExercise);

  return (
    <input
      type="number"
      min={1}
      placeholder={current.tracking_kind === 'timed_attempts' ? 'Seconds each' : 'Reps per set'}
      className={styles.input}
      value={current.unit_size}
      onChange={(e) =>
        dispatch(
          CurrentTherapyExerciseActions.patchCurrentTherapyExercise({
            unit_size: Number(e.target.value),
          }),
        )
      }
    />
  );
};

const styles = {
  input: `
    w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
  `,
} as const;
