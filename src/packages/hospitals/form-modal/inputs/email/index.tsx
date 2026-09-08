'use client';

import { CurrentHospitalActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const EmailInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentHospital);

  return (
    <input
      type="email"
      placeholder="Email"
      className={styles.input}
      value={current.email ?? ''}
      onChange={(e) =>
        dispatch(CurrentHospitalActions.patchCurrentHospital({ email: e.target.value || null }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
