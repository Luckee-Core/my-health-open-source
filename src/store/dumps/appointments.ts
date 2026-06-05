import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Appointment } from '@/model/appointment';

const initialState: Record<string, Appointment> = {};

export const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setAppointments: (_state, action: PayloadAction<Record<string, Appointment>>) =>
      action.payload,
    upsertAppointment: (state, action: PayloadAction<Appointment>) => {
      state[action.payload.id] = action.payload;
    },
    removeAppointment: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const AppointmentsActions = appointmentsSlice.actions;
export const appointmentsReducer = appointmentsSlice.reducer;
