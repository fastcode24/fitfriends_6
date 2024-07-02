import { Training } from "..";

export interface Balance {
  id?: string;
  userId: string;
  trainingId: string;
  count: number;
}

export interface SingleBalance {
  count: number,
  training: Training;
}

export interface Balances {
  totalPages: number,
  totalItems: number,
  currentPage: number,
  itemsPerPage: number,
  balances: SingleBalance[];
}
