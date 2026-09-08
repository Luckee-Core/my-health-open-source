import { commitTherapyExerciseImport } from '@/api/therapy-exercise-imports';
import { TherapyExerciseImportBuilderActions } from '@/store/builders';
import { TherapyExercisesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Commits checked therapy exercises from the import builder. Unchecked rows are skipped.
 */
export const commitTherapyExerciseImportThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const builder = getState().therapyExerciseImportBuilder;
    if (!builder.previewId) {
      dispatch(TherapyExerciseImportBuilderActions.setErrorMessage('Missing preview id'));
      return 400;
    }
    const selected = builder.exercises.filter((_, index) =>
      builder.selectedIndexes.includes(index),
    );
    if (selected.length === 0) {
      dispatch(TherapyExerciseImportBuilderActions.setErrorMessage('Select at least one exercise'));
      return 400;
    }

    dispatch(TherapyExerciseImportBuilderActions.setCommitStatus('loading'));
    dispatch(TherapyExerciseImportBuilderActions.setStep('committing'));
    dispatch(TherapyExerciseImportBuilderActions.setErrorMessage(''));

    const result = await commitTherapyExerciseImport(builder.previewId, selected);
    if (!result.ok) {
      dispatch(TherapyExerciseImportBuilderActions.setCommitStatus('error'));
      dispatch(
        TherapyExerciseImportBuilderActions.setErrorMessage(
          result.error.message || 'Failed to commit therapy exercise import',
        ),
      );
      dispatch(TherapyExerciseImportBuilderActions.setStep('preview'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(TherapyExercisesActions.upsertTherapyExercises(result.data.exercises));
    dispatch(TherapyExerciseImportBuilderActions.setCommitStatus('success'));
    dispatch(TherapyExerciseImportBuilderActions.setStep('done'));
    return 200;
  };
