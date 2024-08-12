import { UserRole } from "..";

export interface UserData {
  id: string;
  email: string;
  role: UserRole;
  accessToken?: string;
  refreshToken?: string;
};
