import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class NotifyRdo {
  @ApiProperty({
    description: 'ID оповещения',
    example: '002703b8-7ec1-4e94-b17d-1b9699149b85',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Дата оповещения',
    example: '22.04.1983',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Текст оповещения',
    example: 'Арина приглашает Вас на совместную тренировку',
  })
  @Expose()
  public text: string;
}
