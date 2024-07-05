import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewOrderBody, Order } from '../../../types';
import { APIRoute } from '../../../const';
import { setError } from '../../action';
import { AppDispatch, State } from '../../state';

export const createOrderAction = createAsyncThunk<void, NewOrderBody, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/createOrder',
  async (body, { dispatch, extra: api }) => {
    try {
      const {data} = await api.post<Order>(`${APIRoute.Orders}`, body);
      console.log(data);
    } catch (error) {
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
