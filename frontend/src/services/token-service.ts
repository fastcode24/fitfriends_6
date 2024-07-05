const AUTH_TOKEN_KEY_NAME = 'fitfriends';

export type Token = string;

export const getAccessToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME + 'Access');
  return token ?? '';
};

export const getRefreshToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME + 'Refresh');
  return token ?? '';
};

export const saveAccessToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME + 'Access', token);
};

export const saveRefreshToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME + 'Refresh', token);
};

export const dropAccessToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME + 'Access');
};

export const dropRefreshToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME + 'Refresh');
};

export const clearTokens = (): void => {
  dropAccessToken();
  dropRefreshToken();
};
