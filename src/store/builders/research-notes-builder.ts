import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSaveStatus } from './form-save-status';

type ResearchNotesBuilderState = {
  isCreateOpen: boolean;
  saveError: string;
  saveStatus: FormSaveStatus;
};

const initialState: ResearchNotesBuilderState = {
  isCreateOpen: false,
  saveError: '',
  saveStatus: 'idle',
};

export const researchNotesBuilderSlice = createSlice({
  name: 'researchNotesBuilder',
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

export const ResearchNotesBuilderActions = researchNotesBuilderSlice.actions;
export const researchNotesBuilderReducer = researchNotesBuilderSlice.reducer;
