'use client';

import { CurrentMedicalHistoryEventActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const TitleInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentMedicalHistoryEvent);

  return (
    <input
      type="text"
      placeholder="Title"
      className={styles.input}
      value={current.title}
      onChange={(e) =>
        dispatch(
          CurrentMedicalHistoryEventActions.patchCurrentMedicalHistoryEvent({
            title: e.target.value,
          }),
        )
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
