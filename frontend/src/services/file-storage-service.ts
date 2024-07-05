import { APIRoute } from '@/const';
import { api } from '@store/index';

interface FileUploadResponse {
  id: string;
  originalName: string;
  fileName: string;
  path: string;
  mimetype: string;
  size: number;
}

export const uploadFileService = async (file: File): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const { data } = await api.post<FileUploadResponse>(`${APIRoute.FileUpload}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  } catch (error) {
    throw new Error('Error uploading the file');
  }
};
