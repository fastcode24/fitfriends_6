import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../state';
import { checkFriends, setError } from '../../action';
import { APIRoute } from '../../../const';

export const checkFriendAction = createAsyncThunk<void, { friendId: String }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/checkFriend',
  async ({ friendId }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get(`${APIRoute.Friend}/${friendId}`);
      dispatch(checkFriends({isLoading: false, data}));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError(String(error)));
      }
    }
  },
);
