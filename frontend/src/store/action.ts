import { createAction } from '@reduxjs/toolkit';
import {AuthorizationStatus} from '@/const';
import { UserData, LoadUsersPayload, LoadUserPayload, LoadTrainingPayload, LoadReviewPayload, LoadNotifyPayload, LoadBalancePayload, LoadOrdersPayload, LoadTrainingsPayload, CheckFriendPayload } from '@types';

export const loadUsers = createAction<LoadUsersPayload>('mainScreen/loadUsers');

export const loadFriends = createAction<LoadUsersPayload>('user/loadFriends');

export const checkFriends = createAction<CheckFriendPayload>('user/checkFriends');

export const loadUser = createAction<LoadUserPayload>('user/fullInfo');

export const loadTraining = createAction<LoadTrainingPayload>('training/loadTraining');

export const loadReview = createAction<LoadReviewPayload>('training/loadReview');

export const loadNotify = createAction<LoadNotifyPayload>('user/loadNotify');

export const loadBalance = createAction<LoadBalancePayload>('user/loadBalance');

export const loadOrders = createAction<LoadOrdersPayload>('coach/loadOrders');

export const loadCatalogTrainings = createAction<LoadTrainingsPayload>('myTrainingsPage/loadCatalogTrainings');

export const loadRelatedTrainings = createAction<LoadTrainingsPayload>('mainPage/loadRelatedTrainings');

export const loadFeaturedTrainings = createAction<LoadTrainingsPayload>('mainPage/loadFeaturedTrainings');

export const loadPopularTrainings = createAction<LoadTrainingsPayload>('mainPage/loadPopularTrainings');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setAuthUser = createAction<UserData>('user/authUser');

export const setActiveTraining = createAction<string | null>('user/activeTraining');

export const clearUserData = createAction('user/clearData');

export const setError = createAction<string | null>('data/setError');
