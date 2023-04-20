import { TextField } from '@mui/material';

interface Props {
  textFieldStyle: React.CSSProperties;
  dischargeCriteria: string;
  setDischargeCriteria: (criteria: string) => void;
  dischargeDate: string;
  setDischargeDate: (date: string) => void;
}

const HospitalEntryTab = ({
  textFieldStyle,
  dischargeCriteria,
  setDischargeCriteria,
  dischargeDate,
  setDischargeDate,
}: Props) => {
  return (
    <div>
      <TextField
        label="Discharge criteria"
        variant="standard"
        fullWidth
        value={dischargeCriteria}
        onChange={({ target }) => setDischargeCriteria(target.value)}
        style={textFieldStyle}
      />
      <TextField
        label="Discharge date"
        variant="standard"
        fullWidth
        value={dischargeDate}
        onChange={({ target }) => setDischargeDate(target.value)}
        style={textFieldStyle}
      />
    </div>
  );
};

export default HospitalEntryTab;
