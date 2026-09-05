import { updateCondition, type UpdateConditionPayload } from '@/api/conditions';
import { ConditionsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates a condition and upserts it into the dump.
 */
export const updateConditionThunk =
  (id: string, payload: UpdateConditionPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateCondition(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(ConditionsActions.upsertCondition(result.data));
    return 200;
  };
