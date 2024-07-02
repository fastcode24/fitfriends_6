import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UpdateFriendsDto {
  @ApiPropertyOptional({
    description: 'ID друга',
    example: '1c5492b0-88dd-480a-8361-def741ae5105',
  })
  @Expose()
  friendId: string;
}
