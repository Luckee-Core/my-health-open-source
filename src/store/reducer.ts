import { combineReducers } from '@reduxjs/toolkit';
import { appReducer } from './appSlice';
import {
  appointmentsReducer,
  dailyEntriesReducer,
  doctorsReducer,
  focusAreasReducer,
  hospitalsReducer,
  specialtiesReducer,
} from './dumps';

export const rootReducer = combineReducers({
  app: appReducer,
  hospitals: hospitalsReducer,
  specialties: specialtiesReducer,
  doctors: doctorsReducer,
  appointments: appointmentsReducer,
  focusAreas: focusAreasReducer,
  dailyEntries: dailyEntriesReducer,
});
