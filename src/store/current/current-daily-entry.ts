import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_DAILY_ENTRY, type DailyEntry } from '@/model';

const initialState: DailyEntry = EMPTY_DAILY_ENTRY;

export const currentDailyEntrySlice = createSlice({
  name: 'currentDailyEntry',
  initialState,
  reducers: {
    setCurrentDailyEntry: (_state, action: PayloadAction<DailyEntry>) => action.payload,
    patchCurrentDailyEntry: (state, action: PayloadAction<Partial<DailyEntry>>) => ({
      ...state,
      ...action.payload,
    }),
    resetCurrentDailyEntry: () => EMPTY_DAILY_ENTRY,
  },
});

export const CurrentDailyEntryActions = currentDailyEntrySlice.actions;
export const currentDailyEntryReducer = currentDailyEntrySlice.reducer;
