import { updateMedicalHistoryEvent, type UpdateMedicalHistoryEventPayload } from '@/api/medical-history-events';
import { MedicalHistoryEventsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Updates a medical history event and upserts it into the dump.
 */
export const updateMedicalHistoryEventThunk =
  (id: string, payload: UpdateMedicalHistoryEventPayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await updateMedicalHistoryEvent(id, payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(MedicalHistoryEventsActions.upsertMedicalHistoryEvent(result.data));
    return 200;
  };
