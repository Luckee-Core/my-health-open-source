'use client';

import { CurrentResearchNoteActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const SummaryInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentResearchNote);

  return (
    <textarea
      placeholder="Short summary for the list view"
      className={styles.textarea}
      value={current.summary ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentResearchNoteActions.patchCurrentResearchNote({ summary: e.target.value || null }),
        )
      }
    />
  );
};

const styles = {
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[72px]`,
} as const;
