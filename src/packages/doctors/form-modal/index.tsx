'use client';

import { useMemo, useState } from 'react';
import type { Doctor } from '@/model/doctor';
import { resolveDoctorRelationsForSave } from '../resolve-doctor-relations-for-save';
import { createDoctorThunk } from '@/store/thunks/doctors/create-doctor-thunk';
import { updateDoctorThunk } from '@/store/thunks/doctors/update-doctor-thunk';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { store } from '@/store/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  doctor?: Doctor | null;
};

export const DoctorFormModal = ({ isOpen, onClose, doctor }: Props) => {
  if (!isOpen) return null;

  return (
    <DoctorFormModalBody key={doctor?.id ?? 'new'} onClose={onClose} doctor={doctor} />
  );
};

type BodyProps = {
  onClose: () => void;
  doctor?: Doctor | null;
};

const DoctorFormModalBody = ({ onClose, doctor }: BodyProps) => {
  const dispatch = useAppDispatch();
  const hospitalsDump = useAppSelector((state) => state.hospitals);
  const specialtiesDump = useAppSelector((state) => state.specialties);

  const hospitals = useMemo(() => Object.values(hospitalsDump), [hospitalsDump]);
  const specialties = useMemo(() => Object.values(specialtiesDump), [specialtiesDump]);
  const isEdit = doctor != null;
  const [name, setName] = useState(doctor?.name ?? '');
  const [hospitalId, setHospitalId] = useState(doctor?.hospital_id ?? '');
  const [newHospitalName, setNewHospitalName] = useState('');
  const [specialtyId, setSpecialtyId] = useState(doctor?.specialty_id ?? '');
  const [newSpecialtyName, setNewSpecialtyName] = useState('');
  const [notes, setNotes] = useState(doctor?.notes ?? '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const sortedHospitals = useMemo(
    () => [...hospitals].sort((a, b) => a.name.localeCompare(b.name)),
    [hospitals],
  );
  const sortedSpecialties = useMemo(
    () => [...specialties].sort((a, b) => a.name.localeCompare(b.name)),
    [specialties],
  );

  const handleSubmit = async () => {
    setError('');
    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Name is required');
      return;
    }

    setIsSaving(true);
    const resolved = await resolveDoctorRelationsForSave(
      dispatch,
      () => store.getState(),
      hospitalId,
      newHospitalName,
      specialtyId,
      newSpecialtyName,
    );
    if (!resolved.ok) {
      setIsSaving(false);
      setError(resolved.message);
      return;
    }

    const payload = {
      name: trimmedName,
      hospital_id: resolved.hospitalId,
      specialty_id: resolved.specialtyId,
      notes: notes.trim() || null,
    };
    const result = isEdit
      ? await dispatch(updateDoctorThunk(doctor.id, payload))
      : await dispatch(createDoctorThunk(payload));
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
        <h2 className={styles.heading}>{isEdit ? 'Edit doctor' : 'New doctor'}</h2>
        <div className={styles.fields}>
          <input
            type="text"
            placeholder="Doctor name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className={styles.label}>
            Facility
            <select
              className={styles.input}
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              disabled={Boolean(newHospitalName.trim())}
            >
              <option value="">Select facility…</option>
              {sortedHospitals.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </label>
          <input
            type="text"
            placeholder="Or new facility name"
            className={styles.input}
            value={newHospitalName}
            onChange={(e) => setNewHospitalName(e.target.value)}
          />
          <label className={styles.label}>
            Specialty
            <select
              className={styles.input}
              value={specialtyId}
              onChange={(e) => setSpecialtyId(e.target.value)}
              disabled={Boolean(newSpecialtyName.trim())}
            >
              <option value="">Select specialty…</option>
              {sortedSpecialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <input
            type="text"
            placeholder="Or new specialty name"
            className={styles.input}
            value={newSpecialtyName}
            onChange={(e) => setNewSpecialtyName(e.target.value)}
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
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
  textarea: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[80px]`,
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
