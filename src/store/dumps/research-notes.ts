import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ResearchNote } from '@/model';

const initialState: Record<string, ResearchNote> = {};

export const researchNotesSlice = createSlice({
  name: 'researchNotes',
  initialState,
  reducers: {
    setResearchNotes: (_state, action: PayloadAction<Record<string, ResearchNote>>) =>
      action.payload,
    upsertResearchNote: (state, action: PayloadAction<ResearchNote>) => {
      state[action.payload.id] = action.payload;
    },
    removeResearchNote: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const ResearchNotesActions = researchNotesSlice.actions;
export const researchNotesReducer = researchNotesSlice.reducer;
