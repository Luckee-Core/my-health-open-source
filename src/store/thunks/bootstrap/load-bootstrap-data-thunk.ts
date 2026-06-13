import { getAllAppointments } from '@/api/appointments';
import { getAllDailyEntries } from '@/api/daily-entries';
import { getAllDoctors } from '@/api/doctors';
import { getAllFocusAreas } from '@/api/focus-areas';
import { getAllHospitals } from '@/api/hospitals';
import { getAllSpecialties } from '@/api/specialties';
import {
  AppointmentsActions,
  DailyEntriesActions,
  DoctorsActions,
  FocusAreasActions,
  HospitalsActions,
  SpecialtiesActions,
} from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all bootstrap entity dumps from the API.
 */
export const loadBootstrapDataThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const [hospitals, specialties, doctors, appointments, focusAreas, dailyEntries] =
      await Promise.all([
        getAllHospitals(),
        getAllSpecialties(),
        getAllDoctors(),
        getAllAppointments(),
        getAllFocusAreas(),
        getAllDailyEntries(),
      ]);

    let status: 200 | 400 | 500 = 200;

    if (hospitals.ok) {
      dispatch(
        HospitalsActions.setHospitals(
          Object.fromEntries(hospitals.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (specialties.ok) {
      dispatch(
        SpecialtiesActions.setSpecialties(
          Object.fromEntries(specialties.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (doctors.ok) {
      dispatch(
        DoctorsActions.setDoctors(
          Object.fromEntries(doctors.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (appointments.ok) {
      dispatch(
        AppointmentsActions.setAppointments(
          Object.fromEntries(appointments.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (focusAreas.ok) {
      dispatch(
        FocusAreasActions.setFocusAreas(
          Object.fromEntries(focusAreas.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (dailyEntries.ok) {
      dispatch(
        DailyEntriesActions.setDailyEntries(
          Object.fromEntries(dailyEntries.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    return status;
  };
