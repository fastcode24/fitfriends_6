import { Gender, Level, Metro, TrainingType, UserRole } from "..";

export interface BaseUser {
  id?: string;
  createdAt: Date;
  email: string;
  name: string;
  avatar?: string;
  gender: Gender;
  birthday?: Date;
  role: UserRole;
  description?: string;
  metro: Metro;
  background: string;
  level: Level;
  trainingType: TrainingType[];
  friends: string[];
  subscribers?: string[];
  isReady: boolean;
};
