import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { LlmModel } from '@/model';

type ListBody = { success: boolean; data?: LlmModel[]; error?: string };

const parseLlmModel = (row: LlmModel): LlmModel => ({
  ...row,
  input_cost_per_million_usd: Number(row.input_cost_per_million_usd),
  output_cost_per_million_usd: Number(row.output_cost_per_million_usd),
});

/**
 * Loads LLM pricing rows from Express.
 */
export const getAllLlmModels = async (): Promise<ApiResponse<LlmModel[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/llm-models');
    const result = fromExpressListBody(data, 'Failed to load LLM models');
    if (!result.ok) return result;
    return { ...result, data: result.data.map(parseLlmModel) };
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load LLM models');
  }
};
