import { createResearchNote, type CreateResearchNotePayload } from '@/api/research-notes';
import { ResearchNotesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates a research note and upserts it into the dump.
 */
export const createResearchNoteThunk =
  (payload: CreateResearchNotePayload): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const result = await createResearchNote(payload);
    if (!result.ok) {
      return result.status >= 500 ? 500 : 400;
    }
    dispatch(ResearchNotesActions.upsertResearchNote(result.data));
    return 200;
  };
