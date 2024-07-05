import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullUser } from '../../../types';
import { loadUser, setError } from '../../action';
import { APIRoute  } from '../../../const';
import { AppDispatch, State } from '../../state';

export const updateUserAction = createAsyncThunk<void, { id: string, updateData: Partial<FullUser> }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/updateUser',
  async ({ id, updateData }, { dispatch, extra: api }) => {
    dispatch(loadUser({ isLoading: true, data: null }));

    try {
      const { data } = await api.patch<FullUser>(`${APIRoute.Users}/${id}`, updateData);
      dispatch(loadUser({ isLoading: false, data }));
    } catch (error) {
      dispatch(loadUser({ isLoading: false, data: null }));
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
