import { v1 as uuid } from 'uuid';

import {
  Entry,
  EntryWithoutId,
  NewPatientEntry,
  PatientInfo,
  PatientPrivateInfo,
} from '../types';

import patients from '../../data/patients';

const getPatients = (): PatientInfo[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const addPatient = (entry: NewPatientEntry): PatientInfo => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newEntry);
  return newEntry;
};

const getPatientById = (id: string): PatientPrivateInfo | undefined => {
  return patients.find((p) => p.id === id);
};

const addEntry = (
  patient: PatientPrivateInfo,
  entry: EntryWithoutId
): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
  getPatientById,
  addEntry,
};
