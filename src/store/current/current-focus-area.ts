import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_FOCUS_AREA, type FocusArea } from '@/model';

const initialState: FocusArea = EMPTY_FOCUS_AREA;

export const currentFocusAreaSlice = createSlice({
  name: 'currentFocusArea',
  initialState,
  reducers: {
    setCurrentFocusArea: (_state, action: PayloadAction<FocusArea>) => action.payload,
    resetCurrentFocusArea: () => EMPTY_FOCUS_AREA,
  },
});

export const CurrentFocusAreaActions = currentFocusAreaSlice.actions;
export const currentFocusAreaReducer = currentFocusAreaSlice.reducer;
