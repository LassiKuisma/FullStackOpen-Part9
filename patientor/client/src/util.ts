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

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

export const stringToHealthCheckRating = (
  rating: string
): Result<HealthCheckRating> => {
  const asNumber = Number.parseInt(rating);
  if (Number.isNaN(asNumber)) {
    return error(`'${rating}' is not a valid number`);
  }

  if (isHealthCheckRating(asNumber)) {
    return ok(asNumber);
  }

  return error(`'${asNumber}' is not a valid HealthCheckRating`);
};
