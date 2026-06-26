'use client';

import { useMemo, useState } from 'react';
import type { SymptomLog } from '@/model';
import {
  fromDatetimeLocalValue,
  toDatetimeLocalValue,
} from '@/packages/appointments/format-datetime-local';
import { createSymptomLogThunk, updateSymptomLogThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  symptomLog?: SymptomLog | null;
};

export const SymptomLogFormModal = ({ isOpen, onClose, symptomLog }: Props) => {
  if (!isOpen) return null;

  return (
    <SymptomLogFormModalBody key={symptomLog?.id ?? 'new'} onClose={onClose} symptomLog={symptomLog} />
  );
};

type BodyProps = {
  onClose: () => void;
  symptomLog?: SymptomLog | null;
};

const SymptomLogFormModalBody = ({ onClose, symptomLog }: BodyProps) => {
  const dispatch = useAppDispatch();
  const focusAreasDump = useAppSelector((state) => state.focusAreas);
  const focusAreas = useMemo(() => Object.values(focusAreasDump), [focusAreasDump]);

  const isEdit = symptomLog != null;
  const defaultRecordedAt = symptomLog?.recorded_at
    ? toDatetimeLocalValue(symptomLog.recorded_at)
    : toDatetimeLocalValue(new Date().toISOString());

  const [recordedAtLocal, setRecordedAtLocal] = useState(defaultRecordedAt);
  const [name, setName] = useState(symptomLog?.name ?? '');
  const [severity, setSeverity] = useState(symptomLog?.severity ?? 5);
  const [hasSeverity, setHasSeverity] = useState(symptomLog?.severity != null);
  const [triggers, setTriggers] = useState(symptomLog?.triggers ?? '');
  const [durationMinutes, setDurationMinutes] = useState(
    symptomLog?.duration_minutes != null ? String(symptomLog.duration_minutes) : '',
  );
  const [notes, setNotes] = useState(symptomLog?.notes ?? '');
  const [focusAreaId, setFocusAreaId] = useState(symptomLog?.focus_area_id ?? '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const focusAreaOptions = useMemo(
    () => [...focusAreas].sort((a, b) => a.name.localeCompare(b.name)),
    [focusAreas],
  );

  const handleSubmit = async () => {
    setError('');
    if (!name.trim()) {
      setError('Symptom name is required');
      return;
    }
    if (!recordedAtLocal.trim()) {
      setError('Date/time is required');
      return;
    }

    const parsedDuration = durationMinutes.trim() ? Number(durationMinutes) : null;
    if (parsedDuration != null && (!Number.isInteger(parsedDuration) || parsedDuration < 0)) {
      setError('Duration must be a non-negative whole number of minutes');
      return;
    }

    setIsSaving(true);
    const payload = {
      recorded_at: fromDatetimeLocalValue(recordedAtLocal),
      name: name.trim(),
      severity: hasSeverity ? severity : null,
      triggers: triggers.trim() || null,
      duration_minutes: parsedDuration,
      notes: notes.trim() || null,
      focus_area_id: focusAreaId || null,
    };
    const httpStatus = isEdit
      ? await dispatch(updateSymptomLogThunk(symptomLog.id, payload))
      : await dispatch(createSymptomLogThunk(payload));
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
        <h2 className={styles.heading}>{isEdit ? 'Edit symptom log' : 'New symptom log'}</h2>
        <div className={styles.fields}>
          <label className={styles.label}>
            When noticed
            <input
              type="datetime-local"
              className={styles.input}
              value={recordedAtLocal}
              onChange={(e) => setRecordedAtLocal(e.target.value)}
            />
          </label>
          <input
            type="text"
            placeholder="Symptom name (e.g. Voice fatigue)"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={hasSeverity}
              onChange={(e) => setHasSeverity(e.target.checked)}
            />
            Rate severity (1–10)
          </label>
          {hasSeverity && (
            <div className={styles.severityRow}>
              <input
                type="range"
                min={1}
                max={10}
                value={severity}
                onChange={(e) => setSeverity(Number(e.target.value))}
                className={styles.range}
              />
              <span className={styles.severityValue}>{severity}</span>
            </div>
          )}
          <input
            type="text"
            placeholder="Triggers (e.g. prolonged talking, eating)"
            className={styles.input}
            value={triggers}
            onChange={(e) => setTriggers(e.target.value)}
          />
          <input
            type="number"
            min={0}
            placeholder="Duration in minutes (optional)"
            className={styles.input}
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
          />
          <textarea
            placeholder="Notes"
            className={styles.textarea}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <label className={styles.label}>
            Focus area (optional)
            <select
              className={styles.input}
              value={focusAreaId}
              onChange={(e) => setFocusAreaId(e.target.value)}
            >
              <option value="">None</option>
              {focusAreaOptions.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </label>
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving || !name.trim() || !recordedAtLocal}
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
  panel: `w-full max-w-md rounded-lg bg-white p-5 shadow-lg max-h-[90vh] overflow-y-auto`,
  heading: `text-lg font-semibold text-gray-900`,
  fields: `mt-4 space-y-3`,
  label: `block text-sm text-gray-700 space-y-1`,
  checkboxLabel: `flex items-center gap-2 text-sm text-gray-700`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px]`,
  severityRow: `flex items-center gap-3`,
  range: `flex-1`,
  severityValue: `text-sm font-medium text-gray-900 w-6 text-center`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
