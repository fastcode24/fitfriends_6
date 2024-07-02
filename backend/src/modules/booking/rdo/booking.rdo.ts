import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BookingStatus } from "src/libs/types";

export class BookingRdo {
  @ApiProperty({
    description: 'ID заявки на тренировку',
    example: '002703b8-7ec1-4e94-b17d-1b9699149b85',
  })
  @Expose()
  public id?: string;

  @ApiProperty({
    description: 'Статус заявки на тренировку',
    example: 'На рассмотрении',
  })
  @Expose()
  public status: BookingStatus;
}
