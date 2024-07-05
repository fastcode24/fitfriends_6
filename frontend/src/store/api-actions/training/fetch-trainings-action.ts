import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchTrainingsParams, TrainingRequest, Trainings } from '../../../types';
import { loadFeaturedTrainings, loadPopularTrainings, loadRelatedTrainings, setError, loadCatalogTrainings } from '../../action';
import { APIRoute, FEATURED_DISCOUNT } from '../../../const';
import { buildQueryString } from '../../../utils';
import { AppDispatch, State } from '../../state';

export const fetchTrainingsAction = createAsyncThunk<void, FetchTrainingsParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchTrainings',
  async (params, {dispatch, extra: api}) => {
    const { storeName, ...apiParams } = params;

    switch (storeName) {
      case TrainingRequest.Related:
        dispatch(loadRelatedTrainings({isLoading: true, data: null}));
        break;
      case TrainingRequest.Featured:
        dispatch(loadFeaturedTrainings({isLoading: true, data: null}));
        break;
      case TrainingRequest.Popular:
        dispatch(loadPopularTrainings({isLoading: true, data: null}));
        break;
      case TrainingRequest.Catalog:
        dispatch(loadCatalogTrainings({isLoading: true, data: null}));
        break;
      default:
        throw new Error('Unknown storeName');
    }

    const queryString = buildQueryString(apiParams);

    if (storeName === TrainingRequest.Related) {
      try {
        const MIN_RELATED_ITEMS = 3;
        let relatedData = await api.get<Trainings>(`${APIRoute.Training}?${queryString}`);

        const excludeFields = ['level', 'trainingTime', 'trainingType'];
        let excludeIndex = 0;

        while (relatedData.data.trainings.length < MIN_RELATED_ITEMS && excludeIndex < excludeFields.length) {
          const currentExcludes = excludeFields.slice(0, excludeIndex + 1);
          const newQueryString = buildQueryString(apiParams, currentExcludes);
          relatedData = await api.get<Trainings>(`${APIRoute.Training}?${newQueryString}`);
          excludeIndex++;
        }

        dispatch(loadRelatedTrainings({isLoading: false, data: relatedData.data}));
      } catch (error) {
        dispatch(loadRelatedTrainings({isLoading: false, data: null}));
        dispatch(setError('Error connection to the server'));
        throw error;
      }
    }
    else try {
      const {data} = await api.get<Trainings>(`${APIRoute.Training}?${queryString}`);

      data.trainings.forEach(training => {
        if (training.isFeatured) {
          training.price *= FEATURED_DISCOUNT;
        }
      });

      if (storeName === TrainingRequest.Catalog) {
        const countData = await api.get<Trainings>(APIRoute.Training);
        countData.data.trainings.forEach(training => {
          if (training.isFeatured) {
            training.price *= FEATURED_DISCOUNT;
          }
        });
        const minPrice = Math.min(...countData.data.trainings.map(t => t.price));
        const maxPrice = Math.max(...countData.data.trainings.map(t => t.price));
        const minCalories = Math.min(...countData.data.trainings.map(t => t.calories));
        const maxCalories = Math.max(...countData.data.trainings.map(t => t.calories));

        const updatedData = {
          ...data,
          minPrice,
          maxPrice,
          minCalories,
          maxCalories
        };

        dispatch(loadCatalogTrainings({isLoading: false, data: updatedData}));
      } else if (storeName === TrainingRequest.Featured) {
        dispatch(loadFeaturedTrainings({isLoading: false, data}));
      } else if (storeName === TrainingRequest.Popular) {
        dispatch(loadPopularTrainings({isLoading: false, data}));
      }

    } catch (error) {
      dispatch(setError('Error connection to the server'));
      throw error;
    }
  },
);
