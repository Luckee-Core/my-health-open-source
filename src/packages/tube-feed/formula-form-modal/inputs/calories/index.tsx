'use client';

import { useMemo } from 'react';
import { CurrentFeedFormulaActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const CaloriesInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedFormula);
  const kcalPerMl = useMemo(() => {
    if (!(current.calories_per_1000_ml > 0)) return null;
    return current.calories_per_1000_ml / 1000;
  }, [current.calories_per_1000_ml]);

  return (
    <div className={styles.wrap}>
      <label className={styles.label}>
        Calories per 1000 mL
        <input
          type="number"
          min={1}
          step="any"
          className={styles.input}
          value={current.calories_per_1000_ml}
          onChange={(e) =>
            dispatch(
              CurrentFeedFormulaActions.patchCurrentFeedFormula({
                calories_per_1000_ml: Number(e.target.value),
              }),
            )
          }
        />
      </label>
      {kcalPerMl != null && <p className={styles.hint}>{kcalPerMl.toFixed(2)} kcal/mL</p>}
    </div>
  );
};

const styles = {
  wrap: `space-y-1`,
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  hint: `text-xs text-gray-500`,
} as const;
