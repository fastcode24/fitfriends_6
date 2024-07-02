import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientService } from 'src/libs/models/prisma/prisma-client.service';
import { BasePostgresRepository } from 'src/libs/models/repository/base-postgres.repository';
import { Order } from 'src/libs/types';
import { OrderEntity } from './order.entity';
import { DefaultPojoType } from 'src/libs/models/repository/entity.interface';
import { DEFAULT_ORDER_SORT, DEFAULT_PAGE, DEFAULT_SORT_DIRECTION, LIST_LIMIT } from 'src/app.const';
import { Pagination } from 'src/libs/types';
import { calculatePages } from 'src/libs/helpers';
import { OrderQuery } from './query';

@Injectable()
export class OrderRepository extends BasePostgresRepository<OrderEntity> {
  constructor(prismaService: PrismaClientService) {
    super('order', prismaService, (document: DefaultPojoType) => {
      const order = document as unknown as Order;
      return OrderEntity.fromObject(order);
    });
  }

  public async find(coachId: string, query?: OrderQuery): Promise<Pagination<OrderEntity>> {
    const sortOrder = query?.sortOrder ?? DEFAULT_ORDER_SORT;
    const sortDirection = query?.sort ?? DEFAULT_SORT_DIRECTION;
    const limit = Number(query?.limit) || LIST_LIMIT;
    const page = query?.page ? (query.page - 1) * limit : 0;

    const prismaQuery: Prisma.OrderFindManyArgs = {
      where: { coachId: coachId },
      orderBy: { [sortOrder]: sortDirection },
      take: limit,
      skip: page,
    };

    const recordsCount = await this.client.order.count({ where: { coachId: coachId } });
    const documents = await this.client.order.findMany(prismaQuery);
    const entities: OrderEntity[] = documents.map(document => this.createEntityFromDocument(document));

    return {
      entities,
      currentPage: query?.page ?? DEFAULT_PAGE,
      totalPages: calculatePages(recordsCount, limit),
      itemsPerPage: limit,
      totalItems: recordsCount,
    };
  }
}


