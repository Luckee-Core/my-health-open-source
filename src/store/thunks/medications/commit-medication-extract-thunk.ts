import { commitExtractSession } from '@/api/ai-extract';
import { MedicationsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Commits a medication extract session and upserts created medications.
 */
export const commitMedicationExtractThunk =
  (sessionId: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await commitExtractSession(sessionId);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    for (const medication of result.data.medications) {
      dispatch(MedicationsActions.upsertMedication(medication));
    }
    return 200;
  };
