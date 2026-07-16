import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressBody, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { HealthImport, HealthImportSummary } from '@/model';

type ListBody = { success: boolean; data?: HealthImport[]; error?: string };

export type PreviewHealthImportData = {
  previewId: string;
  contentSha256: string;
  filename: string;
  documentCount: number;
  summary: HealthImportSummary;
};

export type CommitHealthImportData = {
  import: HealthImport;
  counts: HealthImportSummary['counts'];
};

type PreviewBody = { success: boolean; data?: PreviewHealthImportData; error?: string };
type CommitBody = { success: boolean; data?: CommitHealthImportData; error?: string };

/**
 * Uploads a Health Summary package for preview via multipart `file`.
 */
export const previewHealthImport = async (
  file: File,
): Promise<ApiResponse<PreviewHealthImportData>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await getApiClient().postFormData<PreviewBody>(
      '/api/data/health-imports/preview',
      formData,
    );
    return fromExpressBody(data, 'Failed to preview health import');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to preview health import');
  }
};

/**
 * Commits a previewed health import by preview id.
 */
export const commitHealthImport = async (
  previewId: string,
): Promise<ApiResponse<CommitHealthImportData>> => {
  try {
    const { data } = await getApiClient().post<CommitBody>(
      '/api/data/health-imports/commit',
      { previewId },
    );
    return fromExpressBody(data, 'Failed to commit health import');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to commit health import');
  }
};

/**
 * Loads all health import history rows.
 */
export const getAllHealthImports = async (): Promise<ApiResponse<HealthImport[]>> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/health-imports');
    return fromExpressListBody(data, 'Failed to load health imports');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load health imports');
  }
};
