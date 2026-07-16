import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { VitalSign } from '@/model';

const initialState: Record<string, VitalSign> = {};

export const vitalSignsSlice = createSlice({
  name: 'vitalSigns',
  initialState,
  reducers: {
    setVitalSigns: (_state, action: PayloadAction<Record<string, VitalSign>>) => action.payload,
    upsertVitalSign: (state, action: PayloadAction<VitalSign>) => {
      state[action.payload.id] = action.payload;
    },
    removeVitalSign: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const VitalSignsActions = vitalSignsSlice.actions;
export const vitalSignsReducer = vitalSignsSlice.reducer;
