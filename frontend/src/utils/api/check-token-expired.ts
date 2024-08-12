import { Base64 } from 'js-base64';

export const checkTokenExpired = (token: string): boolean => {
  try {
    console.log('Проверяю токен на просроченность');
    const parts = token.split('.');

    if (parts.length !== 3) {
      console.error('Неверный формат токена');
      return true;
    }

    const payload = JSON.parse(Base64.decode(parts[1]));
    const result = payload.exp < Date.now() / 1000;
    console.log('Токен просрочен?', result);
    return result;
  } catch (error) {
    console.error('Ошибка при проверке токена:', error);
    return true;
  }
};
