import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Metro, Level, UserRole, Gender, TrainingType } from 'src/libs/types';

export class UserRdo {
  @ApiProperty({
    description: 'Уникальный ID пользователя',
    example: '002703b8-7ec1-4e94-b17d-1b9699149b85',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Иван',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Аватар пользователя',
    example: 'image.jpg',
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'пользователь',
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'Пол пользователя',
    example: 'мужской',
  })
  @Expose()
  public gender: Gender;

  @ApiProperty({
    description: 'Станция метро пользователя',
    example: 'Пионерская',
  })
  @Expose()
  public metro: Metro;

  @ApiProperty({
    description: 'Уровень подготовки пользователя',
    example: 'новичок',
  })
  @Expose()
  public level: Level;

  @ApiProperty({
    description: 'Типы тренировок пользователя',
    example: ['йога', 'бег'],
  })
  @Expose()
  public trainingType: TrainingType[];

  @ApiProperty({
    description: 'Готовность к тренировке?',
    example: 'true',
  })
  @Expose()
  public isReady: boolean;
}
