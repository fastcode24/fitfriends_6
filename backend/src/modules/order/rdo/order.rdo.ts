import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { TrainingRdo } from "src/modules/training/rdo";

export class OrderRdo {
  @ApiProperty({
    description: 'Тренировка',
    type: TrainingRdo,
  })
  @Type(() => TrainingRdo)
  @Expose()
  public training: TrainingRdo;

  @ApiProperty({
    description: 'Количество купленных тренировок данного вида',
    example: '4',
  })
  @Expose()
  public quantity: number;

  @ApiProperty({
    description: 'Общая сумма за купленные тренировки данного вида',
    example: '4000',
  })
  @Expose()
  public cost: number;
}
