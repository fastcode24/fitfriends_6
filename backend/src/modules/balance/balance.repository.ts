import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientService } from 'src/libs/models/prisma/prisma-client.service';
import { BasePostgresRepository } from 'src/libs/models/repository/base-postgres.repository';
import { Balance, FullUser } from 'src/libs/types';
import { BalanceEntity } from './balance.entity';
import { DefaultPojoType } from 'src/libs/models/repository/entity.interface';
import { DEFAULT_PAGE, DEFAULT_SORT_DIRECTION, LIST_LIMIT } from 'src/app.const';
import { Pagination } from 'src/libs/types';
import { calculatePages } from 'src/libs/helpers';
import { BaseQuery } from 'src/libs/query';
import { BalanceQuery } from './balance.query';

@Injectable()
export class BalanceRepository extends BasePostgresRepository<BalanceEntity> {
  constructor(prismaService: PrismaClientService) {
    super('balance', prismaService, (document: DefaultPojoType) => {
      const balance = document as unknown as Balance;
      return BalanceEntity.fromObject(balance);
    });
  }

  public async findBalance(userId: string, trainingId: string): Promise<BalanceEntity | null> {
    const balance = await this.client.balance.findFirst({
      where: {
        userId: userId,
        trainingId: trainingId
      }
    });

    if (!balance) {
      return null;
    }

    return BalanceEntity.fromObject(balance);
  }

  public async find(currentUserId: string, query?: BalanceQuery): Promise<Pagination<BalanceEntity>> {
    const sortDirection = query?.sort ?? DEFAULT_SORT_DIRECTION;
    const limit = Number(query?.limit) || LIST_LIMIT;
    const page = query?.page ? (query.page - 1) * limit : 0;
    const isActive = query?.isActive !== undefined ? Boolean(query.isActive) : undefined;

    const whereClause: Prisma.BalanceWhereInput = {
      userId: currentUserId,
      ...(isActive ? { count: { gt: 0 } } : {}),
    };

    const prismaQuery: Prisma.BalanceFindManyArgs = {
      where: whereClause,
      orderBy: { id: sortDirection },
      take: limit,
      skip: page,
    };

    const recordsCount = await this.client.balance.count({ where: whereClause });
    const documents = await this.client.balance.findMany(prismaQuery);
    const entities: BalanceEntity[] = documents.map(document => this.createEntityFromDocument(document));

    return {
      entities,
      currentPage: query?.page ?? DEFAULT_PAGE,
      totalPages: calculatePages(recordsCount, limit),
      itemsPerPage: limit,
      totalItems: recordsCount,
    };
  }
}


