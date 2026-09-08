import type { Hospital, Specialty } from '@/model';
import { createHospitalThunk } from '@/store/thunks/hospitals';
import { createSpecialtyThunk } from '@/store/thunks/specialties';
import type { AppThunk } from '@/store/types';
import type { RootState } from '@/store/store';

type Dispatch = (thunk: AppThunk<Promise<200 | 400 | 500>>) => Promise<200 | 400 | 500>;

type ResolveResult =
  | { ok: true; hospitalId: string; specialtyId: string }
  | { ok: false; message: string };

const findByName = <T extends { id: string; name: string }>(
  record: Record<string, T>,
  name: string,
): T | undefined =>
  Object.values(record).find((item) => item.name.toLowerCase() === name.toLowerCase());

const resolveHospitalId = async (
  dispatch: Dispatch,
  getState: () => RootState,
): Promise<{ ok: true; id: string } | { ok: false; message: string }> => {
  const trimmedNew = getState().doctorsBuilder.newHospitalName.trim();
  const selectedId = getState().currentDoctor.hospital_id;
  if (trimmedNew) {
    const existing = findByName<Hospital>(getState().hospitals, trimmedNew);
    if (existing) return { ok: true, id: existing.id };
    const status = await dispatch(createHospitalThunk({ name: trimmedNew }));
    if (status !== 200) {
      return { ok: false, message: 'Failed to create facility' };
    }
    const created = findByName<Hospital>(getState().hospitals, trimmedNew);
    if (!created) return { ok: false, message: 'Failed to resolve new facility' };
    return { ok: true, id: created.id };
  }
  if (!selectedId) return { ok: false, message: 'Facility is required' };
  return { ok: true, id: selectedId };
};

const resolveSpecialtyId = async (
  dispatch: Dispatch,
  getState: () => RootState,
): Promise<{ ok: true; id: string } | { ok: false; message: string }> => {
  const trimmedNew = getState().doctorsBuilder.newSpecialtyName.trim();
  const selectedId = getState().currentDoctor.specialty_id;
  if (trimmedNew) {
    const existing = findByName<Specialty>(getState().specialties, trimmedNew);
    if (existing) return { ok: true, id: existing.id };
    const status = await dispatch(createSpecialtyThunk({ name: trimmedNew }));
    if (status !== 200) {
      return { ok: false, message: 'Failed to create specialty' };
    }
    const created = findByName<Specialty>(getState().specialties, trimmedNew);
    if (!created) return { ok: false, message: 'Failed to resolve new specialty' };
    return { ok: true, id: created.id };
  }
  if (!selectedId) return { ok: false, message: 'Specialty is required' };
  return { ok: true, id: selectedId };
};

/**
 * Resolves hospital and specialty ids from currentDoctor plus builder name strings.
 */
export const resolveDoctorRelationsForSave = async (
  dispatch: Dispatch,
  getState: () => RootState,
): Promise<ResolveResult> => {
  const hospital = await resolveHospitalId(dispatch, getState);
  if (!hospital.ok) return { ok: false, message: hospital.message };

  const specialty = await resolveSpecialtyId(dispatch, getState);
  if (!specialty.ok) return { ok: false, message: specialty.message };

  return { ok: true, hospitalId: hospital.id, specialtyId: specialty.id };
};
