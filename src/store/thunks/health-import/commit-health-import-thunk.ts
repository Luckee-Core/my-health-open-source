import { commitHealthImport } from '@/api/health-import';
import { HealthImportBuilderActions } from '@/store/builders';
import { HealthImportsActions } from '@/store/dumps';
import type { AppThunk } from '@/store/types';
import { loadBootstrapDataThunk } from '@/store/thunks/bootstrap';

/**
 * Commits the current preview id from builder state into clinical tables.
 */
export const commitHealthImportThunk =
  (): AppThunk<Promise<200 | 400 | 500>> =>
  async (dispatch, getState) => {
    const { previewId } = getState().healthImportBuilder;
    if (!previewId) {
      dispatch(HealthImportBuilderActions.setErrorMessage('No preview to commit'));
      dispatch(HealthImportBuilderActions.setCommitStatus('error'));
      return 400;
    }

    dispatch(HealthImportBuilderActions.setErrorMessage(''));
    dispatch(HealthImportBuilderActions.setCommitStatus('loading'));
    dispatch(HealthImportBuilderActions.setStep('committing'));

    const result = await commitHealthImport(previewId);
    if (!result.ok) {
      dispatch(HealthImportBuilderActions.setCommitStatus('error'));
      dispatch(HealthImportBuilderActions.setStep('preview'));
      dispatch(
        HealthImportBuilderActions.setErrorMessage(
          result.error.message || 'Failed to commit health import',
        ),
      );
      return result.status >= 500 ? 500 : 400;
    }

    dispatch(HealthImportsActions.upsertHealthImport(result.data.import));
    dispatch(HealthImportBuilderActions.setCommitCounts(result.data.counts));
    dispatch(HealthImportBuilderActions.setCommitStatus('success'));
    dispatch(HealthImportBuilderActions.setStep('done'));

    await dispatch(loadBootstrapDataThunk());

    return 200;
  };
