import { Injectable } from "@nestjs/common";
import { BasePostgresRepository, DefaultPojoType, PrismaClientService } from "src/libs/models";
import { FileUploadEntity } from "./file-upload.entity";
import { FileUpload } from "src/libs/types";

@Injectable()
export class FileStorageRepository extends BasePostgresRepository<FileUploadEntity> {
  constructor(prismaService: PrismaClientService) {
    super('fileStorage', prismaService, (document: DefaultPojoType) => {
      const fileUpload = document as unknown as FileUpload;
      return FileUploadEntity.fromObject(fileUpload);
    });
  }
}
