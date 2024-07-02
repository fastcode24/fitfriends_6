import { Body, Controller, Get, HttpStatus, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "src/libs/decorators";
import { UserRole } from "src/libs/types";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto";
import { OrderRdo } from "./rdo";
import { OrderQuery } from "./query";
import { RequestWithTokenPayload } from "src/libs/requests";
import { RoleGuard } from "src/libs/guards";

@ApiTags('Заказы')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({
    summary: 'Создать новый заказ'
  })
  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.CREATED,
    description: 'Новый заказ успешно создан',
  })
  @ApiBody({ type: CreateOrderDto })
  @Role(UserRole.Customer)
  @UseGuards(RoleGuard)
  @ApiBearerAuth('access-token')
  @Post()
  public async create(
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @Body() dto: CreateOrderDto
  ) {
    return this.orderService.create(tokenPayload.sub, dto);
  }

  @ApiOperation({
    summary: 'Получить список заказов тренера'
  })
  @ApiResponse({
    type: OrderRdo,
    status: HttpStatus.OK,
    description: 'Список заказов тренера',
  })
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @ApiBearerAuth('access-token')
  @Get()
  public async indexByCoach(
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @Query() query: OrderQuery
  ) {
    return this.orderService.find(tokenPayload.sub, query);
  }
}
