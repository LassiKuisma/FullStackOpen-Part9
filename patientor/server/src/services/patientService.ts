import { v1 as uuid } from 'uuid';

import { NewPatientEntry, PatientInfo, PatientPrivateInfo } from '../types';

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

export default {
  getPatients,
  addPatient,
  getPatientById,
};
