import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSaveStatus } from './form-save-status';

type AllergiesBuilderState = {
  isCreateOpen: boolean;
  saveError: string;
  saveStatus: FormSaveStatus;
};

const initialState: AllergiesBuilderState = {
  isCreateOpen: false,
  saveError: '',
  saveStatus: 'idle',
};

export const allergiesBuilderSlice = createSlice({
  name: 'allergiesBuilder',
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

export const AllergiesBuilderActions = allergiesBuilderSlice.actions;
export const allergiesBuilderReducer = allergiesBuilderSlice.reducer;
