export enum UserRole {
  Coach = 'тренер',
  Customer = 'пользователь',
  Unknown = 'неизвестно'
}

export type RegUserRole = Exclude<UserRole, UserRole.Unknown>;
