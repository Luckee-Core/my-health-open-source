'use client';

import { useMemo, useState } from 'react';
import type { DailyEntry } from '@/model/daily-entry';
import { getTodayEntryDate } from '../format-entry-date';
import { createDailyEntryThunk } from '@/store/thunks/daily-entries/create-daily-entry-thunk';
import { updateDailyEntryThunk } from '@/store/thunks/daily-entries/update-daily-entry-thunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  dailyEntry?: DailyEntry | null;
  defaultEntryDate?: string;
};

export const DailyEntryFormModal = ({
  isOpen,
  onClose,
  dailyEntry,
  defaultEntryDate,
}: Props) => {
  if (!isOpen) return null;

  const formKey = dailyEntry?.id ?? `${defaultEntryDate ?? 'new'}`;

  return (
    <DailyEntryFormModalBody
      key={formKey}
      onClose={onClose}
      dailyEntry={dailyEntry}
      defaultEntryDate={defaultEntryDate}
    />
  );
};

type BodyProps = {
  onClose: () => void;
  dailyEntry?: DailyEntry | null;
  defaultEntryDate?: string;
};

const DailyEntryFormModalBody = ({
  onClose,
  dailyEntry,
  defaultEntryDate,
}: BodyProps) => {
  const dispatch = useAppDispatch();
  const focusAreasDump = useAppSelector((state) => state.focusAreas);

  const focusAreas = useMemo(() => Object.values(focusAreasDump), [focusAreasDump]);
  const focusAreaOptions = useMemo(() => {
    return [...focusAreas].sort((a, b) => a.name.localeCompare(b.name));
  }, [focusAreas]);

  const isEdit = dailyEntry != null;
  const [entryDate, setEntryDate] = useState(
    dailyEntry?.entry_date ?? defaultEntryDate ?? getTodayEntryDate(),
  );
  const [focusAreaId, setFocusAreaId] = useState(
    dailyEntry?.focus_area_id ?? focusAreaOptions[0]?.id ?? '',
  );
  const [notes, setNotes] = useState(dailyEntry?.notes ?? '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async () => {
    setError('');
    if (!entryDate.trim()) {
      setError('Date is required');
      return;
    }
    if (!focusAreaId) {
      setError('Focus area is required');
      return;
    }

    setIsSaving(true);
    const payload = {
      entry_date: entryDate,
      focus_area_id: focusAreaId,
      notes: notes.trim() || null,
    };
    const result = isEdit
      ? await dispatch(updateDailyEntryThunk(dailyEntry.id, payload))
      : await dispatch(createDailyEntryThunk(payload));
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
        <h2 className={styles.heading}>{isEdit ? 'Edit daily log' : 'New daily log'}</h2>
        {focusAreaOptions.length === 0 ? (
          <p className={styles.hint}>
            Define at least one focus area before logging. Go to Focus areas in the sidebar.
          </p>
        ) : (
          <div className={styles.fields}>
            <label className={styles.label}>
              Date
              <input
                type="date"
                className={styles.input}
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
              />
            </label>
            <label className={styles.label}>
              Focus area
              <select
                className={styles.input}
                value={focusAreaId}
                onChange={(e) => setFocusAreaId(e.target.value)}
              >
                {focusAreaOptions.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.label}>
              Notes
              <textarea
                placeholder="What happened today for this area?"
                className={styles.textarea}
                rows={5}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        )}
        <div className={styles.actions}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving || focusAreaOptions.length === 0 || !focusAreaId}
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
  hint: `mt-4 text-sm text-gray-600`,
  fields: `mt-4 space-y-3`,
  label: `block text-sm font-medium text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
