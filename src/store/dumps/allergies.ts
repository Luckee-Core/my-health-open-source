import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Allergy } from '@/model';

const initialState: Record<string, Allergy> = {};

export const allergiesSlice = createSlice({
  name: 'allergies',
  initialState,
  reducers: {
    setAllergies: (_state, action: PayloadAction<Record<string, Allergy>>) => action.payload,
    upsertAllergy: (state, action: PayloadAction<Allergy>) => {
      state[action.payload.id] = action.payload;
    },
    removeAllergy: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const AllergiesActions = allergiesSlice.actions;
export const allergiesReducer = allergiesSlice.reducer;
