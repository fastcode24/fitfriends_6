import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File): Express.Multer.File {
    if (file === undefined || file === null) {
      throw new BadRequestException('Файл не был загружен');
    }

    return file;
  }
}
