import { UserRole } from 'src/libs/types';
import { CustomerDto, CoachDto } from '.';

export const UpdateUserDto = {
  [UserRole.Customer]: CustomerDto,
  [UserRole.Coach]: CoachDto,
};

export type UpdateUserDtoType = typeof UpdateUserDto;
