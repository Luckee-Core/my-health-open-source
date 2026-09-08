export const SPEECH_THERAPY_CONSUMPTION_TYPES = ['ice_cube'] as const;

export type SpeechTherapyConsumptionType =
  (typeof SPEECH_THERAPY_CONSUMPTION_TYPES)[number];

export type SpeechTherapyConsumption = {
  id: string;
  consumption_type: SpeechTherapyConsumptionType;
  log_date: string;
  quantity: number;
  created_at: string;
  updated_at: string;
};

export const ICE_CUBE_CONSUMPTION_TYPE: SpeechTherapyConsumptionType = 'ice_cube';

export const SPEECH_THERAPY_CONSUMPTION_TYPE_LABELS: Record<
  SpeechTherapyConsumptionType,
  string
> = {
  ice_cube: 'Ice cubes',
};

export const EMPTY_SPEECH_THERAPY_CONSUMPTION: SpeechTherapyConsumption = {
  id: '',
  consumption_type: ICE_CUBE_CONSUMPTION_TYPE,
  log_date: '',
  quantity: 0,
  created_at: '',
  updated_at: '',
};
