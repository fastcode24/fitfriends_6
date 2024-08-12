import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { fillDto } from 'src/libs/helpers';
import { UserEntity } from './user.entity';
import { FullUserRdo, UsersRdo } from './rdo';
import { UpdateUserDtoType } from './dto';
import { UsersQuery } from './user.query';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  public async getUserEntity(userId: string): Promise<UserEntity> {
    const existsUser = await this.userRepository.findById(userId);

    if (!existsUser) {
      this.logger.warn(`User with id ${userId} not found`);
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return existsUser;
  }

  public async getAllUsers(query?: UsersQuery): Promise<UsersRdo> {
    const userEntities = await this.userRepository.find(query);
    const appUrl = this.configService.get<string>('app.appUrl');

    userEntities.entities.forEach((entity) => {
      if (entity.certificates) {
        entity.certificates = entity.certificates.map(cert => `${appUrl}/${cert}`);
      }
      entity.avatar = entity.avatar && `${appUrl}/${entity.avatar}`;
      entity.background = entity.background && `${appUrl}/${entity.background}`;
    });

    return fillDto(UsersRdo, {
      ...userEntities,
      users: userEntities.entities.map((entity) =>
        fillDto(FullUserRdo, entity.toPOJO()),
      ),
    });
  }

  public async getUserById(id: string): Promise<FullUserRdo> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      this.logger.warn(`User with id ${id} not found`);
      throw new NotFoundException(`Пользователь с id ${id} не найден`);
    }

    const appUrl = this.configService.get<string>('app.appUrl');
    existUser.certificates = existUser.certificates?.map(cert => `${appUrl}/${cert}`);
    existUser.avatar = existUser.avatar && `${appUrl}/${existUser.avatar}`;
    existUser.background = existUser.background && `${appUrl}/${existUser.background}`;

    return fillDto(FullUserRdo, existUser.toPOJO());
  }

  public async getUserByEmail(email: string): Promise<FullUserRdo> {
    const existUser = await this.userRepository.findByEmail(email);

    if (! existUser) {
      this.logger.warn(`User not found by email: ${email}`);
      throw new NotFoundException(`Пользователь с email ${email} не найден`);
    }

    const appUrl = this.configService.get<string>('app.appUrl');
    existUser.certificates = existUser.certificates?.map(cert => `${appUrl}/${cert}`);
    existUser.avatar = existUser.avatar && `${appUrl}/${existUser.avatar}`;
    existUser.background = existUser.background && `${appUrl}/${existUser.background}`;

    return fillDto(FullUserRdo, existUser.toPOJO());
  }

  public async updateUser(userId: string, dto: UpdateUserDtoType): Promise<FullUserRdo> {
    const existsUser = await this.getUserEntity(userId);
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && existsUser[key] !== value) {
        existsUser[key] = value;
        hasChanges = true;
      }
    }

    if (!hasChanges) {
      return fillDto(FullUserRdo, existsUser.toPOJO());
    }

    const updatedUser = await this.userRepository.update(userId, existsUser);

    return fillDto(FullUserRdo, updatedUser.toPOJO());
  }

  public async updateSubscribers(userId: string, newSubscribers: string[]): Promise<void> {
    const existsUser = await this.getUserEntity(userId);

    if (!existsUser) {
      this.logger.error(`User not found with ID: ${userId} during updateSubscribers`);
      throw new NotFoundException(`Пользователь с id ${userId} не найден`);
    }

    existsUser.subscribers = newSubscribers;

    await this.userRepository.update(userId, existsUser);
  }
}
