import { v1 as uuid } from 'uuid';

import { NewPatientEntry, PatientInfo } from '../types';

import patients from '../../data/patients';

const getPatients = (): PatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientInfo => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  addPatient,
};
