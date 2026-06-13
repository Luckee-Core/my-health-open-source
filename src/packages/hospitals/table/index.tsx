'use client';

import { useMemo, useState } from 'react';
import type { Hospital } from '@/model';
import { deleteHospitalThunk } from '@/store/thunks';
import { CurrentHospitalActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const HospitalsTable = () => {
  const dispatch = useAppDispatch();
  const hospitalsDump = useAppSelector((state) => state.hospitals);
  const doctorsDump = useAppSelector((state) => state.doctors);

  const hospitals = useMemo(() => Object.values(hospitalsDump), [hospitalsDump]);
  const doctors = useMemo(() => Object.values(doctorsDump), [doctorsDump]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const doctorCountByHospitalId = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const doctor of doctors) {
      counts[doctor.hospital_id] = (counts[doctor.hospital_id] ?? 0) + 1;
    }
    return counts;
  }, [doctors]);

  const sorted = useMemo(
    () => [...hospitals].sort((a, b) => a.name.localeCompare(b.name)),
    [hospitals],
  );

  const handleDelete = async (hospital: Hospital) => {
    const count = doctorCountByHospitalId[hospital.id] ?? 0;
    const warning =
      count > 0
        ? `Delete "${hospital.name}"? ${count} doctor${count === 1 ? '' : 's'} are linked to this facility.`
        : `Delete facility "${hospital.name}"?`;
    if (!window.confirm(warning)) return;

    setActionError(null);
    setBusyId(hospital.id);
    const status = await dispatch(deleteHospitalThunk(hospital.id));
    setBusyId(null);
    if (status !== 200) {
      setActionError('Failed to delete');
    }
  };

  return (
    <div className={styles.wrapper}>
      {actionError && <p className={styles.error}>{actionError}</p>}
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Address</th>
            <th className={styles.th}>Phone</th>
            <th className={styles.th}>Email</th>
            <th className={styles.thRight}>Doctors</th>
            <th className={styles.thActions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={styles.row}>
              <td className={styles.td}>{row.name}</td>
              <td className={styles.td}>{row.address ?? '—'}</td>
              <td className={styles.td}>{row.phone ?? '—'}</td>
              <td className={styles.td}>{row.email ?? '—'}</td>
              <td className={styles.tdRight}>{doctorCountByHospitalId[row.id] ?? 0}</td>
              <td className={styles.tdActions}>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.linkButton}
                    onClick={() => dispatch(CurrentHospitalActions.setCurrentHospital(row))}
                    disabled={busyId === row.id}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className={styles.dangerButton}
                    onClick={() => void handleDelete(row)}
                    disabled={busyId === row.id}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={6} className={styles.empty}>
                No facilities yet. Add one to link doctors.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  wrapper: `space-y-2`,
  error: `text-sm text-red-600`,
  table: `min-w-full overflow-x-auto rounded-lg border border-gray-200 bg-white text-sm`,
  thead: `bg-gray-50 text-left text-gray-600`,
  th: `px-4 py-2 font-medium`,
  thRight: `px-4 py-2 font-medium text-right`,
  thActions: `px-4 py-2 font-medium text-right`,
  row: `border-t border-gray-100`,
  td: `px-4 py-2 align-top`,
  tdRight: `px-4 py-2 text-right align-top`,
  tdActions: `px-4 py-2 text-right align-top`,
  actions: `flex justify-end gap-2`,
  linkButton: `text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50`,
  dangerButton: `text-sm text-red-600 hover:text-red-800 disabled:opacity-50`,
  empty: `px-4 py-8 text-center text-gray-500`,
} as const;
