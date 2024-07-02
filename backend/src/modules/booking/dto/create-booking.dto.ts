import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsUUID } from "class-validator";

export class CreateBookingDto {
  @ApiProperty({
    description: 'Заявка на тренировку к пользователю',
    example: '002703b8-7ec1-4e94-b17d-1b9699149b85',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsUUID()
  public recipientId: string;
}
