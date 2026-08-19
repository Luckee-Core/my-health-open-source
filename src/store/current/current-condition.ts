import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_CONDITION, type Condition } from '@/model';

const initialState: Condition = EMPTY_CONDITION;

export const currentConditionSlice = createSlice({
  name: 'currentCondition',
  initialState,
  reducers: {
    setCurrentCondition: (_state, action: PayloadAction<Condition>) => action.payload,
    resetCurrentCondition: () => EMPTY_CONDITION,
  },
});

export const CurrentConditionActions = currentConditionSlice.actions;
export const currentConditionReducer = currentConditionSlice.reducer;
