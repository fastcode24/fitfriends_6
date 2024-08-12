import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRdo } from 'src/modules/user/rdo';

export class AuthCoachRdo extends UserRdo {
  @ApiPropertyOptional({
    description: 'Сертификаты',
    example: 'Список сертификатов тренера',
  })
  @Expose()
  public certificates: string[];

  @ApiPropertyOptional({
    description: 'Список достижений',
    example: 'Список достижений тренера',
  })
  @Expose()
  public awards: string;
}
