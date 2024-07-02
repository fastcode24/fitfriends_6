import { CoachOrder } from "..";

export interface CoachOrders {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  orders: CoachOrder[];
}
