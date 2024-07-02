import { Controller, Post, Param, Delete, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/libs/decorators';
import { UserRole } from 'src/libs/types';
import { UUIDValidationPipe } from 'src/libs/pipes';
import { RoleGuard } from 'src/libs/guards';
import { RequestWithTokenPayload } from 'src/libs/requests';

@ApiTags('Уведомления о новых тренировках')
@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  @ApiOperation({
    summary: 'Подписаться на уведомления о новых тренировках'
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Подписка на уведомления о новых тренировках тренера успешно добавлена',
  })
  @Role(UserRole.Customer)
  @UseGuards(RoleGuard)
  @ApiBearerAuth('access-token')
  @Post(':coachId')
  public async create(
    @Param('coachId', UUIDValidationPipe) coachId: string,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.subscribeService.addNewSubscription(tokenPayload, coachId);
  }

  @ApiOperation({
    summary: 'Отписаться от уведомлений о новых тренировках'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Подписка успешно удалена',
  })
  @Role(UserRole.Customer)
  @UseGuards(RoleGuard)
  @ApiBearerAuth('access-token')
  @Delete(':coachId')
  public async delete(
    @Param('coachId', UUIDValidationPipe) coachId: string,
    @Req() { tokenPayload }: RequestWithTokenPayload,
  ) {
    await this.subscribeService.removeSubscription(tokenPayload, coachId);
  }
}
