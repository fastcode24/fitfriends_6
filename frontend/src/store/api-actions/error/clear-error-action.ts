import { createAsyncThunk } from '@reduxjs/toolkit';
import { TIMEOUT_SHOW_ERROR } from '../../../const';
import { store } from '../..';
import { setError } from '../../action';

export const clearErrorAction = createAsyncThunk(
  'data/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  },
);
