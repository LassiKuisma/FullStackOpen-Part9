import { useState, useEffect } from 'react';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import HealingIcon from '@mui/icons-material/Healing';

import {
  Diagnosis,
  Entry,
  Gender,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  Patient,
} from '../../types';
import patientService from '../../services/patients';
import { assertNever } from '../../util';

interface Props {
  id: string | undefined;
  diagnoses: Map<string, Diagnosis>;
}

const genderIcon = (gender: Gender) => {
  switch (gender) {
    case Gender.Male:
      return <MaleIcon />;
    case Gender.Female:
      return <FemaleIcon />;
    default:
      return <></>;
  }
};

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div className="entryBox">
      {entry.date} <HealingIcon />
      <br />
      <i>{entry.description}</i>
      <div>Hospital</div>
      <br />
      Diagnose by {entry.specialist}
    </div>
  );
};

const OccupationalEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div className="entryBox">
      {entry.date} <WorkIcon /> {entry.employerName}
      <br />
      <i>{entry.description}</i>
      <br />
      Diagnose by {entry.specialist}
    </div>
  );
};

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div className="entryBox">
      {entry.date} <MedicalServicesIcon />
      <br />
      <i>{entry.description}</i>
      <div>Health rating: {entry.healthCheckRating.toString()}</div>
      <br />
      Diagnose by {entry.specialist}
    </div>
  );
};

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Map<string, Diagnosis>;
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }

  /*const codes = (
    <ul>
      {entry.diagnosisCodes?.map((code) => {
        const name = diagnoses.get(code)?.name || 'unknown';
        return (
          <li key={code}>
            {code} {name}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="entryBox">
      {entry.date}
      <br />
      <i>{entry.description}</i>
      {codes}
    </div>
  );*/
};

const Entries = ({
  entries,
  diagnoses,
}: {
  entries: Entry[];
  diagnoses: Map<string, Diagnosis>;
}) => {
  return (
    <div>
      <h3>Entries</h3>
      {entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

const PatientInfoPage = ({ id, diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      return;
    }

    patientService
      .getPatient(id)
      .then((patient) => {
        setPatient(patient);
      })
      .catch((_error) => {
        setError('Failed to get patient info.');
      });
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>
        {patient.name} {genderIcon(patient.gender)}
      </h2>
      <div>
        ssn: {patient.ssn || 'unknown'}
        <br />
        occupation: {patient.occupation}
      </div>
      <Entries entries={patient.entries} diagnoses={diagnoses} />
    </div>
  );
};

export default PatientInfoPage;
