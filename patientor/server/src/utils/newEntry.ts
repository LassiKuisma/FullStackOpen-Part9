import {
  BaseEntry,
  Diagnosis,
  EntryWithoutId,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Result,
} from '../types';
import { error, isDate, isNumber, isString, ok } from './utils';

type BaseEntryWithoutId = Omit<BaseEntry, 'id'>;

const toNewEntry = (object: unknown): Result<EntryWithoutId> => {
  if (!object || typeof object !== 'object') {
    return error('Incorrect or missing data');
  }

  if (!('type' in object)) return error('missing field: type');
  if (!isString(object.type)) {
    return error('Field is not a string: type.');
  }

  switch (object.type) {
    case 'HealthCheck':
      return parseHealthCheckEntry(object);
    case 'OccupationalHealthcare':
      return parseOccupationalEntry(object);
    case 'Hospital':
      return parseHospitalEntry(object);
    default:
      return error(`Unknown entry type: '${object.type}'.`);
  }
};

const parseFields = (object: object): Result<BaseEntryWithoutId> => {
  if (!('date' in object)) return error('missing field: date');
  if (!('description' in object)) return error('missing field: description');
  if (!('specialist' in object)) return error('missing field: specialist');

  if (!(isString(object.date) && isDate(object.date))) {
    return error('Invalid field: date.');
  }
  if (!isString(object.description)) {
    return error('Field is not a string: description.');
  }
  if (!isString(object.specialist)) {
    return error('Field is not a string: specialist.');
  }

  const diagnosisCodes = parseDiagnosisCodes(object);

  return ok({
    date: object.date,
    description: object.description,
    specialist: object.specialist,
    diagnosisCodes,
  });
};

const parseDiagnosisCodes = (object: object): Array<Diagnosis['code']> => {
  if (!('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  // TODO/FIXME: this assumes data is in right form
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseHealthCheckEntry = (
  object: object
): Result<Omit<HealthCheckEntry, 'id'>> => {
  const parseResult = parseFields(object);
  if (parseResult.k === 'error') {
    return parseResult;
  }

  const hcr = parseHealthCheckRating(object);
  if (hcr.k === 'error') {
    return hcr;
  }

  const baseEntry = parseResult.value;

  return ok({
    type: 'HealthCheck',
    healthCheckRating: hcr.value,
    ...baseEntry,
  });
};

const isHealthCheckRating = (
  param: string | number
): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((h) => h.toString())
    .includes(param.toString());
};

const parseHealthCheckRating = (object: object): Result<HealthCheckRating> => {
  if (!('healthCheckRating' in object)) {
    return error('Missing field: healthCheckRating');
  }

  const hcr = object.healthCheckRating;
  const isStrOrNum = isString(hcr) || isNumber(hcr);
  if (!isStrOrNum || !isHealthCheckRating(hcr)) {
    return error('Invalid field: healthCheckRating');
  }

  return ok(hcr);
};

const parseOccupationalEntry = (
  _object: object
): Result<OccupationalHealthcareEntry> => {
  return error('todo');
};

const parseHospitalEntry = (_object: object): Result<HospitalEntry> => {
  return error('todo');
};

export default toNewEntry;
