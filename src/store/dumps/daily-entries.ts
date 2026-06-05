import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DailyEntry } from '@/model/daily-entry';

const initialState: Record<string, DailyEntry> = {};

export const dailyEntriesSlice = createSlice({
  name: 'dailyEntries',
  initialState,
  reducers: {
    setDailyEntries: (_state, action: PayloadAction<Record<string, DailyEntry>>) => action.payload,
    upsertDailyEntry: (state, action: PayloadAction<DailyEntry>) => {
      state[action.payload.id] = action.payload;
    },
    removeDailyEntry: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const DailyEntriesActions = dailyEntriesSlice.actions;
export const dailyEntriesReducer = dailyEntriesSlice.reducer;
