import { IsBoolean, IsOptional } from 'class-validator';
import { BaseQuery } from 'src/libs/query';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class BalanceQuery extends BaseQuery {
  @ApiPropertyOptional({ description: 'Только активные тренировки', type: Boolean  })
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  public isActive?: boolean;
}
