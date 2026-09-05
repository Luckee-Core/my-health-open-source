import { createCondition, type CreateConditionPayload } from '@/api/conditions';
import { ConditionsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates a condition and upserts it into the dump.
 */
export const createConditionThunk =
  (payload: CreateConditionPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await createCondition(payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(ConditionsActions.upsertCondition(result.data));
    return 200;
  };
