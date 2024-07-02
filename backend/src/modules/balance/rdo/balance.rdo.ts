import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { TrainingRdo } from "src/modules/training/rdo";

export class BalanceRdo {
  @ApiProperty({
    description: 'Количество доступных тренировок',
    example: '2',
  })
  @Expose()
  public count: number;

  @ApiProperty({
    description: 'Тренировка',
    type: TrainingRdo,
  })
  @Type(() => TrainingRdo)
  @Expose()
  public training: TrainingRdo;
}
