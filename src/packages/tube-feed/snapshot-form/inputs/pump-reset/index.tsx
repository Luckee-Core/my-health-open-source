'use client';

import { CurrentFeedLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const PumpResetInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedLog);

  return (
    <label className={styles.checkboxRow}>
      <input
        type="checkbox"
        checked={current.pump_reset}
        onChange={(e) =>
          dispatch(CurrentFeedLogActions.patchCurrentFeedLog({ pump_reset: e.target.checked }))
        }
      />
      Pump total was reset since the last log
    </label>
  );
};

const styles = {
  checkboxRow: `flex items-center gap-2 text-sm text-gray-800`,
} as const;
