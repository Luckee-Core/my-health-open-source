import { createDoctor, updateDoctor } from '@/api/doctors';
import { resolveDoctorRelationsForSave } from '@/packages/doctors/resolve-doctor-relations-for-save';
import { DoctorsBuilderActions } from '@/store/builders';
import { CurrentDoctorActions } from '@/store/current';
import { DoctorsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the doctor in currentDoctor, creating related rows from builder names.
 */
export const saveDoctorThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentDoctor;
    const name = current.name.trim();

    dispatch(DoctorsBuilderActions.setSaveError(''));
    dispatch(DoctorsBuilderActions.setSaveStatus('saving'));

    if (!name) {
      dispatch(DoctorsBuilderActions.setSaveError('Name is required'));
      dispatch(DoctorsBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const resolved = await resolveDoctorRelationsForSave(dispatch, getState);
    if (!resolved.ok) {
      dispatch(DoctorsBuilderActions.setSaveError(resolved.message));
      dispatch(DoctorsBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      name,
      hospital_id: resolved.hospitalId,
      specialty_id: resolved.specialtyId,
      notes: current.notes?.trim() || null,
      npi: current.npi?.trim() || null,
      phone: current.phone?.trim() || null,
      fax: current.fax?.trim() || null,
    };

    const result =
      current.id === ''
        ? await createDoctor(payload)
        : await updateDoctor(current.id, payload);

    if (!result.ok) {
      dispatch(DoctorsBuilderActions.setSaveError(result.error.message));
      dispatch(DoctorsBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(DoctorsActions.upsertDoctor(result.data));
    dispatch(CurrentDoctorActions.setCurrentDoctor(result.data));
    dispatch(DoctorsBuilderActions.setSaveStatus('success'));
    return 200;
  };
