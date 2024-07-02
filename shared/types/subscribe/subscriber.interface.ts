import { Notice } from "..";

export interface Subscriber {
  id?: string;
  createdAt?: Date;
  userId: string;
  coaches: string[];
  notices: Notice[];
}
