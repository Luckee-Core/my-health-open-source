import {
  createMedicalHistoryEvent,
  type CreateMedicalHistoryEventPayload,
} from '@/api/medical-history-events';
import { MedicalHistoryEventsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates a medical history event and upserts it into the dump.
 */
export const createMedicalHistoryEventThunk =
  (payload: CreateMedicalHistoryEventPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await createMedicalHistoryEvent(payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(MedicalHistoryEventsActions.upsertMedicalHistoryEvent(result.data));
    return 200;
  };
