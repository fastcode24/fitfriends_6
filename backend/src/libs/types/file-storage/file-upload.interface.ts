export interface FileUpload {
  id?: string;
  createdAt?: string;
  fileName: string;
  originalName: string;
  hash?: string;
  directory?: string;
  path: string;
  mimetype: string;
  size: number;
}
