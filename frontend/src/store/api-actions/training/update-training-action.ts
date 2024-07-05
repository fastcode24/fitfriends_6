import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { EditableTrainingData } from '../../../types';
import { APIRoute } from '../../../const';
import { setError } from '../../action';
import { AppDispatch, State } from '../../state';

export const updateTrainingAction = createAsyncThunk<void, { id: String, editableData: EditableTrainingData }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/updateTraining',
  async ({id, editableData}, { dispatch, extra: api }) => {
    try {
      await api.patch(`${APIRoute.Training}/${id}`, editableData);
    } catch (error) {
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
