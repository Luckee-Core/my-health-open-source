'use client';

import { useMemo, useState } from 'react';
import type { TherapyExercise, TherapyExerciseTrackingKind } from '@/model';
import { THERAPY_TRACKING_KIND_LABELS } from '@/model';
import { createTherapyExerciseThunk, updateTherapyExerciseThunk } from '@/store/thunks';
import { useAppDispatch } from '@/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  exercise?: TherapyExercise | null;
};

export const TherapyExerciseFormModal = ({ isOpen, onClose, exercise }: Props) => {
  if (!isOpen) return null;
  return (
    <TherapyExerciseFormModalBody
      key={exercise?.id ?? 'new'}
      onClose={onClose}
      exercise={exercise}
    />
  );
};

type BodyProps = {
  onClose: () => void;
  exercise?: TherapyExercise | null;
};

const TherapyExerciseFormModalBody = ({ onClose, exercise }: BodyProps) => {
  const dispatch = useAppDispatch();
  const isEdit = exercise != null;
  const [name, setName] = useState(exercise?.name ?? '');
  const [instructions, setInstructions] = useState(exercise?.instructions ?? '');
  const [trackingKind, setTrackingKind] = useState<TherapyExerciseTrackingKind>(
    exercise?.tracking_kind ?? 'timed_attempts',
  );
  const [targetCount, setTargetCount] = useState(String(exercise?.target_count ?? 10));
  const [unitSize, setUnitSize] = useState(String(exercise?.unit_size ?? 5));
  const [isActive, setIsActive] = useState(exercise?.is_active ?? true);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const trackingOptions = useMemo(
    () =>
      Object.entries(THERAPY_TRACKING_KIND_LABELS) as [TherapyExerciseTrackingKind, string][],
    [],
  );

  const handleSubmit = async () => {
    setError('');
    const trimmedName = name.trim();
    const parsedTarget = Number(targetCount);
    const parsedUnit = Number(unitSize);
    if (!trimmedName) {
      setError('Name is required');
      return;
    }
    if (!Number.isFinite(parsedTarget) || parsedTarget < 1) {
      setError('Target count must be at least 1');
      return;
    }
    if (!Number.isFinite(parsedUnit) || parsedUnit < 1) {
      setError('Unit size must be at least 1');
      return;
    }

    setIsSaving(true);
    const payload = {
      name: trimmedName,
      instructions: instructions.trim() || null,
      tracking_kind: trackingKind,
      target_count: parsedTarget,
      unit_size: parsedUnit,
      is_active: isActive,
    };

    const httpStatus = isEdit
      ? await dispatch(updateTherapyExerciseThunk(exercise.id, payload))
      : await dispatch(createTherapyExerciseThunk(payload));
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
        <h2 className={styles.heading}>{isEdit ? 'Edit exercise' : 'New exercise'}</h2>
        <div className={styles.fields}>
          <input
            type="text"
            placeholder="Exercise name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="Instructions (optional)"
            className={styles.textarea}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <select
            className={styles.input}
            value={trackingKind}
            onChange={(e) => setTrackingKind(e.target.value as TherapyExerciseTrackingKind)}
          >
            {trackingOptions.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <div className={styles.row}>
            <input
              type="number"
              min={1}
              placeholder="Target count"
              className={styles.input}
              value={targetCount}
              onChange={(e) => setTargetCount(e.target.value)}
            />
            <input
              type="number"
              min={1}
              placeholder={trackingKind === 'timed_attempts' ? 'Seconds each' : 'Reps per set'}
              className={styles.input}
              value={unitSize}
              onChange={(e) => setUnitSize(e.target.value)}
            />
          </div>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
            Active (included in daily tracking)
          </label>
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <div className={styles.footer}>
          <button type="button" className={styles.secondaryButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => void handleSubmit()}
            disabled={isSaving}
          >
            {isSaving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: `
    fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4
  `,
  panel: `
    w-full max-w-lg rounded-lg bg-white p-6 shadow-lg space-y-4
  `,
  heading: `text-lg font-semibold text-gray-900`,
  fields: `space-y-3`,
  row: `grid grid-cols-2 gap-3`,
  input: `
    w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
  `,
  textarea: `
    w-full min-h-24 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900
  `,
  checkboxLabel: `flex items-center gap-2 text-sm text-gray-700`,
  error: `text-sm text-red-600`,
  footer: `flex justify-end gap-2`,
  primaryButton: `
    rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white
    hover:bg-gray-800 disabled:opacity-50
  `,
  secondaryButton: `
    rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800
    hover:bg-gray-50
  `,
} as const;
