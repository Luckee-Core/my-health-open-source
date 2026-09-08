export type FeedFormula = {
  id: string;
  brand: string;
  name: string;
  calories_per_1000_ml: number;
  container_volume_ml: number;
  volume_fl_oz: number | null;
  volume_qt: number | null;
  volume_l: number | null;
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export const EMPTY_FEED_FORMULA: FeedFormula = {
  id: '',
  brand: '',
  name: '',
  calories_per_1000_ml: 1500,
  container_volume_ml: 1000,
  volume_fl_oz: 33.8,
  volume_qt: 1,
  volume_l: 1,
  is_active: true,
  notes: null,
  created_at: '',
  updated_at: '',
};
