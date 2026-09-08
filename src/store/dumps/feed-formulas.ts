import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FeedFormula } from '@/model';

const initialState: Record<string, FeedFormula> = {};

export const feedFormulasSlice = createSlice({
  name: 'feedFormulas',
  initialState,
  reducers: {
    setFeedFormulas: (_state, action: PayloadAction<Record<string, FeedFormula>>) =>
      action.payload,
    upsertFeedFormula: (state, action: PayloadAction<FeedFormula>) => {
      state[action.payload.id] = action.payload;
    },
    removeFeedFormula: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const FeedFormulasActions = feedFormulasSlice.actions;
export const feedFormulasReducer = feedFormulasSlice.reducer;
