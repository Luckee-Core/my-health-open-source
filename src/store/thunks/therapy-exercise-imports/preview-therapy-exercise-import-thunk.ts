import { previewTherapyExerciseImport } from '@/api/therapy-exercise-imports';
import { TherapyExerciseImportBuilderActions } from '@/store/builders';
import { TherapyExerciseImportAiExchangesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Uploads a homework photo and stores the preview in the import builder.
 */
export const previewTherapyExerciseImportThunk =
  (file: File, localImageUrl: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    dispatch(TherapyExerciseImportBuilderActions.setPreviewStatus('loading'));
    dispatch(TherapyExerciseImportBuilderActions.setErrorMessage(''));
    dispatch(TherapyExerciseImportBuilderActions.setLocalImageUrl(localImageUrl));

    const result = await previewTherapyExerciseImport(file);
    if (!result.ok) {
      dispatch(TherapyExerciseImportBuilderActions.setPreviewStatus('error'));
      dispatch(
        TherapyExerciseImportBuilderActions.setErrorMessage(
          result.error.message || 'Failed to preview therapy exercise import',
        ),
      );
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(TherapyExerciseImportBuilderActions.setPreviewId(result.data.previewId));
    dispatch(TherapyExerciseImportBuilderActions.setExercises(result.data.exercises));
    dispatch(
      TherapyExerciseImportAiExchangesActions.upsertTherapyExerciseImportAiExchange(
        result.data.exchange,
      ),
    );
    dispatch(TherapyExerciseImportBuilderActions.setPreviewStatus('success'));
    dispatch(TherapyExerciseImportBuilderActions.setStep('preview'));
    return 200;
  };
