import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { DtoValidationMessage } from 'src/libs/messages';
import { BookingStatus } from 'src/libs/types';

export class UpdateBookingDto {
  @ApiProperty({
    description: 'Статус заявки на тренировку',
    example: 'Принята',
  })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsEnum(BookingStatus, {
    message: DtoValidationMessage.bookingStatus.invalidFormat,
  })
  public status: BookingStatus;
}
