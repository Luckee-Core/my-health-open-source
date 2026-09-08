'use client';

import { CurrentFeedFormulaActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const VolumeLInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedFormula);

  return (
    <label className={styles.label}>
      L
      <input
        type="number"
        min={0}
        step="any"
        className={styles.input}
        value={current.volume_l ?? ''}
        onChange={(e) => {
          const raw = e.target.value.trim();
          dispatch(
            CurrentFeedFormulaActions.patchCurrentFeedFormula({
              volume_l: raw === '' ? null : Number(raw),
            }),
          );
        }}
      />
    </label>
  );
};

const styles = {
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
