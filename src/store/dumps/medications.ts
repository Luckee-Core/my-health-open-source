import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Medication } from '@/model';

const initialState: Record<string, Medication> = {};

export const medicationsSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    setMedications: (_state, action: PayloadAction<Record<string, Medication>>) => action.payload,
    upsertMedication: (state, action: PayloadAction<Medication>) => {
      state[action.payload.id] = action.payload;
    },
    removeMedication: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const MedicationsActions = medicationsSlice.actions;
export const medicationsReducer = medicationsSlice.reducer;
