import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { HealthImport } from '@/model';

const initialState: Record<string, HealthImport> = {};

export const healthImportsSlice = createSlice({
  name: 'healthImports',
  initialState,
  reducers: {
    setHealthImports: (_state, action: PayloadAction<Record<string, HealthImport>>) => action.payload,
    upsertHealthImport: (state, action: PayloadAction<HealthImport>) => {
      state[action.payload.id] = action.payload;
    },
    removeHealthImport: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const HealthImportsActions = healthImportsSlice.actions;
export const healthImportsReducer = healthImportsSlice.reducer;
