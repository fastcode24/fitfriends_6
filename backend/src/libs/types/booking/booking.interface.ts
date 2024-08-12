import { BookingStatus } from "..";

export interface Booking {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  senderId: string;
  recipientId: string;
  status: BookingStatus;
};
