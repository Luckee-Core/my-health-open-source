import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type {
  TherapyExercise,
  TherapyExerciseImportAiExchange,
  TherapyExerciseImportDraftExercise,
} from '@/model';

type PreviewBody = {
  success: boolean;
  data?: {
    previewId: string;
    exercises: TherapyExerciseImportDraftExercise[];
    exchangeId: string;
    exchange: TherapyExerciseImportAiExchange;
  };
  error?: string;
};

type CommitBody = {
  success: boolean;
  data?: { exercises: TherapyExercise[] };
  error?: string;
};

export type PreviewTherapyExerciseImportData = {
  previewId: string;
  exercises: TherapyExerciseImportDraftExercise[];
  exchangeId: string;
  exchange: TherapyExerciseImportAiExchange;
};

export type CommitTherapyExerciseImportData = {
  exercises: TherapyExercise[];
};

/**
 * Uploads a homework photo for AI extraction preview.
 */
export const previewTherapyExerciseImport = async (
  file: File,
): Promise<ApiResponse<PreviewTherapyExerciseImportData>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await getApiClient().postFormData<PreviewBody>(
      '/api/data/therapy-exercise-imports/preview',
      formData,
    );
    return fromExpressBody(data, 'Failed to preview therapy exercise import');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to preview therapy exercise import');
  }
};

/**
 * Commits reviewed therapy exercises from a preview.
 */
export const commitTherapyExerciseImport = async (
  previewId: string,
  exercises: TherapyExerciseImportDraftExercise[],
): Promise<ApiResponse<CommitTherapyExerciseImportData>> => {
  try {
    const { data } = await getApiClient().post<CommitBody>(
      '/api/data/therapy-exercise-imports/commit',
      { previewId, exercises },
    );
    return fromExpressBody(data, 'Failed to commit therapy exercise import');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to commit therapy exercise import');
  }
};
