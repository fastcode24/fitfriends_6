import { AxiosInstance } from 'axios';
import { APIRoute } from '@/const';
import { saveAccessToken } from '@services/token-service';

export const refreshAccessTokenService = async (api: AxiosInstance, refreshToken: string) => {
  try {
    console.log('Сую рефреш токен в роут:', APIRoute.RefreshToken);
    console.log('refreshToken:', refreshToken);

    const config = {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    };

    const { data } = await api.post(APIRoute.RefreshToken, { }, config);
    const { accessToken } = data;

    console.log('accessToken перевыпущен');
    saveAccessToken(accessToken);
    console.log('Сохранил accessToken в локалсторе');

    return accessToken;
  } catch (error) {
    console.log('Ошибка при обновлении токена:', error);
    throw new Error('Failed to refresh token');
  }
};
