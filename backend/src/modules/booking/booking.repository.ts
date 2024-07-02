import { Injectable } from "@nestjs/common";
import { DefaultPojoType } from "src/libs/models";
import { PrismaClientService } from 'src/libs/models/prisma/prisma-client.service';
import { BasePostgresRepository } from 'src/libs/models/repository/base-postgres.repository';
import { BookingEntity } from "./booking.entity";
import { Booking, BookingStatus } from "src/libs/types";
import { Prisma } from "@prisma/client";

@Injectable()
export class BookingRepository extends BasePostgresRepository<BookingEntity> {
  constructor(prismaService: PrismaClientService) {
    super('booking', prismaService, (document: DefaultPojoType) => {
      const booking = document as unknown as Booking;
      return BookingEntity.fromObject(booking);
    });
  }

  public async isPending(senderId: string, recipientId: string ): Promise<boolean> {
    const request = await this.client.booking.findFirst({
      where: {
        senderId,
        recipientId,
        status: BookingStatus.Pending,
      },
    });

    return Boolean(request);
  }

  public async find(currentUserId: string): Promise<BookingEntity[]> {
    const prismaQuery: Prisma.BookingFindManyArgs = {
      where: { senderId: currentUserId },
    };

    const documents = await this.client.booking.findMany(prismaQuery);
    const entities: BookingEntity[] = documents.map(document => this.createEntityFromDocument(document));

    return entities;
  }
}
