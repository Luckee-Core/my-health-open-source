'use client';

import { CurrentResearchNoteActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const ContentInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentResearchNote);

  return (
    <textarea
      placeholder="Full content — paste reports, chat exports, or long notes"
      className={styles.textarea}
      value={current.content ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentResearchNoteActions.patchCurrentResearchNote({ content: e.target.value || null }),
        )
      }
    />
  );
};

const styles = {
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[200px] font-mono text-xs`,
} as const;
