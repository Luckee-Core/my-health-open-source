import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Referral } from '@/model';

const initialState: Record<string, Referral> = {};

export const referralsSlice = createSlice({
  name: 'referrals',
  initialState,
  reducers: {
    setReferrals: (_state, action: PayloadAction<Record<string, Referral>>) => action.payload,
    upsertReferral: (state, action: PayloadAction<Referral>) => {
      state[action.payload.id] = action.payload;
    },
    removeReferral: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const ReferralsActions = referralsSlice.actions;
export const referralsReducer = referralsSlice.reducer;
