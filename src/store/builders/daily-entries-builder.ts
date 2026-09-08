import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSaveStatus } from './form-save-status';

type DailyEntriesBuilderState = {
  isCreateOpen: boolean;
  saveError: string;
  saveStatus: FormSaveStatus;
};

const initialState: DailyEntriesBuilderState = {
  isCreateOpen: false,
  saveError: '',
  saveStatus: 'idle',
};

export const dailyEntriesBuilderSlice = createSlice({
  name: 'dailyEntriesBuilder',
  initialState,
  reducers: {
    openCreate: (state) => {
      state.isCreateOpen = true;
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

export const DailyEntriesBuilderActions = dailyEntriesBuilderSlice.actions;
export const dailyEntriesBuilderReducer = dailyEntriesBuilderSlice.reducer;
