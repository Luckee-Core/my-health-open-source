'use client';

import { CurrentConditionActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const NameInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentCondition);

  return (
    <input
      type="text"
      placeholder="Condition name"
      className={styles.input}
      value={current.name}
      onChange={(e) =>
        dispatch(CurrentConditionActions.patchCurrentCondition({ name: e.target.value }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
