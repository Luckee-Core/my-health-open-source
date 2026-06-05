import { deleteFocusArea } from '@/api/focus-areas';
import { FocusAreasActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Deletes a focus area and removes it from the dump.
 */
export const deleteFocusAreaThunk =
  (id: string): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await deleteFocusArea(id);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(FocusAreasActions.removeFocusArea(id));
    return { status: 200 };
  };
