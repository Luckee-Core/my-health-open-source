import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_APPOINTMENT, type Appointment } from '@/model';

const initialState: Appointment = EMPTY_APPOINTMENT;

export const currentAppointmentSlice = createSlice({
  name: 'currentAppointment',
  initialState,
  reducers: {
    setCurrentAppointment: (_state, action: PayloadAction<Appointment>) => action.payload,
    resetCurrentAppointment: () => EMPTY_APPOINTMENT,
  },
});

export const CurrentAppointmentActions = currentAppointmentSlice.actions;
export const currentAppointmentReducer = currentAppointmentSlice.reducer;
