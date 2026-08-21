'use client';

import { useMemo, useState } from 'react';
import type { Medication, MedicationStatus } from '@/model';
import { createMedicationThunk, updateMedicationThunk } from '@/store/thunks';
import {
  formatDoseIntervalMinutes,
  parseDoseIntervalMinutes,
} from '@/utils/medications/parse-dose-interval-minutes';
import { useAppDispatch, useAppSelector } from '@/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  medication?: Medication | null;
};

export const MedicationFormModal = ({ isOpen, onClose, medication }: Props) => {
  if (!isOpen) return null;

  return (
    <MedicationFormModalBody key={medication?.id ?? 'new'} onClose={onClose} medication={medication} />
  );
};

type BodyProps = {
  onClose: () => void;
  medication?: Medication | null;
};

const MedicationFormModalBody = ({ onClose, medication }: BodyProps) => {
  const dispatch = useAppDispatch();
  const doctorsDump = useAppSelector((state) => state.doctors);
  const hospitals = useAppSelector((state) => state.hospitals);
  const specialties = useAppSelector((state) => state.specialties);

  const doctors = useMemo(() => Object.values(doctorsDump), [doctorsDump]);
  const isEdit = medication != null;
  const [name, setName] = useState(medication?.name ?? '');
  const [instructions, setInstructions] = useState(medication?.instructions ?? '');
  const [startedOn, setStartedOn] = useState(medication?.started_on ?? '');
  const [status, setStatus] = useState<MedicationStatus>(medication?.status ?? 'active');
  const [doctorId, setDoctorId] = useState(medication?.doctor_id ?? '');
  const [notes, setNotes] = useState(medication?.notes ?? '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const parsedIntervalMinutes = useMemo(
    () => parseDoseIntervalMinutes(instructions),
    [instructions],
  );

  const doctorOptions = useMemo(() => {
    return [...doctors]
      .map((doctor) => {
        const facility = hospitals[doctor.hospital_id]?.name ?? 'Unknown facility';
        const specialty = specialties[doctor.specialty_id]?.name ?? 'Unknown specialty';
        return {
          id: doctor.id,
          label: `${doctor.name} — ${specialty} @ ${facility}`,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [doctors, hospitals, specialties]);

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
      instructions: instructions.trim() || null,
      started_on: startedOn.trim() || null,
      status,
      doctor_id: doctorId || null,
      notes: notes.trim() || null,
    };

    const httpStatus = isEdit
      ? await dispatch(updateMedicationThunk(medication.id, payload))
      : await dispatch(createMedicationThunk(payload));
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
        <h2 className={styles.heading}>{isEdit ? 'Edit medication' : 'New medication'}</h2>
        <div className={styles.fields}>
          <input
            type="text"
            placeholder="Medication name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="e.g. Take 1 pill every 3 hours"
            className={styles.input}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          {parsedIntervalMinutes != null && status === 'active' && (
            <p className={styles.intervalDetected}>
              Dashboard reminders: {formatDoseIntervalMinutes(parsedIntervalMinutes)} (from
              instructions)
            </p>
          )}
          <input
            type="date"
            className={styles.input}
            value={startedOn}
            onChange={(e) => setStartedOn(e.target.value)}
          />
          <select
            className={styles.input}
            value={status}
            onChange={(e) => setStatus(e.target.value as MedicationStatus)}
          >
            <option value="active">Active</option>
            <option value="stopped">Stopped</option>
          </select>
          <select
            className={styles.input}
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          >
            <option value="">No prescribing doctor</option>
            {doctorOptions.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
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
  panel: `w-full max-w-md rounded-lg bg-white p-5 shadow-lg max-h-[90vh] overflow-y-auto`,
  heading: `text-lg font-semibold text-gray-900`,
  fields: `mt-4 space-y-3`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px]`,
  intervalDetected: `text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
