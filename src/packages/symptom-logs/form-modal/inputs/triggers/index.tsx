'use client';

import { CurrentSymptomLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const TriggersInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentSymptomLog);

  return (
    <input
      type="text"
      placeholder="Triggers (e.g. prolonged talking, eating)"
      className={styles.input}
      value={current.triggers ?? ''}
      onChange={(e) =>
        dispatch(
          CurrentSymptomLogActions.patchCurrentSymptomLog({ triggers: e.target.value || null }),
        )
      }
    />
  );
};

const styles = {
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
