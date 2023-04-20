import { Checkbox, TextField } from '@mui/material';

interface Props {
  textFieldStyle: React.CSSProperties;
  employerName: string;
  setEmployerName: (name: string) => void;
  sickLeaveEnabled: boolean;
  setSickLeaveEnabled: (enabled: boolean) => void;
  sickLeaveStart: string;
  setSickLeaveStart: (startDate: string) => void;
  sickLeaveEnd: string;
  setSickLeaveEnd: (endDate: string) => void;
}

const OccupationalEntryTab = ({
  textFieldStyle,
  employerName,
  setEmployerName,
  sickLeaveEnabled,
  setSickLeaveEnabled,
  sickLeaveStart,
  setSickLeaveStart,
  sickLeaveEnd,
  setSickLeaveEnd,
}: Props) => {
  return (
    <div>
      <TextField
        label="Employer"
        variant="standard"
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        style={textFieldStyle}
      />
      <div>
        Sick leave?
        <Checkbox
          value={sickLeaveEnabled}
          onChange={() => setSickLeaveEnabled(!sickLeaveEnabled)}
        />
      </div>
      <TextField
        label="Start"
        variant="standard"
        fullWidth
        value={sickLeaveStart}
        onChange={({ target }) => setSickLeaveStart(target.value)}
        style={textFieldStyle}
        disabled={!sickLeaveEnabled}
      />
      <TextField
        label="End"
        variant="standard"
        fullWidth
        value={sickLeaveEnd}
        onChange={({ target }) => setSickLeaveEnd(target.value)}
        style={textFieldStyle}
        disabled={!sickLeaveEnabled}
      />
    </div>
  );
};

export default OccupationalEntryTab;
