import {
  Calories,
  MAX_TRAINING_TYPES,
  OrderQuantityValue,
  PriceValue,
  UserAwardsLength,
  UserDescriptionLength,
  UserNameLength,
  UserPasswordLength,
  TrainingDescriptionLength,
  TrainingTitleLength
} from 'src/app.const';
import { transformObjectValuesToString } from 'src/libs/helpers';
import { Gender, UserRole, PaymentType, OrderType, Level, Metro, TrainingTime, TrainingType, TrainingGender, BookingStatus } from 'src/libs/types';

export const DtoValidationMessage = {
  name: {
    length: `Длина имени должна быть от ${UserNameLength.Min} до ${UserNameLength.Max} символов`,
  },
  email: {
    invalidFormat: `Некорректный формат email`,
  },
  password: {
    length: `Длина пароля должна быть от ${UserPasswordLength.Min} до ${UserPasswordLength.Max}`,
  },
  gender: {
    invalidFormat: `Допустимо одно из значений: ${transformObjectValuesToString(Gender)}`,
  },
  role: {
    invalidFormat: `Допустимо одно из значений: ${transformObjectValuesToString(UserRole)}`,
  },
  userDescription: {
    length: `Допустимая длина описания от ${UserDescriptionLength.Min} до ${UserDescriptionLength.Max}`,
  },
  metro: {
    invalidFormat: `Допустимо одно из значений: ${transformObjectValuesToString(Metro)}`,
  },
  level: {
    invalidFormat: `Допустимо одно из значений: ${transformObjectValuesToString(Level)}`,
  },
  trainingType: {
    length: `Максимальное количество типов тренировок: ${MAX_TRAINING_TYPES}`,
    invalidItems: `Допустимо одно из значений: ${transformObjectValuesToString(TrainingType)}`,
  },
  trainingTime: {
    invalidFormat: `Допустимо одно из значений: ${transformObjectValuesToString(TrainingTime)}`,
  },
  calories: {
    value: `Допустимо значение из диапазона: ${Calories.Min}-${Calories.Max}`,
  },
  awards: {
    length: `Допустимая длина текста в поле списка достижений от ${UserAwardsLength.Min} до ${UserAwardsLength.Max}`,
  },
  trainingDescription: {
    length: `Допустимая длина описания от ${TrainingDescriptionLength.Min} до ${TrainingDescriptionLength.Max}`,
  },
  trainingTitle: {
    length: `Допустимая длина заголовка от ${TrainingTitleLength.Min} до ${TrainingTitleLength.Max}`,
  },
  trainingGender: {
    invalidFormat: `Допустимо одно из значений: ${transformObjectValuesToString(TrainingGender)}`,
  },
  price: {
    value: `Значение должно быть больше чем ${PriceValue.Min}`,
  },
  orderQuantity: {
    value: `Допустимо значение из диапазона: ${OrderQuantityValue.Min}-${OrderQuantityValue.Max}`,
  },
  paymentType: {
    invalidFormat: `Допустимо одно из значений: ${transformObjectValuesToString(PaymentType)}`,
  },
  orderType: {
    invalidFormat: `Допустимо одно из значений: ${transformObjectValuesToString(OrderType)}`,
  },
  bookingStatus: {
    invalidFormat: `Допустимо одно из значений: ${transformObjectValuesToString(BookingStatus)}`,
  },
};
