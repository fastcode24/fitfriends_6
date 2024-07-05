import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../state';
import { APIRoute } from '../../../const';
import { setError } from '../../action';

export const spendBalanceAction = createAsyncThunk<void, String, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/spendBalance',
  async (trainingId, { dispatch, extra: api }) => {
    try {
      await api.patch(`${APIRoute.Balance}/${trainingId}`);
    } catch (error) {
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
