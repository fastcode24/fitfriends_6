import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class IsFriendRdo {
  @ApiPropertyOptional({
    description: 'Является ли другом',
    example: true,
  })
  @Expose()
  public isFriend?: boolean;
}
