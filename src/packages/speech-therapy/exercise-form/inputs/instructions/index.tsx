'use client';

import { CurrentTherapyExerciseActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const InstructionsInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentTherapyExercise);

  return (
    <textarea
      placeholder="Instructions (optional)"
      className={styles.textarea}
      value={current.instructions ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentTherapyExerciseActions.patchCurrentTherapyExercise({
            instructions: e.target.value || null,
          }),
        )
      }
    />
  );
};

const styles = {
  textarea: `
    w-full min-h-24 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
  `,
} as const;
