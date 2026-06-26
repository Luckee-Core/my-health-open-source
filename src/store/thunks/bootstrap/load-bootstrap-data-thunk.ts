import { getAllAppointments } from '@/api/appointments';
import { getAllDailyEntries } from '@/api/daily-entries';
import { getAllDoctors } from '@/api/doctors';
import { getAllFocusAreas } from '@/api/focus-areas';
import { getAllHospitals } from '@/api/hospitals';
import { getAllMedicalHistoryEvents } from '@/api/medical-history-events';
import { getAllResearchNotes } from '@/api/research-notes';
import { getAllSpecialties } from '@/api/specialties';
import { getAllSymptomLogs } from '@/api/symptom-logs';
import {
  AppointmentsActions,
  DailyEntriesActions,
  DoctorsActions,
  FocusAreasActions,
  HospitalsActions,
  MedicalHistoryEventsActions,
  ResearchNotesActions,
  SpecialtiesActions,
  SymptomLogsActions,
} from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Loads all bootstrap entity dumps from the API.
 */
export const loadBootstrapDataThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    const [
      hospitals,
      specialties,
      doctors,
      appointments,
      focusAreas,
      dailyEntries,
      medicalHistoryEvents,
      symptomLogs,
      researchNotes,
    ] = await Promise.all([
      getAllHospitals(),
      getAllSpecialties(),
      getAllDoctors(),
      getAllAppointments(),
      getAllFocusAreas(),
      getAllDailyEntries(),
      getAllMedicalHistoryEvents(),
      getAllSymptomLogs(),
      getAllResearchNotes(),
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

    if (medicalHistoryEvents.ok) {
      dispatch(
        MedicalHistoryEventsActions.setMedicalHistoryEvents(
          Object.fromEntries(medicalHistoryEvents.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (symptomLogs.ok) {
      dispatch(
        SymptomLogsActions.setSymptomLogs(
          Object.fromEntries(symptomLogs.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (researchNotes.ok) {
      dispatch(
        ResearchNotesActions.setResearchNotes(
          Object.fromEntries(researchNotes.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    return status;
  };
