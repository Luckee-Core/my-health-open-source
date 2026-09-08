'use client';

import { CurrentMedicalHistoryEventActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const EventDateInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentMedicalHistoryEvent);

  return (
    <label className={styles.label}>
      Date
      <input
        type="date"
        className={styles.input}
        value={current.event_date}
        onChange={(e) =>
          dispatch(
            CurrentMedicalHistoryEventActions.patchCurrentMedicalHistoryEvent({
              event_date: e.target.value,
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
