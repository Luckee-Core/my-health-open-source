import { deleteCondition } from '@/api/conditions';
import { ConditionsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a condition and removes it from the dump.
 */
export const deleteConditionThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteCondition(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(ConditionsActions.removeCondition(id));
    return 200;
  };
