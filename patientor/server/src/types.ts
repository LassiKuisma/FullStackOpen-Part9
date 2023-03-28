export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  other = 'other',
}

export interface PatientPrivateInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PatientInfo = Omit<PatientPrivateInfo, 'ssn'>;

export type NewPatientEntry = Omit<PatientPrivateInfo, 'id'>;
