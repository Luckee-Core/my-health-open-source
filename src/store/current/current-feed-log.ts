import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_FEED_LOG, type FeedLog } from '@/model';

const initialState: FeedLog = EMPTY_FEED_LOG;

export const currentFeedLogSlice = createSlice({
  name: 'currentFeedLog',
  initialState,
  reducers: {
    setCurrentFeedLog: (_state, action: PayloadAction<FeedLog>) => action.payload,
    patchCurrentFeedLog: (state, action: PayloadAction<Partial<FeedLog>>) => ({
      ...state,
      ...action.payload,
    }),
    resetCurrentFeedLog: () => EMPTY_FEED_LOG,
  },
});

export const CurrentFeedLogActions = currentFeedLogSlice.actions;
export const currentFeedLogReducer = currentFeedLogSlice.reducer;
