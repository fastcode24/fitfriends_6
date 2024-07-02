import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientService } from 'src/libs/models/prisma/prisma-client.service';
import { BasePostgresRepository } from 'src/libs/models/repository/base-postgres.repository';
import { FullUser } from 'src/libs/types';
import { UserEntity } from 'src/modules/user/user.entity';
import { DefaultPojoType } from 'src/libs/models/repository/entity.interface';
import { DEFAULT_PAGE, DEFAULT_SORT_DIRECTION, LIST_LIMIT } from 'src/app.const';
import { Pagination } from 'src/libs/types';
import { calculatePages } from 'src/libs/helpers';
import { UsersQuery } from 'src/modules/user/user.query';
import { UpdateFriendsRdo } from './rdo';

@Injectable()
export class FriendsRepository extends BasePostgresRepository<UserEntity> {
  constructor(prismaService: PrismaClientService) {
    super('user', prismaService, (document: DefaultPojoType) => {
      const user = document as unknown as FullUser;
      return UserEntity.fromObject(user);
    });
  }

  public async find(currentUserId: string, query?: UsersQuery): Promise<Pagination<UserEntity>> {
    const sortDirection = query?.sort ?? DEFAULT_SORT_DIRECTION;
    const limit = Number(query?.limit) || LIST_LIMIT;
    const page = query?.page ? (query.page - 1) * limit : 0;

    const currentUser = await this.client.user.findUnique({
      where: { id: currentUserId },
      select: { friends: true },
    });

    const friendIds = currentUser?.friends ?? [];

    const whereClause: Prisma.UserWhereInput = {
      id: {
        in: friendIds,
      },
    };

    const prismaQuery: Prisma.UserFindManyArgs = {
      where: whereClause,
      orderBy: { id: sortDirection },
      take: limit,
      skip: page,
    };

    const recordsCount = await this.client.user.count({ where: whereClause });
    const documents = await this.client.user.findMany(prismaQuery);
    const entities: UserEntity[] = documents.map(document => this.createEntityFromDocument(document));
    return {
      entities,
      currentPage: query?.page ?? DEFAULT_PAGE,
      totalPages: calculatePages(recordsCount, limit),
      itemsPerPage: limit,
      totalItems: recordsCount,
    };
  }

  public async add(currentUserId: string, friendId: string): Promise<UpdateFriendsRdo> {

    if (currentUserId === friendId) {
      throw new ConflictException('Вы не можете добавить себя в друзья');
    }

    const currentUser = await this.client.user.findUnique({
      where: { id: currentUserId },
      select: { friends: true },
    });

    const friendUser = await this.client.user.findUnique({
      where: { id: friendId },
      select: { friends: true },
    });

    if (!currentUser || !friendUser) {
      throw new NotFoundException('Один из пользователей не найден');
    }

    if (currentUser.friends.includes(friendId)) {
      throw new ConflictException(`Пользователь с id ${friendId} уже ваш друг`);
    }

    const updatedCurrentUserFriendsList = currentUser.friends.includes(friendId) ? currentUser.friends : [...currentUser.friends, friendId];
    const updatedFriendUserFriendsList = friendUser.friends.includes(currentUserId) ? friendUser.friends : [...friendUser.friends, currentUserId];

    await this.client.user.update({
      where: { id: currentUserId },
      data: { friends: updatedCurrentUserFriendsList },
    });

    await this.client.user.update({
      where: { id: friendId },
      data: { friends: updatedFriendUserFriendsList },
    });

    return {
      message: `Друг c id ${friendId} успешно добавлен`,
    };
  }

  public async remove(currentUserId: string, friendId: string): Promise<UpdateFriendsRdo> {
    const currentUser = await this.client.user.findUnique({
      where: { id: currentUserId },
      select: { friends: true },
    });

    if (!currentUser) throw new Error('Пользователь не найден');

    const updatedCurrentUserFriendsList = currentUser.friends.filter(f => f !== friendId);

    await this.client.user.update({
      where: { id: currentUserId },
      data: { friends: updatedCurrentUserFriendsList },
    });

    const friendUser = await this.client.user.findUnique({
      where: { id: friendId },
      select: { friends: true },
    });

    if (!friendUser) throw new Error('User не найден в друзьях, не смогли удалить из друзей');

    const updatedFriendUserFriendsList = friendUser.friends.filter(f => f !== currentUserId);

    await this.client.user.update({
      where: { id: friendId },
      data: { friends: updatedFriendUserFriendsList },
    });

    return {
      message: `Пользователь c id ${friendId} успешно удален из друзей`,
    }
  }
}


