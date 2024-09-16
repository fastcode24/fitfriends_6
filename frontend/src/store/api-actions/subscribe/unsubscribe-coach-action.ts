import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../state';
import { setError } from '../../action';
import { APIRoute } from '../../../const';

export const unsubscribeCoachAction = createAsyncThunk<void, { coachId: String }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/removeFromFriend',
  async ({ coachId }, { dispatch, extra: api }) => {
    try {
      await api.delete(`${APIRoute.Subscribe}/${coachId}`);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError(String(error)));
      }
      throw error;
    }
  },
);
