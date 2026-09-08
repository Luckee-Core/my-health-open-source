'use client';

import { CurrentSymptomLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const NameInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentSymptomLog);

  return (
    <input
      type="text"
      placeholder="Symptom name (e.g. Voice fatigue)"
      className={styles.input}
      value={current.name}
      onChange={(e) =>
        dispatch(CurrentSymptomLogActions.patchCurrentSymptomLog({ name: e.target.value }))
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
