import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsString } from "class-validator";

export class MailNewSubscriptionDto {
  @ApiPropertyOptional({
    description: 'Почта пользователя',
    example: 'local@fitfriends.local',
  })
  @IsString()
  @Expose()
  public email: string;

  @ApiPropertyOptional({
    description: 'Имя пользователя',
    example: 'Алексей',
  })
  @IsString()
  @Expose()
  public userName: string;

  @ApiPropertyOptional({
    description: 'Имя тренера',
    example: 'Борис',
  })
  @IsString()
  @Expose()
  public coachName: string;
}
