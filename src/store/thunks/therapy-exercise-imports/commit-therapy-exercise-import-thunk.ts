import { commitTherapyExerciseImport } from '@/api/therapy-exercise-imports';
import { TherapyExerciseImportBuilderActions } from '@/store/builders';
import { TherapyExercisesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Commits reviewed therapy exercises from the import builder.
 */
export const commitTherapyExerciseImportThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const builder = getState().therapyExerciseImportBuilder;
    if (!builder.previewId) {
      dispatch(TherapyExerciseImportBuilderActions.setErrorMessage('Missing preview id'));
      return 400;
    }
    if (builder.exercises.length === 0) {
      dispatch(TherapyExerciseImportBuilderActions.setErrorMessage('No exercises to import'));
      return 400;
    }

    dispatch(TherapyExerciseImportBuilderActions.setCommitStatus('loading'));
    dispatch(TherapyExerciseImportBuilderActions.setStep('committing'));
    dispatch(TherapyExerciseImportBuilderActions.setErrorMessage(''));

    const result = await commitTherapyExerciseImport(builder.previewId, builder.exercises);
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
