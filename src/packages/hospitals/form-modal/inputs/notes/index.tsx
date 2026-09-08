'use client';

import { CurrentHospitalActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const NotesInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentHospital);

  return (
    <textarea
      placeholder="Notes"
      className={styles.textarea}
      value={current.notes ?? ''}
      onChange={(e) =>
        dispatch(CurrentHospitalActions.patchCurrentHospital({ notes: e.target.value || null }))
      }
    />
  );
};

const styles = {
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px]`,
} as const;
