'use client';

import { SymptomLogsBuilderActions } from '@/store/builders';
import { CurrentSymptomLogActions } from '@/store/current';
import { useAppDispatch, useAppSelector } from '@/store';

export const SeverityInput = () => {
  const dispatch = useAppDispatch();
  const current = useAppSelector((state) => state.currentSymptomLog);
  const builder = useAppSelector((state) => state.symptomLogsBuilder);
  const severity = current.severity ?? 5;

  return (
    <div className={styles.wrap}>
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={builder.hasSeverity}
          onChange={(e) => {
            const next = e.target.checked;
            dispatch(SymptomLogsBuilderActions.setHasSeverity(next));
            if (next && current.severity == null) {
              dispatch(CurrentSymptomLogActions.patchCurrentSymptomLog({ severity: 5 }));
            }
          }}
        />
        Rate severity (1–10)
      </label>
      {builder.hasSeverity && (
        <div className={styles.severityRow}>
          <input
            type="range"
            min={1}
            max={10}
            value={severity}
            onChange={(e) =>
              dispatch(
                CurrentSymptomLogActions.patchCurrentSymptomLog({
                  severity: Number(e.target.value),
                }),
              )
            }
            className={styles.range}
          />
          <span className={styles.severityValue}>{severity}</span>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrap: `space-y-2`,
  checkboxLabel: `flex items-center gap-2 text-sm text-gray-700`,
  severityRow: `flex items-center gap-3`,
  range: `flex-1`,
  severityValue: `text-sm font-medium text-gray-900 w-6 text-center`,
} as const;
