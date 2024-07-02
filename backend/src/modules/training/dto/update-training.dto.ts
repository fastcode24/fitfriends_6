import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Gender, Level, TrainingTime, TrainingType } from 'src/libs/types';
import { DtoValidationMessage } from 'src/libs/messages';

export class UpdateTrainingDto {
  @ApiPropertyOptional({
    description: 'Название тренировки',
    example: 'Отдых на пляже',
  })
  @IsOptional()
  @IsString()
  @Expose()
  public title?: string;

  @ApiPropertyOptional({
    description: 'Фоновое изображение',
    example: 'background.jpg',
  })
  @IsOptional()
  @IsString()
  @Expose()
  public background?: string;

  @ApiPropertyOptional({
    description: 'Уровень пользователя',
    example: 'новичок',
  })
  @IsOptional()
  @IsEnum(Level, { message: DtoValidationMessage.level.invalidFormat })
  @Expose()
  public level?: Level;

  @ApiPropertyOptional({
    description: 'Тип тренировки',
    example: 'кроссфит',
  })
  @IsOptional()
  @IsEnum(TrainingType, { message: DtoValidationMessage.trainingType.invalidItems })
  @Expose()
  public trainingType?: TrainingType;

  @ApiPropertyOptional({
    description: 'Длительность тренировки',
    example: '50-80 мин',
  })
  @IsOptional()
  @IsEnum(TrainingTime, { message: DtoValidationMessage.trainingTime.invalidFormat })
  @Expose()
  public trainingTime?: TrainingTime;

  @ApiPropertyOptional({
    description: 'Стоимость тренировки',
    example: 1000,
  })
  @IsOptional()
  @IsNumber()
  @Expose()
  public price?: number;

  @ApiPropertyOptional({
    description: 'Калорий на тренировку',
    example: 500,
  })
  @IsOptional()
  @IsNumber()
  @Expose()
  public calories?: number;

  @ApiPropertyOptional({
    description: 'Описание тренировки',
    example: 'Прекрасная тренировка на пляже средиземноморья',
  })
  @IsOptional()
  @IsString()
  @Expose()
  public description?: string;

  @ApiPropertyOptional({
    description: 'Пол пользователя',
    example: 'мужской',
  })
  @IsOptional()
  @IsEnum(Gender, { message: DtoValidationMessage.gender.invalidFormat })
  @Expose()
  public gender?: Gender;

  @ApiPropertyOptional({
    description: 'Видео тренировки',
    example: 'video.mp4',
  })
  @IsOptional()
  @IsString()
  @Expose()
  public video?: string;

  @ApiPropertyOptional({
    description: 'Флаг спецпредложения',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  @Expose()
  public isFeatured?: boolean;
}
