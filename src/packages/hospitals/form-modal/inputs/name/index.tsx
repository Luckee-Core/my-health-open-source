'use client';

import { CurrentHospitalActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const NameInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentHospital);

  return (
    <input
      type="text"
      placeholder="Facility name"
      className={styles.input}
      value={current.name}
      onChange={(e) =>
        dispatch(CurrentHospitalActions.patchCurrentHospital({ name: e.target.value }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
