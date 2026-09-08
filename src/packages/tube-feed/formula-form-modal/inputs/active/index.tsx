'use client';

import { CurrentFeedFormulaActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const ActiveInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedFormula);

  return (
    <label className={styles.checkboxRow}>
      <input
        type="checkbox"
        checked={current.is_active}
        onChange={(e) =>
          dispatch(
            CurrentFeedFormulaActions.patchCurrentFeedFormula({ is_active: e.target.checked }),
          )
        }
      />
      Active
    </label>
  );
};

const styles = {
  checkboxRow: `flex items-center gap-2 text-sm text-gray-800`,
} as const;
