import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, Max, Min } from "class-validator";
import { Expose } from "class-transformer";
import { BaseUserDto } from ".";
import { TrainingTime } from "src/libs/types";
import { DtoValidationMessage } from "src/libs/messages";
import { Calories } from "src/app.const";

export class CustomerDto extends BaseUserDto {
  @ApiPropertyOptional({
    description: 'Предпочитаемая длительность тренировки',
    example: '10-30 мин',
  })
  @IsOptional()
  @IsEnum(TrainingTime, {
    message: DtoValidationMessage.trainingTime.invalidFormat,
  })
  @Expose()
  public trainingTime?: TrainingTime;

  @ApiPropertyOptional({
    description: 'Калорий к сбросу всего',
    example: '3200',
  })
  @IsOptional()
  @IsNumber()
  @Min(Calories.Min, { message: DtoValidationMessage.calories.value })
  @Max(Calories.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public calories?: number;

  @ApiPropertyOptional({
    description: 'Калорий к сбросу в день',
    example: '1000',
  })
  @IsOptional()
  @IsNumber()
  @Min(Calories.Min, { message: DtoValidationMessage.calories.value })
  @Max(Calories.Max, { message: DtoValidationMessage.calories.value })
  @Expose()
  public caloriesPerDay?: number;
}
