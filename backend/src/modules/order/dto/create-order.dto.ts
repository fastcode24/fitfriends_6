import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsUUID, Max, Min } from "class-validator";
import { OrderQuantityValue } from "src/app.const";
import { DtoValidationMessage } from "src/libs/messages";
import { OrderType, PaymentType } from "src/libs/types";

export class CreateOrderDto {
  @ApiProperty({
    description: 'Вид покупки',
    example: 'абонемент',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(OrderType, { message: DtoValidationMessage.orderType.invalidFormat })
  public orderType: OrderType;

  @ApiProperty({
    description: 'Id тренировки',
    example: '02ef1619-0823-4c95-a66a-84c6cd0abbb4',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsUUID()
  public trainingId: string;

  @ApiProperty({
    description: 'Количество тренировок определенного вида',
    example: '2',
  })
  @IsInt()
  @Min(OrderQuantityValue.Min, { message: DtoValidationMessage.orderQuantity.value })
  @Max(OrderQuantityValue.Max, { message: DtoValidationMessage.orderQuantity.value })
  public quantity: number;

  @ApiProperty({
    description: 'Способ оплаты: visa, mir, umoney',
    example: 'umoney',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(PaymentType, {
    message: DtoValidationMessage.paymentType.invalidFormat,
  })
  public paymentType: PaymentType;
}
