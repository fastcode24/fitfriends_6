import { AxiosInstance } from 'axios';
import { APIRoute } from '@/const';
import { saveAccessToken } from '@services/token-service';

export const refreshAccessTokenService = async (api: AxiosInstance, refreshToken: string) => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    };

    const { data } = await api.post(APIRoute.RefreshToken, { }, config);
    const { accessToken } = data;

    saveAccessToken(accessToken);

    return accessToken;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};
