import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Users} from '../../../types';
import { loadUsers, setError } from '../../action';
import { APIRoute } from '../../../const';
import { buildQueryString } from '../../../utils';
import { UsersFilterParams } from '../../../types';
import { AppDispatch, State } from '../../state';

export const fetchUsersAction = createAsyncThunk<void, UsersFilterParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchUsers',
  async (params, {dispatch, extra: api}) => {
    dispatch(loadUsers({isLoading: true, data: null}));

    const queryString = buildQueryString<UsersFilterParams>(params);

    try {
      const { data } = await api.get<Users>(`${APIRoute.Users}?${queryString}`);
      dispatch(loadUsers({isLoading: false, data}));
    } catch (error) {
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
