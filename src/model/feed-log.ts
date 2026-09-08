export type FeedLog = {
  id: string;
  log_date: string;
  formula_id: string;
  intermittent_rate_ml_per_hr: number;
  feed_left_ml: number;
  total_fed_ml: number;
  pump_reset: boolean;
  is_start: boolean;
  calories_per_1000_ml: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_FEED_LOG: FeedLog = {
  id: '',
  log_date: '',
  formula_id: '',
  intermittent_rate_ml_per_hr: 50,
  feed_left_ml: 0,
  total_fed_ml: 0,
  pump_reset: false,
  is_start: false,
  calories_per_1000_ml: 1500,
  notes: null,
  created_at: '',
  updated_at: '',
};
