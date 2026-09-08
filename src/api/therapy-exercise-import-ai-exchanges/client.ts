import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { TherapyExerciseImportAiExchange } from '@/model';

type ListBody = {
  success: boolean;
  data?: TherapyExerciseImportAiExchange[];
  error?: string;
};

/**
 * Loads completed therapy exercise import AI exchanges from Express.
 */
export const getAllTherapyExerciseImportAiExchanges = async (): Promise<
  ApiResponse<TherapyExerciseImportAiExchange[]>
> => {
  try {
    const { data } = await getApiClient().get<ListBody>(
      '/api/data/therapy-exercise-import-ai-exchanges',
    );
    return fromExpressListBody(data, 'Failed to load therapy import AI exchanges');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load therapy import AI exchanges');
  }
};
