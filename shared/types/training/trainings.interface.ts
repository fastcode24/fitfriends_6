import { Training } from "..";

export interface Trainings{
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  minPrice?: number;
  maxPrice?: number;
  minCalories?: number;
  maxCalories?: number;
  trainings: Training[];
}
