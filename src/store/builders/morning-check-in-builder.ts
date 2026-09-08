import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSaveStatus } from './form-save-status';

type MorningCheckInBuilderState = {
  saveError: string;
  saveStatus: FormSaveStatus;
  loadError: string;
  isLoading: boolean;
  severityByKey: Record<string, number>;
  notesByKey: Record<string, string>;
};

const initialState: MorningCheckInBuilderState = {
  saveError: '',
  saveStatus: 'idle',
  loadError: '',
  isLoading: true,
  severityByKey: {},
  notesByKey: {},
};

export const morningCheckInBuilderSlice = createSlice({
  name: 'morningCheckInBuilder',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoadError: (state, action: PayloadAction<string>) => {
      state.loadError = action.payload;
    },
    setSaveError: (state, action: PayloadAction<string>) => {
      state.saveError = action.payload;
    },
    setSaveStatus: (state, action: PayloadAction<FormSaveStatus>) => {
      state.saveStatus = action.payload;
    },
    setSeverity: (state, action: PayloadAction<{ key: string; value: number | null }>) => {
      if (action.payload.value == null) {
        delete state.severityByKey[action.payload.key];
        return;
      }
      state.severityByKey[action.payload.key] = action.payload.value;
    },
    setNotes: (state, action: PayloadAction<{ key: string; value: string }>) => {
      if (!action.payload.value) {
        delete state.notesByKey[action.payload.key];
        return;
      }
      state.notesByKey[action.payload.key] = action.payload.value;
    },
    resetRows: (state) => {
      state.severityByKey = {};
      state.notesByKey = {};
    },
  },
});

export const MorningCheckInBuilderActions = morningCheckInBuilderSlice.actions;
export const morningCheckInBuilderReducer = morningCheckInBuilderSlice.reducer;
