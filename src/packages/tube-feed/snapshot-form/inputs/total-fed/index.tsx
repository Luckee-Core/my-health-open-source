'use client';

import { CurrentFeedLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const TotalFedInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedLog);

  return (
    <label className={styles.label}>
      Total fed (mL)
      <input
        type="number"
        min={0}
        step="any"
        className={styles.input}
        value={current.total_fed_ml}
        onChange={(e) =>
          dispatch(
            CurrentFeedLogActions.patchCurrentFeedLog({
              total_fed_ml: Number(e.target.value),
            }),
          )
        }
      />
    </label>
  );
};

const styles = {
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
