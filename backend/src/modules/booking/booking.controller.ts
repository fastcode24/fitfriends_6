import { Controller, Post, Body, Patch, Param, HttpStatus, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto } from './dto';
import { BookingRdo } from './rdo';
import { UUIDValidationPipe } from 'src/libs/pipes';
import { RequestWithTokenPayload } from 'src/libs/requests';
import { Role } from 'src/libs/decorators';
import { UserRole } from 'src/libs/types';
import { RoleGuard } from 'src/libs/guards';

@ApiTags('Заявки на тренировку')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({
    summary: 'Получить все заявки пользователя на персональные/совместные тренировки'
  })
  @ApiResponse({
    type: [BookingRdo],
    status: HttpStatus.OK,
    description: 'Список всех заявок пользователя получен.',
  })
  @ApiBearerAuth('access-token')
  @Get()
  public async find(@Req() { tokenPayload }: RequestWithTokenPayload) {
    return this.bookingService.find(tokenPayload.sub);
  }

  @ApiOperation({
    summary: 'Отправить заявку на персональную/совместную тренировку'
  })
  @ApiResponse({
    type: BookingRdo,
    status: HttpStatus.CREATED,
    description: 'Заявка на тренировку успешно отправлена.',
  })
  @Role(UserRole.Customer)
  @UseGuards(RoleGuard)
  @ApiBearerAuth('access-token')
  @Post()
  public async create(
    @Body() createBookingDto: CreateBookingDto,
    @Req() { tokenPayload }: RequestWithTokenPayload
  ) {
    return this.bookingService.create(tokenPayload.sub, createBookingDto);
  }

  @ApiOperation({
    summary: 'Изменить статус заявки на персональную/совместную тренировку'
  })
  @ApiResponse({
    type: BookingRdo,
    status: HttpStatus.OK,
    description: 'Статус заявки на тренировку успешно изменен',
  })
  @ApiBearerAuth('access-token')
  @Patch(':id')
  update(
    @Param('id', UUIDValidationPipe) id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Req() { tokenPayload }: RequestWithTokenPayload
  ) {
    return this.bookingService.update(tokenPayload.sub, id, updateBookingDto);
  }
}
