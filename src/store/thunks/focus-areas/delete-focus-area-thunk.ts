import { deleteFocusArea } from '@/api/focus-areas';
import { FocusAreasActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a focus area and removes it from the dump.
 */
export const deleteFocusAreaThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteFocusArea(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(FocusAreasActions.removeFocusArea(id));
    return 200;
  };
