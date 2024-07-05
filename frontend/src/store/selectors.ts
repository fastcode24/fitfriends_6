import { State } from "@store/state";

export const getAuthorizationStatus = (state: State) => state.authorizationStatus;

export const getAuthUser = (state: State) => state.authUser;

export const getUser = (state: State) => state.user.data;

export const getUsers = (state: State) => state.allUsers.data;

export const getFriends = (state: State) => state.friends.data;

export const getTraining = (state: State) => state.training.data;

export const getReview = (state: State) => state.review.data;

export const getNotify = (state: State) => state.notify.data;

export const getBalance = (state: State) => state.balance.data;

export const getOrders = (state: State) => state.orders.data;

export const getCatalogTrainings = (state: State) => state.catalogTrainings.data;

export const getRelatedTrainings = (state: State) => state.relatedTrainings.data;

export const getFeaturedTrainings = (state: State) => state.featuredTrainings.data;

export const getPopularTrainings = (state: State) => state.popularTrainings.data;

export const getActiveTraining = (state: State) => state.activeTraining;

export const getError = (state: State) => state.error;
