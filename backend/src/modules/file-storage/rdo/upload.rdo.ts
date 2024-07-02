import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UploadRdo {
  @ApiProperty({
    description: 'ID загруженного файла',
    example: '002703b8-7ec1-4e94-b17d-1b9699149b85',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Исходное имя файла',
    example: 'image.png',
  })
  @Expose()
  public originalName: string;

  @ApiProperty({
    description: 'Имя загруженного файла',
    example: '3822bc22-3f95-4fac-ac90-4d942dcd0f84.png',
  })
  @Expose()
  public fileName: string;

  @ApiProperty({
    description: 'Путь к файлу',
    example: 'https://fitfriends.local/images/image.png',
  })
  @Expose()
  public path: string;

  @ApiProperty({
    description: 'mimetype',
    example: 'image/png',
  })
  @Expose()
  public mimetype: string;

  @ApiProperty({
    description: 'Размер файла',
    example: '1048576',
  })
  @Expose()
  public size: number;
}
