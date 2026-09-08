'use client';

import { CurrentFocusAreaActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const DescriptionInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFocusArea);

  return (
    <textarea
      placeholder="What are you tracking for this area?"
      className={styles.textarea}
      rows={4}
      value={current.description ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentFocusAreaActions.patchCurrentFocusArea({ description: e.target.value || null }),
        )
      }
    />
  );
};

const styles = {
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
