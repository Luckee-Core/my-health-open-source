import { getAllConditions } from '@/api/conditions';
import { ConditionsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all conditions into the dump.
 */
export const loadConditionsThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getAllConditions();
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(
      ConditionsActions.setConditions(
        Object.fromEntries(result.data.map((row) => [row.id, row])),
      ),
    );
    return 200;
  };
