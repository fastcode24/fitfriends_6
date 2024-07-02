import { UserEntity } from "src/modules/user/user.entity";

export interface RequestWithUser {
  user: UserEntity;
}
