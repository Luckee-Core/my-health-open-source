'use client';

import type { AppointmentStatus } from '@/model';
import { CurrentAppointmentActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { STATUS_LABELS } from '../../../format-datetime-local';

export const StatusInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentAppointment);

  return (
    <label className={styles.label}>
      Status
      <select
        className={styles.input}
        value={current.status}
        onChange={(e) =>
          dispatch(
            CurrentAppointmentActions.patchCurrentAppointment({
              status: e.target.value as AppointmentStatus,
            }),
          )
        }
      >
        {(Object.keys(STATUS_LABELS) as AppointmentStatus[]).map((key) => (
          <option key={key} value={key}>
            {STATUS_LABELS[key]}
          </option>
        ))}
      </select>
    </label>
  );
};

const styles = {
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
