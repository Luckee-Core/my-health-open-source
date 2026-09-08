'use client';

import { CurrentAppointmentActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const AppointmentTypeInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentAppointment);

  return (
    <input
      type="text"
      placeholder="Appointment type (e.g. Follow-up)"
      className={styles.input}
      value={current.appointment_type ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentAppointmentActions.patchCurrentAppointment({
            appointment_type: e.target.value || null,
          }),
        )
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
