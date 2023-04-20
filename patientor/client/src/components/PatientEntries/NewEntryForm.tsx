import { Box, Button, Grid, Tab, Tabs, TextField } from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { Entry, EntryWithoutId } from '../../types';
import { assertNever, stringToHealthCheckRating } from '../../util';
import HealthCheckTab from './EntryVariants/HealthCheck';
import OccupationalEntryTab from './EntryVariants/OccupationalEntry';
import HospitalEntryTab from './EntryVariants/HospitalEntry';

interface Props {
  showWhenVisible: React.CSSProperties;
  closeEntryForm: () => void;
  submitNewEntry: (entry: EntryWithoutId) => Promise<boolean>;
  showError: (message: string) => void;
}

const buttonStyle: React.CSSProperties = {
  marginTop: '5px',
  marginBottom: '5px',
};

const inputStyle: React.CSSProperties = {
  margin: '3px',
};

const NewEntryForm = ({
  showWhenVisible,
  closeEntryForm,
  submitNewEntry,
  showError,
}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [codes, setCodes] = useState('');

  const [healthRating, setHealthRating] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveEnabled, setSickLeaveEnabled] = useState(false);
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');

  const [selectedTab, setSelectedTab] = useState(0);

  const tabs: Array<EntryTab> = [
    {
      entryType: 'HealthCheck',
      label: 'Health check',
      component: (
        <HealthCheckTab
          textFieldStyle={inputStyle}
          healthRating={healthRating}
          setHealthRating={setHealthRating}
        />
      ),
    },
    {
      entryType: 'OccupationalHealthcare',
      label: 'Occupational',
      component: (
        <OccupationalEntryTab
          textFieldStyle={inputStyle}
          employerName={employerName}
          setEmployerName={setEmployerName}
          sickLeaveEnabled={sickLeaveEnabled}
          setSickLeaveEnabled={setSickLeaveEnabled}
          sickLeaveStart={sickLeaveStart}
          setSickLeaveStart={setSickLeaveStart}
          sickLeaveEnd={sickLeaveEnd}
          setSickLeaveEnd={setSickLeaveEnd}
        />
      ),
    },
    {
      entryType: 'Hospital',
      label: 'Hospital entry',
      component: (
        <HospitalEntryTab
          textFieldStyle={inputStyle}
          dischargeCriteria={dischargeCriteria}
          setDischargeCriteria={setDischargeCriteria}
          dischargeDate={dischargeDate}
          setDischargeDate={setDischargeDate}
        />
      ),
    },
  ];

  const resetTextFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setCodes('');

    setHealthRating('');

    setEmployerName('');
    setSickLeaveEnabled(false);
    setSickLeaveStart('');
    setSickLeaveEnd('');

    setDischargeCriteria('');
    setDischargeDate('');
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();

    const codesSplit =
      codes.length !== 0
        ? codes.split(',').map((code) => code.trim())
        : undefined;

    const type = tabs[selectedTab].entryType;
    let newEntry: EntryWithoutId | undefined = undefined;

    switch (type) {
      case 'HealthCheck':
        const rating = stringToHealthCheckRating(healthRating);
        if (rating.k === 'error') {
          showError(`Invalid health check rating: ${rating.message}`);
          return;
        }

        newEntry = {
          type: 'HealthCheck',
          description,
          date,
          specialist,
          diagnosisCodes: codesSplit,
          healthCheckRating: rating.value,
        };
        break;

      case 'OccupationalHealthcare':
        const sickLeave = sickLeaveEnabled
          ? {
              startDate: sickLeaveStart,
              endDate: sickLeaveEnd,
            }
          : undefined;

        newEntry = {
          type: 'OccupationalHealthcare',
          description,
          date,
          specialist,
          diagnosisCodes: codesSplit,
          employerName,
          sickLeave,
        };
        break;

      case 'Hospital':
        const discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria,
        };

        newEntry = {
          type: 'Hospital',
          description,
          date,
          specialist,
          diagnosisCodes: codesSplit,
          discharge,
        };
        break;

      default:
        assertNever(type);
        break;
    }

    if (!newEntry) {
      showError(`Entry type is invalid: '${type}'`);
      return;
    }

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
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
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

interface EntryTab {
  component: React.ReactNode;
  label: string;
  entryType: Entry['type'];
}

interface EntryTabsProps {
  tabs: Array<EntryTab>;
  selectedTab: number;
  setSelectedTab: (selected: number) => void;
}

const EntryTabs = ({ tabs, selectedTab, setSelectedTab }: EntryTabsProps) => {
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="entry type selection tabs"
        >
          {tabs.map((tab) => (
            <Tab label={tab.label} key={tab.label} />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <TabPanel value={selectedTab} index={index} key={tab.label}>
          {tab.component}
        </TabPanel>
      ))}
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
