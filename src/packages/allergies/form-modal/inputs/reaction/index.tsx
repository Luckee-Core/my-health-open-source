'use client';

import { CurrentAllergyActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const ReactionInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentAllergy);

  return (
    <input
      type="text"
      placeholder="Reaction"
      className={styles.input}
      value={current.reaction ?? ''}
      onChange={(e) =>
        dispatch(CurrentAllergyActions.patchCurrentAllergy({ reaction: e.target.value || null }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
