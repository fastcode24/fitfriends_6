import { APIRoute } from '@/const';
import { api } from '@store/index';
import { CreateUser, Metro, Gender, UserRole } from '@types';
import { AxiosError } from 'axios';

export interface RegisteredUser {
  id: string,
  createdAt: string,
  name: string,
  email: string,
  avatar?: string,
  birthday?: string | null,
  metro: Metro,
  gender: Gender,
  role: UserRole
}

export const registerUserService = async (user: CreateUser): Promise<RegisteredUser> => {
  try {
    const { data } = await api.post<RegisteredUser>(`${APIRoute.Register}`, user);
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const errorMessage = error.response.data.message || 'Ошибка при регистрации';
      throw new Error(errorMessage);
    } else {
      throw new Error('Ошибка при регистрации');
    }
  }
};
