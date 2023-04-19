import { Box, Button, Grid, Tab, Tabs, TextField } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { EntryWithoutId } from '../../types';
import { stringToHealthCheckRating } from '../../util';

interface Props {
  showWhenVisible: React.CSSProperties;
  closeEntryForm: () => void;
  submitNewEntry: (entry: EntryWithoutId) => Promise<boolean>;
  showError: (message: string) => void;
}

const NewEntryForm = ({
  showWhenVisible,
  closeEntryForm,
  submitNewEntry,
  showError,
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

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const rating = stringToHealthCheckRating(healthRating);
    if (rating.k === 'error') {
      showError(`Invalid health check rating: ${rating.message}`);
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

    const success = await submitNewEntry(newEntry);
    if (!success) {
      // error message should be set in callback
      return;
    }

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
          label="Diagnosis codes"
          variant="standard"
          fullWidth
          value={codes}
          onChange={({ target }) => setCodes(target.value)}
          style={inputStyle}
        />
        <EntryTabs
          healthCheck={
            <TextField
              label="Healthcheck rating"
              variant="standard"
              fullWidth
              value={healthRating}
              onChange={({ target }) => setHealthRating(target.value)}
              style={inputStyle}
            />
          }
          occupational={<div>second tab</div>}
          hospital={<div>third tab</div>}
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

interface EntryTabsProps {
  healthCheck: React.ReactNode;
  occupational: React.ReactNode;
  hospital: React.ReactNode;
}

const EntryTabs = ({ healthCheck, occupational, hospital }: EntryTabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="entry type selection tabs"
        >
          <Tab label="Health check" />
          <Tab label="Occupational" />
          <Tab label="Hospital entry" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {healthCheck}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {occupational}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {hospital}
      </TabPanel>
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = ({ children, value, index }: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {children}
    </div>
  );
};

export default NewEntryForm;
