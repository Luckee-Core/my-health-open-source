'use client';

import { useEffect, useState } from 'react';
import type { FocusArea } from '@/model/focus-area';
import { createFocusAreaThunk } from '@/store/thunks/focus-areas/create-focus-area-thunk';
import { updateFocusAreaThunk } from '@/store/thunks/focus-areas/update-focus-area-thunk';
import { useAppDispatch } from '@/store/hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  focusArea?: FocusArea | null;
};

export const FocusAreaFormModal = ({ isOpen, onClose, focusArea }: Props) => {
  const dispatch = useAppDispatch();
  const isEdit = focusArea != null;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setName(focusArea?.name ?? '');
    setDescription(focusArea?.description ?? '');
    setError('');
  }, [isOpen, focusArea]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setError('');
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Name is required');
      return;
    }

    setIsSaving(true);
    const payload = {
      name: trimmedName,
      description: description.trim() || null,
    };
    const result = isEdit
      ? await dispatch(updateFocusAreaThunk(focusArea.id, payload))
      : await dispatch(createFocusAreaThunk(payload));
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
        <h2 className={styles.heading}>{isEdit ? 'Edit focus area' : 'New focus area'}</h2>
        <div className={styles.fields}>
          <input
            type="text"
            placeholder="Name (e.g. Headaches, Breathing)"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="What are you tracking for this area?"
            className={styles.textarea}
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
