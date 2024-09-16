import { Balances, CoachOrders, FullReview, FullTraining, FullUser, Notify, Trainings, UserData, Users } from '@types';
import { AuthorizationStatus } from '@/const';

export type InitialState = {
  allUsers: {
    isLoading: boolean;
    data: Users | null;
  };
  friends: {
    isLoading: boolean;
    data: Users | null;
  };
  isFriend: {
    isLoading: boolean;
    data: { isFriend: boolean } | null;
  };
  user: {
    isLoading: boolean;
    data: FullUser | null;
  };
  training: {
    isLoading: boolean;
    data: FullTraining | null;
  };
  review: {
    isLoading: boolean;
    data: FullReview[] | null;
  };
  notify: {
    isLoading: boolean;
    data: Notify[] | null;
  };
  balance: {
    isLoading: boolean;
    data: Balances | null;
  };
  orders: {
    isLoading: boolean;
    data: CoachOrders | null;
  };
  catalogTrainings: {
    isLoading: boolean;
    data: Trainings | null;
  };
  relatedTrainings: {
    isLoading: boolean;
    data: Trainings | null;
  };
  featuredTrainings: {
    isLoading: boolean;
    data: Trainings | null;
  };
  popularTrainings: {
    isLoading: boolean;
    data: Trainings | null;
  };
  authorizationStatus: AuthorizationStatus;
  activeTraining: string | null;
  authUser: UserData;
  error: string | null;
};
