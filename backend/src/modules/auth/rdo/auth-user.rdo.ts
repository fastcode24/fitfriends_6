import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { FullUserRdo } from 'src/modules/user/rdo';
import { TrainingTime } from 'src/libs/types';

export class AuthUserRdo extends FullUserRdo {
  @ApiPropertyOptional({
    description: 'Калорий к сбросу',
    example: '3200',
  })
  @Expose()
  public calories?: number;

  @ApiPropertyOptional({
    description: 'Калорий к сбросу в день',
    example: '1000',
  })
  @Expose()
  public caloriesPerDay?: number;

  @ApiPropertyOptional({
    description: 'Желательная длительность тренировки',
    example: '10-30 мин',
  })
  @Expose()
  public trainingTime?: TrainingTime;

  @ApiPropertyOptional({
    description: 'Список достижений',
    example: 'Мой список достижений',
  })
  @Expose()
  public awards?: string;
}
