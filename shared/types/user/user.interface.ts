import { BaseUser, TrainingTime, Gender, Metro, UserRole } from "..";

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

export interface CreateUser {
  name: string;
  email: string;
  password: string;
  avatar: string;
  birthday: string;
  metro: Metro;
  gender: Gender;
  role: UserRole;
};
