import { deleteMedicalHistoryEvent } from '@/api/medical-history-events';
import { MedicalHistoryEventsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a medical history event and removes it from the dump.
 */
export const deleteMedicalHistoryEventThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteMedicalHistoryEvent(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(MedicalHistoryEventsActions.removeMedicalHistoryEvent(id));
    return 200;
  };
