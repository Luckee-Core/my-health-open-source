'use client';

import { useState } from 'react';
import type { Hospital } from '@/model';
import { createHospitalThunk, updateHospitalThunk } from '@/store/thunks';
import { useAppDispatch } from '@/store';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  hospital?: Hospital | null;
};

export const HospitalFormModal = ({ isOpen, onClose, hospital }: Props) => {
  if (!isOpen) return null;

  return (
    <HospitalFormModalBody
      key={hospital?.id ?? 'new'}
      onClose={onClose}
      hospital={hospital}
    />
  );
};

type BodyProps = {
  onClose: () => void;
  hospital?: Hospital | null;
};

const HospitalFormModalBody = ({ onClose, hospital }: BodyProps) => {
  const dispatch = useAppDispatch();
  const isEdit = hospital != null;
  const [name, setName] = useState(hospital?.name ?? '');
  const [address, setAddress] = useState(hospital?.address ?? '');
  const [email, setEmail] = useState(hospital?.email ?? '');
  const [phone, setPhone] = useState(hospital?.phone ?? '');
  const [notes, setNotes] = useState(hospital?.notes ?? '');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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
      address: address.trim() || null,
      email: email.trim() || null,
      phone: phone.trim() || null,
      notes: notes.trim() || null,
    };
    const httpStatus = isEdit
      ? await dispatch(updateHospitalThunk(hospital.id, payload))
      : await dispatch(createHospitalThunk(payload));
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
        <h2 className={styles.heading}>{isEdit ? 'Edit facility' : 'New facility'}</h2>
        <div className={styles.fields}>
          <input
            type="text"
            placeholder="Facility name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className={styles.input}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            className={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
