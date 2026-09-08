'use client';

import { CurrentMedicationActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const StartedOnInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentMedication);

  return (
    <input
      type="date"
      className={styles.input}
      value={current.started_on ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentMedicationActions.patchCurrentMedication({ started_on: e.target.value || null }),
        )
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
