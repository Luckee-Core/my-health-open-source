'use client';

import { CurrentTherapyExerciseActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  getTherapyExerciseSchedule,
  THERAPY_EXERCISE_SCHEDULE_LABELS,
  type TherapyExerciseSchedule,
} from '../../../get-therapy-exercise-schedule';
import { getTherapyExerciseSchedulePatch } from '../../../get-therapy-exercise-schedule-patch';

export const ScheduleInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentTherapyExercise);
  const schedule = getTherapyExerciseSchedule(current);

  return (
    <label className={styles.fieldLabel}>
      Schedule
      <select
        className={styles.input}
        value={schedule}
        onChange={(e) =>
          dispatch(
            CurrentTherapyExerciseActions.patchCurrentTherapyExercise(
              getTherapyExerciseSchedulePatch(e.target.value as TherapyExerciseSchedule),
            )
          )
        }
      >
        {(Object.entries(THERAPY_EXERCISE_SCHEDULE_LABELS) as [TherapyExerciseSchedule, string][]).map(
          ([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ),
        )}
      </select>
    </label>
  );
};

const styles = {
  fieldLabel: `block space-y-1 text-xs font-medium uppercase tracking-wide text-gray-500`,
  input: `
    w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
  `,
} as const;
