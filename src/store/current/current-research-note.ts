import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_RESEARCH_NOTE, type ResearchNote } from '@/model';

const initialState: ResearchNote = EMPTY_RESEARCH_NOTE;

export const currentResearchNoteSlice = createSlice({
  name: 'currentResearchNote',
  initialState,
  reducers: {
    setCurrentResearchNote: (_state, action: PayloadAction<ResearchNote>) => action.payload,
    patchCurrentResearchNote: (state, action: PayloadAction<Partial<ResearchNote>>) => ({
      ...state,
      ...action.payload,
    }),
    resetCurrentResearchNote: () => EMPTY_RESEARCH_NOTE,
  },
});

export const CurrentResearchNoteActions = currentResearchNoteSlice.actions;
export const currentResearchNoteReducer = currentResearchNoteSlice.reducer;
