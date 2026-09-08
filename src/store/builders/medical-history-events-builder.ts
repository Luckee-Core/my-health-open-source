import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSaveStatus } from './form-save-status';

type MedicalHistoryEventsBuilderState = {
  isCreateOpen: boolean;
  saveError: string;
  saveStatus: FormSaveStatus;
};

const initialState: MedicalHistoryEventsBuilderState = {
  isCreateOpen: false,
  saveError: '',
  saveStatus: 'idle',
};

export const medicalHistoryEventsBuilderSlice = createSlice({
  name: 'medicalHistoryEventsBuilder',
  initialState,
  reducers: {
    setIsCreateOpen: (state, action: { payload: boolean }) => {
      state.isCreateOpen = action.payload;
    },
    closeModal: (state) => {
      state.isCreateOpen = false;
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

export const MedicalHistoryEventsBuilderActions = medicalHistoryEventsBuilderSlice.actions;
export const medicalHistoryEventsBuilderReducer = medicalHistoryEventsBuilderSlice.reducer;
