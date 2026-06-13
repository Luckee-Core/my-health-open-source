import { createFocusArea, type CreateFocusAreaPayload } from '@/api/focus-areas';
import { FocusAreasActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates a focus area and upserts it into the dump.
 */
export const createFocusAreaThunk =
  (payload: CreateFocusAreaPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await createFocusArea(payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(FocusAreasActions.upsertFocusArea(result.data));
    return 200;
  };
