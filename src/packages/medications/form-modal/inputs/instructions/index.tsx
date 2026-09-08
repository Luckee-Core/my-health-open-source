'use client';

import { useMemo } from 'react';
import { CurrentMedicationActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  formatDoseIntervalMinutes,
  parseDoseIntervalMinutes,
} from '@/utils/medications/parse-dose-interval-minutes';

export const InstructionsInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentMedication);
  const parsedIntervalMinutes = useMemo(
    () => parseDoseIntervalMinutes(current.instructions ?? ''),
    [current.instructions],
  );

  return (
    <div className={styles.wrap}>
      <input
        type="text"
        placeholder="e.g. Take 1 pill every 3 hours"
        className={styles.input}
        value={current.instructions ?? ''}
        onChange={(e) =>
          dispatch(
            CurrentMedicationActions.patchCurrentMedication({
              instructions: e.target.value || null,
            }),
          )
        }
      />
      {parsedIntervalMinutes != null && current.status === 'active' && (
        <p className={styles.intervalDetected}>
          Dashboard reminders: {formatDoseIntervalMinutes(parsedIntervalMinutes)} (from
          instructions)
        </p>
      )}
    </div>
  );
};

const styles = {
  wrap: `space-y-2`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  intervalDetected: `text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2`,
} as const;
