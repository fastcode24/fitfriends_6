import { Injectable } from '@nestjs/common';
import { PrismaClientService } from 'src/libs/models/prisma/prisma-client.service';
import { BasePostgresRepository } from 'src/libs/models/repository/base-postgres.repository';
import { Notify } from 'src/libs/types';
import { DefaultPojoType } from 'src/libs/models/repository/entity.interface';
import { DEFAULT_SORT_DIRECTION, NOTIFY_LIMIT } from 'src/app.const';
import { Prisma } from '@prisma/client';
import { NotifyEntity } from './notify.entity';

@Injectable()
export class NotifyRepository extends BasePostgresRepository<NotifyEntity> {
  constructor(prismaService: PrismaClientService) {
    super('notify', prismaService, (document: DefaultPojoType) => {
      const notify = document as unknown as Notify;
      return NotifyEntity.fromObject(notify);
    });
  }

  public async find(userId: string): Promise<NotifyEntity[]> {
    const prismaQuery: Prisma.NotifyFindManyArgs = {
      where: { userId: userId },
      orderBy: { createdAt: DEFAULT_SORT_DIRECTION },
      take: NOTIFY_LIMIT,
    };

    const documents = await this.client.notify.findMany(prismaQuery);
    const entities: NotifyEntity[] = documents.map(document => this.createEntityFromDocument(document));

    return entities;
  }
}


