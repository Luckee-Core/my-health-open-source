'use client';

import type { MedicalHistoryCategory } from '@/model';
import { MEDICAL_HISTORY_CATEGORY_LABELS } from '@/model';
import { CurrentMedicalHistoryEventActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const CategoryInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentMedicalHistoryEvent);

  return (
    <label className={styles.label}>
      Category
      <select
        className={styles.input}
        value={current.category}
        onChange={(e) =>
          dispatch(
            CurrentMedicalHistoryEventActions.patchCurrentMedicalHistoryEvent({
              category: e.target.value as MedicalHistoryCategory,
            }),
          )
        }
      >
        {(Object.keys(MEDICAL_HISTORY_CATEGORY_LABELS) as MedicalHistoryCategory[]).map((key) => (
          <option key={key} value={key}>
            {MEDICAL_HISTORY_CATEGORY_LABELS[key]}
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
