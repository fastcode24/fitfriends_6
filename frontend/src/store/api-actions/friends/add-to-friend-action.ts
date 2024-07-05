import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../state';
import { setError } from '../../action';
import { APIRoute } from '../../../const';

export const addToFriendAction = createAsyncThunk<void, { friendId: String }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addToFriend',
  async ({ friendId }, { dispatch, extra: api }) => {
    try {
      await api.post(APIRoute.AddFriend, {friendId});
    } catch (error) {
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
