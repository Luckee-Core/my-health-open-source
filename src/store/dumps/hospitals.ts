import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Hospital } from '@/model';

const initialState: Record<string, Hospital> = {};

export const hospitalsSlice = createSlice({
  name: 'hospitals',
  initialState,
  reducers: {
    setHospitals: (_state, action: PayloadAction<Record<string, Hospital>>) => action.payload,
    upsertHospital: (state, action: PayloadAction<Hospital>) => {
      state[action.payload.id] = action.payload;
    },
    removeHospital: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const HospitalsActions = hospitalsSlice.actions;
export const hospitalsReducer = hospitalsSlice.reducer;
