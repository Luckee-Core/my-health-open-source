'use client';

import { useState } from 'react';
import type { Specialty } from '@/model/specialty';
import { createSpecialtyThunk } from '@/store/thunks/specialties/create-specialty-thunk';
import { updateSpecialtyThunk } from '@/store/thunks/specialties/update-specialty-thunk';
import { useAppDispatch } from '@/store/hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  specialty?: Specialty | null;
};

export const SpecialtyFormModal = ({ isOpen, onClose, specialty }: Props) => {
  if (!isOpen) return null;

  return (
    <SpecialtyFormModalBody
      key={specialty?.id ?? 'new'}
      onClose={onClose}
      specialty={specialty}
    />
  );
};

type BodyProps = {
  onClose: () => void;
  specialty?: Specialty | null;
};

const SpecialtyFormModalBody = ({ onClose, specialty }: BodyProps) => {
  const dispatch = useAppDispatch();
  const isEdit = specialty != null;
  const [name, setName] = useState(specialty?.name ?? '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    setError('');
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Name is required');
      return;
    }

    setIsSaving(true);
    const result = isEdit
      ? await dispatch(updateSpecialtyThunk(specialty.id, { name: trimmed }))
      : await dispatch(createSpecialtyThunk({ name: trimmed }));
    setIsSaving(false);

    if (result.status !== 200) {
      setError(result.message ?? 'Failed to save');
      return;
    }
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>{isEdit ? 'Edit specialty' : 'New specialty'}</h2>
        <div className={styles.fields}>
          <input
            type="text"
            placeholder="Specialty name (e.g. Cardiology)"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving || !name.trim()}
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
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
