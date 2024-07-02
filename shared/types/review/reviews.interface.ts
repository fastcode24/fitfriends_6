import { Review } from "..";

export interface Reviews{
  totalPages: number,
  totalItems: number,
  currentPage: number,
  itemsPerPage: number,
  reviews: Review[];
}
