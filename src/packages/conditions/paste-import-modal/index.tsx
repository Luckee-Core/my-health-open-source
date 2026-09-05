'use client';

import { useEffect, useMemo, useState } from 'react';
import { extractConditions } from '@/api/ai-extract';
import { getAllSourceInstances } from '@/api/source-instances';
import type { ConditionProposal, SourceInstance } from '@/model';
import { commitConditionExtractThunk } from '@/store/thunks';
import { useAppDispatch } from '@/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type Step = 'paste' | 'preview';

export const ConditionsPasteImportModal = ({ isOpen, onClose }: Props) => {
  if (!isOpen) return null;

  return <ConditionsPasteImportModalBody onClose={onClose} />;
};

type BodyProps = {
  onClose: () => void;
};

const ConditionsPasteImportModalBody = ({ onClose }: BodyProps) => {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState<Step>('paste');
  const [text, setText] = useState('');
  const [sourceInstanceId, setSourceInstanceId] = useState('');
  const [sourceInstances, setSourceInstances] = useState<SourceInstance[]>([]);
  const [sessionId, setSessionId] = useState('');
  const [proposals, setProposals] = useState<ConditionProposal[]>([]);
  const [error, setError] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const result = await getAllSourceInstances();
      if (cancelled || !result.ok) return;
      setSourceInstances(result.data);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const sourceOptions = useMemo(
    () =>
      [...sourceInstances].sort((a, b) => {
        const labelA = `${a.label} (${a.source_system_name})`;
        const labelB = `${b.label} (${b.source_system_name})`;
        return labelA.localeCompare(labelB);
      }),
    [sourceInstances],
  );

  const handleExtract = async () => {
    setError('');
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Paste conditions list text first');
      return;
    }

    setIsBusy(true);
    const result = await extractConditions({
      text: trimmed,
      source_instance_id: sourceInstanceId || null,
    });
    setIsBusy(false);

    if (!result.ok) {
      setError(result.error.message || 'Failed to parse conditions');
      return;
    }

    setSessionId(result.data.sessionId);
    setProposals(result.data.conditionProposals);
    setStep('preview');
  };

  const handleCommit = async () => {
    if (!sessionId) return;
    setError('');
    setIsBusy(true);
    const status = await dispatch(commitConditionExtractThunk(sessionId));
    setIsBusy(false);

    if (status !== 200) {
      setError('Failed to commit conditions');
      return;
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>Paste conditions from MyChart</h2>

        {step === 'paste' ? (
          <div className={styles.fields}>
            <p className={styles.help}>
              Paste the problem list or conditions section from your patient portal. We will parse
              entries for review before saving.
            </p>
            <select
              className={styles.input}
              value={sourceInstanceId}
              onChange={(e) => setSourceInstanceId(e.target.value)}
            >
              <option value="">No source instance</option>
              {sourceOptions.map((instance) => (
                <option key={instance.id} value={instance.id}>
                  {instance.label} ({instance.source_system_name})
                </option>
              ))}
            </select>
            <textarea
              className={styles.textarea}
              rows={10}
              placeholder="Paste conditions list here…"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        ) : (
          <div className={styles.fields}>
            <p className={styles.help}>
              Review parsed conditions. Uncheck any rows you do not want to import.
            </p>
            <ul className={styles.proposalList}>
              {proposals.map((proposal) => (
                <li key={proposal.id} className={styles.proposalItem}>
                  <div className={styles.proposalRow}>
                    <span className={styles.proposalName}>{proposal.name}</span>
                    {proposal.notes ? (
                      <span className={styles.proposalMeta}> — {proposal.notes}</span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          {step === 'paste' ? (
            <button
              type="button"
              disabled={isBusy || !text.trim()}
              onClick={() => void handleExtract()}
              className={styles.saveButton}
            >
              {isBusy ? 'Parsing…' : 'Preview'}
            </button>
          ) : (
            <button
              type="button"
              disabled={isBusy}
              onClick={() => void handleCommit()}
              className={styles.saveButton}
            >
              {isBusy ? 'Committing…' : 'Commit import'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: `fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4`,
  panel: `w-full max-w-lg rounded-lg bg-white p-5 shadow-lg`,
  heading: `text-lg font-semibold text-gray-900`,
  fields: `mt-4 space-y-3`,
  help: `text-sm text-gray-600`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[160px]`,
  proposalList: `space-y-2 max-h-[320px] overflow-y-auto`,
  proposalItem: `rounded-md border border-gray-200 px-3 py-2`,
  proposalRow: `text-sm`,
  proposalName: `font-medium text-gray-900`,
  proposalMeta: `text-gray-600`,
  error: `text-sm text-red-600 mt-3`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
