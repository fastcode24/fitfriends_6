import { IsArray, IsBoolean, IsEnum, IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import * as lodash from 'lodash';
import { Metro, Level, UserRole, TrainingType } from 'src/libs//types';
import { BaseQuery } from 'src/libs/query';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UsersQuery extends BaseQuery {
  @ApiPropertyOptional({ description: 'Типы тренировок', enum: TrainingType, isArray: true })
  @Transform(({ value }) => {
    const locations = typeof value === 'string' ? [value] : value;
    return locations.map((item: string) => lodash.lowerCase(item));
  })
  @IsIn(Object.values(TrainingType), { each: true })
  @IsOptional()
  public trainingType?: TrainingType[];

  @ApiPropertyOptional({ description: 'Станции метро', enum: Metro, enumName: 'Metro', isArray: true })
  @Transform(({ value }) => {
    const locations = typeof value === 'string' ? [value] : value;
    return locations.map((item: string) => lodash.capitalize(item));
  })
  @IsArray()
  @IsIn(Object.values(Metro), { each: true })
  @IsOptional()
  public metro?: Metro[];

  @ApiPropertyOptional({ description: 'Уровень подготовки', enum: Level, enumName: 'Level' })
  @Transform(({ value }) => lodash.lowerCase(value))
  @IsEnum(Level)
  @IsOptional()
  public level?: Level;

  @ApiPropertyOptional({ description: 'Роль пользователя', enum: UserRole, enumName: 'UserRole' })
  @Transform(({ value }) => lodash.lowerCase(value))
  @IsEnum(UserRole)
  @IsOptional()
  public role?: UserRole;

  @ApiPropertyOptional({ description: 'Готов к тренировке', type: Boolean  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  public isReady?: boolean;
}
