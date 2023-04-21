import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { HealthCheckRating } from '../../../types';

import { Favorite, HeartBroken } from '@mui/icons-material';

interface Props {
  healthRating: string;
  setHealthRating: (rating: string) => void;
}

const HealthCheckTab = ({ healthRating, setHealthRating }: Props) => {
  const radioButtons: Array<{
    value: number;
    icon: JSX.Element;
    label: string;
  }> = [
    {
      value: HealthCheckRating['Healthy'],
      icon: IconHealthy,
      label: 'Healthy',
    },
    {
      value: HealthCheckRating['LowRisk'],
      icon: IconLowRisk,
      label: 'Low risk',
    },
    {
      value: HealthCheckRating['HighRisk'],
      icon: IconHighRisk,
      label: 'High risk',
    },
    {
      value: HealthCheckRating['CriticalRisk'],
      icon: IconCriticalRisk,
      label: 'Critical risk',
    },
  ];

  return (
    <FormControl>
      <FormLabel id="health-check-radio-buttons-label">
        Health check result
      </FormLabel>
      <RadioGroup
        aria-labelledby="health-check-radio-buttons-label"
        name="radio-buttons-group"
        value={healthRating}
        onChange={({ target }) => setHealthRating(target.value)}
      >
        {radioButtons.map((button) => (
          <FormControlLabel
            key={button.value}
            value={button.value}
            control={<Radio />}
            label={
              <div>
                {button.icon} {button.label}
              </div>
            }
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

const IconHealthy = <Favorite style={{ color: 'green' }} />;
const IconLowRisk = <Favorite style={{ color: 'yellow' }} />;
const IconHighRisk = <Favorite style={{ color: 'red' }} />;
const IconCriticalRisk = <HeartBroken />;

export default HealthCheckTab;
