import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsInt, IsString } from "class-validator";
import { Gender, TrainingTime, TrainingType } from "src/libs/types";

export class MailNewTrainingDto {
  @ApiPropertyOptional({
    description: 'Почта пользователя',
    example: 'local@fitfriends.local',
  })
  @IsString()
  @Expose()
  public email: string;

  @ApiPropertyOptional({
    description: 'Имя пользователя',
    example: 'Алексей',
  })
  @IsString()
  @Expose()
  public userName: string;

  @ApiPropertyOptional({
    description: 'Имя тренера',
    example: 'Борис',
  })
  @IsString()
  @Expose()
  public coachName: string;

  @ApiPropertyOptional({
    description: 'Название тренировки',
    example: 'Тренировка на пляже в июне',
  })
  @IsString()
  @Expose()
  public title: string;

  @ApiPropertyOptional({
    description: 'Описание тренировки',
    example: 'Позанимаемся йогой под палящим солнцем и все сгорим',
  })
  @IsString()
  @Expose()
  public description: string;

  @ApiPropertyOptional({
    description: 'Пол пользователя, на кого расчитано',
    example: 'неважно',
  })
  @IsString()
  @Expose()
  public gender: Gender;

  @ApiPropertyOptional({
    description: 'Тип тренировки',
    example: 'йога',
  })
  @IsString()
  @Expose()
  public trainingType: TrainingType;

  @ApiPropertyOptional({
    description: 'Длительность тренировки',
    example: '10-30 мин',
  })
  @IsString()
  @Expose()
  public trainingTime: TrainingTime;

  @ApiPropertyOptional({
    description: 'Калорий сгорит',
    example: '500',
  })
  @IsInt()
  @Expose()
  public calories: number;

  @ApiPropertyOptional({
    description: 'Стоимость тренировки',
    example: '5000',
  })
  @IsInt()
  @Expose()
  public price: number;
}
