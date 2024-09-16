import { Gender } from "../types";

export function isObject(value: any): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export const removeNullFields = <T extends object>(obj: T): T => {
  const newObj = {} as T;
  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof T];
    if (value !== null && value !== undefined && (!Array.isArray(value) || value.length > 0)) {
      newObj[key as keyof T] = value;
    }
  });
  return newObj;
};

export const buildQueryString = <T>(params: T, excludeFields: string[] = []): string => {
  const queryParts: string[] = [];
  Object.keys(params as object).forEach(key => {
    if (!excludeFields.includes(key)) {
      const value = params[key as keyof T];
      if (value !== undefined) {
        if (Array.isArray(value)) {
          (value as unknown[]).forEach(item => {
            queryParts.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(String(item))}`);
          });
        } else {
          queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
        }
      }
    }
  });
  return queryParts.join('&');
};

/*export const buildQueryString = <T>(params: T): string => {
  const queryParts: string[] = [];
  Object.keys(params as object).forEach(key => {
    const value = params[key as keyof T];
    if (value !== undefined) {
      if (Array.isArray(value)) {
        (value as unknown[]).forEach(item => {
          queryParts.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(String(item))}`);
        });
      } else {
        queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
      }
    }
  });
  return queryParts.join('&');
};*/

export const capitalizeFirst = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function formatGender(gender: Gender): string {
  switch (gender) {
    case Gender.Woman:
      return 'для_женщин';
    case Gender.Man:
      return 'для_мужчин';
    case Gender.Unknown:
    default:
      return 'для_всех';
  }
}

export function clearEmptyFields<T>(object: T): Partial<T> {
  const cleanedFilter: Partial<T> = {};
  for (const key in object) {
    const value = object[key];
    if (
      value !== null &&
      value !== undefined &&
      value !== '' &&
      (!Array.isArray(value) || value.length > 0)
    ) {
      cleanedFilter[key] = value;
    }
  }
  return cleanedFilter;
}

export const removeHostFromUrl = (url: string) => {
  const urlObject = new URL(url);
  return urlObject.pathname.slice(1);
};
