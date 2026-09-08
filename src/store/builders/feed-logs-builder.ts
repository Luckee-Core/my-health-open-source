import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormSaveStatus } from './form-save-status';

type FeedLogsBuilderState = {
  saveError: string;
  saveStatus: FormSaveStatus;
};

const initialState: FeedLogsBuilderState = {
  saveError: '',
  saveStatus: 'idle',
};

export const feedLogsBuilderSlice = createSlice({
  name: 'feedLogsBuilder',
  initialState,
  reducers: {
    setSaveError: (state, action: PayloadAction<string>) => {
      state.saveError = action.payload;
    },
    setSaveStatus: (state, action: PayloadAction<FormSaveStatus>) => {
      state.saveStatus = action.payload;
    },
  },
});

export const FeedLogsBuilderActions = feedLogsBuilderSlice.actions;
export const feedLogsBuilderReducer = feedLogsBuilderSlice.reducer;
