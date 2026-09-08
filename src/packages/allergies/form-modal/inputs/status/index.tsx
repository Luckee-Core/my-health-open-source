'use client';

import type { AllergyStatus } from '@/model';
import { CurrentAllergyActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const StatusInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentAllergy);

  return (
    <select
      className={styles.input}
      value={current.status}
      onChange={(e) =>
        dispatch(
          CurrentAllergyActions.patchCurrentAllergy({ status: e.target.value as AllergyStatus }),
        )
      }
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
