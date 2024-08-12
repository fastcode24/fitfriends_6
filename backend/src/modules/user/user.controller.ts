import { Controller, Get, Body, Patch, Param, HttpStatus, Query, UseGuards, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiResponse, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from 'src/libs/types';
import { Role } from 'src/libs/decorators/role.decorator';
import { FullUserRdo, UsersRdo, UsersRdoExample } from './rdo';
import { UpdateUserDto, UpdateUserDtoType, UsersDdoExample } from './dto';
import { UserDtoValidationPipe } from 'src/libs/pipes';
import { UUIDValidationPipe } from 'src/libs/pipes/uuid-validation.pipe';
import { UsersQuery } from './user.query';
import { RoleGuard } from 'src/libs/guards';
import { fillDto } from 'src/libs/helpers';

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Получить список пользователей'
  })
  @ApiResponse({
    schema: {
      example: UsersRdoExample
    },
    status: HttpStatus.OK,
    description: 'Список пользователей',
  })
  @Role(UserRole.Customer)
  @UseGuards(RoleGuard)
  @ApiBearerAuth('access-token')
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  public async index(@Query() query: UsersQuery): Promise<UsersRdo> {
    return this.userService.getAllUsers(query);
  }

  @ApiOperation({
    summary: 'Подробная информация о пользователе'
  })
  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.OK,
    description: 'Пользователь найден',
  })
  @ApiBearerAuth('access-token')
  @Get('/:id')
  public async show(@Param('id', UUIDValidationPipe) id: string) {
    return await this.userService.getUserById(id);
  }

  @ApiOperation({
    summary: 'Изменить информацию о пользователе'
  })
  @ApiBody({ schema: { example: UsersDdoExample } })
  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.OK,
    description: 'Данные пользователя успешно изменены',
  })
  @ApiBearerAuth('access-token')
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body(new UserDtoValidationPipe(UpdateUserDto)) dto: UpdateUserDtoType
  ) {
    return this.userService.updateUser(id, dto);
  }
}
