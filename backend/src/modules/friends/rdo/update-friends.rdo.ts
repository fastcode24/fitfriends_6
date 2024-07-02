import { ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UpdateFriendsRdo {
  @ApiPropertyOptional({
    description: 'Сообщение',
    example: 'Пользователь c id a401cf33-ad13-4fc7-8f1f-7efa3de132d1 успешно добавлен в друзья / удален из друзей',
  })
  @Expose()
  public message?: string;
}
