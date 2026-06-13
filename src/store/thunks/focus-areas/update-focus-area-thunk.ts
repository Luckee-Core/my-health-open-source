import { updateFocusArea, type UpdateFocusAreaPayload } from '@/api/focus-areas';
import { FocusAreasActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates a focus area and upserts it into the dump.
 */
export const updateFocusAreaThunk =
  (id: string, payload: UpdateFocusAreaPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateFocusArea(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(FocusAreasActions.upsertFocusArea(result.data));
    return 200;
  };
