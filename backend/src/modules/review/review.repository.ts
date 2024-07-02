import { Injectable } from '@nestjs/common';
import { PrismaClientService } from 'src/libs/models/prisma/prisma-client.service';
import { BasePostgresRepository } from 'src/libs/models/repository/base-postgres.repository';
import { Pagination, Review } from 'src/libs/types';
import { DefaultPojoType } from 'src/libs/models/repository/entity.interface';
import { ReviewEntity } from './review.entity';
import { BaseQuery } from 'src/libs/query';
import { DEFAULT_PAGE, DEFAULT_SORT_DIRECTION, LIST_LIMIT } from 'src/app.const';
import { Prisma } from '@prisma/client';
import { calculatePages } from 'src/libs/helpers';

@Injectable()
export class ReviewRepository extends BasePostgresRepository<ReviewEntity> {
  constructor(prismaService: PrismaClientService) {
    super('review', prismaService, (document: DefaultPojoType) => {
      const review = document as unknown as Review;
      return ReviewEntity.fromObject(review);
    });
  }

  public async save(reviewInput: ReviewEntity): Promise<ReviewEntity> {
    const createdDocument = await this.client.review.create({
      data: reviewInput,
    });

    return this.createEntityFromDocument(createdDocument);
  }

  public async find(trainingId: string, query?: BaseQuery): Promise<Pagination<ReviewEntity>> {
    const sortDirection = query?.sort ?? DEFAULT_SORT_DIRECTION;
    const limit = Number(query?.limit) || LIST_LIMIT;
    const page = query?.page ? (query.page - 1) * limit : 0;

    const prismaQuery: Prisma.ReviewFindManyArgs = {
      where: { trainingId: trainingId },
      orderBy: { createdAt: sortDirection },
      take: limit,
      skip: page,
    };

    const recordsCount = await this.client.review.count({ where: { trainingId: trainingId } });
    const documents = await this.client.review.findMany(prismaQuery);
    const entities: ReviewEntity[] = documents.map(document => this.createEntityFromDocument(document));
    return {
      entities,
      currentPage: query?.page ?? DEFAULT_PAGE,
      totalPages: calculatePages(recordsCount, limit),
      itemsPerPage: limit,
      totalItems: recordsCount,
    };
  }

  public async calculateRating(trainingId: string): Promise<number> {
    const reviews = await this.client.review.findMany({
      where: {
        trainingId: trainingId,
      },
      select: {
        grade: true,
      },
    });


    if (reviews.length === 0) {
      return 0;
    }

    const total = reviews.reduce((acc, current) => acc + current.grade, 0);
    const average = total / reviews.length;

    return Math.round(average);
  }
}


