'use client';

import { CurrentSymptomLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const DurationMinutesInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentSymptomLog);

  return (
    <input
      type="number"
      min={0}
      placeholder="Duration in minutes (optional)"
      className={styles.input}
      value={current.duration_minutes ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentSymptomLogActions.patchCurrentSymptomLog({
            duration_minutes: e.target.value === '' ? null : Number(e.target.value),
          }),
        )
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
