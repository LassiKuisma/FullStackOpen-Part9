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
  entires: Entry[];
}

export type PatientInfo = Omit<PatientPrivateInfo, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientPrivateInfo, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}
