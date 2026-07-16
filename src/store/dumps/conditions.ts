import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Condition } from '@/model';

const initialState: Record<string, Condition> = {};

export const conditionsSlice = createSlice({
  name: 'conditions',
  initialState,
  reducers: {
    setConditions: (_state, action: PayloadAction<Record<string, Condition>>) => action.payload,
    upsertCondition: (state, action: PayloadAction<Condition>) => {
      state[action.payload.id] = action.payload;
    },
    removeCondition: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const ConditionsActions = conditionsSlice.actions;
export const conditionsReducer = conditionsSlice.reducer;
