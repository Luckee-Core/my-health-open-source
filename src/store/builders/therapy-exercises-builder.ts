import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSaveStatus } from './form-save-status';

type TherapyExercisesBuilderState = {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  saveError: string;
  saveStatus: FormSaveStatus;
};

const initialState: TherapyExercisesBuilderState = {
  isCreateOpen: false,
  isEditOpen: false,
  saveError: '',
  saveStatus: 'idle',
};

export const therapyExercisesBuilderSlice = createSlice({
  name: 'therapyExercisesBuilder',
  initialState,
  reducers: {
    setIsCreateOpen: (state, action: { payload: boolean }) => {
      state.isCreateOpen = action.payload;
    },
    setIsEditOpen: (state, action: { payload: boolean }) => {
      state.isEditOpen = action.payload;
    },
    closeModal: (state) => {
      state.isCreateOpen = false;
      state.isEditOpen = false;
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

export const TherapyExercisesBuilderActions = therapyExercisesBuilderSlice.actions;
export const therapyExercisesBuilderReducer = therapyExercisesBuilderSlice.reducer;
