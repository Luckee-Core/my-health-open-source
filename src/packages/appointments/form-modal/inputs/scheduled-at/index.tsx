'use client';

import { CurrentAppointmentActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import { fromDatetimeLocalValue, toDatetimeLocalValue } from '../../../format-datetime-local';

export const ScheduledAtInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentAppointment);
  const localValue = current.scheduled_at ? toDatetimeLocalValue(current.scheduled_at) : '';

  return (
    <label className={styles.label}>
      Scheduled
      <input
        type="datetime-local"
        className={styles.input}
        value={localValue}
        onChange={(e) =>
          dispatch(
            CurrentAppointmentActions.patchCurrentAppointment({
              scheduled_at: e.target.value ? fromDatetimeLocalValue(e.target.value) : '',
            }),
          )
        }
      />
    </label>
  );
};

const styles = {
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
