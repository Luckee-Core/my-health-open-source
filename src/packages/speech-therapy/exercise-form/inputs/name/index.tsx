'use client';

import { CurrentTherapyExerciseActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const NameInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentTherapyExercise);

  return (
    <input
      type="text"
      placeholder="Exercise name"
      className={styles.input}
      value={current.name}
      onChange={(e) =>
        dispatch(CurrentTherapyExerciseActions.patchCurrentTherapyExercise({ name: e.target.value }))
      }
    />
  );
};

const styles = {
  input: `
    w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
  `,
} as const;
