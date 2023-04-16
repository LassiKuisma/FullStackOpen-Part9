import { Button, Grid, TextField } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { EntryWithoutId } from '../../types';
import { parseHealthCheckRating } from '../../util';

interface Props {
  showWhenVisible: React.CSSProperties;
  closeEntryForm: () => void;
  submitNewEntry: (entry: EntryWithoutId) => void;
}

const NewEntryForm = ({
  showWhenVisible,
  closeEntryForm,
  submitNewEntry,
}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthRating, setHealthRating] = useState('');
  const [codes, setCodes] = useState('');

  const resetTextFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthRating('');
    setCodes('');
  };

  const showError = (message: string) => {
    // TODO: take proper callback in props
    console.log('error:', message);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const rating = parseHealthCheckRating(healthRating);
    if (rating.k === 'error') {
      showError(`error parsing health rating: ${rating.message}`);
      return;
    }

    const codesSplit = codes.split(',').map((code) => code.trim());

    const newEntry: EntryWithoutId = {
      type: 'HealthCheck',
      description,
      date,
      specialist,
      diagnosisCodes: codesSplit,
      healthCheckRating: rating.value,
    };

    submitNewEntry(newEntry);
    // TODO: make this return ok/fail

    closeEntryForm();
    resetTextFields();
  };

  const onCancel = () => {
    closeEntryForm();
    resetTextFields();
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: '5px',
    marginBottom: '5px',
  };

  const inputStyle: React.CSSProperties = {
    margin: '3px',
  };

  return (
    <div className="newEntryBox" style={showWhenVisible}>
      <h3>New HealthCheck entry</h3>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          variant="standard"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={inputStyle}
        />
        <TextField
          label="Date"
          variant="standard"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          style={inputStyle}
        />
        <TextField
          label="Specialist"
          variant="standard"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={inputStyle}
        />
        <TextField
          label="Healthcheck rating"
          variant="standard"
          fullWidth
          value={healthRating}
          onChange={({ target }) => setHealthRating(target.value)}
          style={inputStyle}
        />
        <TextField
          label="Diagnosis codes"
          variant="standard"
          fullWidth
          value={codes}
          onChange={({ target }) => setCodes(target.value)}
          style={inputStyle}
        />
        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <Button
              variant="contained"
              color="error"
              type="button"
              onClick={onCancel}
              style={buttonStyle}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              type="submit"
              style={buttonStyle}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default NewEntryForm;
