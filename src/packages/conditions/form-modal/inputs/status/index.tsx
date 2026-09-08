'use client';

import type { ConditionStatus } from '@/model';
import { CurrentConditionActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const StatusInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentCondition);

  return (
    <select
      className={styles.input}
      value={current.status}
      onChange={(e) =>
        dispatch(
          CurrentConditionActions.patchCurrentCondition({
            status: e.target.value as ConditionStatus,
          }),
        )
      }
    >
      <option value="active">Active</option>
      <option value="resolved">Resolved</option>
    </select>
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
