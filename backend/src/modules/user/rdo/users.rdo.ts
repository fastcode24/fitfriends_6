import { Expose } from 'class-transformer';
import { BasePaginationRdo } from 'src/libs/rdo';
import { FullUserRdo } from './full-user.rdo';

export class UsersRdo extends BasePaginationRdo {
  @Expose()
  public users: FullUserRdo[];
}
