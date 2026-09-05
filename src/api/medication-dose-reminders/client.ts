import { getApiClient } from '@/api/client';
import { fromCaughtError, fromExpressListBody } from '@/api/_shared/express-response';
import type { ApiResponse } from '@/api/types';
import type { MedicationDoseReminder } from '@/model';

type ListBody = { success: boolean; data?: MedicationDoseReminder[]; error?: string };

/**
 * Loads computed dose reminders for the dashboard.
 */
export const getMedicationDoseReminders = async (): Promise<
  ApiResponse<MedicationDoseReminder[]>
> => {
  try {
    const { data } = await getApiClient().get<ListBody>('/api/data/medication-dose-reminders');
    return fromExpressListBody(data, 'Failed to load medication reminders');
  } catch (error: unknown) {
    return fromCaughtError(error, 'Failed to load medication reminders');
  }
};
