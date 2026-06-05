'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Appointment, AppointmentStatus } from '@/model/appointment';
import {
  fromDatetimeLocalValue,
  STATUS_LABELS,
  toDatetimeLocalValue,
} from '../format-datetime-local';
import { createAppointmentThunk } from '@/store/thunks/appointments/create-appointment-thunk';
import { updateAppointmentThunk } from '@/store/thunks/appointments/update-appointment-thunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  appointment?: Appointment | null;
};

export const AppointmentFormModal = ({ isOpen, onClose, appointment }: Props) => {
  const dispatch = useAppDispatch();
  const doctorsDump = useAppSelector((state) => state.doctors);
  const hospitals = useAppSelector((state) => state.hospitals);
  const specialties = useAppSelector((state) => state.specialties);

  const doctors = useMemo(() => Object.values(doctorsDump), [doctorsDump]);
  const isEdit = appointment != null;
  const [doctorId, setDoctorId] = useState('');
  const [scheduledAtLocal, setScheduledAtLocal] = useState('');
  const [status, setStatus] = useState<AppointmentStatus>('scheduled');
  const [appointmentType, setAppointmentType] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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

  const selectedDoctor = doctors.find((d) => d.id === doctorId);
  const facilityAddress = selectedDoctor
    ? hospitals[selectedDoctor.hospital_id]?.address
    : null;

  useEffect(() => {
    if (!isOpen) return;
    if (appointment) {
      setDoctorId(appointment.doctor_id);
      setScheduledAtLocal(toDatetimeLocalValue(appointment.scheduled_at));
      setStatus(appointment.status);
      setAppointmentType(appointment.appointment_type ?? '');
      setReason(appointment.reason ?? '');
      setNotes(appointment.notes ?? '');
    } else {
      setDoctorId('');
      setScheduledAtLocal('');
      setStatus('scheduled');
      setAppointmentType('');
      setReason('');
      setNotes('');
    }
    setError('');
  }, [isOpen, appointment]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setError('');
    if (!doctorId) {
      setError('Doctor is required');
      return;
    }
    if (!scheduledAtLocal.trim()) {
      setError('Scheduled date/time is required');
      return;
    }

    setIsSaving(true);
    const payload = {
      doctor_id: doctorId,
      scheduled_at: fromDatetimeLocalValue(scheduledAtLocal),
      status,
      appointment_type: appointmentType.trim() || null,
      reason: reason.trim() || null,
      notes: notes.trim() || null,
    };
    const result = isEdit
      ? await dispatch(updateAppointmentThunk(appointment.id, payload))
      : await dispatch(createAppointmentThunk(payload));
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
        <h2 className={styles.heading}>{isEdit ? 'Edit appointment' : 'New appointment'}</h2>
        <div className={styles.fields}>
          <label className={styles.label}>
            Doctor
            <select
              className={styles.input}
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            >
              <option value="">Select doctor…</option>
              {doctorOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          {facilityAddress && (
            <p className={styles.helper}>Facility address: {facilityAddress}</p>
          )}
          <label className={styles.label}>
            Scheduled
            <input
              type="datetime-local"
              className={styles.input}
              value={scheduledAtLocal}
              onChange={(e) => setScheduledAtLocal(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Status
            <select
              className={styles.input}
              value={status}
              onChange={(e) => setStatus(e.target.value as AppointmentStatus)}
            >
              {(Object.keys(STATUS_LABELS) as AppointmentStatus[]).map((key) => (
                <option key={key} value={key}>
                  {STATUS_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
          <input
            type="text"
            placeholder="Appointment type (e.g. Follow-up)"
            className={styles.input}
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Reason for visit"
            className={styles.input}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
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
            disabled={isSaving || !doctorId || !scheduledAtLocal}
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
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px]`,
  helper: `text-sm text-gray-600`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
