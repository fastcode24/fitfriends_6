import { Expose } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender, Metro, UserRole } from 'src/libs/types';

export class CreateUserRdo {
  @ApiProperty({
    description: 'Уникальный ID пользователя',
    example: '002703b8-7ec1-4e94-b17d-1b9699149b85',
  })
  @Expose()
  public id: string;

  @ApiPropertyOptional({
    description: 'Дата регистрации пользователя',
    example: '1981-03-12',
  })
  @Expose()
  public createdAt?: Date;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@fitfriends.local',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'image.jpg',
  })
  @Expose()
  public avatar: string;

  @ApiPropertyOptional({
    description: 'День рождения пользователя',
    example: '1981-03-12',
  })
  @Expose()
  public birthday?: string;

  @ApiProperty({
    description: 'Станция метро пользователя',
    example: 'Пионерская',
  })
  @Expose()
  public metro: Metro;

  @ApiProperty({
    description: 'Пол пользователя',
    example: 'мужской',
  })
  @Expose()
  public gender: Gender;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'пользователь',
  })
  @Expose()
  public role: UserRole;
}
