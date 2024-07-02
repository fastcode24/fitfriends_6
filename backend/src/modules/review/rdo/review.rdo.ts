import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReviewRdo {
  @ApiProperty({
    description: 'Уникальный ID отзыва',
    example: '6c19d1e5-bab0-4f4e-938e-b37e86c15c8a',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Дата создания отзыва',
    example: '2024-04-08T12:25:09.716Z',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'ID автора отзыва',
    example: '002703b8-7ec1-4e94-b17d-1b9699149b85',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'ID тренировки',
    example: 'ec998270-3efc-48ee-b3a6-2684ddd278b1',
  })
  @Expose()
  public trainingId: string;

  @ApiProperty({
    description: 'Оценка тренировки пользователем',
    example: 5,
  })
  @Expose()
  public grade: number;

  @ApiProperty({
    description: 'Текст отзыва',
    example: 'Прекрасная тренировка на пляже средиземноморья, мне понравилось!',
  })
  @Expose()
  public text: string;
}
