import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";
import { DtoValidationMessage } from "src/libs/messages";
import { UserPasswordLength } from "src/app.const";

export class LoginUserDto {
  @ApiProperty({
    description: 'Уникальный email пользователя',
    example: 'customer@fitfriends.local',
  })
  @IsEmail({}, { message: DtoValidationMessage.email.invalidFormat })
  public email: string;

  @ApiProperty({
    description: 'Пароль',
    example: '123456',
  })
  @IsString()
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, {
    message: DtoValidationMessage.password.length,
  })
  public password: string;
}
