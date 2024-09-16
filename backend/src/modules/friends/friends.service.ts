import { Logger, Injectable } from '@nestjs/common';
import { FriendsRepository } from './friends.repository';
import { fillDto } from 'src/libs/helpers';
import { UserRdo, UsersRdo } from 'src/modules/user/rdo';
import { UsersQuery } from 'src/modules/user/user.query';
import { UpdateFriendsDto } from './dto';
import { NotifyService } from '../notify/notify.service';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { IsFriendRdo } from './rdo';

@Injectable()
export class FriendsService {
  private readonly logger = new Logger(FriendsService.name);

  constructor(
    private readonly friendsRepository: FriendsRepository,
    private readonly notifyService: NotifyService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  public async getFriends(currentUserId: string, query?: UsersQuery): Promise<UsersRdo> {
    const userEntities = await this.friendsRepository.find(currentUserId, query);
    const appUrl = this.configService.get<string>('app.appUrl');

    userEntities.entities.forEach((entity) => {
      entity.avatar = entity.avatar && `${appUrl}/${entity.avatar}`;
      entity.background = entity.background && `${appUrl}/${entity.background}`;
    });

    return fillDto(UsersRdo, {
      ...userEntities,
      users: userEntities.entities.map((entity) =>
        fillDto(UserRdo, entity.toPOJO()),
      ),
    });
  }

  public async addFriend(currentUserId: string, { friendId }: UpdateFriendsDto) {
    const currentUser = await this.userService.getUserEntity(currentUserId);
    const friend = await this.userService.getUserEntity(friendId);
    const response = await this.friendsRepository.add(currentUserId, friendId);

    await this.notifyService.create(currentUserId, `${friend.name} добавлен(а) в друзья`);
    await this.notifyService.create(friendId, `${currentUser.name} добавил(а) вас в друзья`);

    return response;
  }

  public async removeFriend(currentUserId: string, { friendId }: UpdateFriendsDto) {
    const currentUser = await this.userService.getUserEntity(currentUserId);
    const friend = await this.userService.getUserEntity(friendId);
    const response = await this.friendsRepository.remove(currentUserId, friendId);

    await this.notifyService.create(currentUserId, `${friend.name} удален(а) из друзей`);
    await this.notifyService.create(friendId, `${currentUser.name} удалил(а) вас из друзей`);

    return response;
  }

  public async checkFriendship(currentUserId: string, friendId: string): Promise<IsFriendRdo> {
    const response = await this.friendsRepository.isFriend(currentUserId, friendId);
    return { isFriend: response};
  }
}
