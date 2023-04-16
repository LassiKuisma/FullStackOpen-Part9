import { Err, HealthCheckRating, Ok, Result } from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

/**
 * Helper function for Result type.
 */
export const error = (message: string): Err => {
  return { k: 'error', message };
};

/**
 * Helper function for Result type.
 */
export const ok = <T>(value: T): Ok<T> => {
  return { k: 'ok', value };
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isHealthCheckRating = (
  param: string | number
): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

export const parseHealthCheckRating = (
  rating: unknown
): Result<HealthCheckRating> => {
  const isStrOrNum = isString(rating) || isNumber(rating);
  if (!isStrOrNum || !isHealthCheckRating(rating)) {
    return error('Not a number or string');
  }

  return ok(rating);
};
