import { ValidationError } from 'class-validator';

export function transformObjectValuesToString(items: Object) {
  return Object.values(items).join(', ');
}

export function reduceValidationErrors(
  errors: ValidationError[]
) {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));
}

export function calculatePages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}

export function getRandomEnumValue<E>(enumObject: E): E[keyof E] {
  const values = Object.values(enumObject) as E[keyof E][];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}
