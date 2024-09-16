import { Controller, Get, Post, Body, HttpStatus, Query, Req, Param } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { ApiTags, ApiResponse, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BaseQuery } from 'src/libs/query/base-query';
import { UsersRdo, UsersRdoExample } from 'src/modules/user/rdo';
import { UserDtoValidationPipe, UUIDValidationPipe } from 'src/libs/pipes';
import { UpdateFriendsDto } from './dto';
import { IsFriendRdo, UpdateFriendsRdo } from './rdo';
import { RequestWithTokenPayload } from 'src/libs/requests';

@ApiTags('Друзья')
@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @ApiOperation({
    summary: 'Получить список всех друзей пользователя'
  })
  @ApiResponse({
    schema: {
      example: UsersRdoExample
    },
    status: HttpStatus.OK,
    description: 'Список всех друзей пользователя',
  })
  @ApiBearerAuth('access-token')
  @Get()
  public async index(
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @Query() query: BaseQuery
  ): Promise<UsersRdo> {
    return this.friendsService.getFriends(tokenPayload.sub, query);
  }

  @ApiOperation({
    summary: 'Добавить в друзья'
  })
  @ApiBody({ type: UpdateFriendsDto })
  @ApiResponse({
    type: UpdateFriendsRdo,
    status: HttpStatus.OK,
    description: 'Пользователь добавлен в друзья',
  })
  @ApiBearerAuth('access-token')
  @Post('/add')
  public async add(
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @Body() dto: UpdateFriendsDto
  ) {
    return this.friendsService.addFriend(tokenPayload.sub, dto);
  }

  @ApiOperation({
    summary: 'Удалить из друзей'
  })
  @ApiBody({ type: UpdateFriendsDto })
  @ApiResponse({
    type: UpdateFriendsRdo,
    status: HttpStatus.OK,
    description: 'Пользователь удален из друзей',
  })
  @ApiBearerAuth('access-token')
  @Post('/remove')
  public async remove(
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @Body(new UserDtoValidationPipe(UpdateFriendsDto)) dto: UpdateFriendsDto
  ) {
    return this.friendsService.removeFriend(tokenPayload.sub, dto);
  }

  @ApiOperation({
    summary: 'Узнать является ли пользователь другом'
  })
  @ApiResponse({
    type: Boolean,
    status: HttpStatus.OK,
    description: 'Друг или нет',
  })
  @ApiBearerAuth('access-token')
  @Get('/:id')
  public async checkFriend(
    @Req() { tokenPayload }: RequestWithTokenPayload,
    @Param('id', UUIDValidationPipe) id: string
  ): Promise<IsFriendRdo> {
    return await this.friendsService.checkFriendship(tokenPayload.sub, id);
  }
}
