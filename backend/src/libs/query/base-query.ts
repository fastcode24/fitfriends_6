import { IsEnum, IsNumber, IsOptional, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SortDirection } from 'src/libs/types';
import { LIST_LIMIT } from 'src/app.const';

export class BaseQuery {
  @ApiPropertyOptional({ description: 'Лимит пользователей для вывода', type: Number })
  @Transform(({ value }) => +value)
  @IsNumber()
  @Max(LIST_LIMIT)
  @IsOptional()
  public limit?: number;

  @ApiPropertyOptional({ description: 'Направление сортировки', enum: SortDirection })
  @Transform(({ value }) => value)
  @IsEnum(SortDirection)
  @IsOptional()
  public sort?: SortDirection;

  @ApiPropertyOptional({ description: 'Номер страницы', type: Number })
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  public page?: number;
}
