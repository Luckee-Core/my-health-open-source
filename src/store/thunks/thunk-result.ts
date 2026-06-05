import type { ThunkStatus } from '@/api/types';

export type ThunkResult =
  | { status: 200; message?: string }
  | { status: Exclude<ThunkStatus, 200>; message: string };
