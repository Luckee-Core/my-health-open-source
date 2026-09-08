'use client';

import { CurrentAppointmentActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const ReasonInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentAppointment);

  return (
    <input
      type="text"
      placeholder="Reason for visit"
      className={styles.input}
      value={current.reason ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentAppointmentActions.patchCurrentAppointment({ reason: e.target.value || null }),
        )
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
