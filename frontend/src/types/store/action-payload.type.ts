import { Users, FullTraining, Trainings, FullReview, Notify, Balances, CoachOrders, FullUser } from "@types";

export type LoadUsersPayload = {
  isLoading: boolean;
  data: Users | null;
};

export type CheckFriendPayload = {
  isLoading: boolean;
  data: { isFriend: boolean } | null;
};

export type LoadTrainingPayload = {
  isLoading: boolean;
  data: FullTraining | null;
};

export type LoadTrainingsPayload = {
  isLoading: boolean;
  data: Trainings | null;
};

export type LoadReviewPayload = {
  isLoading: boolean;
  data: FullReview[] | null;
};

export type LoadNotifyPayload = {
  isLoading: boolean;
  data: Notify[] | null;
};

export type LoadBalancePayload = {
  isLoading: boolean;
  data: Balances | null;
};

export type LoadOrdersPayload = {
  isLoading: boolean;
  data: CoachOrders | null;
};

export type LoadUserPayload = {
  isLoading: boolean;
  data: FullUser | null;
};
