import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../../state';
import { APIRoute } from '../../../const';

export const createBookingAction = createAsyncThunk<void, { recipientId: String }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/createBooking',
  async ({ recipientId }, { extra: api, rejectWithValue }) => {
    try {
      await api.post(APIRoute.AddFriend, {recipientId});
    } catch (error) {
      return rejectWithValue('An error occurred while subscribing');
    }
  },
);
