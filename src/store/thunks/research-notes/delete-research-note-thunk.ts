import { deleteResearchNote } from '@/api/research-notes';
import { ResearchNotesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Deletes a research note and removes it from the dump.
 */
export const deleteResearchNoteThunk =
  (id: string): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await deleteResearchNote(id);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(ResearchNotesActions.removeResearchNote(id));
    return 200;
  };
