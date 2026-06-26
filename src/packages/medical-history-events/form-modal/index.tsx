'use client';

import { useMemo, useState } from 'react';
import type { MedicalHistoryCategory, MedicalHistoryEvent } from '@/model';
import { MEDICAL_HISTORY_CATEGORY_LABELS } from '@/model';
import {
  createMedicalHistoryEventThunk,
  updateMedicalHistoryEventThunk,
} from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  medicalHistoryEvent?: MedicalHistoryEvent | null;
};

export const MedicalHistoryEventFormModal = ({
  isOpen,
  onClose,
  medicalHistoryEvent,
}: Props) => {
  if (!isOpen) return null;

  return (
    <MedicalHistoryEventFormModalBody
      key={medicalHistoryEvent?.id ?? 'new'}
      onClose={onClose}
      medicalHistoryEvent={medicalHistoryEvent}
    />
  );
};

type BodyProps = {
  onClose: () => void;
  medicalHistoryEvent?: MedicalHistoryEvent | null;
};

const MedicalHistoryEventFormModalBody = ({ onClose, medicalHistoryEvent }: BodyProps) => {
  const dispatch = useAppDispatch();
  const doctorsDump = useAppSelector((state) => state.doctors);
  const appointmentsDump = useAppSelector((state) => state.appointments);
  const focusAreasDump = useAppSelector((state) => state.focusAreas);
  const hospitals = useAppSelector((state) => state.hospitals);
  const specialties = useAppSelector((state) => state.specialties);

  const doctors = useMemo(() => Object.values(doctorsDump), [doctorsDump]);
  const appointments = useMemo(() => Object.values(appointmentsDump), [appointmentsDump]);
  const focusAreas = useMemo(() => Object.values(focusAreasDump), [focusAreasDump]);

  const isEdit = medicalHistoryEvent != null;
  const [eventDate, setEventDate] = useState(medicalHistoryEvent?.event_date ?? '');
  const [title, setTitle] = useState(medicalHistoryEvent?.title ?? '');
  const [category, setCategory] = useState<MedicalHistoryCategory>(
    medicalHistoryEvent?.category ?? 'other',
  );
  const [description, setDescription] = useState(medicalHistoryEvent?.description ?? '');
  const [doctorId, setDoctorId] = useState(medicalHistoryEvent?.doctor_id ?? '');
  const [appointmentId, setAppointmentId] = useState(medicalHistoryEvent?.appointment_id ?? '');
  const [focusAreaId, setFocusAreaId] = useState(medicalHistoryEvent?.focus_area_id ?? '');
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

  const appointmentOptions = useMemo(() => {
    return [...appointments]
      .map((appointment) => {
        const doctor = doctors.find((d) => d.id === appointment.doctor_id);
        const when = new Date(appointment.scheduled_at).toLocaleString();
        return {
          id: appointment.id,
          label: `${when} — ${doctor?.name ?? 'Unknown doctor'}`,
        };
      })
      .sort((a, b) => b.label.localeCompare(a.label));
  }, [appointments, doctors]);

  const focusAreaOptions = useMemo(
    () => [...focusAreas].sort((a, b) => a.name.localeCompare(b.name)),
    [focusAreas],
  );

  const handleSubmit = async () => {
    setError('');
    if (!eventDate.trim()) {
      setError('Date is required');
      return;
    }
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSaving(true);
    const payload = {
      event_date: eventDate,
      title: title.trim(),
      category,
      description: description.trim() || null,
      doctor_id: doctorId || null,
      appointment_id: appointmentId || null,
      focus_area_id: focusAreaId || null,
    };
    const httpStatus = isEdit
      ? await dispatch(updateMedicalHistoryEventThunk(medicalHistoryEvent.id, payload))
      : await dispatch(createMedicalHistoryEventThunk(payload));
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
        <h2 className={styles.heading}>
          {isEdit ? 'Edit medical history event' : 'New medical history event'}
        </h2>
        <div className={styles.fields}>
          <label className={styles.label}>
            Date
            <input
              type="date"
              className={styles.input}
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </label>
          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className={styles.label}>
            Category
            <select
              className={styles.input}
              value={category}
              onChange={(e) => setCategory(e.target.value as MedicalHistoryCategory)}
            >
              {(Object.keys(MEDICAL_HISTORY_CATEGORY_LABELS) as MedicalHistoryCategory[]).map(
                (key) => (
                  <option key={key} value={key}>
                    {MEDICAL_HISTORY_CATEGORY_LABELS[key]}
                  </option>
                ),
              )}
            </select>
          </label>
          <textarea
            placeholder="Description — treatment details, findings, notes"
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className={styles.label}>
            Doctor (optional)
            <select
              className={styles.input}
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            >
              <option value="">None</option>
              {doctorOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Appointment (optional)
            <select
              className={styles.input}
              value={appointmentId}
              onChange={(e) => setAppointmentId(e.target.value)}
            >
              <option value="">None</option>
              {appointmentOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
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
            disabled={isSaving || !eventDate || !title.trim()}
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
  panel: `w-full max-w-lg rounded-lg bg-white p-5 shadow-lg max-h-[90vh] overflow-y-auto`,
  heading: `text-lg font-semibold text-gray-900`,
  fields: `mt-4 space-y-3`,
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[120px]`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
