import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../state';
import { setError } from '../../action';
import { APIRoute  } from '../../../const';

export const deleteNotifyAction = createAsyncThunk<void, { id: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/deleteNotify',
  async ({ id }, {dispatch, extra: api}) => {

    try {
      await api.delete(`${APIRoute.Notify}/${id}`);
    } catch (error) {
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
