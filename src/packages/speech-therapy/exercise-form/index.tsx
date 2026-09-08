'use client';

import { saveTherapyExerciseThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { InstructionsInput } from './inputs/instructions';
import { NameInput } from './inputs/name';
import { ScheduleInput } from './inputs/schedule';
import { TargetCountInput } from './inputs/target-count';
import { TrackingKindInput } from './inputs/tracking-kind';
import { UnitSizeInput } from './inputs/unit-size';

type Props = {
  onSaved: () => void;
  onCancel?: () => void;
};

/**
 * Create/update form fields for a speech therapy exercise.
 */
export const TherapyExerciseForm = ({ onSaved, onCancel }: Props) => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.therapyExercisesBuilder);
  const isSaving = builder.saveStatus === 'saving';

  const handleSubmit = async () => {
    const status = await dispatch(saveTherapyExerciseThunk());
    if (status === 200) {
      onSaved();
    }
  };

  return (
    <div className={styles.fields}>
      <NameInput />
      <InstructionsInput />
      <TrackingKindInput />
      <div className={styles.row}>
        <TargetCountInput />
        <UnitSizeInput />
      </div>
      <ScheduleInput />
      <p className={styles.hint}>
        Session-only stays off the daily list. Log it on therapy days instead of skipping it every
        morning.
      </p>
      {builder.saveError && <p className={styles.error}>{builder.saveError}</p>}
      <div className={styles.footer}>
        {onCancel && (
          <button type="button" className={styles.secondaryButton} onClick={onCancel}>
            Cancel
          </button>
        )}
        <button
          type="button"
          className={styles.primaryButton}
          onClick={() => void handleSubmit()}
          disabled={isSaving}
        >
          {isSaving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  fields: `space-y-3`,
  row: `grid grid-cols-2 gap-3`,
  hint: `text-xs text-gray-500`,
  error: `text-sm text-red-600`,
  footer: `flex justify-end gap-2`,
  primaryButton: `
    rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white
    hover:bg-gray-800 disabled:opacity-50
  `,
  secondaryButton: `
    rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800
    hover:bg-gray-50
  `,
} as const;
