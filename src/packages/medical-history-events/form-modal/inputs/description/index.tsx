'use client';

import { CurrentMedicalHistoryEventActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const DescriptionInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentMedicalHistoryEvent);

  return (
    <textarea
      placeholder="Description — treatment details, findings, notes"
      className={styles.textarea}
      value={current.description ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentMedicalHistoryEventActions.patchCurrentMedicalHistoryEvent({
            description: e.target.value || null,
          }),
        )
      }
    />
  );
};

const styles = {
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[120px]`,
} as const;
