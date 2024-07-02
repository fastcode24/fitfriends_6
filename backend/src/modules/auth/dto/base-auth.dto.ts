import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsOptional, IsString, Length } from "class-validator";
import { MAX_TRAINING_TYPES, UserDescriptionLength, UserNameLength, UserPasswordLength } from "src/app.const";
import { DtoValidationMessage } from "src/libs/messages";
import { Gender, Level, Metro, TrainingType, UserRole } from "src/libs/types";

export class BaseAuthDto {
  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@user.local',
  })
  @IsEmail({}, { message: DtoValidationMessage.email.invalidFormat })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @IsString()
  @Length(UserNameLength.Min, UserNameLength.Max, {
    message: DtoValidationMessage.name.length,
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Описание пользователя',
    example: 'Описание пользователя текстом',
  })
  @IsString()
  @Length(UserDescriptionLength.Min, UserDescriptionLength.Max, {
    message: DtoValidationMessage.userDescription.length,
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '123456',
  })
  @IsString()
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: DtoValidationMessage.password.length,
  })
  @Expose()
  public password: string;

  @ApiProperty({
    description: 'Пол пользователя',
    example: 'мужской',
  })
  @IsEnum(Gender, { message: DtoValidationMessage.gender.invalidFormat })
  @Expose()
  public gender: Gender;

  @ApiPropertyOptional({
    description: 'День рождения пользователя',
    example: '1981-03-12',
  })
  @IsISO8601()
  @IsOptional()
  @Expose()
  public birthday?: Date;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'пользователь',
  })
  @IsEnum(UserRole, { message: DtoValidationMessage.role.invalidFormat })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'Станция метро пользователя',
    example: 'Пионерская',
  })
  @IsEnum(Metro, {
    message: DtoValidationMessage.metro.invalidFormat,
  })
  @Expose()
  public metro: Metro;

  @ApiPropertyOptional({
    description: 'Аватар пользователя',
    example: 'avatar.png',
  })
  @IsString()
  @IsOptional()
  @Expose()
  public avatar?: string;

  @ApiPropertyOptional({
    description: 'Фоновая картинка для профиля пользователя',
    example: 'background-image.png',
  })
  @IsString()
  @IsOptional()
  @Expose()
  public background?: string;

  @ApiProperty({
    description: 'Уровень подготовки пользователя',
    example: 'новичок',
  })
  @IsEnum(Level, { message: DtoValidationMessage.level.invalidFormat })
  @Expose()
  public level: Level;

  @ApiProperty({
    description: 'Типы тренировок',
    example: ['йога', 'бег'],
  })
  @IsArray()
  @ArrayMaxSize(MAX_TRAINING_TYPES, {
    message: DtoValidationMessage.trainingType.length,
  })
  @IsEnum(TrainingType, {
    each: true,
    message: DtoValidationMessage.trainingType.invalidItems,
  })
  @Expose()
  public trainingType: TrainingType[];

  @ApiProperty({
    description: 'Готовность к тренировке?',
    example: 'true',
  })
  @IsBoolean()
  @Expose()
  public isReady: boolean;
}
