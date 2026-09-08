'use client';

import { DoctorsBuilderActions } from '@/store/builders';
import { CurrentDoctorActions } from '@/store/current';
import { saveDoctorThunk } from '@/store/thunks';
import { useAppDispatch, useAppSelector } from '@/store';
import { FaxInput } from './inputs/fax';
import { HospitalInput } from './inputs/hospital';
import { NameInput } from './inputs/name';
import { NewHospitalNameInput } from './inputs/new-hospital-name';
import { NewSpecialtyNameInput } from './inputs/new-specialty-name';
import { NotesInput } from './inputs/notes';
import { NpiInput } from './inputs/npi';
import { PhoneInput } from './inputs/phone';
import { SpecialtyInput } from './inputs/specialty';

export const DoctorFormModal = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentDoctor);
  const builder = useAppSelector((state) => state.doctorsBuilder);
  const isEdit = current.id !== '';
  const isOpen = builder.isCreateOpen || isEdit;
  const isSaving = builder.saveStatus === 'saving';

  if (!isOpen) return null;

  const closeModal = () => {
    dispatch(DoctorsBuilderActions.closeModal());
    dispatch(CurrentDoctorActions.resetCurrentDoctor());
  };

  const handleSubmit = async () => {
    const status = await dispatch(saveDoctorThunk());
    if (status === 200) closeModal();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        <h2 className={styles.heading}>{isEdit ? 'Edit doctor' : 'New doctor'}</h2>
        <div className={styles.fields}>
          <NameInput />
          <HospitalInput />
          <NewHospitalNameInput />
          <SpecialtyInput />
          <NewSpecialtyNameInput />
          <NpiInput />
          <PhoneInput />
          <FaxInput />
          <NotesInput />
          {builder.saveError && <p className={styles.error}>{builder.saveError}</p>}
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={closeModal} className={styles.cancelButton}>
            Cancel
          </button>
          <button
            type="button"
            disabled={isSaving}
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
  error: `text-sm text-red-600`,
  actions: `mt-5 flex justify-end gap-2`,
  cancelButton: `rounded-md px-3 py-1.5 text-sm text-gray-700`,
  saveButton: `rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white disabled:opacity-50`,
} as const;
