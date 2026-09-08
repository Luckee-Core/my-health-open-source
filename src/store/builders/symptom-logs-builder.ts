import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSaveStatus } from './form-save-status';

type SymptomLogsBuilderState = {
  isCreateOpen: boolean;
  hasSeverity: boolean;
  saveError: string;
  saveStatus: FormSaveStatus;
};

const initialState: SymptomLogsBuilderState = {
  isCreateOpen: false,
  hasSeverity: false,
  saveError: '',
  saveStatus: 'idle',
};

export const symptomLogsBuilderSlice = createSlice({
  name: 'symptomLogsBuilder',
  initialState,
  reducers: {
    setIsCreateOpen: (state, action: { payload: boolean }) => {
      state.isCreateOpen = action.payload;
    },
    setHasSeverity: (state, action: PayloadAction<boolean>) => {
      state.hasSeverity = action.payload;
    },
    closeModal: (state) => {
      state.isCreateOpen = false;
      state.hasSeverity = false;
      state.saveError = '';
      state.saveStatus = 'idle';
    },
    setSaveError: (state, action: PayloadAction<string>) => {
      state.saveError = action.payload;
    },
    setSaveStatus: (state, action: PayloadAction<FormSaveStatus>) => {
      state.saveStatus = action.payload;
    },
  },
});

export const SymptomLogsBuilderActions = symptomLogsBuilderSlice.actions;
export const symptomLogsBuilderReducer = symptomLogsBuilderSlice.reducer;
