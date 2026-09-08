'use client';

import { CurrentDailyEntryActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const NotesInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentDailyEntry);

  return (
    <label className={styles.label}>
      Notes
      <textarea
        placeholder="What happened today for this area?"
        className={styles.textarea}
        rows={5}
        value={current.notes ?? ''}
        onChange={(e) =>
          dispatch(
            CurrentDailyEntryActions.patchCurrentDailyEntry({ notes: e.target.value || null }),
          )
        }
      />
    </label>
  );
};

const styles = {
  label: `block text-sm font-medium text-gray-700 space-y-1`,
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
