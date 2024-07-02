import { BaseUser, TrainingTime } from "..";

export interface FullUser extends CoachUser, CustomerUser {
  passwordHash?: string;
}

export interface AuthUser extends CoachUser, CustomerUser {
  passwordHash: string;
}

export interface CustomerUser extends BaseUser {
  trainingTime?: TrainingTime;
  calories?: number;
  caloriesPerDay?: number;
};

export interface CoachUser extends BaseUser {
  certificate?: string;
  awards?: string;
};
