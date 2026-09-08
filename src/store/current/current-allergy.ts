import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_ALLERGY, type Allergy } from '@/model';

const initialState: Allergy = EMPTY_ALLERGY;

export const currentAllergySlice = createSlice({
  name: 'currentAllergy',
  initialState,
  reducers: {
    setCurrentAllergy: (_state, action: PayloadAction<Allergy>) => action.payload,
    patchCurrentAllergy: (state, action: PayloadAction<Partial<Allergy>>) => ({
      ...state,
      ...action.payload,
    }),
    resetCurrentAllergy: () => EMPTY_ALLERGY,
  },
});

export const CurrentAllergyActions = currentAllergySlice.actions;
export const currentAllergyReducer = currentAllergySlice.reducer;
