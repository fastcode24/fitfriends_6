import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FullUser, UserRole,  Training, Balances, FullTraining } from '../../../types';
import { loadTraining, setError } from '../../action';
import { APIRoute } from '../../../const';
import { AppDispatch, State } from '../../state';

export const fetchTrainingAction = createAsyncThunk<void, { id: String, role: String }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchTraining',
  async ({ id, role }, {dispatch, extra: api}) => {
    dispatch(loadTraining({isLoading: true, data: null}));
    try {
      const trainingResponse  = await api.get<Training>(`${APIRoute.Training}/${id}`);

      let balanceResponse;
      let count = 0;

      if (role === UserRole.Customer) {
        balanceResponse = await api.get<Balances>(APIRoute.Balance);

        const balances = balanceResponse.data.balances;
        const balance = balances.find(balance => balance.training.id === id);

        if (balance) {
          count = balance.count;
        }
      }

      const userResponse = await api.get<FullUser>(`${APIRoute.Users}/${trainingResponse.data.coachId}`);

      const fullTraining: FullTraining = {
        ...trainingResponse.data,
        coachName: userResponse.data.name,
        coachAvatar: userResponse.data.avatar,
        count
      };

      dispatch(loadTraining({isLoading: false, data: fullTraining}));
    } catch (error) {
      dispatch(loadTraining({isLoading: false, data: null}));
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
