import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ClinicalResult } from '@/model';

const initialState: Record<string, ClinicalResult> = {};

export const clinicalResultsSlice = createSlice({
  name: 'clinicalResults',
  initialState,
  reducers: {
    setClinicalResults: (_state, action: PayloadAction<Record<string, ClinicalResult>>) => action.payload,
    upsertClinicalResult: (state, action: PayloadAction<ClinicalResult>) => {
      state[action.payload.id] = action.payload;
    },
    removeClinicalResult: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const ClinicalResultsActions = clinicalResultsSlice.actions;
export const clinicalResultsReducer = clinicalResultsSlice.reducer;
