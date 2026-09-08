'use client';

import { CurrentFeedFormulaActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const BrandInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedFormula);

  return (
    <input
      type="text"
      placeholder="Brand"
      className={styles.input}
      value={current.brand}
      onChange={(e) =>
        dispatch(CurrentFeedFormulaActions.patchCurrentFeedFormula({ brand: e.target.value }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
