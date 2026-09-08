'use client';

import { CurrentFeedFormulaActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const ContainerVolumeInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedFormula);

  return (
    <label className={styles.label}>
      Container volume (mL)
      <input
        type="number"
        min={1}
        step="any"
        className={styles.input}
        value={current.container_volume_ml}
        onChange={(e) =>
          dispatch(
            CurrentFeedFormulaActions.patchCurrentFeedFormula({
              container_volume_ml: Number(e.target.value),
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
