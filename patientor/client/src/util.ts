import {
  BaseEntry,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from './types';
import { EntryWithoutId, Err, HealthCheckRating, Ok, Result } from './types';

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

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isEmpty = (str: string): boolean => {
  return str.trim().length === 0;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const healthCheckRatingFromString = (
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

export const submittableEntryFromValues = (
  type: Entry['type'],
  description: string,
  date: string,
  specialist: string,
  diagnosisCodes: string[],

  healthRating: string,

  employerName: string,
  sickLeaveEnabled: boolean,
  sickLeaveStart: string,
  sickLeaveEnd: string,

  dischargeCriteria: string,
  dischargeDate: string
): Result<EntryWithoutId> => {
  if (isEmpty(description)) return error('Missing value: description');
  if (isEmpty(specialist)) return error('Missing value: specialist');
  if (!isDate(date)) return error('Invalid date');

  const baseValues = {
    description,
    date,
    specialist,
    diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined,
  };

  switch (type) {
    case 'HealthCheck':
      return healthCheckEntryFromValues(baseValues, healthRating);

    case 'OccupationalHealthcare':
      return occupationalEntryFromValues(
        baseValues,
        employerName,
        sickLeaveEnabled,
        sickLeaveStart,
        sickLeaveEnd
      );

    case 'Hospital':
      return hospitalEntryFromValues(
        baseValues,
        dischargeDate,
        dischargeCriteria
      );

    default:
      return assertNever(type);
  }
};

type BaseEntryWithoutId = Omit<BaseEntry, 'id'>;

const healthCheckEntryFromValues = (
  base: BaseEntryWithoutId,
  healthRating: string
): Result<Omit<HealthCheckEntry, 'id'>> => {
  const rating = healthCheckRatingFromString(healthRating);
  if (rating.k === 'error') {
    return error(`Invalid health check rating: ${rating.message}`);
  }

  return ok({
    type: 'HealthCheck',
    healthCheckRating: rating.value,
    ...base,
  });
};

const occupationalEntryFromValues = (
  base: BaseEntryWithoutId,
  employerName: string,
  sickLeaveEnabled: boolean,
  sickLeaveStart: string,
  sickLeaveEnd: string
): Result<Omit<OccupationalHealthcareEntry, 'id'>> => {
  if (isEmpty(employerName)) {
    return error('Missing value: employer name');
  }

  if (!sickLeaveEnabled) {
    return ok({
      type: 'OccupationalHealthcare',
      employerName,
      sickLeave: undefined,
      ...base,
    });
  }

  if (!isDate(sickLeaveStart)) return error('Invalid date: sick leave start');
  if (!isDate(sickLeaveEnd)) return error('Invalid date: sick leave end');

  const sickLeave = {
    startDate: sickLeaveStart,
    endDate: sickLeaveEnd,
  };

  return ok({
    type: 'OccupationalHealthcare',
    employerName,
    sickLeave,
    ...base,
  });
};

const hospitalEntryFromValues = (
  base: BaseEntryWithoutId,
  dischargeDate: string,
  dischargeCriteria: string
): Result<Omit<HospitalEntry, 'id'>> => {
  if (isEmpty(dischargeCriteria)) {
    return error('Missing value: discharge criteria');
  }
  if (!isDate(dischargeDate)) return error('Invalid date: hospital discharge');

  const discharge = {
    date: dischargeDate,
    criteria: dischargeCriteria,
  };

  return ok({
    type: 'Hospital',
    discharge,
    ...base,
  });
};
