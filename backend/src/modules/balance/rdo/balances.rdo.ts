import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BalanceRdo } from "./balance.rdo";
import { BasePaginationRdo } from "src/libs/rdo";

export class BalancesRdo extends BasePaginationRdo {
  @ApiProperty({
    description: 'Баланс всех тренировок',
    type: [BalanceRdo],
  })
  @Expose()
  public balances: BalanceRdo[];
}
