import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ClinicalNote } from '@/model';

const initialState: Record<string, ClinicalNote> = {};

export const clinicalNotesSlice = createSlice({
  name: 'clinicalNotes',
  initialState,
  reducers: {
    setClinicalNotes: (_state, action: PayloadAction<Record<string, ClinicalNote>>) => action.payload,
    upsertClinicalNote: (state, action: PayloadAction<ClinicalNote>) => {
      state[action.payload.id] = action.payload;
    },
    removeClinicalNote: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const ClinicalNotesActions = clinicalNotesSlice.actions;
export const clinicalNotesReducer = clinicalNotesSlice.reducer;
