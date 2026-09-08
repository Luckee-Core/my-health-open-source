'use client';

import type { Doctor } from '@/model';
import { CurrentDoctorActions } from '@/store/current';
import { useAppDispatch } from '@/store';

type Props = {
  row: Doctor;
  busy: boolean;
  hospitalName: string;
  specialtyName: string;
  appointmentCount: number;
  onDelete: (doctor: Doctor) => void;
};

export const DoctorRow = ({
  row,
  busy,
  hospitalName,
  specialtyName,
  appointmentCount,
  onDelete,
}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <tr className={styles.row}>
      <td className={styles.td}>{row.name}</td>
      <td className={styles.td}>{hospitalName}</td>
      <td className={styles.td}>{specialtyName}</td>
      <td className={styles.tdRight}>{appointmentCount}</td>
      <td className={styles.tdActions}>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.linkButton}
            onClick={() => dispatch(CurrentDoctorActions.setCurrentDoctor(row))}
            disabled={busy}
          >
            Edit
          </button>
          <button
            type="button"
            className={styles.dangerButton}
            onClick={() => onDelete(row)}
            disabled={busy}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

const styles = {
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdRight: `px-4 py-2 text-right align-top`,
  tdActions: `px-4 py-2 text-right align-top`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
} as const;
