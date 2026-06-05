import type { Hospital } from '@/model/hospital';
import type { Specialty } from '@/model/specialty';
import { createHospitalThunk } from '@/store/thunks/hospitals/create-hospital-thunk';
import { createSpecialtyThunk } from '@/store/thunks/specialties/create-specialty-thunk';
import type { ThunkResult } from '@/store/thunks/thunk-result';
import type { AppThunk } from '@/store/types';
import type { RootState } from '@/store/store';

type Dispatch = (thunk: AppThunk<Promise<ThunkResult>>) => Promise<ThunkResult>;

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
  selectedId: string,
  newName: string,
): Promise<{ ok: true; id: string } | { ok: false; message: string }> => {
  const trimmedNew = newName.trim();
  if (trimmedNew) {
    const existing = findByName<Hospital>(getState().hospitals, trimmedNew);
    if (existing) return { ok: true, id: existing.id };
    const result = await dispatch(createHospitalThunk({ name: trimmedNew }));
    if (result.status !== 200) {
      return { ok: false, message: result.message ?? 'Failed to create facility' };
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
  selectedId: string,
  newName: string,
): Promise<{ ok: true; id: string } | { ok: false; message: string }> => {
  const trimmedNew = newName.trim();
  if (trimmedNew) {
    const existing = findByName<Specialty>(getState().specialties, trimmedNew);
    if (existing) return { ok: true, id: existing.id };
    const result = await dispatch(createSpecialtyThunk({ name: trimmedNew }));
    if (result.status !== 200) {
      return { ok: false, message: result.message ?? 'Failed to create specialty' };
    }
    const created = findByName<Specialty>(getState().specialties, trimmedNew);
    if (!created) return { ok: false, message: 'Failed to resolve new specialty' };
    return { ok: true, id: created.id };
  }
  if (!selectedId) return { ok: false, message: 'Specialty is required' };
  return { ok: true, id: selectedId };
};

/**
 * Resolves hospital and specialty ids, creating catalog rows when inline names are provided.
 */
export const resolveDoctorRelationsForSave = async (
  dispatch: Dispatch,
  getState: () => RootState,
  hospitalId: string,
  newHospitalName: string,
  specialtyId: string,
  newSpecialtyName: string,
): Promise<ResolveResult> => {
  const hospital = await resolveHospitalId(dispatch, getState, hospitalId, newHospitalName);
  if (!hospital.ok) return { ok: false, message: hospital.message };

  const specialty = await resolveSpecialtyId(dispatch, getState, specialtyId, newSpecialtyName);
  if (!specialty.ok) return { ok: false, message: specialty.message };

  return { ok: true, hospitalId: hospital.id, specialtyId: specialty.id };
};
