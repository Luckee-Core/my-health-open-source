'use client';

import { CurrentFeedLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const NotesInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedLog);

  return (
    <input
      type="text"
      placeholder="Notes (optional)"
      className={styles.input}
      value={current.notes ?? ''}
      onChange={(e) =>
        dispatch(CurrentFeedLogActions.patchCurrentFeedLog({ notes: e.target.value || null }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
