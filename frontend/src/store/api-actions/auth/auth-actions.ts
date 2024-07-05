import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Base64 } from 'js-base64';
import { AuthData, UserData, FullUser } from '../../../types';
import { clearUserData, loadUser, requireAuthorization, setError, setAuthUser } from '../../action';
import { APIRoute, AuthorizationStatus } from '../../../const';
import { clearTokens, dropAccessToken, dropRefreshToken, getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken } from '../../../services/token-service';
import { AppDispatch, State } from '../../state';

const checkTokenExpired = (token: string): boolean => {
  console.log('token:', token);
  try {
    console.log('Проверяю токен на просроченность');
    const parts = token.split('.');

    if (parts.length !== 3) {
      console.error('Неверный формат токена');
      return true;
    }

    const payload = JSON.parse(Base64.decode(parts[1]));
    const result = payload.exp < Date.now() / 1000;
    console.log('Токен просрочен?', result);
    return result;
  } catch (error) {
    console.error('Ошибка при проверке токена:', error);
    return true;
  }
};

const refreshAccessToken = async (api: AxiosInstance, refreshToken: string) => {
  try {
    const { data } = await api.post('/api/refresh-token', { refreshToken });
    const { accessToken } = data;
    saveAccessToken(accessToken);
    return accessToken;
  } catch (error) {
    throw new Error('Failed to refresh token');
  }
};

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    let accessToken = getAccessToken();
    let isTokenExpired = checkTokenExpired(accessToken);

    if (accessToken && isTokenExpired) {
      console.log('Токен просрочен:', isTokenExpired);
      const refreshToken = getRefreshToken();
      const isRefreshExpired = checkTokenExpired(refreshToken)
      if (refreshToken && !isRefreshExpired) {
        try {
          accessToken = await refreshAccessToken(api, refreshToken);
          console.log('Перевыпустил токен:', accessToken);
        } catch {
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

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const result = await api.post<UserData>(APIRoute.Login, {email, password});
    console.log(result);
    const {data: {accessToken, refreshToken, id, role}} = await api.post<UserData>(APIRoute.Login, {email, password});

    if (accessToken) {
      saveAccessToken(accessToken);
    }

    if (refreshToken) {
      saveRefreshToken(refreshToken);
    }

    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setAuthUser({id, email, role}));
    console.log('Авторизирован с ролью:', role);
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    const refreshToken = getRefreshToken();
    dropAccessToken();

    if (refreshToken) {
      await api.delete(APIRoute.Logout, {
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      });
    }

    dropRefreshToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(clearUserData());
    delete api.defaults.headers.common['Authorization'];
  },
);
