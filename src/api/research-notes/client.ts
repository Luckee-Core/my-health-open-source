import { getApiClient } from '@/api/client';
import {
  fromCaughtError,
  fromExpressBody,
  fromExpressListBody,
  fromExpressVoidBody,
} from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { ResearchNote, ResearchNoteCategory } from '@/model';

type ListBody = { success: boolean; data?: ResearchNote[]; error?: string };
type EntityBody = { success: boolean; data?: ResearchNote; error?: string };
type VoidBody = { success: boolean; error?: string };

export type CreateResearchNotePayload = {
  title: string;
  category?: ResearchNoteCategory;
  source_url?: string | null;
  summary?: string | null;
  content?: string | null;
  focus_area_id?: string | null;
};

export type UpdateResearchNotePayload = Partial<CreateResearchNotePayload>;

/**
 * Loads all research notes from Express `/api/data/research-notes`.
 */
export const getAllResearchNotes = async (): Promise<ApiResponse<ResearchNote[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/research-notes');
    return fromExpressListBody(data, 'Failed to load research notes');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load research notes');
  }
};

/**
 * Creates a research note via POST `/api/data/research-notes`.
 */
export const createResearchNote = async (
  payload: CreateResearchNotePayload,
): Promise<ApiResponse<ResearchNote>> => {
  try {
    const { data } = await getApiClient().post<EntityBody>('/api/data/research-notes', payload);
    return fromExpressBody(data, 'Failed to create research note');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to create research note');
  }
};

/**
 * Updates a research note via PATCH `/api/data/research-notes/:id`.
 */
export const updateResearchNote = async (
  id: string,
  payload: UpdateResearchNotePayload,
): Promise<ApiResponse<ResearchNote>> => {
  try {
    const { data } = await getApiClient().patch<EntityBody>(
      `/api/data/research-notes/${id}`,
      payload,
    );
    return fromExpressBody(data, 'Failed to update research note');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to update research note');
  }
};

/**
 * Deletes a research note via DELETE `/api/data/research-notes/:id`.
 */
export const deleteResearchNote = async (id: string): Promise<ApiResponse<null>> => {
  try {
    const { data } = await getApiClient().delete<VoidBody>(`/api/data/research-notes/${id}`);
    return fromExpressVoidBody(data, 'Failed to delete research note');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to delete research note');
  }
};
