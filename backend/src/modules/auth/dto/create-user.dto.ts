import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsEnum, IsISO8601, IsOptional, IsString, Length } from "class-validator";
import { UserNameLength, UserPasswordLength } from "src/app.const";
import { DtoValidationMessage } from "src/libs/messages";
import { Gender, Metro, UserRole } from "src/libs/types";

export class CreateUserDto {
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
    description: 'Email пользователя',
    example: 'user@user.local',
  })
  @IsEmail({}, { message: DtoValidationMessage.email.invalidFormat })
  @Expose()
  public email: string;

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

  @ApiPropertyOptional({
    description: 'Аватар пользователя',
    example: 'avatar.png',
  })
  @IsString()
  @IsOptional()
  @Expose()
  public avatar?: string;

  @ApiPropertyOptional({
    description: 'День рождения пользователя',
    example: '1981-03-12',
  })
  @IsISO8601()
  @IsOptional()
  @Expose()
  public birthday?: Date;

  @ApiProperty({
    description: 'Пол пользователя',
    example: 'мужской',
  })
  @IsEnum(Gender, { message: DtoValidationMessage.gender.invalidFormat })
  @Expose()
  public gender: Gender;

  @ApiProperty({
    description: 'Станция метро пользователя',
    example: 'Пионерская',
  })
  @IsEnum(Metro, {
    message: DtoValidationMessage.metro.invalidFormat,
  })
  @Expose()
  public metro: Metro;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'пользователь',
  })
  @IsEnum(UserRole, { message: DtoValidationMessage.role.invalidFormat })
  @Expose()
  public role: UserRole;
}
