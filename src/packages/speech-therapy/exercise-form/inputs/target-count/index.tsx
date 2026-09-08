'use client';

import { CurrentTherapyExerciseActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const TargetCountInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentTherapyExercise);

  return (
    <input
      type="number"
      min={1}
      placeholder="Target count"
      className={styles.input}
      value={current.target_count}
      onChange={(e) =>
        dispatch(
          CurrentTherapyExerciseActions.patchCurrentTherapyExercise({
            target_count: Number(e.target.value),
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
