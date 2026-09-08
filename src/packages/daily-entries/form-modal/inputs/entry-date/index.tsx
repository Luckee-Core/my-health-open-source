'use client';

import { CurrentDailyEntryActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const EntryDateInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentDailyEntry);

  return (
    <label className={styles.label}>
      Date
      <input
        type="date"
        className={styles.input}
        value={current.entry_date}
        onChange={(e) =>
          dispatch(CurrentDailyEntryActions.patchCurrentDailyEntry({ entry_date: e.target.value }))
        }
      />
    </label>
  );
};

const styles = {
  label: `block text-sm font-medium text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
