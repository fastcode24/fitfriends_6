import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import * as dayjs from 'dayjs';
import { UserRepository } from "src/modules/user/user.repository";
import { UserService } from "src/modules/user/user.service";
import { RefreshTokenService } from "src/modules/refresh-token/refresh-token.service";
import { UserEntity } from "src/modules/user/user.entity";
import { jwtConfig } from "src/libs/config";
import { CreateCoachDto, CreateCustomerDto, LoginUserDto } from "./dto";
import { AuthCoachRdo, AuthUserRdo, LoggedUserRdo } from "./rdo";
import { createJWTPayload, fillDto } from "src/libs/helpers";
import { RefreshTokenPayload } from "src/libs/types";
import { UserMessage } from "src/libs/messages";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  public async registerCustomer(dto: CreateCustomerDto): Promise<AuthUserRdo> {
    const {
      email,
      name,
      description,
      password,
      gender,
      birthday,
      role,
      metro,
      background,
      level,
      trainingType,
      isReady,
      calories,
      caloriesPerDay,
      trainingTime
    } = dto;

    const existedUser = (await this.userRepository.findByEmail(email));

    if (existedUser) {
      this.logger.warn(`Customer registration failed: ${email} already exists.`);
      throw new ConflictException(UserMessage.Exists);
    }

    const newUser = {
      createdAt: new Date(),
      email,
      name,
      description,
      avatar: '',
      password: '',
      gender,
      birthday: birthday ? dayjs(birthday).toDate() : undefined,
      role,
      metro,
      background,
      level,
      trainingType,
      isReady,
      friends: [],
      subscribers: [],
      calories,
      caloriesPerDay,
      trainingTime,
    };

    const userEntity = await new UserEntity(newUser).setPassword(password);
    const user = await this.userRepository.save(userEntity);

    return fillDto(AuthUserRdo, user.toPOJO());
  }

  public async registerCoach(dto: CreateCoachDto): Promise<AuthCoachRdo> {
    const {
      email,
      name,
      description,
      password,
      gender,
      birthday,
      role,
      metro,
      background,
      level,
      trainingType,
      isReady,
      certificate,
      awards,
    } = dto;

    const existedUser = (await this.userRepository.findByEmail(email));

    if (existedUser) {
      this.logger.warn(`Coach registration failed: ${email} already exists.`);
      throw new ConflictException(UserMessage.Exists);
    }

    const newUser = {
      createdAt: new Date(),
      email,
      name,
      description,
      avatar: '',
      password: '',
      gender,
      birthday: birthday ? dayjs(birthday).toDate() : undefined,
      role,
      metro,
      background,
      level,
      trainingType,
      isReady,
      friends: [],
      subscribers: [],
      certificate,
      awards,
    };

    const userEntity = await new UserEntity(newUser).setPassword(password);
    const user = await this.userRepository.save(userEntity);

    return fillDto(AuthCoachRdo, user.toPOJO());
  }

  public async verifyUser(dto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = dto;
    const existUser = await this.userRepository.findByEmail(email) as UserEntity;

    if (!existUser) {
      this.logger.warn(`User not found for email: ${email}`);
      throw new NotFoundException(UserMessage.NotFound);
    }

    const isPasswordMatch = await existUser.comparePassword(password);

    if (!isPasswordMatch) {
      this.logger.warn(`Incorrect password attempt for email: ${email}`);
      throw new UnauthorizedException(UserMessage.PasswordWrong);
    }

    return existUser;
  }

  public async refreshUserToken(payload: RefreshTokenPayload): Promise<LoggedUserRdo> {
    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    const user = await this.userService.getUserEntity(payload.sub);
    const newUserToken = this.createUserToken(user);

    return newUserToken;
  }

  public async createUserToken(user: UserEntity): Promise<LoggedUserRdo> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        },
      );

      return fillDto(LoggedUserRdo, {
        ...user.toPOJO(),
        accessToken,
        refreshToken,
      });
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
