import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InsuranceCoverage } from '@/model';

const initialState: Record<string, InsuranceCoverage> = {};

export const insuranceCoveragesSlice = createSlice({
  name: 'insuranceCoverages',
  initialState,
  reducers: {
    setInsuranceCoverages: (_state, action: PayloadAction<Record<string, InsuranceCoverage>>) => action.payload,
    upsertInsuranceCoverage: (state, action: PayloadAction<InsuranceCoverage>) => {
      state[action.payload.id] = action.payload;
    },
    removeInsuranceCoverage: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const InsuranceCoveragesActions = insuranceCoveragesSlice.actions;
export const insuranceCoveragesReducer = insuranceCoveragesSlice.reducer;
