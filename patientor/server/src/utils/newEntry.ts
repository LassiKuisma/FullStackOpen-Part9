import {
  BaseEntry,
  Diagnosis,
  Discharge,
  EntryWithoutId,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Result,
  SickLeave,
} from '../types';
import { error, isDate, isNumber, isString, ok } from './utils';

type BaseEntryWithoutId = Omit<BaseEntry, 'id'>;

const toNewEntry = (object: unknown): Result<EntryWithoutId> => {
  if (!object || typeof object !== 'object') {
    return error('Incorrect or missing data');
  }

  if (!('type' in object)) return error('Missing field: type');
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
  object: object
): Result<Omit<OccupationalHealthcareEntry, 'id'>> => {
  const parseResult = parseFields(object);
  if (parseResult.k === 'error') {
    return parseResult;
  }

  if (!('employerName' in object)) {
    return error('Missing field: employerName');
  }

  if (!isString(object.employerName)) {
    return error('Field is not a string: employerName');
  }

  let sickLeave = undefined;
  if ('sickLeave' in object) {
    const sickLeaveParsed = parseSickLeave(object.sickLeave);
    if (sickLeaveParsed.k === 'error') {
      return sickLeaveParsed;
    }
    sickLeave = sickLeaveParsed.value;
  }

  const baseEntry = parseResult.value;
  return ok({
    type: 'OccupationalHealthcare',
    employerName: object.employerName,
    sickLeave,
    ...baseEntry,
  });
};

const parseSickLeave = (object: unknown): Result<SickLeave> => {
  if (!object || typeof object !== 'object') {
    return error('Incorrect or missing data: sickLeave');
  }

  if (!('startDate' in object)) return error('Missing field: startDate');
  if (!('endDate' in object)) return error('Missing field: endDate');

  if (!isString(object.startDate) || !isDate(object.startDate)) {
    return error('Invalid date: startDate');
  }

  if (!isString(object.endDate) || !isDate(object.endDate)) {
    return error('Invalid date: endDate');
  }

  return ok({
    startDate: object.startDate,
    endDate: object.endDate,
  });
};

const parseHospitalEntry = (
  object: object
): Result<Omit<HospitalEntry, 'id'>> => {
  const parseResult = parseFields(object);
  if (parseResult.k === 'error') {
    return parseResult;
  }

  if (!('discharge' in object)) {
    return error('Missing field: discharge');
  }

  const discharge = parseDischarge(object.discharge);
  if (discharge.k === 'error') {
    return discharge;
  }

  const baseEntry = parseResult.value;
  return ok({
    type: 'Hospital',
    discharge: discharge.value,
    ...baseEntry,
  });
};

const parseDischarge = (object: unknown): Result<Discharge> => {
  if (!object || typeof object !== 'object') {
    return error('Incorrect or missing data: discharge');
  }

  if (!('date' in object)) return error('Missing field: discharge date');
  if (!('criteria' in object)) return error('Missing field: criteria');

  if (!isString(object.date) || !isDate(object.date)) {
    return error('Invalid date');
  }
  if (!isString(object.criteria)) {
    return error('Field is not a string: criteria');
  }

  return ok({
    date: object.date,
    criteria: object.criteria,
  });
};

export default toNewEntry;
