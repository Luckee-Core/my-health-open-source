import { getAllClinicalNotes } from '@/api/clinical-notes';
import { ClinicalNotesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all clinicalNotes into the dump.
 */
export const loadClinicalNotesThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await getAllClinicalNotes();
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(
      ClinicalNotesActions.setClinicalNotes(
        Object.fromEntries(result.data.map((row) => [row.id, row])),
      ),
    );
    return 200;
  };
