import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { CoachOrders, FetchOrdersParams } from '../../../types';
import { loadOrders, setError } from '../../action';
import { APIRoute } from '../../../const';
import { AppDispatch, State } from '../../state';

export const fetchOrdersAction = createAsyncThunk<void, FetchOrdersParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOrders',
  async (params, {dispatch, extra: api}) => {
    dispatch(loadOrders({isLoading: true, data: null}));

    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      const value = params[key as keyof typeof params];
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    try {
      const {data} = await api.get<CoachOrders>(`${APIRoute.Orders}?${searchParams.toString()}`);
      dispatch(loadOrders({isLoading: false, data}));
    } catch (error) {
      dispatch(loadOrders({isLoading: false, data: null}));
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
