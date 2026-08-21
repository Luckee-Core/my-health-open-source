'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Medication, MedicationStatus } from '@/model';
import {
  createMedication,
  deleteMedicationDoseSchedule,
  getMedicationDoseSchedule,
  putMedicationDoseSchedule,
} from '@/api/medications';
import { MedicationsActions } from '@/store/dumps';
import { updateMedicationThunk } from '@/store/thunks';
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
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [intervalHours, setIntervalHours] = useState('3');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!medication?.id) return;
    void (async () => {
      const result = await getMedicationDoseSchedule(medication.id);
      if (result.ok && result.data) {
        setReminderEnabled(result.data.reminder_enabled);
        setIntervalHours(String(result.data.interval_minutes / 60));
      }
    })();
  }, [medication?.id]);

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

  const saveDoseSchedule = async (medicationId: string) => {
    if (!reminderEnabled) {
      await deleteMedicationDoseSchedule(medicationId);
      return;
    }

    const hours = Number(intervalHours);
    if (!Number.isFinite(hours) || hours <= 0) {
      throw new Error('Interval hours must be greater than 0');
    }

    const scheduleResult = await putMedicationDoseSchedule(medicationId, {
      interval_minutes: Math.round(hours * 60),
      reminder_enabled: true,
    });
    if (!scheduleResult.ok) {
      throw new Error('Failed to save dose reminder schedule');
    }
  };

  const handleSubmit = async () => {
    setError('');
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Name is required');
      return;
    }

    if (reminderEnabled) {
      const hours = Number(intervalHours);
      if (!Number.isFinite(hours) || hours <= 0) {
        setError('Reminder interval must be greater than 0 hours');
        return;
      }
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

    try {
      if (isEdit) {
        const httpStatus = await dispatch(updateMedicationThunk(medication.id, payload));
        if (httpStatus !== 200) {
          setError('Failed to save medication');
          return;
        }
        await saveDoseSchedule(medication.id);
      } else {
        const createResult = await createMedication(payload);
        if (!createResult.ok) {
          setError('Failed to save medication');
          return;
        }
        dispatch(MedicationsActions.upsertMedication(createResult.data));
        await saveDoseSchedule(createResult.data.id);
      }
      onClose();
    } catch (scheduleError) {
      setError(scheduleError instanceof Error ? scheduleError.message : 'Failed to save reminders');
    } finally {
      setIsSaving(false);
    }
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
            placeholder="Instructions"
            className={styles.input}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
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
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={reminderEnabled}
              onChange={(e) => setReminderEnabled(e.target.checked)}
            />
            <span>Dashboard dose reminders (PRN / interval)</span>
          </label>
          {reminderEnabled && (
            <div className={styles.reminderFields}>
              <label className={styles.label}>
                Remind every
                <input
                  type="number"
                  min={0.5}
                  step={0.5}
                  className={styles.intervalInput}
                  value={intervalHours}
                  onChange={(e) => setIntervalHours(e.target.value)}
                />
                hours
              </label>
              <p className={styles.hint}>
                Example: oxycodone every 3 hours — dashboard alerts when you can take the next dose.
              </p>
            </div>
          )}
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
  checkboxRow: `flex items-center gap-2 text-sm text-gray-800`,
  reminderFields: `rounded-md border border-gray-200 bg-gray-50 p-3 space-y-2`,
  label: `flex items-center gap-2 text-sm text-gray-800`,
  intervalInput: `w-20 rounded-md border border-gray-300 px-2 py-1 text-sm`,
  hint: `text-xs text-gray-600`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
