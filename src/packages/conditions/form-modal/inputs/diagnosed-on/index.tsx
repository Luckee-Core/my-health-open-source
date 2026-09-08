'use client';

import { CurrentConditionActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const DiagnosedOnInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentCondition);

  return (
    <input
      type="date"
      className={styles.input}
      value={current.diagnosed_on ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentConditionActions.patchCurrentCondition({ diagnosed_on: e.target.value || null }),
        )
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
