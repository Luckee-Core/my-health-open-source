import { commitExtractSession } from '@/api/ai-extract';
import { ConditionsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Commits a condition extract session and upserts created conditions.
 */
export const commitConditionExtractThunk =
  (sessionId: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await commitExtractSession(sessionId);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    for (const condition of result.data.conditions) {
      dispatch(ConditionsActions.upsertCondition(condition));
    }
    return 200;
  };
