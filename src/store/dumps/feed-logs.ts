import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FeedLog } from '@/model';

const initialState: Record<string, FeedLog> = {};

export const feedLogsSlice = createSlice({
  name: 'feedLogs',
  initialState,
  reducers: {
    setFeedLogs: (_state, action: PayloadAction<Record<string, FeedLog>>) => action.payload,
    upsertFeedLog: (state, action: PayloadAction<FeedLog>) => {
      state[action.payload.id] = action.payload;
    },
    removeFeedLog: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const FeedLogsActions = feedLogsSlice.actions;
export const feedLogsReducer = feedLogsSlice.reducer;
