import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Gender, Level, TrainingTime, TrainingType } from 'src/libs/types';
import { DtoValidationMessage } from 'src/libs/messages';

export class CreateReviewDto {
  @ApiPropertyOptional({
    description: 'ID тренировки',
    example: '02ef1619-0823-4c95-a66a-84c6cd0abbb4',
  })
  @IsString()
  @Expose()
  public trainingId: string;

  @ApiPropertyOptional({
    description: 'Оценка тренировки: 1, 2, 3, 4 или 5',
    example: 5,
  })
  @IsNumber()
  @Expose()
  public grade?: number;

  @ApiPropertyOptional({
    description: 'Текст отзыва',
    example: 'Прекрасная тренировка на пляже средиземноморья, очень понравилось!',
  })
  @IsString()
  @Expose()
  public text?: string;
}
