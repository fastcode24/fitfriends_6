import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsInt, Max, Min } from "class-validator";
import { DtoValidationMessage } from "src/libs/messages";
import { BaseAuthDto } from "./base-auth.dto";
import { Calories } from "src/app.const";
import { TrainingTime } from "src/libs/types";

export class CreateCustomerDto extends BaseAuthDto {
  @ApiProperty({
    description: 'Калорий к сбросу',
    example: '3200',
  })
  @IsInt()
  @Min(Calories.Min, { message: DtoValidationMessage.calories.value })
  @Max(Calories.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public calories: number;

  @ApiProperty({
    description: 'Калорий к сбросу в день',
    example: '1000',
  })
  @IsInt()
  @Min(Calories.Min, { message: DtoValidationMessage.calories.value })
  @Max(Calories.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public caloriesPerDay: number;

  @ApiProperty({
    description: 'Желательная длительность тренировки',
    example: '10-30 мин',
  })
  @IsEnum(TrainingTime, {
    message: DtoValidationMessage.trainingTime.invalidFormat,
  })
  @Expose()
  public trainingTime: TrainingTime;
}
