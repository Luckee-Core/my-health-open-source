'use client';

import { CurrentFeedLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { findFeedStartLog } from '@/packages/tube-feed/utils';

export const TotalFedInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedLog);
  const logsDump = useAppSelector((state) => state.feedLogs);
  const hasStarted = findFeedStartLog(logsDump) != null;

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
      {hasStarted && (
        <span className={styles.hint}>Current pump total — milliliters since last time are calculated.</span>
      )}
    </label>
  );
};

const styles = {
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  hint: `block text-xs text-gray-500`,
} as const;
