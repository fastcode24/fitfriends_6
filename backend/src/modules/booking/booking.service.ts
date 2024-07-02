import { BadRequestException, ConflictException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookingDto, UpdateBookingDto } from './dto';
import { UserService } from 'src/modules/user/user.service';
import { BookingRdo } from './rdo';
import { DEFAULT_BOOKING_STATUS } from 'src/app.const';
import { fillDto } from 'src/libs/helpers';
import { BookingEntity } from './booking.entity';
import { BookingRepository } from './booking.repository';
import { NotifyService } from '../notify/notify.service';
import { UserRole } from 'src/libs/types';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly userService: UserService,
    private readonly notifyService: NotifyService,
  ) {}

  public async create(senderId: string, { recipientId }: CreateBookingDto): Promise<BookingRdo> {
    if (senderId === recipientId) {
      this.logger.error(`Failed to create booking: sender and recipient are the same (ID: ${senderId})`);
      throw new BadRequestException(
        `Вы не можете отправить заявку на тренировку самому себе`,
      );
    }

    if (await this.bookingRepository.isPending(senderId, recipientId)) {
      this.logger.warn(`Pending booking already exists between senderId ${senderId} and recipientId ${recipientId}`);
      throw new ConflictException(
        `Заявка на тренировку уже отправлена и ожидает`,
      );
    }

    const recipient = await this.userService.getUserEntity(recipientId);
    if (!recipient.isReady) {
      this.logger.error(`Recipient with ID ${recipientId} is not ready to train`);
      throw new BadRequestException(
        `Пользователь с ID ${recipientId} не готов тренироваться`,
      );
    }

    const sender = await this.userService.getUserEntity(senderId);

    const newBooking = {
      senderId: senderId,
      recipientId: recipientId,
      status: DEFAULT_BOOKING_STATUS,
    };

    const bookingEntity = new BookingEntity(newBooking);
    const booking = await this.bookingRepository.save(bookingEntity);

    if (recipient.role === UserRole.Coach) {
      await this.notifyService.create(recipientId, `${sender.name} прислал вам запрос на персональную тренировку`);
    } else {
      await this.notifyService.create(recipientId, `${sender.name} приглашает вас на совместную тренировку`);
    }

    return fillDto(BookingRdo, booking.toPOJO());
  }

  public async update(currentUserId: string, bookingId: string, { status }: UpdateBookingDto): Promise<BookingRdo> {
    const booking = await this.bookingRepository.findById(bookingId);

    if (!booking) {
      this.logger.error(`Booking with id ${bookingId} not found`);
      throw new NotFoundException(
        `Заявка на тренировку с id ${bookingId} не найдена.`,
      );
    }

    if (currentUserId !== booking.recipientId) {
      this.logger.error(`Unauthorized update attempt: User ${currentUserId} tried to update booking ${bookingId} without proper rights`);
      throw new ForbiddenException();
    }

    if (booking.status === status) {
      this.logger.error(`Booking status the same as current: ${status}`);
      throw new ConflictException(
        `Текущий статус заявки на тренировку уже ${status}`,
      );
    }

    booking.status = status;
    booking.updatedAt = new Date();

    const updated_booking = await this.bookingRepository.update(bookingId, booking);

    return fillDto(BookingRdo, updated_booking.toPOJO());
  }

  public async find(currentUserId: string): Promise<BookingRdo[]> {
    const bookingEntities = await this.bookingRepository.find(currentUserId);

    return bookingEntities;
  }

}
