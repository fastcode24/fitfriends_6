import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearUserData, requireAuthorization } from '../../action';
import { APIRoute, AuthorizationStatus } from '@/const';
import { dropAccessToken, dropRefreshToken, getRefreshToken } from '@services/token-service';
import { AppDispatch, State } from '../../state';

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
