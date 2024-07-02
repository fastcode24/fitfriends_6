import { Entity } from 'src/libs/models';
import { Booking, BookingStatus } from 'src/libs/types';

export class BookingEntity implements Booking, Entity<string> {
  public id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public senderId: string;
  public recipientId: string;
  public status: BookingStatus;

  constructor(booking: Booking) {
    this.populate(booking);
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      senderId: this.senderId,
      recipientId: this.recipientId,
      status: this.status,
    };
  }

  public populate(data: Booking): void {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.senderId = data.senderId;
    this.recipientId = data.recipientId;
    this.status = data.status;
  }

  static fromObject(data: Booking): BookingEntity {
    return new BookingEntity(data);
  }
}
