export const BACKEND_URL = 'http://localhost:3000';

export const REQUEST_TIMEOUT = 5000;
export const TIMEOUT_SHOW_ERROR = 2000;
export const MESSAGE_SHORT_TIMEOUT = 750;
export const MESSAGE_LONG_TIMEOUT = 750;

export const DEFAULT_ITEMS_LIMIT = 3; //TODO поставить 6
export const DEFAULT_ORDERS_LIMIT = 4;

export const FEATURED_DISCOUNT = 0.9;
export const SLIDER_STEP = 1;

export const MIN_USER_AGE = 18;

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Login = '/api/auth/login',
  Logout = '/api/auth/logout',
  Register = '/api/auth/register',
  RegisterCoach = '/api/auth/register-coach',
  Users = '/api/users',
  Training = '/api/training',
  Review = '/api/review',
  Notify = '/api/notify',
  Friends = '/api/friends',
  Balance = '/api/balance',
  Orders = '/api/orders',
  AddFriend = '/api/friends/add',
  FileUpload = '/api/upload/file',
}

export enum AppRoute {
  Intro = '/',
  Login = '/login',
  Logout = '/logout',
  Register = '/register',
  QuestionnaireCoach = '/questionnaire-coach',
  QuestionnaireCustomer = '/questionnaire-customer',
  Main = '/main',
  AccountCoach = '/account-coach',
  AccountCustomer = '/account-customer',
  Trainings = '/trainings',
  Training = '/training/:id',
  TrainingUrl = '/training',
  Users = '/users',
  UserPage = '/users/:id',
  Friends = '/friends',
  CreateTraining = '/create-training',
  Orders = '/my-orders',
  Purchases = '/my-purchases',
  ReviewsHash = 'reviews'
}

export enum AppTitle {
  Intro = '/',
  Login = '/login',
  Logout = '/logout',
  Register = '/register',
  QuestionnaireCoach = '/questionnaire-coach',
  QuestionnaireCustomer = '/questionnaire-customer',
  Main = 'FitFriends — Время находить тренировки, спортзалы и друзей спортсменов',
  AccountCoach = '/account-coach',
  AccountCustomer = '/account-customer',
  Trainings = '/trainings',
  Training = '/training/:id',
  TrainingUrl = '/training',
  Users = '/users',
  UserPage = 'Карточка пользователя — FitFriends',
  Friends = '/friends',
  CreateTraining = '/create-training',
  Orders = '/my-orders',
  Purchases = '/my-purchases',
  ReviewsHash = 'reviews'
}
