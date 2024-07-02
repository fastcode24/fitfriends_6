import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientService } from 'src/libs/models/prisma/prisma-client.service';
import { BasePostgresRepository } from 'src/libs/models/repository/base-postgres.repository';
import { SortType, Training } from 'src/libs/types';
import { DefaultPojoType } from 'src/libs/models/repository/entity.interface';
import { DEFAULT_PAGE, DEFAULT_SORT_DIRECTION, LIST_LIMIT } from 'src/app.const';
import { Pagination } from 'src/libs/types';
import { calculatePages } from 'src/libs/helpers';
import { TrainingEntity } from './training.entity';
import { TrainingQuery } from './training.query';

@Injectable()
export class TrainingRepository extends BasePostgresRepository<TrainingEntity> {
  constructor(prismaService: PrismaClientService) {
    super('training', prismaService, (document: DefaultPojoType) => {
      const training = document as unknown as Training;
      return TrainingEntity.fromObject(training);
    });
  }

  public async find(query?: TrainingQuery): Promise<Pagination<TrainingEntity>> {
    const sortDirection = query?.sort ?? DEFAULT_SORT_DIRECTION;
    const sortType = query?.sortType ?? SortType.Default;
    const limit = Number(query?.limit) || LIST_LIMIT;
    const page = query?.page ? (query.page - 1) * limit : 0;

    const whereClause: Prisma.TrainingWhereInput = {};

    const priceConditions: Prisma.TrainingWhereInput[] = [];

    if (query?.priceFrom !== undefined) {
      priceConditions.push({ price: { gte: +query.priceFrom } });
    }

    if (query?.priceTo !== undefined) {
      priceConditions.push({ price: { lte: +query.priceTo } });
    }

    const caloriesConditions: Prisma.TrainingWhereInput[] = [];

    if (query?.caloriesFrom !== undefined) {
      caloriesConditions.push({ calories: { gte: +query.caloriesFrom } });
    }

    if (query?.caloriesTo !== undefined) {
      caloriesConditions.push({ calories: { lte: +query.caloriesTo } });
    }

    const ratingConditions: Prisma.TrainingWhereInput[] = [];

    if (query?.ratingFrom !== undefined) {
      ratingConditions.push({ rating: { gte: +query.ratingFrom } });
    }

    if (query?.ratingTo !== undefined) {
      ratingConditions.push({ rating: { lte: +query.ratingTo } });
    }

    if (priceConditions.length > 0 || caloriesConditions.length > 0 || ratingConditions.length > 0) {
      whereClause.AND = [...priceConditions, ...caloriesConditions, ...ratingConditions];
    }

    if (query?.trainingTime && query.trainingTime.length > 0) {
      whereClause.trainingTime = { in: query.trainingTime };
    }

    if (query?.trainingType && query.trainingType.length > 0) {
      whereClause.trainingType = { in: query.trainingType };
    }

    if (query?.genderExclude !== undefined) {
      whereClause.gender = { not: query.genderExclude };
    }

    if (query?.level !== undefined) {
      whereClause.level = query.level;
    }

    if (query?.isFeatured !== undefined) {
      whereClause.isFeatured = query.isFeatured;
    }

    if (query?.coachId !== undefined) {
      whereClause.coachId = query.coachId;
    }

    const prismaQuery: Prisma.TrainingFindManyArgs = {
      where: whereClause,
      orderBy: { [sortType]: sortDirection },
      take: limit,
      skip: page,
    };

    const recordsCount = await this.client.training.count({ where: whereClause });
    const documents = await this.client.training.findMany(prismaQuery);
    const entities: TrainingEntity[] = documents.map(document => this.createEntityFromDocument(document));
    return {
      entities,
      currentPage: query?.page ?? DEFAULT_PAGE,
      totalPages: calculatePages(recordsCount, limit),
      itemsPerPage: limit,
      totalItems: recordsCount,
    };
  }

  public async findById(id: string): Promise<TrainingEntity | null> {
    const document = await this.client.training.findUnique({
      where: { id },
    });
    return this.createEntityFromDocument(document);
  }

  public async update(id: string, trainingUpdateInput: Prisma.TrainingUpdateInput): Promise<TrainingEntity | null> {
    try {
      const updatedDocument = await this.client.training.update({
        where: {id},
        data: trainingUpdateInput,
      });

      return this.createEntityFromDocument(updatedDocument);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with id ${id} not found`);
        }
      }

      throw error;
    }
  }

  public async save(trainingInput: TrainingEntity): Promise<TrainingEntity> {
    try {
      const createdDocument = await this.client.training.create({
        data: trainingInput,
      });

      return this.createEntityFromDocument(createdDocument);
    } catch (error) {
      throw error;
    }
  }
}


