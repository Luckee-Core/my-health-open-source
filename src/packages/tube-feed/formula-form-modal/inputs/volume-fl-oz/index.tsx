'use client';

import { CurrentFeedFormulaActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const VolumeFlOzInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedFormula);

  return (
    <label className={styles.label}>
      FL OZ
      <input
        type="number"
        min={0}
        step="any"
        className={styles.input}
        value={current.volume_fl_oz ?? ''}
        onChange={(e) => {
          const raw = e.target.value.trim();
          dispatch(
            CurrentFeedFormulaActions.patchCurrentFeedFormula({
              volume_fl_oz: raw === '' ? null : Number(raw),
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
