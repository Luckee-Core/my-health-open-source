import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FocusArea } from '@/model/focus-area';

const initialState: Record<string, FocusArea> = {};

export const focusAreasSlice = createSlice({
  name: 'focusAreas',
  initialState,
  reducers: {
    setFocusAreas: (_state, action: PayloadAction<Record<string, FocusArea>>) => action.payload,
    upsertFocusArea: (state, action: PayloadAction<FocusArea>) => {
      state[action.payload.id] = action.payload;
    },
    removeFocusArea: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const FocusAreasActions = focusAreasSlice.actions;
export const focusAreasReducer = focusAreasSlice.reducer;
