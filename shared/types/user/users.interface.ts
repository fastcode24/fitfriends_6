import { FullUser } from "..";

export interface Users{
  totalPages: number,
  totalItems: number,
  currentPage: number,
  itemsPerPage: number,
  users: FullUser[];
}
