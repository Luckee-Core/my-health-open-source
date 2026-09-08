'use client';

import { useMemo } from 'react';
import { useAppSelector } from '@/store';
import { computeExchangeCostCents } from '@/utils/number';

export type AiCostDisplayRow = {
  id: string;
  logicalKey: string;
  createdAt: string;
  inputTokens: number;
  outputTokens: number;
  modelUsed: string;
  costCents: number;
  label: string;
};

const isWithinDays = (iso: string, days: number): boolean => {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
  return new Date(iso).getTime() >= cutoff;
};

/**
 * Builds AI cost table rows from completed therapy import exchanges.
 */
export const useAiCostsTableRows = (days: number): AiCostDisplayRow[] => {
  const llmModels = useAppSelector((state) => state.llmModels);
  const exchanges = useAppSelector((state) => state.therapyExerciseImportAiExchanges);

  return useMemo(() => {
    const rows: AiCostDisplayRow[] = [];

    for (const ex of Object.values(exchanges)) {
      if (
        ex.status !== 'completed' ||
        ex.input_tokens == null ||
        ex.output_tokens == null ||
        !isWithinDays(ex.created_at, days)
      ) {
        continue;
      }
      rows.push({
        id: ex.id,
        logicalKey: 'therapy_exercise_import',
        createdAt: ex.created_at,
        inputTokens: ex.input_tokens,
        outputTokens: ex.output_tokens,
        modelUsed: ex.model_used ?? '',
        costCents: computeExchangeCostCents(
          ex.input_tokens,
          ex.output_tokens,
          ex.model_used,
          llmModels,
        ),
        label: ex.import_id ? `Import ${ex.import_id.slice(0, 8)}` : 'Speech therapy import',
      });
    }

    return rows.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [exchanges, llmModels, days]);
};
