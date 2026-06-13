import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type DailyEntriesBuilderState = {
  isCreateOpen: boolean;
  /** Optional prefill date when opening create modal; empty string when unset. */
  defaultEntryDate: string;
};

const initialState: DailyEntriesBuilderState = {
  isCreateOpen: false,
  defaultEntryDate: '',
};

export const dailyEntriesBuilderSlice = createSlice({
  name: 'dailyEntriesBuilder',
  initialState,
  reducers: {
    openCreate: (state, action: PayloadAction<string | undefined>) => {
      state.isCreateOpen = true;
      state.defaultEntryDate = action.payload ?? '';
    },
    closeModal: (state) => {
      state.isCreateOpen = false;
      state.defaultEntryDate = '';
    },
  },
});

export const DailyEntriesBuilderActions = dailyEntriesBuilderSlice.actions;
export const dailyEntriesBuilderReducer = dailyEntriesBuilderSlice.reducer;
