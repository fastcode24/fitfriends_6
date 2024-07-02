import { Entity } from "src/libs/models";
import { FileUpload } from "src/libs/types";

export class FileUploadEntity implements FileUpload, Entity<string> {
  public id?: string;
  public createdAt?: string;
  public fileName: string;
  public originalName: string;
  public path: string;
  public mimetype: string;
  public size: number;

  constructor(data: FileUpload) {
    this.populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      fileName: this.fileName,
      originalName: this.originalName,
      path: this.path,
      mimetype: this.mimetype,
      size: this.size,
    };
  }

  public populate(data: FileUpload): void {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.fileName = data.fileName;
    this.originalName = data.originalName;
    this.path = data.path;
    this.mimetype = data.mimetype;
    this.size = data.size;
  }

  static fromObject(data: FileUpload): FileUploadEntity {
    return new FileUploadEntity(data);
  }
}
