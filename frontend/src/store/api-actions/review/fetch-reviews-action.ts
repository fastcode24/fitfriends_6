import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchReviewsParams, FullReview, FullUser, Reviews } from '../../../types';
import { loadReview, setError } from '../../action';
import { APIRoute } from '../../../const';
import { AppDispatch, State } from '../../state';

export const fetchReviewsAction = createAsyncThunk<void, FetchReviewsParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (params, {dispatch, extra: api}) => {
    const { trainingId, ...apiParams } = params;
    dispatch(loadReview({isLoading: true, data: null}));

    const searchParams = new URLSearchParams();
    Object.keys(apiParams).forEach(key => {
      const value = apiParams[key as keyof typeof apiParams];
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    try {
      const {data} = await api.get<Reviews>(`${APIRoute.Review}/${trainingId}?${searchParams.toString()}`);
      const reviews = data.reviews;

      const fullReviews: FullReview[] = await Promise.all(reviews.map(async (review) => {
        const userResponse = await api.get<FullUser>(`${APIRoute.Users}/${review.userId}`);
        const user = userResponse.data;
        return {
          ...review,
          userName: user.name,
          userAvatar: user.avatar
        };
      }));

      dispatch(loadReview({isLoading: false, data: fullReviews}));
    } catch (error) {
      dispatch(loadReview({isLoading: false, data: null}));
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
