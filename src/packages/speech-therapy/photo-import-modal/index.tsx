'use client';

import { useEffect } from 'react';
import type { TherapyExerciseTrackingKind } from '@/model';
import { THERAPY_TRACKING_KIND_LABELS } from '@/model';
import { TherapyExerciseImportBuilderActions } from '@/store/builders';
import { commitTherapyExerciseImportThunk, resetTherapyExerciseImportThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';

type Props = {
  isOpen: boolean;
  selectedFileName: string;
  onClose: () => void;
};

/**
 * Reviews AI-extracted speech homework exercises before commit.
 */
export const PhotoImportModal = ({ isOpen, selectedFileName, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const builder = useAppSelector((state) => state.therapyExerciseImportBuilder);

  useEffect(() => {
    if (!isOpen) return;
    if (builder.step !== 'done') return;
    onClose();
    void dispatch(resetTherapyExerciseImportThunk());
  }, [builder.step, dispatch, isOpen, onClose]);

  if (!isOpen) return null;

  const isLoading = builder.previewStatus === 'loading';
  const isCommitting = builder.commitStatus === 'loading' || builder.step === 'committing';
  const trackingOptions = Object.entries(THERAPY_TRACKING_KIND_LABELS) as [
    TherapyExerciseTrackingKind,
    string,
  ][];

  const handleClose = () => {
    if (builder.localImageUrl) {
      URL.revokeObjectURL(builder.localImageUrl);
    }
    onClose();
    void dispatch(resetTherapyExerciseImportThunk());
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>Import from photo</h2>
        {selectedFileName && <p className={styles.help}>Selected: {selectedFileName}</p>}

        {isLoading && <p className={styles.help}>Analyzing PNG…</p>}

        {builder.previewStatus === 'error' && (
          <p className={styles.error}>{builder.errorMessage}</p>
        )}

        {builder.step === 'preview' || builder.step === 'committing' ? (
          <div className={styles.fields}>
            <p className={styles.help}>
              Check the exercises you want to add. Unchecked rows are skipped.
            </p>
            {builder.localImageUrl && (
              <img src={builder.localImageUrl} alt="Homework photo" className={styles.previewImage} />
            )}
            <div className={styles.exerciseList}>
              {builder.exercises.map((exercise, index) => (
                <div key={`${exercise.name}-${index}`} className={styles.exerciseCard}>
                  <label className={styles.selectRow}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={builder.selectedIndexes.includes(index)}
                      onChange={() =>
                        dispatch(TherapyExerciseImportBuilderActions.toggleExerciseSelected(index))
                      }
                    />
                    <span className={styles.selectLabel}>Add to program</span>
                  </label>
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
                          patch: {
                            tracking_kind: e.target.value as TherapyExerciseTrackingKind,
                          },
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
          </div>
        ) : null}

        <div className={styles.actions}>
          <button type="button" onClick={handleClose} className={styles.cancelButton}>
            Cancel
          </button>
          {(builder.step === 'preview' || builder.step === 'committing') && (
            <button
              type="button"
              className={styles.saveButton}
              disabled={isCommitting || builder.selectedIndexes.length === 0}
              onClick={() => void dispatch(commitTherapyExerciseImportThunk())}
            >
              {isCommitting ? 'Saving…' : 'Save exercises'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: `fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4`,
  panel: `w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-5 shadow-lg`,
  heading: `text-lg font-semibold text-gray-900`,
  fields: `mt-4 space-y-3`,
  help: `text-sm text-gray-600`,
  previewImage: `max-h-48 rounded-md border border-gray-200 object-contain`,
  exerciseList: `space-y-3`,
  exerciseCard: `rounded-md border border-gray-200 p-3 space-y-2`,
  selectRow: `flex items-center gap-2`,
  checkbox: `h-4 w-4 rounded border-gray-300`,
  selectLabel: `text-sm font-medium text-gray-800`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  textarea: `w-full min-h-16 rounded-md border border-gray-300 px-3 py-2 text-sm`,
  row: `grid grid-cols-2 gap-2`,
  error: `text-sm text-red-600 mt-3`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
