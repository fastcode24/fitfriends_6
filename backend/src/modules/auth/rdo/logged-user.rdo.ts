import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'ID пользователя',
    example: '002703b8-7ec1-4e94-b17d-1b9699149b85',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Почта пользователя',
    example: 'user@user.local',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'пользователь',
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'Access токен',
  })
  @Expose()
  public accessToken?: string;

  @ApiProperty({
    description: 'Refresh токен',
  })
  @Expose()
  public refreshToken?: string;
}
