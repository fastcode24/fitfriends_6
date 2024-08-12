import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullUser } from '@types';
import { clearUserData, loadUser, requireAuthorization, setError, setAuthUser } from '../../action';
import { APIRoute, AuthorizationStatus } from '@/const';
import { clearTokens, getAccessToken, getRefreshToken } from '@services/token-service';
import { AppDispatch, State } from '../../state';
import { checkTokenExpired } from '@utils';
import { refreshAccessTokenService } from '@/services/refresh-access-token-service';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    let accessToken = getAccessToken();
    let isTokenExpired = false;
    if (accessToken) {
      isTokenExpired = checkTokenExpired(accessToken);
    } else {
      console.log('accessToken не найден');
    }

    if (accessToken && isTokenExpired) {
      console.log('Токен есть, но просрочен:', isTokenExpired);
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        console.log('Нашли refreshToken');
      }
      const isRefreshExpired = checkTokenExpired(refreshToken);
      if (isRefreshExpired) {
        console.log('refreshToken просрочен');
      }
      if (refreshToken && !isRefreshExpired) {
        console.log('Пытаюсь перевыпустить accessToken')
        try {
          accessToken = await refreshAccessTokenService(api, refreshToken);
          console.log('Перевыпустил accessToken:', accessToken);
        } catch {
          console.log('Не смог перевыпустить accessToken');
          clearTokens();
          dispatch(clearUserData());
          dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
          return;
        }
      } else {
        clearTokens();
        dispatch(clearUserData());
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
        return;
      }
    }

    if (accessToken) {
      console.log('Вижу, что токен есть:', accessToken);
      api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      try {
        const {data} = await api.get<FullUser>(APIRoute.Login);
        dispatch(loadUser({isLoading: false, data}));
        const { id, email, role } = data;
        if (id) {
          dispatch(requireAuthorization(AuthorizationStatus.Auth));
          dispatch(setAuthUser({id, email, role}));
          console.log('Авторизирован с ролью:', role);
        } else {
          throw new Error('id or role is missing');
        }
      } catch {
        clearTokens();
        dispatch(clearUserData());
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
        dispatch(setError('Error connection to the server'));
      }
    } else {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);
