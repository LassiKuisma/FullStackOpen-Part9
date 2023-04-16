import { useState, useEffect } from 'react';

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Button } from '@mui/material';

import { Diagnosis, Entry, EntryWithoutId, Gender, Patient } from '../../types';
import patientService from '../../services/patients';
import EntryDetails from './EntryDetails';
import NewEntryForm from './NewEntryForm';

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
    // TODO: make this a proper component, pass it to NewEntryForm
    console.log('error:', message);
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
          showError(`error adding entry: ${message}`);
        } else {
          showError('Unrecognized axios error');
        }
      } else {
        showError('Unknown error');
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
