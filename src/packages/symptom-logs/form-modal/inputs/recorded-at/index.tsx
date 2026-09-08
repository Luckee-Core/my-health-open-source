'use client';

import { fromDatetimeLocalValue, toDatetimeLocalValue } from '@/packages/appointments/format-datetime-local';
import { CurrentSymptomLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const RecordedAtInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentSymptomLog);
  const localValue = current.recorded_at ? toDatetimeLocalValue(current.recorded_at) : '';

  return (
    <label className={styles.label}>
      When noticed
      <input
        type="datetime-local"
        className={styles.input}
        value={localValue}
        onChange={(e) =>
          dispatch(
            CurrentSymptomLogActions.patchCurrentSymptomLog({
              recorded_at: e.target.value ? fromDatetimeLocalValue(e.target.value) : '',
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
