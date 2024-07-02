import { Controller, Get, Post, Body, Delete, HttpStatus, UseGuards, Req, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';
import { RefreshTokenService } from 'src/modules/refresh-token/refresh-token.service';
import { Public } from 'src/libs/decorators';
import { UserDtoValidationPipe } from 'src/libs/pipes';
import { JwtRefreshGuard, LocalAuthGuard, NotAuthGuard } from 'src/libs/guards';
import { AuthCoachRdo, AuthUserRdo, LoggedUserRdo } from './rdo';
import { RequestWithRefreshTokenPayload, RequestWithTokenPayload, RequestWithUser } from 'src/libs/requests';
import { CreateCoachDto, CreateCustomerDto, LoginUserDto } from './dto';
import { FullUserRdo } from '../user/rdo';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @ApiOperation({
    summary: 'Регистрация нового пользователя'
  })
  @ApiResponse({
    type: AuthUserRdo,
    status: HttpStatus.CREATED,
    description: 'Новый пользователь успешно создан.',
  })
  @Public()
  @UseGuards(NotAuthGuard)
  @ApiBody({ type: CreateCustomerDto })
  @Post('register-customer')
  public async createCustomer(
    @Body(new UserDtoValidationPipe(CreateCustomerDto)) dto: CreateCustomerDto,
  ) {
    return this.authService.registerCustomer(dto);
  }

  @ApiOperation({
    summary: 'Регистрация нового тренера'
  })
  @ApiResponse({
    type: AuthCoachRdo,
    status: HttpStatus.CREATED,
    description: 'Новый тренер успешно создан.',
  })
  @Public()
  @UseGuards(NotAuthGuard)
  @ApiBody({ type: CreateCoachDto })
  @Post('register-coach')
  public async createCoach(
    @Body(new UserDtoValidationPipe(CreateCoachDto)) dto: CreateCoachDto,
  ) {
    return this.authService.registerCoach(dto);
  }

  @ApiOperation({
    summary: 'Вход в систему'
  })
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'Успешный вход в систему',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Логин или пароль неверны',
  })
  @Public()
  @UseGuards(NotAuthGuard, LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiOperation({
    summary: 'Проверить авторизацию пользователя'
  })
  @ApiResponse({
    type: FullUserRdo,
    status: HttpStatus.OK,
    description: 'Пользователь авторизирован.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Пользователь не авторизирован.',
  })
  @ApiBearerAuth('access-token')
  @Get('login')
  public async checkAuth(@Req() { tokenPayload }: RequestWithTokenPayload) {
    return this.userService.getUserByEmail(tokenPayload.email);
  }

  @ApiOperation({
    summary: 'Выход из системы'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Пользователь успешно вышел.',
  })
  @ApiBearerAuth('refresh-token')
  @UseGuards(JwtRefreshGuard)
  @Delete('logout')
  public async logout(@Req() { tokenPayload }: RequestWithRefreshTokenPayload) {
    await this.refreshTokenService.deleteRefreshSession(tokenPayload.tokenId);
  }

  @ApiOperation({
    summary: 'Получить новую пару токенов по refresh токену'
  })
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'Новые токены получены',
  })
  @ApiBearerAuth('refresh-token')
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(
    @Req() { tokenPayload }: RequestWithRefreshTokenPayload,
  ) {
    return this.authService.refreshUserToken(tokenPayload);
  }
}
