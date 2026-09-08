'use client';

import { CurrentSpecialtyActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const NameInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentSpecialty);

  return (
    <input
      type="text"
      placeholder="Specialty name (e.g. Cardiology)"
      className={styles.input}
      value={current.name}
      onChange={(e) =>
        dispatch(CurrentSpecialtyActions.patchCurrentSpecialty({ name: e.target.value }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
