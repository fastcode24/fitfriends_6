import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from '../../../types';
import { setError, loadNotify } from '../../action';
import { APIRoute } from '../../../const';
import { AppDispatch, State } from '../../state';

export const fetchNotifyAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNotify',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(loadNotify({isLoading: true, data: null}));

    try {
      const {data} = await api.get<Notify[]>(APIRoute.Notify);
      dispatch(loadNotify({isLoading: false, data}));
    } catch (error) {
      dispatch(loadNotify({isLoading: false, data: null}));
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
