'use client';

import type { MedicationStatus } from '@/model';
import { CurrentMedicationActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const StatusInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentMedication);

  return (
    <select
      className={styles.input}
      value={current.status}
      onChange={(e) =>
        dispatch(
          CurrentMedicationActions.patchCurrentMedication({
            status: e.target.value as MedicationStatus,
          }),
        )
      }
    >
      <option value="active">Active</option>
      <option value="stopped">Stopped</option>
    </select>
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
