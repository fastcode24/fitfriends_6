import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Balances, FetchBalanceParams } from '../../../types';
import { loadBalance, setError } from '../../action';
import { APIRoute } from '../../../const';
import { AppDispatch, State } from '../../state';

export const fetchBalanceAction = createAsyncThunk<void, FetchBalanceParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchBalance',
  async (params, {dispatch, extra: api}) => {
    dispatch(loadBalance({isLoading: true, data: null}));

    const searchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      const value = params[key as keyof typeof params];
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    try {
      const {data} = await api.get<Balances>(`${APIRoute.Balance}?${searchParams.toString()}`);
      dispatch(loadBalance({isLoading: false, data}));
    } catch (error) {
      dispatch(loadBalance({isLoading: false, data: null}));
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
