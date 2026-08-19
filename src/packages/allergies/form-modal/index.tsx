'use client';

import { useState } from 'react';
import type { Allergy, AllergyStatus } from '@/model';
import { createAllergyThunk, updateAllergyThunk } from '@/store/thunks';
import { useAppDispatch } from '@/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  allergy?: Allergy | null;
};

export const AllergyFormModal = ({ isOpen, onClose, allergy }: Props) => {
  if (!isOpen) return null;

  return (
    <AllergyFormModalBody key={allergy?.id ?? 'new'} onClose={onClose} allergy={allergy} />
  );
};

type BodyProps = {
  onClose: () => void;
  allergy?: Allergy | null;
};

const AllergyFormModalBody = ({ onClose, allergy }: BodyProps) => {
  const dispatch = useAppDispatch();
  const isEdit = allergy != null;
  const [substance, setSubstance] = useState(allergy?.substance ?? '');
  const [reaction, setReaction] = useState(allergy?.reaction ?? '');
  const [criticality, setCriticality] = useState(allergy?.criticality ?? '');
  const [status, setStatus] = useState<AllergyStatus>(allergy?.status ?? 'active');
  const [notes, setNotes] = useState(allergy?.notes ?? '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    setError('');
    const trimmedSubstance = substance.trim();
    if (!trimmedSubstance) {
      setError('Substance is required');
      return;
    }

    setIsSaving(true);
    const payload = {
      substance: trimmedSubstance,
      reaction: reaction.trim() || null,
      criticality: criticality.trim() || null,
      status,
      notes: notes.trim() || null,
    };
    const httpStatus = isEdit
      ? await dispatch(updateAllergyThunk(allergy.id, payload))
      : await dispatch(createAllergyThunk(payload));
    setIsSaving(false);

    if (httpStatus !== 200) {
      setError('Failed to save');
      return;
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>{isEdit ? 'Edit allergy' : 'New allergy'}</h2>
        <div className={styles.fields}>
          <input
            type="text"
            placeholder="Substance"
            className={styles.input}
            value={substance}
            onChange={(e) => setSubstance(e.target.value)}
          />
          <input
            type="text"
            placeholder="Reaction"
            className={styles.input}
            value={reaction}
            onChange={(e) => setReaction(e.target.value)}
          />
          <input
            type="text"
            placeholder="Criticality"
            className={styles.input}
            value={criticality}
            onChange={(e) => setCriticality(e.target.value)}
          />
          <select
            className={styles.input}
            value={status}
            onChange={(e) => setStatus(e.target.value as AllergyStatus)}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <textarea
            placeholder="Notes"
            className={styles.textarea}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving || !substance.trim()}
            onClick={() => void handleSubmit()}
            className={styles.saveButton}
          >
            {isSaving ? 'Saving…' : isEdit ? 'Save' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: `fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4`,
  panel: `w-full max-w-md rounded-lg bg-white p-5 shadow-lg`,
  heading: `text-lg font-semibold text-gray-900`,
  fields: `mt-4 space-y-3`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px]`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
