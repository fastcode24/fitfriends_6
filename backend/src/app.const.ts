import { BookingStatus, SortDirection, SortOrder } from "./libs/types";

export const SALT_ROUNDS = 10;

export enum HttpClientParam {
  MaxRedirect = 5,
  Timeout = 5000
}

export const LIST_LIMIT = 50;

export const NOTIFY_LIMIT = 5;

export const DEFAULT_PAGE = 1;

export const DEFAULT_SORT_DIRECTION = SortDirection.Down;

export const MAX_TRAINING_TYPES = 3;

export const DEFAULT_BOOKING_STATUS = BookingStatus.Pending;

export const DEFAULT_ORDER_SORT = SortOrder.Cost;

export enum UserNameLength {
  Min = 1,
  Max = 15,
}

export enum UserPasswordLength {
  Min = 6,
  Max = 12,
}

export enum UserDescriptionLength {
  Min = 10,
  Max = 140,
}

export enum UserAwardsLength {
  Min = 10,
  Max = 140,
}

export enum Calories {
  Min = 1000,
  Max = 5000,
}

export enum OrderQuantityValue {
  Min = 1,
  Max = 50,
}

export enum PriceValue {
  Min = 0,
}

export enum TrainingTitleLength {
  Min = 1,
  Max = 15,
}

export enum TrainingDescriptionLength {
  Min = 10,
  Max = 140,
}

export const MailSubject = {
  NewSubscription: 'Подписка на рассылку оформлена',
  NewTraining: 'Повявилась новая тренировка',
  Test: 'Тестовое сообщение',
} as const;

export const MailTemplate = {
  NewSubscription: './subscription',
  NewTraining: './training',
  Test: './test',
} as const;

export const FileParams = {
  MimeTypes: ['image/png', 'image/jpeg', 'application/pdf'],
  MaxSize: 2000000,
};

export const VideoParams = {
  MimeTypes: ['video/mov', 'video/mp4', 'video/avi'],
};
