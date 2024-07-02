import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional } from "class-validator";
import lodash from "lodash";
import { BaseQuery } from "src/libs/query";
import { SortOrder } from "src/libs/types";

export class OrderQuery extends BaseQuery {
  @ApiPropertyOptional({
    description: 'Сортировка',
    enum: SortOrder,
  })
  @Transform(({ value }) => lodash.lowerCase(value))
  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder;
}
