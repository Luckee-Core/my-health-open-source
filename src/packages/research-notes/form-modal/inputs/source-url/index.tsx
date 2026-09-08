'use client';

import { CurrentResearchNoteActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const SourceUrlInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentResearchNote);

  return (
    <input
      type="url"
      placeholder="Source URL (optional)"
      className={styles.input}
      value={current.source_url ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentResearchNoteActions.patchCurrentResearchNote({
            source_url: e.target.value || null,
          }),
        )
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
