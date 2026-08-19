import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { Condition, Medication, MedicationProposal, ConditionProposal } from '@/model';

type ExtractMedicationsBody = {
  success: boolean;
  data?: {
    sessionId: string;
    uploadId: string;
    medicationProposals: MedicationProposal[];
  };
  error?: string;
};

type ExtractConditionsBody = {
  success: boolean;
  data?: {
    sessionId: string;
    uploadId: string;
    conditionProposals: ConditionProposal[];
  };
  error?: string;
};

type CommitExtractBody = {
  success: boolean;
  data?: {
    medications: Medication[];
    conditions: Condition[];
  };
  error?: string;
};

export type ExtractPastePayload = {
  text: string;
  source_instance_id?: string | null;
};

export type ExtractMedicationsData = {
  sessionId: string;
  uploadId: string;
  medicationProposals: MedicationProposal[];
};

export type ExtractConditionsData = {
  sessionId: string;
  uploadId: string;
  conditionProposals: ConditionProposal[];
};

export type CommitExtractSessionData = {
  medications: Medication[];
  conditions: Condition[];
};

/**
 * Extracts medication proposals from pasted text.
 */
export const extractMedications = async (
  payload: ExtractPastePayload,
): Promise<ApiResponse<ExtractMedicationsData>> => {
  try {
    const { data } = await getApiClient().post<ExtractMedicationsBody>(
      '/api/ai/extract/medications',
      payload,
    );
    return fromExpressBody(data, 'Failed to extract medications');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to extract medications');
  }
};

/**
 * Extracts condition proposals from pasted text.
 */
export const extractConditions = async (
  payload: ExtractPastePayload,
): Promise<ApiResponse<ExtractConditionsData>> => {
  try {
    const { data } = await getApiClient().post<ExtractConditionsBody>(
      '/api/ai/extract/conditions',
      payload,
    );
    return fromExpressBody(data, 'Failed to extract conditions');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to extract conditions');
  }
};

/**
 * Commits selected proposals from an extract session.
 */
export const commitExtractSession = async (
  sessionId: string,
): Promise<ApiResponse<CommitExtractSessionData>> => {
  try {
    const { data } = await getApiClient().post<CommitExtractBody>(
      `/api/ai/extract-sessions/${sessionId}/commit`,
      {},
    );
    return fromExpressBody(data, 'Failed to commit extract session');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to commit extract session');
  }
};
