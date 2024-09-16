import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Training } from '../../../types';
import { AppDispatch, State } from '../../state';
import { APIRoute } from '../../../const';
import { setError } from '../../action';

export const createTrainingAction = createAsyncThunk<void, Training, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/createTraining',
  async (body, { dispatch, extra: api }) => {
    try {
      const {data} = await api.post(`${APIRoute.Training}`, body);
    } catch (error) {
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
