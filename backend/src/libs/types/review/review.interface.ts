import { Grade } from "..";

export interface Review {
  id?: string;
  createdAt?: Date;
  userId?: string;
  trainingId: string;
  grade: Grade;
  text: string;
};

export interface FullReview extends Review {
  userName?: string;
  userAvatar?: string;
}
