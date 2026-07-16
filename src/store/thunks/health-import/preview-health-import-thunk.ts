import { previewHealthImport } from '@/api/health-import';
import { HealthImportBuilderActions } from '@/store/builders';
import { CurrentHealthImportDraftActions } from '@/store/current';
import type { AppThunk } from '@/store/types';

/**
 * Uploads a Health Summary file, stores preview metadata + summary draft.
 */
export const previewHealthImportThunk =
  (file: File): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch) => {
    dispatch(HealthImportBuilderActions.setErrorMessage(''));
    dispatch(HealthImportBuilderActions.setPreviewStatus('loading'));
    dispatch(HealthImportBuilderActions.setFilename(file.name));

    const result = await previewHealthImport(file);
    if (!result.ok) {
      dispatch(HealthImportBuilderActions.setPreviewStatus('error'));
      dispatch(
        HealthImportBuilderActions.setErrorMessage(
          result.error.message || 'Failed to preview health import',
        ),
      );
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(HealthImportBuilderActions.setPreviewId(result.data.previewId));
    dispatch(HealthImportBuilderActions.setContentSha256(result.data.contentSha256));
    dispatch(HealthImportBuilderActions.setFilename(result.data.filename));
    dispatch(HealthImportBuilderActions.setDocumentCount(result.data.documentCount));
    dispatch(CurrentHealthImportDraftActions.setCurrentHealthImportDraft(result.data.summary));
    dispatch(HealthImportBuilderActions.setPreviewStatus('success'));
    dispatch(HealthImportBuilderActions.setStep('preview'));
    return 200;
  };
