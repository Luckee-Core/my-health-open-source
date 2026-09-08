'use client';

import { useMemo } from 'react';
import { CurrentFeedLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const FormulaInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentFeedLog);
  const formulasDump = useAppSelector((state) => state.feedFormulas);

  const options = useMemo(() => {
    const rows = Object.values(formulasDump);
    const sorted = [...rows].sort((a, b) => {
      const brand = a.brand.localeCompare(b.brand);
      if (brand !== 0) return brand;
      return a.name.localeCompare(b.name);
    });
    return sorted.filter((row) => row.is_active || row.id === current.formula_id);
  }, [formulasDump, current.formula_id]);

  return (
    <label className={styles.label}>
      Formula
      <select
        className={styles.input}
        value={current.formula_id}
        onChange={(e) =>
          dispatch(CurrentFeedLogActions.patchCurrentFeedLog({ formula_id: e.target.value }))
        }
      >
        {options.map((formula) => (
          <option key={formula.id} value={formula.id}>
            {formula.brand} {formula.name}
          </option>
        ))}
      </select>
    </label>
  );
};

const styles = {
  label: `block text-sm text-gray-700 space-y-1`,
  input: `w-full rounded-md border border-gray-300 px-3 py-2 text-sm`,
} as const;
