import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthData, UserData } from '@types';
import { requireAuthorization, setAuthUser } from '../../action';
import { APIRoute, AuthorizationStatus } from '@/const';
import { saveAccessToken, saveRefreshToken } from '@services/token-service';
import { AppDispatch, State } from '../../state';

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const result = await api.post<UserData>(APIRoute.Login, {email, password});
    const {data: {accessToken, refreshToken, id, role}} = await api.post<UserData>(APIRoute.Login, {email, password});

    if (accessToken) {
      saveAccessToken(accessToken);
    }

    if (refreshToken) {
      saveRefreshToken(refreshToken);
    }

    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setAuthUser({id, email, role}));
  },
);
