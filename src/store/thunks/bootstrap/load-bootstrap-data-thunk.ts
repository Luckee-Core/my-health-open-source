import { getAllAllergies } from '@/api/allergies';
import { getAllAppointments } from '@/api/appointments';
import { getAllConditions } from '@/api/conditions';
import { getAllDailyEntries } from '@/api/daily-entries';
import { getAllDoctors } from '@/api/doctors';
import { getAllFocusAreas } from '@/api/focus-areas';
import { getAllHealthImports } from '@/api/health-import';
import { getAllHospitals } from '@/api/hospitals';
import { getAllInsuranceCoverages } from '@/api/insurance-coverages';
import { getAllMedicalHistoryEvents } from '@/api/medical-history-events';
import { getAllMedications } from '@/api/medications';
import { getAllReferrals } from '@/api/referrals';
import { getAllResearchNotes } from '@/api/research-notes';
import { getAllSpecialties } from '@/api/specialties';
import { getAllSymptomLogs } from '@/api/symptom-logs';
import { getAllTherapyExerciseLogs } from '@/api/therapy-exercise-logs';
import { getAllTherapyExercises } from '@/api/therapy-exercises';
import {
  AllergiesActions,
  AppointmentsActions,
  ConditionsActions,
  DailyEntriesActions,
  DoctorsActions,
  FocusAreasActions,
  HealthImportsActions,
  HospitalsActions,
  InsuranceCoveragesActions,
  MedicalHistoryEventsActions,
  MedicationsActions,
  ReferralsActions,
  ResearchNotesActions,
  SpecialtiesActions,
  SymptomLogsActions,
  TherapyExerciseLogsActions,
  TherapyExercisesActions,
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
      allergies,
      medications,
      conditions,
      referrals,
      insuranceCoverages,
      healthImports,
      therapyExercises,
      therapyExerciseLogs,
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
      getAllAllergies(),
      getAllMedications(),
      getAllConditions(),
      getAllReferrals(),
      getAllInsuranceCoverages(),
      getAllHealthImports(),
      getAllTherapyExercises(),
      getAllTherapyExerciseLogs(),
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

    if (allergies.ok) {
      dispatch(
        AllergiesActions.setAllergies(
          Object.fromEntries(allergies.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (medications.ok) {
      dispatch(
        MedicationsActions.setMedications(
          Object.fromEntries(medications.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (conditions.ok) {
      dispatch(
        ConditionsActions.setConditions(
          Object.fromEntries(conditions.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (referrals.ok) {
      dispatch(
        ReferralsActions.setReferrals(
          Object.fromEntries(referrals.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (insuranceCoverages.ok) {
      dispatch(
        InsuranceCoveragesActions.setInsuranceCoverages(
          Object.fromEntries(insuranceCoverages.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (healthImports.ok) {
      dispatch(
        HealthImportsActions.setHealthImports(
          Object.fromEntries(healthImports.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (therapyExercises.ok) {
      dispatch(
        TherapyExercisesActions.setTherapyExercises(
          Object.fromEntries(therapyExercises.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    if (therapyExerciseLogs.ok) {
      dispatch(
        TherapyExerciseLogsActions.setTherapyExerciseLogs(
          Object.fromEntries(therapyExerciseLogs.data.map((row) => [row.id, row])),
        ),
      );
    } else {
      status = 400;
    }

    return status;
  };
