'use client';

import { CurrentAllergyActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const SubstanceInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentAllergy);

  return (
    <input
      type="text"
      placeholder="Substance"
      className={styles.input}
      value={current.substance}
      onChange={(e) =>
        dispatch(CurrentAllergyActions.patchCurrentAllergy({ substance: e.target.value }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
