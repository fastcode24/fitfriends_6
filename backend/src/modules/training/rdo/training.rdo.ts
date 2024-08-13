import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Level, Gender, TrainingType, TrainingTime } from 'src/libs/types';

export class TrainingRdo {
  @ApiProperty({
    description: 'Уникальный ID тренировки',
    example: 'ec998270-3efc-48ee-b3a6-2684ddd278b1',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Дата создания тренировки',
    example: '2024-04-08T12:25:09.716Z',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Название тренировки',
    example: 'Тренировка на пляже',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Фоновое изображение для страницы тренировки',
    example: 'background.jpg',
  })
  @Expose()
  public background: string;

  @ApiProperty({
    description: 'Уровень подготовки пользователя',
    example: 'новичок',
  })
  @Expose()
  public level: Level;

  @ApiProperty({
    description: 'Тип тренировки',
    example: 'йога',
  })
  @Expose()
  public trainingType: TrainingType;

  @ApiProperty({
    description: 'Длительность тренировки',
    example: '10-30 мин',
  })
  @Expose()
  public trainingTime: TrainingTime;

  @ApiProperty({
    description: 'Стоимость тренировки',
    example: 500,
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Калорий на тренировку',
    example: 500,
  })
  @Expose()
  public calories: number;

  @ApiProperty({
    description: 'Описание тренировки',
    example: 'Прекрасная тренировка на пляже средиземноморья',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Пол пользователя',
    example: 'женский',
  })
  @Expose()
  public gender: Gender;

  @ApiProperty({
    description: 'Видео тренировки',
    example: 'https://app.fitriends.click/uploads/2024/08/video.mp4',
  })
  @Expose()
  public video: string;

  @ApiProperty({
    description: 'Рейтинг тренировки',
    example: 5,
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'ID тренера',
    example: '0fe7dbca-7249-4c1d-bc5e-c60b3b369783',
  })
  @Expose()
  public coachId: string;

  @ApiProperty({
    description: 'Флаг спецпредложения',
    example: 'true',
  })
  @Expose()
  public isFeatured: boolean;
}
