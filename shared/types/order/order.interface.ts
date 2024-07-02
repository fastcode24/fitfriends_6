import { OrderType, PaymentType } from "..";

export interface Order {
  id?: string;
  createdAt?: Date;
  userId: string;
  coachId: string;
  orderType: OrderType;
  trainingId: string;
  price: number;
  quantity: number;
  cost: number;
  paymentType: PaymentType;
};
