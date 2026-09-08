import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_FEED_FORMULA, type FeedFormula } from '@/model';

const initialState: FeedFormula = EMPTY_FEED_FORMULA;

export const currentFeedFormulaSlice = createSlice({
  name: 'currentFeedFormula',
  initialState,
  reducers: {
    setCurrentFeedFormula: (_state, action: PayloadAction<FeedFormula>) => action.payload,
    patchCurrentFeedFormula: (state, action: PayloadAction<Partial<FeedFormula>>) => ({
      ...state,
      ...action.payload,
    }),
    resetCurrentFeedFormula: () => EMPTY_FEED_FORMULA,
  },
});

export const CurrentFeedFormulaActions = currentFeedFormulaSlice.actions;
export const currentFeedFormulaReducer = currentFeedFormulaSlice.reducer;
