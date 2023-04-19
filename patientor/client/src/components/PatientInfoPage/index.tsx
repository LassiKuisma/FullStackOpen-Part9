import { useState, useEffect } from 'react';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Alert, Button } from '@mui/material';

import { Diagnosis, Entry, EntryWithoutId, Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import EntryDetails from './EntryDetails';
import NewEntryForm from '../PatientEntries/NewEntryForm';

import axios from 'axios';

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
  const [entrySubmitError, setEntrySubmitError] = useState<string | undefined>(
    undefined
  );
  const [errorTimer, setErrorTimer] = useState<NodeJS.Timeout | undefined>(
    undefined
  );
  const [entryFormVisible, setEntryFormVisible] = useState(false);

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

  const hideWhenVisible = { display: entryFormVisible ? 'none' : '' };
  const showWhenVisible = { display: entryFormVisible ? '' : 'none' };

  const openEntryForm = () => {
    setEntryFormVisible(true);
  };

  const closeEntryForm = () => {
    setEntryFormVisible(false);
  };

  const showError = (message: string) => {
    setEntrySubmitError(message);

    if (errorTimer) {
      clearTimeout(errorTimer);
    }

    const timer = setTimeout(() => {
      setEntrySubmitError(undefined);
    }, 5000);

    setErrorTimer(timer);
  };

  const submitNewEntry = async (entry: EntryWithoutId): Promise<boolean> => {
    try {
      const created = await patientService.addEntry(patient, entry);
      setPatient({
        ...patient,
        entries: patient.entries.concat(created),
      });

      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const response = error?.response?.data;
        if (response && typeof response === 'string') {
          const message = response.replace('Something went wrong. Error: ', '');
          showError(`Error adding entry: ${message}`);
        } else {
          showError('Failed to add new entry: unrecognized axios error');
        }
      } else {
        showError('Failed to add new entry: unknown error');
      }

      return false;
    }
  };

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
      <br />
      {entrySubmitError && <Alert severity="error">{entrySubmitError}</Alert>}
      <Button
        variant="contained"
        onClick={openEntryForm}
        style={hideWhenVisible}
      >
        Add new entry
      </Button>
      <NewEntryForm
        showWhenVisible={showWhenVisible}
        closeEntryForm={closeEntryForm}
        submitNewEntry={submitNewEntry}
        showError={showError}
      />
      <Entries entries={patient.entries} diagnoses={diagnoses} />
    </div>
  );
};

export default PatientInfoPage;
