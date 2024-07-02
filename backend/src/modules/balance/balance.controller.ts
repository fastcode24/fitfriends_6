import { Controller, Get, HttpStatus, Param, Patch, Query, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Role } from "src/libs/decorators";
import { UserRole } from "src/libs/types";
import { BalanceService } from "./balance.service";
import { UUIDValidationPipe } from "src/libs/pipes";
import { RequestWithTokenPayload } from "src/libs/requests";
import { RoleGuard } from "src/libs/guards";
import { BalanceRdo, BalancesRdoExample } from "./rdo";
import { BaseQuery } from "src/libs/query";
import { BalanceQuery } from "./balance.query";

@ApiTags('Баланс пользователя')
@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @ApiOperation({
    summary: 'Получить баланс пользователя по всем тренировкам'
  })
  @ApiResponse({
    schema: {
      example: BalancesRdoExample
    },
    status: HttpStatus.OK,
    description: 'Баланс пользователя',
  })
  @Role(UserRole.Customer)
  @UseGuards(RoleGuard)
  @ApiBearerAuth('access-token')
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  public async index(@Req() { tokenPayload }: RequestWithTokenPayload, @Query() query: BalanceQuery) {
    return this.balanceService.find(tokenPayload.sub, query);
  }

  @ApiOperation({
    summary: 'Уменьшить баланс пользователя по тренировке на 1'
  })
  @ApiResponse({
    type: BalanceRdo,
    status: HttpStatus.OK,
    description: 'Баланс успешно изменен',
  })
  @Role(UserRole.Customer)
  @UseGuards(RoleGuard)
  @ApiBearerAuth('access-token')
  @Patch(':trainingId')
  public async update(
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @Param('trainingId', UUIDValidationPipe) trainingId: string ) {
    return this.balanceService.spendBalance(tokenPayload.sub, trainingId);
  }
}
