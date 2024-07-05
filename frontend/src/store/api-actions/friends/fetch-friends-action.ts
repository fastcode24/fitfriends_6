import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FriendsParams, Users } from '../../../types';
import { AppDispatch, State } from '../../state';
import { setError, loadFriends } from '../../action';
import { APIRoute } from '../../../const';
import { buildQueryString } from '../../../utils';

export const fetchFriendsAction = createAsyncThunk<void, FriendsParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFriends',
  async (params, {dispatch, extra: api}) => {
    dispatch(loadFriends({isLoading: true, data: null}));

    const queryString = buildQueryString<FriendsParams>(params);

    try {
      const { data } = await api.get<Users>(`${APIRoute.Friends}?${queryString}`);
      dispatch(loadFriends({isLoading: false, data}));
    } catch (error) {
      dispatch(loadFriends({isLoading: false, data: null}));
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
