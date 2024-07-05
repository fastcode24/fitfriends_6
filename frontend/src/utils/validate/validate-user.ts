import { MIN_USER_AGE } from "@/const";
import { CreateUser, Gender, Metro, UserRole } from "@types";

interface UserRegFormError {
  name: string | null;
  email: string | null;
  password: string  | null;
  avatar: string | null;
  birthday: string | null;
  metro: string  | null;
  gender: string | null;
  role: string  | null;
}

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email обязателен';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? null : 'Некорректный email';
};

export const validateBirthday = (birthday: string | null): string | null => {
  if (!birthday) {
    return null;
  }

  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime())) {
    return 'Некорректная дата';
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age >= MIN_USER_AGE ? null : `Возраст должен быть не менее ${MIN_USER_AGE} лет`;
};

export const validateRegData = (user: CreateUser): UserRegFormError => {
  const errors: UserRegFormError = {
    name: user.name.length < 1 || user.name.length > 15 ? 'От 1 до 15 символов' : null,
    email: validateEmail(user.email),
    password: user.password.length < 6 || user.name.length > 12 ? 'От 6 до 12 символов' : null,
    avatar: null,
    birthday: validateBirthday(user.birthday),
    metro: !Object.values(Metro).includes(user.metro) ? 'Указанная станция метро не соответствует доступным вариантам' : null,
    gender: !Object.values(Gender).includes(user.gender) ? 'Указанный пол не соответствует доступным вариантам' : null,
    role: !Object.values(UserRole).includes(user.role) ? 'Указанная роль не соответствует доступным вариантам' : null,
  };
  return errors;
};
