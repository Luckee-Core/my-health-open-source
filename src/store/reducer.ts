import { combineReducers } from '@reduxjs/toolkit';
import {
  appointmentsBuilderReducer,
  dailyEntriesBuilderReducer,
  doctorsBuilderReducer,
  focusAreasBuilderReducer,
  hospitalsBuilderReducer,
  specialtiesBuilderReducer,
} from './builders';
import {
  currentAppointmentReducer,
  currentDailyEntryReducer,
  currentDoctorReducer,
  currentFocusAreaReducer,
  currentHospitalReducer,
  currentSpecialtyReducer,
} from './current';
import {
  appointmentsReducer,
  dailyEntriesReducer,
  doctorsReducer,
  focusAreasReducer,
  hospitalsReducer,
  specialtiesReducer,
} from './dumps';

export const rootReducer = combineReducers({
  hospitals: hospitalsReducer,
  specialties: specialtiesReducer,
  doctors: doctorsReducer,
  appointments: appointmentsReducer,
  focusAreas: focusAreasReducer,
  dailyEntries: dailyEntriesReducer,
  hospitalsBuilder: hospitalsBuilderReducer,
  doctorsBuilder: doctorsBuilderReducer,
  appointmentsBuilder: appointmentsBuilderReducer,
  specialtiesBuilder: specialtiesBuilderReducer,
  focusAreasBuilder: focusAreasBuilderReducer,
  dailyEntriesBuilder: dailyEntriesBuilderReducer,
  currentHospital: currentHospitalReducer,
  currentDoctor: currentDoctorReducer,
  currentAppointment: currentAppointmentReducer,
  currentSpecialty: currentSpecialtyReducer,
  currentFocusArea: currentFocusAreaReducer,
  currentDailyEntry: currentDailyEntryReducer,
});
