'use client';

import { CurrentDoctorActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const PhoneInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentDoctor);

  return (
    <input
      type="text"
      placeholder="Phone"
      className={styles.input}
      value={current.phone ?? ''}
      onChange={(e) =>
        dispatch(CurrentDoctorActions.patchCurrentDoctor({ phone: e.target.value || null }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
