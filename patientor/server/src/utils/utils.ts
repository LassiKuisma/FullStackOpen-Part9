import { Err, Ok } from '../types';

/**
 * Helper function for Result type.
 */
const error = (message: string): Err => {
  return { k: 'error', message };
};

/**
 * Helper function for Result type.
 */
const ok = <T>(value: T): Ok<T> => {
  return { k: 'ok', value };
};

const isNumber = (param: unknown): param is number => {
  return typeof param === 'number' || param instanceof Number;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export { error, ok, isNumber, isString, isDate };
