import { getRandomEnumValue } from "../../../helpers";
import { Level, Metro, TrainingTime } from "../../../types";
import { getRandomCertificates } from "./certificates";

const DEFAULT_PASSWORD = '123456';

export const mockUsers = [
  {
    name: 'Василий',
    email: `vasya@local.mail`,
    password: DEFAULT_PASSWORD,
    gender: 'мужской',
    role: 'пользователь',
    birthday: '1989-03-12',
    description: 'Я - Василий, и я буду атлетом-качком через 2 месяца.',
    metro: getRandomEnumValue(Metro),
    avatar: 'http://localhost:3000/mock-images/avatars/users/photo-1.png',
    background: 'http://localhost:3000/mock-images/backgrounds/background.jpg',
    level: getRandomEnumValue(Level),
    trainingType: ['бег', 'бокс'],
    trainingTime: getRandomEnumValue(TrainingTime),
    calories: 3200,
    caloriesPerDay: 1000,
    friends: [],
    certificates: getRandomCertificates(),
    isReady: true,
  },
  {
    name: 'Таня',
    email: `tanya@local.mail`,
    password: DEFAULT_PASSWORD,
    gender: 'женский',
    role: 'пользователь',
    birthday: '1989-03-12',
    description: 'Я - Таня, и я буду йогом-космонавтом через 1 месяц.',
    metro: getRandomEnumValue(Metro),
    avatar: 'http://localhost:3000/mock-images/avatars/users/photo-2.png',
    background: 'http://localhost:3000/mock-images/backgrounds/background.jpg',
    level: getRandomEnumValue(Level),
    trainingType: ['йога', 'стрейчинг'],
    trainingTime: getRandomEnumValue(TrainingTime),
    calories: 3200,
    caloriesPerDay: 1000,
    friends: [],
    certificates: getRandomCertificates(),
    isReady: true,
  },
  {
    name: 'Кира',
    email: `kira@local.mail`,
    password: DEFAULT_PASSWORD,
    gender: 'женский',
    role: 'пользователь',
    birthday: '1989-03-12',
    description: 'Я - Кира, и я буду большим человеком через 2 месяца.',
    metro: getRandomEnumValue(Metro),
    avatar: 'http://localhost:3000/mock-images/avatars/users/photo-3.png',
    background: 'http://localhost:3000/mock-images/backgrounds/background.jpg',
    level: getRandomEnumValue(Level),
    trainingType: ['бокс', 'стрейчинг'],
    trainingTime: getRandomEnumValue(TrainingTime),
    calories: 3200,
    caloriesPerDay: 1000,
    friends: [],
    certificates: getRandomCertificates(),
    isReady: true,
  },
  {
    name: 'Евгения',
    email: `customer@fitfriends.local`,
    password: DEFAULT_PASSWORD,
    gender: 'женский',
    role: 'пользователь',
    birthday: '1989-03-12',
    description: 'Я - Женя, и я буду балериной через 3 месяца.',
    metro: getRandomEnumValue(Metro),
    avatar: 'http://localhost:3000/mock-images/avatars/users/photo-4.png',
    background: 'http://localhost:3000/mock-images/backgrounds/background.jpg',
    level: getRandomEnumValue(Level),
    trainingType: ['бег', 'стрейчинг'],
    trainingTime: getRandomEnumValue(TrainingTime),
    calories: 3200,
    caloriesPerDay: 1000,
    friends: [],
    certificates: getRandomCertificates(),
    isReady: false,
  },
  {
    name: 'Бравый Тренер',
    email: `coach@fitfriends.local`,
    password: DEFAULT_PASSWORD,
    gender: 'мужской',
    role: 'тренер',
    birthday: '2000-01-01',
    description: 'Я - Тренер, я Супертренер!',
    metro: getRandomEnumValue(Metro),
    avatar: 'http://localhost:3000/mock-images/avatars/coaches/photo-1.png',
    background: 'http://localhost:3000/mock-images/backgrounds/background-coach.jpg',
    level: getRandomEnumValue(Level),
    trainingType: ['бокс', 'кроссфит', 'аэробика'],
    friends: [],
    certificates: getRandomCertificates(),
    awards: 'Очень большие достижения бравого тренера',
    isReady: true,
  },
]
