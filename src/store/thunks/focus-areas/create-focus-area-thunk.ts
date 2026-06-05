import { createFocusArea, type CreateFocusAreaPayload } from '@/api/focus-areas';
import { FocusAreasActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import type { ThunkResult } from '@/store/thunks/thunk-result';

/**
 * Creates a focus area and upserts it into the dump.
 */
export const createFocusAreaThunk =
  (payload: CreateFocusAreaPayload): AppThunk<Promise<ThunkResult>> =>
  async (dispatch) => {
    const result = await createFocusArea(payload);
    if (!result.ok) {
      return {
        status: result.status >= 500 ? 500 : 400,
        message: result.error.message,
      };
    }
    dispatch(FocusAreasActions.upsertFocusArea(result.data));
    return { status: 200 };
  };
