import { Button, Grid, TextField } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';

const NewEntryForm = () => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthRating, setHealthRating] = useState('');
  const [codes, setCodes] = useState('');

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    // TODO:
    console.log('submitting form...');
  };

  const onCancel = () => {
    // TODO:
    console.log('cancel');
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: '5px',
    marginBottom: '5px',
  };

  const inputStyle: React.CSSProperties = {
    margin: '3px',
  };

  return (
    <div className="newEntryBox">
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
