'use client';

import { CurrentFeedLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const FeedLeftInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedLog);

  return (
    <label className={styles.label}>
      Feed left (mL)
      <input
        type="number"
        min={0}
        step="any"
        className={styles.input}
        value={current.feed_left_ml}
        onChange={(e) =>
          dispatch(
            CurrentFeedLogActions.patchCurrentFeedLog({
              feed_left_ml: Number(e.target.value),
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
