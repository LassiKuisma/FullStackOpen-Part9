import { TextField } from '@mui/material';

interface Props {
  textFieldStyle: React.CSSProperties;
  healthRating: string;
  setHealthRating: (rating: string) => void;
}

const HealthCheckTab = ({
  textFieldStyle,
  healthRating,
  setHealthRating,
}: Props) => {
  return (
    <div>
      <TextField
        label="Healthcheck rating"
        variant="standard"
        fullWidth
        value={healthRating}
        onChange={({ target }) => setHealthRating(target.value)}
        style={textFieldStyle}
      />
    </div>
  );
};

export default HealthCheckTab;
