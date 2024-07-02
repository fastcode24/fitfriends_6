import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { OrderRdo } from "./order.rdo";
import { BasePaginationRdo } from "src/libs/rdo";

export class OrdersRdo extends BasePaginationRdo {
  @ApiProperty({
    description: 'Список заказов',
    type: [OrderRdo],
  })
  @Expose()
  public orders: OrderRdo[];
}
