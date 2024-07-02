import { IsBoolean, IsEnum, IsIn, IsNumber, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { Gender, Level, SortType, TrainingTime, TrainingType } from 'src/libs//types';
import { BaseQuery } from 'src/libs/query';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class TrainingQuery extends BaseQuery {
  @ApiPropertyOptional({ description: 'Тип сортировки', enum: SortType })
  @Transform(({ value }) => value)
  @IsEnum(SortType)
  @IsOptional()
  public sortType?: SortType;

  @ApiPropertyOptional({ description: 'Цена от', type: Number  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Целое положительное число' })
  public priceFrom?: number;

  @ApiPropertyOptional({ description: 'Цена до', type: Number  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Целое положительное число' })
  public priceTo?: number;

  @ApiPropertyOptional({ description: 'Калорий от', type: Number  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Целое положительное число' })
  public caloriesFrom?: number;

  @ApiPropertyOptional({ description: 'Калорий до', type: Number  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Целое положительное число' })
  public caloriesTo?: number;

  @ApiPropertyOptional({ description: 'Рейтинг (целое число от 0 до 5)', type: Number  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Целое число от 0 до 5' })
  @Max(5, { message: 'Целое число от 0 до 5' })
  public ratingFrom?: number;

  @ApiPropertyOptional({ description: 'Рейтинг (целое число от 0 до 5)', type: Number  })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Целое число от 0 до 5' })
  @Max(5, { message: 'Целое число от 0 до 5' })
  public ratingTo?: number;

  @ApiPropertyOptional({ description: 'Длительность тренировок', enum: TrainingTime, isArray: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      value = [value];
    }
    return value;
  })
  @IsIn(Object.values(TrainingTime), { each: true })
  @IsOptional()
  public trainingTime?: TrainingTime[];

  @ApiPropertyOptional({ description: 'Типы тренировок', enum: TrainingType, isArray: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      value = [value];
    }
    return value;
  })
  @IsIn(Object.values(TrainingType), { each: true })
  @IsOptional()
  public trainingType?: TrainingType[];

  @ApiPropertyOptional({ description: 'Исключить пол', enum: Gender })
  @Transform(({ value }) => value)
  @IsEnum(Gender)
  @IsOptional()
  public genderExclude?: Gender;

  @ApiPropertyOptional({ description: 'Уровень', enum: Level })
  @Transform(({ value }) => value)
  @IsEnum(Level)
  @IsOptional()
  public level?: Level;

  @ApiPropertyOptional({ description: 'Тренировки со скидкой', type: Boolean  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  public isFeatured?: boolean;

  @ApiPropertyOptional({ description: 'Id тренера', type: String  })
  @IsUUID()
  @IsOptional()
  public coachId?: string;
}
