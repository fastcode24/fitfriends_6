import { Gender, Level, Metro, SortDirection, SortOrder, SortType, TrainingTime, TrainingType, UserRole } from "@types";

export interface BaseFetchParams {
  limit?: number;
  page?: number;
}

export interface FetchReviewsParams extends BaseFetchParams {
  trainingId: string;
  sort?: SortDirection;
}

export interface FetchBalanceParams extends BaseFetchParams {
  isActive: boolean;
}

export interface FetchOrdersParams extends BaseFetchParams {
  sort?: SortDirection;
  sortOrder?: SortOrder;
}

export interface FriendsParams extends BaseFetchParams {
  sort?: SortDirection;
}

export interface UsersFilterParams extends BaseFetchParams {
  sort?: SortDirection;
  trainingType?: TrainingType[];
  metro?: Metro[];
  level?: Level;
  role?: UserRole;
  isReady?: boolean;
}

export interface FetchTrainingsParams extends BaseFetchParams {
  storeName: 'related' | 'featured' | 'popular' | 'catalog';
  sort?: SortDirection;
  sortType?: SortType;
  coachId?: string;
  priceFrom?: number;
  priceTo?: number;
  caloriesFrom?: number;
  caloriesTo?: number;
  trainingTime?: TrainingTime[];
  trainingType?: TrainingType[];
  genderExclude?: Gender;
  level?: Level;
  isFeatured?: boolean;
}
