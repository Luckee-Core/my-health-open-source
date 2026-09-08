import { createResearchNote, updateResearchNote } from '@/api/research-notes';
import { ResearchNotesBuilderActions } from '@/store/builders';
import { CurrentResearchNoteActions } from '@/store/current';
import { ResearchNotesActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the research note in currentResearchNote.
 */
export const saveResearchNoteThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentResearchNote;
    const title = current.title.trim();

    dispatch(ResearchNotesBuilderActions.setSaveError(''));
    dispatch(ResearchNotesBuilderActions.setSaveStatus('saving'));

    if (!title) {
      dispatch(ResearchNotesBuilderActions.setSaveError('Title is required'));
      dispatch(ResearchNotesBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      title,
      category: current.category,
      source_url: current.source_url?.trim() || null,
      summary: current.summary?.trim() || null,
      content: current.content?.trim() || null,
      focus_area_id: current.focus_area_id || null,
    };
    const result =
      current.id === ''
        ? await createResearchNote(payload)
        : await updateResearchNote(current.id, payload);

    if (!result.ok) {
      dispatch(ResearchNotesBuilderActions.setSaveError(result.error.message));
      dispatch(ResearchNotesBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(ResearchNotesActions.upsertResearchNote(result.data));
    dispatch(CurrentResearchNoteActions.setCurrentResearchNote(result.data));
    dispatch(ResearchNotesBuilderActions.setSaveStatus('success'));
    return 200;
  };
