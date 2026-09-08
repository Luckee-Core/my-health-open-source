'use client';

import { CurrentDoctorActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const NpiInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentDoctor);

  return (
    <input
      type="text"
      placeholder="NPI"
      className={styles.input}
      value={current.npi ?? ''}
      onChange={(e) =>
        dispatch(CurrentDoctorActions.patchCurrentDoctor({ npi: e.target.value || null }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
