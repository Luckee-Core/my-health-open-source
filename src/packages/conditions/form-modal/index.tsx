'use client';

import { useMemo, useState } from 'react';
import type { Condition, ConditionStatus } from '@/model';
import { createConditionThunk, updateConditionThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  condition?: Condition | null;
};

export const ConditionFormModal = ({ isOpen, onClose, condition }: Props) => {
  if (!isOpen) return null;

  return (
    <ConditionFormModalBody key={condition?.id ?? 'new'} onClose={onClose} condition={condition} />
  );
};

type BodyProps = {
  onClose: () => void;
  condition?: Condition | null;
};

const ConditionFormModalBody = ({ onClose, condition }: BodyProps) => {
  const dispatch = useAppDispatch();
  const focusAreasDump = useAppSelector((state) => state.focusAreas);
  const focusAreas = useMemo(() => Object.values(focusAreasDump), [focusAreasDump]);

  const isEdit = condition != null;
  const [name, setName] = useState(condition?.name ?? '');
  const [status, setStatus] = useState<ConditionStatus>(condition?.status ?? 'active');
  const [notedOn, setNotedOn] = useState(condition?.noted_on ?? '');
  const [diagnosedOn, setDiagnosedOn] = useState(condition?.diagnosed_on ?? '');
  const [focusAreaId, setFocusAreaId] = useState(condition?.focus_area_id ?? '');
  const [notes, setNotes] = useState(condition?.notes ?? '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const focusAreaOptions = useMemo(
    () => [...focusAreas].sort((a, b) => a.name.localeCompare(b.name)),
    [focusAreas],
  );

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
      status,
      noted_on: notedOn.trim() || null,
      diagnosed_on: diagnosedOn.trim() || null,
      focus_area_id: focusAreaId || null,
      notes: notes.trim() || null,
    };
    const httpStatus = isEdit
      ? await dispatch(updateConditionThunk(condition.id, payload))
      : await dispatch(createConditionThunk(payload));
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
        <h2 className={styles.heading}>{isEdit ? 'Edit condition' : 'New condition'}</h2>
        <div className={styles.fields}>
          <input
            type="text"
            placeholder="Condition name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            className={styles.input}
            value={status}
            onChange={(e) => setStatus(e.target.value as ConditionStatus)}
          >
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
          </select>
          <input
            type="date"
            className={styles.input}
            value={notedOn}
            onChange={(e) => setNotedOn(e.target.value)}
          />
          <input
            type="date"
            className={styles.input}
            value={diagnosedOn}
            onChange={(e) => setDiagnosedOn(e.target.value)}
          />
          <select
            className={styles.input}
            value={focusAreaId}
            onChange={(e) => setFocusAreaId(e.target.value)}
          >
            <option value="">No focus area</option>
            {focusAreaOptions.map((area) => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
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
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px]`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
