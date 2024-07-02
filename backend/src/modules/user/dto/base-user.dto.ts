import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsISO8601, IsString, Length, IsEnum, IsArray, ArrayMaxSize, IsBoolean } from "class-validator";
import { MAX_TRAINING_TYPES, UserDescriptionLength, UserNameLength } from 'src/app.const';
import { DtoValidationMessage } from 'src/libs/messages';
import { Gender, Level, Metro, TrainingType } from "src/libs/types";

export class BaseUserDto {
  @ApiPropertyOptional({
    description: 'Аватар пользователя',
    example: 'image.jpg',
  })
  @IsOptional()
  @Expose()
  public avatar?: string;

  @ApiPropertyOptional({
    description: 'Фоновое изображение профиля пользователя',
    example: 'background.jpg',
  })
  @IsOptional()
  @Expose()
  public background?: string;

  @ApiPropertyOptional({
    description: 'День рождения пользователя',
    example: '1981-03-12',
  })
  @IsOptional()
  @IsISO8601()
  @Expose()
  public birthday?: Date;

  @ApiPropertyOptional({
    description: 'Имя пользователя',
    example: 'John',
  })
  @IsOptional()
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: DtoValidationMessage.name.length,
  })
  @Expose()
  public name?: string;

  @ApiPropertyOptional({
    description: 'Пол пользователя',
    example: 'мужской',
  })
  @IsOptional()
  @IsEnum(Gender, { message: DtoValidationMessage.gender.invalidFormat })
  @Expose()
  public gender?: Gender;

  @ApiPropertyOptional({
    description: 'Описание пользователя',
    example: 'Описание пользователя текстом',
  })
  @IsOptional()
  @IsString()
  @Length(UserDescriptionLength.Min, UserDescriptionLength.Max, {
    message: DtoValidationMessage.userDescription.length,
  })
  @Expose()
  public description?: string;

  @ApiPropertyOptional({
    description: 'Станция метро пользователя',
    example: 'Пионерская',
  })
  @IsOptional()
  @IsEnum(Metro, {
    message: DtoValidationMessage.metro.invalidFormat,
  })
  @Expose()
  public metro?: Metro;

  @ApiPropertyOptional({
    description: 'Уровень пользователя',
    example: 'новичок',
  })
  @IsOptional()
  @IsEnum(Level, { message: DtoValidationMessage.level.invalidFormat })
  @Expose()
  public level?: Level;

  @ApiPropertyOptional({
    description: 'Типы тренировок',
    example: ['йога', 'бег'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(MAX_TRAINING_TYPES, {
    message: DtoValidationMessage.trainingType.length,
  })
  @IsEnum(TrainingType, {
    each: true,
    message: DtoValidationMessage.trainingType.invalidItems,
  })
  @Expose()
  public trainingType?: TrainingType[];

  @ApiPropertyOptional({
    description: 'Готовность к тренировке?',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  @Expose()
  public isReady?: boolean;
}
