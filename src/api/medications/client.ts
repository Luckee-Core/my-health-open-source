import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
  apiFail,
  apiOk,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Medication, MedicationStatus } from '@/model';
import type { MedicationDoseLog, MedicationDoseSchedule } from '@/model/medication-dose-reminder';

type ListBody = { success: boolean; data?: Medication[]; error?: string };
type EntityBody = { success: boolean; data?: Medication; error?: string };
type ScheduleBody = { success: boolean; data?: MedicationDoseSchedule | null; error?: string };
type ScheduleEntityBody = { success: boolean; data?: MedicationDoseSchedule; error?: string };
type DoseLogBody = { success: boolean; data?: MedicationDoseLog; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateMedicationPayload = {
  name: string;
  instructions?: string | null;
  started_on?: string | null;
  status?: MedicationStatus;
  doctor_id?: string | null;
  notes?: string | null;
};

export type UpdateMedicationPayload = Partial<CreateMedicationPayload>;

/**
 * Loads all medications from Express `/api/data/medications`.
 */
export const getAllMedications = async (): Promise<ApiResponse<Medication[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/medications');
    return fromExpressListBody(data, 'Failed to load medications');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load medications');
  }
};

/**
 * Creates a medication via POST `/api/data/medications`.
 */
export const createMedication = async (
  payload: CreateMedicationPayload,
): Promise<ApiResponse<Medication>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/medications', payload);
    return fromExpressBody(data, 'Failed to create medication');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create medication');
  }
};

/**
 * Updates a medication via PATCH `/api/data/medications/:id`.
 */
export const updateMedication = async (
  id: string,
  payload: UpdateMedicationPayload,
): Promise<ApiResponse<Medication>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(`/api/data/medications/${id}`, payload);
    return fromExpressBody(data, 'Failed to update medication');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update medication');
  }
};

/**
 * Deletes a medication via DELETE `/api/data/medications/:id`.
 */
export const deleteMedication = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/medications/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete medication');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete medication');
  }
};

/**
 * Loads dose schedule for a medication (null if reminders disabled).
 */
export const getMedicationDoseSchedule = async (
  id: string,
): Promise<ApiResponse<MedicationDoseSchedule | null>> => {
  try {
    const { data } = await getApiClient().get<ScheduleBody>(
      `/api/data/medications/${id}/dose-schedule`,
    );
    if (!data.success) {
      return apiFail(data.error ?? 'Failed to load dose schedule', 400);
    }
    return apiOk(data.data ?? null, 200);
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load dose schedule');
  }
};

/**
 * Sets or updates dose interval reminders for a medication.
 */
export const putMedicationDoseSchedule = async (
  id: string,
  payload: { interval_minutes: number; reminder_enabled?: boolean },
): Promise<ApiResponse<MedicationDoseSchedule>> => {
  try {
    const { data } = await getApiClient().put<ScheduleEntityBody>(
      `/api/data/medications/${id}/dose-schedule`,
      payload,
    );
    return fromExpressBody(data, 'Failed to save dose schedule');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to save dose schedule');
  }
};

/**
 * Removes dose schedule reminders for a medication.
 */
export const deleteMedicationDoseSchedule = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(
      `/api/data/medications/${id}/dose-schedule`,
    );
    return fromExpressVoidBody(data, 'Failed to remove dose schedule');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to remove dose schedule');
  }
};

/**
 * Records that a dose was taken now.
 */
export const logMedicationDose = async (
  id: string,
  payload?: { notes?: string | null },
): Promise<ApiResponse<MedicationDoseLog>> => {
  try {
    const { data } = await getApiClient().post<DoseLogBody>(
      `/api/data/medications/${id}/dose-logs`,
      payload ?? {},
    );
    return fromExpressBody(data, 'Failed to log dose');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to log dose');
  }
};
