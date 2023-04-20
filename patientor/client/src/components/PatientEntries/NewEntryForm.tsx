import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { Diagnosis, Entry, EntryWithoutId } from '../../types';
import { submittableEntryFromValues } from '../../util';
import HealthCheckTab from './EntryVariants/HealthCheck';
import OccupationalEntryTab from './EntryVariants/OccupationalEntry';
import HospitalEntryTab from './EntryVariants/HospitalEntry';

interface Props {
  availableDiagnosisCodes: Array<Diagnosis['code']>;
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const CodeSelectProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const NewEntryForm = ({
  availableDiagnosisCodes,
  showWhenVisible,
  closeEntryForm,
  submitNewEntry,
  showError,
}: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthRating, setHealthRating] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [sickLeaveEnabled, setSickLeaveEnabled] = useState(false);
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');

  const [selectedTab, setSelectedTab] = useState(0);

  const handleCodeSelect = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

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
    setDiagnosisCodes([]);

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

    const type = tabs[selectedTab].entryType;

    const newEntry = submittableEntryFromValues(
      type,
      description,
      date,
      specialist,
      diagnosisCodes,
      healthRating,
      employerName,
      sickLeaveEnabled,
      sickLeaveStart,
      sickLeaveEnd,
      dischargeCriteria,
      dischargeDate
    );

    if (newEntry.k === 'error') {
      showError(newEntry.message);
      return;
    }

    const success = await submitNewEntry(newEntry.value);
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
          required={true}
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={inputStyle}
        />
        <TextField
          label="Date"
          variant="standard"
          type="Date"
          required={true}
          InputLabelProps={{ shrink: true, required: true }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
          style={inputStyle}
        />
        <TextField
          label="Specialist"
          variant="standard"
          required={true}
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={inputStyle}
        />
        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
            <Select
              labelId="diagnosis-codes-label"
              id="diagnosis-codes"
              multiple
              value={diagnosisCodes}
              onChange={handleCodeSelect}
              input={<OutlinedInput label="Diagnosis codes" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={CodeSelectProps}
            >
              {availableDiagnosisCodes.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={diagnosisCodes.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
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
