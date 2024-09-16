import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Review } from '../../../types';
import { APIRoute } from '../../../const';
import { setError } from '../../action';
import { AppDispatch, State } from '../../state';

export const createReviewAction = createAsyncThunk<void, Review, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/createReview',
  async (body, { dispatch, extra: api }) => {
    try {
      const {data} = await api.post<Review>(`${APIRoute.Review}`, body);
    } catch (error) {
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
