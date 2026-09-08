'use client';

import { CurrentAllergyActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const CriticalityInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentAllergy);

  return (
    <input
      type="text"
      placeholder="Criticality"
      className={styles.input}
      value={current.criticality ?? ''}
      onChange={(e) =>
        dispatch(CurrentAllergyActions.patchCurrentAllergy({ criticality: e.target.value || null }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
