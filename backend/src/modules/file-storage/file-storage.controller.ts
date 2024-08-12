import { Controller, HttpStatus, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public, Role } from "src/libs/decorators";
import { UserRole } from "src/libs/types";
import { NotAuthGuard, RoleGuard } from "src/libs/guards";
import { UploadRdo } from "./rdo";
import { FileValidationPipe } from "src/libs/pipes";
import { FileFilterException } from "src/libs/exceptions";
import { FileParams, VideoParams } from "src/app.const";
import { FileStorageService } from "./file-storage.service";

@ApiTags('Загрузка файлов')
@Controller('upload')
export class FileStorageController {
  constructor(private readonly fileStorageService: FileStorageService) {}

  @ApiOperation({
    summary: 'Загрузка изображения или pdf'
  })
  @ApiResponse({
    type: UploadRdo,
    status: HttpStatus.CREATED,
    description: 'Файл успешно загружен',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth('access-token')
  @Post('file')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: FileFilterException(FileParams.MimeTypes, FileParams.MaxSize),
    }),
  )
  public async uploadFile(
    @UploadedFile(FileValidationPipe) file: Express.Multer.File
  ) {
    console.log(file);
    return this.fileStorageService.saveFile(file);
  }

  @ApiOperation({
    summary: 'Загрузка видео'
  })
  @ApiResponse({
    type: UploadRdo,
    status: HttpStatus.CREATED,
    description: 'Видео успешно загружено',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth('access-token')
  @Role(UserRole.Coach)
  @UseGuards(RoleGuard)
  @Post('video')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: FileFilterException(VideoParams.MimeTypes),
    }),
  )
  public async uploadVideo(@UploadedFile(FileValidationPipe) file: Express.Multer.File) {
    return this.fileStorageService.saveFile(file);
  }
}
