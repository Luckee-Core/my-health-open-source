import { createHospital, updateHospital } from '@/api/hospitals';
import { HospitalsBuilderActions } from '@/store/builders';
import { CurrentHospitalActions } from '@/store/current';
import { HospitalsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';

/**
 * Creates or updates the hospital in currentHospital.
 */
export const saveHospitalThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const current = getState().currentHospital;
    const name = current.name.trim();

    dispatch(HospitalsBuilderActions.setSaveError(''));
    dispatch(HospitalsBuilderActions.setSaveStatus('saving'));

    if (!name) {
      dispatch(HospitalsBuilderActions.setSaveError('Name is required'));
      dispatch(HospitalsBuilderActions.setSaveStatus('error'));
      return 400;
    }

    const payload = {
      name,
      address: current.address?.trim() || null,
      email: current.email?.trim() || null,
      phone: current.phone?.trim() || null,
      notes: current.notes?.trim() || null,
    };

    const result =
      current.id === ''
        ? await createHospital(payload)
        : await updateHospital(current.id, payload);

    if (!result.ok) {
      dispatch(HospitalsBuilderActions.setSaveError(result.error.message));
      dispatch(HospitalsBuilderActions.setSaveStatus('error'));
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(HospitalsActions.upsertHospital(result.data));
    dispatch(CurrentHospitalActions.setCurrentHospital(result.data));
    dispatch(HospitalsBuilderActions.setSaveStatus('success'));
    return 200;
  };
