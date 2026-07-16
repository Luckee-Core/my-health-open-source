import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_HEALTH_IMPORT_SUMMARY, type HealthImportSummary } from '@/model';

const initialState: HealthImportSummary = EMPTY_HEALTH_IMPORT_SUMMARY;

export const currentHealthImportDraftSlice = createSlice({
  name: 'currentHealthImportDraft',
  initialState,
  reducers: {
    setCurrentHealthImportDraft: (_state, action: PayloadAction<HealthImportSummary>) =>
      action.payload,
    resetCurrentHealthImportDraft: () => EMPTY_HEALTH_IMPORT_SUMMARY,
  },
});

export const CurrentHealthImportDraftActions = currentHealthImportDraftSlice.actions;
export const currentHealthImportDraftReducer = currentHealthImportDraftSlice.reducer;
