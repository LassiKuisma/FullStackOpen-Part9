import { Entry, Gender, NewPatientEntry } from '../types';
import { isDate, isString } from './utils';

const toNewPatientEntry = (object: unknown): NewPatientEntry | Error => {
  if (!object || typeof object !== 'object') {
    return new Error('Incorrect or missing data');
  }

  if (
    !('name' in object) ||
    !('dateOfBirth' in object) ||
    !('ssn' in object) ||
    !('gender' in object) ||
    !('occupation' in object)
  ) {
    return new Error('Incorrect data: field(s) missing');
  }

  let entries = undefined;
  if ('entries' in object) {
    entries = object.entries;
  }

  try {
    return {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(entries),
    };
  } catch (error: unknown) {
    // I prefer to return errors instead of throwing them, as  that way they
    // can be clearly seen in function signature
    if (error instanceof Error) {
      return error;
    }
    return new Error('Something went wrong');
  }
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Invalid social security number');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!entries || !(entries instanceof Array)) {
    return new Array<Entry>();
  }

  const parsed = entries.map((entry) => {
    if (!('type' in entry)) {
      throw new Error('Entry is missing type.');
    }

    return entry as Entry;
  });

  return parsed;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

export default toNewPatientEntry;
