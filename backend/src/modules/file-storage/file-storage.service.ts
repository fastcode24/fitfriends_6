import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { join } from 'node:path';
import { ensureDir } from 'fs-extra';
import { writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import * as dayjs from 'dayjs';
import { extension } from 'mime-types';
import { posix as pathPosix } from 'path';
import { appConfig } from 'src/libs/config';
import { fillDto } from 'src/libs/helpers';
import { UploadRdo } from './rdo';
import { FileUploadEntity } from './file-upload.entity';
import { FileStore } from 'src/libs/types';
import { FileParams, VideoParams } from 'src/app.const';
import { FileStorageRepository } from './file-storage.repository';

@Injectable()
export class FileStorageService {
  private readonly logger = new Logger(FileStorageService.name);
  private readonly DATE_FORMAT = 'YYYY MM';

  constructor(
    @Inject(appConfig.KEY)
    private readonly appOptions: ConfigType<typeof appConfig>,
    private readonly fileStorageRepository: FileStorageRepository,
  ) {}

  private getUploadDirectoryPath(): string {
    return this.appOptions.uploadDirectory;
  }

  private getDestinationFilePath(filename: string): string {
    return join(
      this.getUploadDirectoryPath(),
      this.getSubUploadDirectoryPath(),
      filename,
    );
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
    return pathPosix.join('uploads', year, month);
  }

  private async writeFile(file: Express.Multer.File): Promise<FileStore> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const directory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype);
      const fileName = `${randomUUID()}.${fileExtension}`;

      const filePath = this.getDestinationFilePath(fileName);

      await ensureDir(pathPosix.join(uploadDirectoryPath, directory));
      await writeFile(filePath, file.buffer);

      return {
        fileName,
        directory,
        path: filePath.replace(/\\/g, '/'),
      };
    } catch (error) {
      this.logger.error(`Ошибка сохранения файла: ${error.message}`);
      throw new Error(`Не могу сохранить файл`);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<UploadRdo> {
    const storedFile = await this.writeFile(file);
    const filePath = `${this.appOptions.appUrl}/${storedFile.directory}/${storedFile.fileName}`;

    const fileEntity = FileUploadEntity.fromObject({
      fileName: storedFile.fileName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: filePath.replace(/\\/g, '/'),
      size: file.size,
    });

    const savedFile = await this.fileStorageRepository.save(fileEntity);
    return fillDto(UploadRdo, savedFile);
  }

  public async getFile(fileId: string): Promise<UploadRdo> {
    const existFile = await this.fileStorageRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with ${fileId} not found.`);
    }

    return fillDto(UploadRdo, existFile);
  }

  public async isFileImage(fileId: string): Promise<boolean> {
    const file = await this.getFile(fileId);
    return FileParams.MimeTypes.includes(file.mimetype);
  }

  public async isFileVideo(fileId: string): Promise<boolean> {
    const file = await this.getFile(fileId);
    return VideoParams.MimeTypes.includes(file.mimetype);
  }
}
