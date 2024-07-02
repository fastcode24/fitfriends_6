import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, Length } from "class-validator";
import { Expose } from "class-transformer";
import { BaseUserDto } from ".";
import { UserAwardsLength } from "src/app.const";
import { DtoValidationMessage } from "src/libs/messages";

export class CoachDto extends BaseUserDto {
  @ApiPropertyOptional({
    description: 'Сертификаты тренера',
    example: 'certificate.pdf',
  })
  @IsOptional()
  @IsString()
  @Expose()
  public certificate?: string;

  @ApiPropertyOptional({
    description: 'Список достижений',
    example: 'Мой список достижений',
  })
  @IsOptional()
  @IsString()
  @Length(UserAwardsLength.Min, UserAwardsLength.Max, {
    message: DtoValidationMessage.awards.length,
  })
  @Expose()
  public avards?: string;
}
