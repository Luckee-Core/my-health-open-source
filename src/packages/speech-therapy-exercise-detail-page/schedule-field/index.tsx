'use client';

import { CurrentTherapyExerciseActions } from '@/store/current';
import { saveTherapyExerciseThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  getTherapyExerciseSchedule,
  THERAPY_EXERCISE_SCHEDULE_LABELS,
  type TherapyExerciseSchedule,
} from '@/packages/speech-therapy/get-therapy-exercise-schedule';
import { getTherapyExerciseSchedulePatch } from '@/packages/speech-therapy/get-therapy-exercise-schedule-patch';

const SCHEDULE_OPTIONS = Object.entries(THERAPY_EXERCISE_SCHEDULE_LABELS) as [
  TherapyExerciseSchedule,
  string,
][];

/**
 * Saves daily vs session-only vs paused for the open therapy exercise.
 */
export const ExerciseScheduleField = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentTherapyExercise);
  const builder = useAppSelector((state) => state.therapyExercisesBuilder);
  const isSaving = builder.saveStatus === 'saving';
  const schedule = getTherapyExerciseSchedule(current);

  const handleChange = async (next: TherapyExerciseSchedule) => {
    if (next === schedule) return;
    dispatch(CurrentTherapyExerciseActions.patchCurrentTherapyExercise(getTherapyExerciseSchedulePatch(next)));
    await dispatch(saveTherapyExerciseThunk());
  };

  return (
    <div className={styles.row}>
      <dt className={styles.label}>
        <label htmlFor="exercise-schedule">Schedule</label>
      </dt>
      <dd className={styles.control}>
        <select
          id="exercise-schedule"
          className={styles.select}
          value={schedule}
          disabled={isSaving}
          onChange={(event) => void handleChange(event.target.value as TherapyExerciseSchedule)}
        >
          {SCHEDULE_OPTIONS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <p className={styles.hint}>
          Session-only stays off the daily list. Log it here on therapy days instead of skipping it
          every morning.
        </p>
        {builder.saveError && <p className={styles.error}>{builder.saveError}</p>}
      </dd>
    </div>
  );
};

const styles = {
  row: `grid grid-cols-[8rem_minmax(0,1fr)] gap-3 items-start`,
  label: `text-xs font-medium uppercase tracking-wide text-gray-500 pt-2`,
  control: `space-y-1 min-w-0`,
  select: `
    w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900
    disabled:opacity-50
  `,
  hint: `text-xs text-gray-500`,
  error: `text-sm text-red-600`,
} as const;
