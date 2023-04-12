import { useState, useEffect } from 'react';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Entry, Gender, Patient } from '../../types';
import patientService from '../../services/patients';

interface Props {
  id: string | undefined;
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

const EntryDetails = ({ entry }: { entry: Entry }) => {
  const codes = (
    <ul>
      {entry.diagnosisCodes?.map((code) => (
        <li key={code}>{code}</li>
      ))}
    </ul>
  );

  return (
    <div>
      {entry.date} <i>{entry.description}</i>
      {codes}
    </div>
  );
};

const Entries = ({ entries }: { entries: Entry[] }) => {
  return (
    <div>
      <h3>Entries</h3>
      {entries.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

const PatientInfoPage = ({ id }: Props) => {
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
      <Entries entries={patient.entries} />
    </div>
  );
};

export default PatientInfoPage;
