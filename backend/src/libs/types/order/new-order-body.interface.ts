import { OrderType, PaymentType } from "..";

export interface NewOrderBody {
  orderType: OrderType;
  trainingId: string;
  quantity: number;
  paymentType: PaymentType;
};
