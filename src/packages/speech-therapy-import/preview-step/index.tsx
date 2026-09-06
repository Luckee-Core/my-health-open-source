'use client';

import type { TherapyExerciseTrackingKind } from '@/model';
import { THERAPY_TRACKING_KIND_LABELS } from '@/model';
import { TherapyExerciseImportBuilderActions } from '@/store/builders';
import { commitTherapyExerciseImportThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';

export const PreviewStep = () => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.therapyExerciseImportBuilder);
  const isCommitting = builder.commitStatus === 'loading' || builder.step === 'committing';

  const trackingOptions = Object.entries(THERAPY_TRACKING_KIND_LABELS) as [
    TherapyExerciseTrackingKind,
    string,
  ][];

  return (
    <div className={styles.panel}>
      <h2 className={styles.heading}>Review extracted exercises</h2>
      <p className={styles.body}>
        Fix any names, counts, or tracking types before saving to your program.
      </p>

      {builder.localImageUrl && (
        <img src={builder.localImageUrl} alt="Homework photo" className={styles.previewImage} />
      )}

      <div className={styles.exerciseList}>
        {builder.exercises.map((exercise, index) => (
          <div key={`${exercise.name}-${index}`} className={styles.exerciseCard}>
            <input
              type="text"
              className={styles.input}
              value={exercise.name}
              onChange={(e) =>
                dispatch(
                  TherapyExerciseImportBuilderActions.updateExerciseAt({
                    index,
                    patch: { name: e.target.value },
                  }),
                )
              }
            />
            <textarea
              className={styles.textarea}
              value={exercise.instructions ?? ''}
              placeholder="Instructions"
              onChange={(e) =>
                dispatch(
                  TherapyExerciseImportBuilderActions.updateExerciseAt({
                    index,
                    patch: { instructions: e.target.value || null },
                  }),
                )
              }
            />
            <select
              className={styles.input}
              value={exercise.tracking_kind}
              onChange={(e) =>
                dispatch(
                  TherapyExerciseImportBuilderActions.updateExerciseAt({
                    index,
                    patch: { tracking_kind: e.target.value as TherapyExerciseTrackingKind },
                  }),
                )
              }
            >
              {trackingOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <div className={styles.row}>
              <input
                type="number"
                min={1}
                className={styles.input}
                value={exercise.target_count}
                onChange={(e) =>
                  dispatch(
                    TherapyExerciseImportBuilderActions.updateExerciseAt({
                      index,
                      patch: { target_count: Number(e.target.value) },
                    }),
                  )
                }
              />
              <input
                type="number"
                min={1}
                className={styles.input}
                value={exercise.unit_size}
                onChange={(e) =>
                  dispatch(
                    TherapyExerciseImportBuilderActions.updateExerciseAt({
                      index,
                      patch: { unit_size: Number(e.target.value) },
                    }),
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>

      {builder.errorMessage && <p className={styles.error}>{builder.errorMessage}</p>}

      <button
        type="button"
        className={styles.primaryButton}
        disabled={isCommitting}
        onClick={() => void dispatch(commitTherapyExerciseImportThunk())}
      >
        {isCommitting ? 'Saving…' : 'Save exercises'}
      </button>
    </div>
  );
};

const styles = {
  panel: `rounded-lg border border-gray-200 bg-white p-6 space-y-4`,
  heading: `text-lg font-semibold text-gray-900`,
  body: `text-sm text-gray-600`,
  previewImage: `max-h-64 rounded-md border border-gray-200 object-contain`,
  exerciseList: `space-y-4`,
  exerciseCard: `rounded-md border border-gray-200 p-4 space-y-2`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  textarea: `w-full min-h-20 rounded-md border border-gray-300 px-3 py-2 text-sm`,
  row: `grid grid-cols-2 gap-2`,
  error: `text-sm text-red-600`,
  primaryButton: `
    rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white
    hover:bg-gray-800 disabled:opacity-50
  `,
} as const;
