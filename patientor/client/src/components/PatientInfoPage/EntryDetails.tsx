import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import HealingIcon from '@mui/icons-material/Healing';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';

import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types';

import { assertNever } from '../../util';

const HospitalEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Map<string, Diagnosis>;
}) => {
  return (
    <div className="entryBox">
      {entry.date} <HealingIcon />
      <br />
      <i>{entry.description}</i>
      <DiagnosisCodes entry={entry} diagnoses={diagnoses} />
      Diagnose by {entry.specialist}
    </div>
  );
};

const OccupationalEntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Map<string, Diagnosis>;
}) => {
  return (
    <div className="entryBox">
      {entry.date} <WorkIcon /> {entry.employerName}
      <br />
      <i>{entry.description}</i>
      <br />
      <DiagnosisCodes entry={entry} diagnoses={diagnoses} />
      Diagnose by {entry.specialist}
    </div>
  );
};

const HealthRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: 'green' }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: 'yellow' }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: 'red' }} />;
    case HealthCheckRating.CriticalRisk:
      return <HeartBrokenIcon />;
    default:
      return assertNever(rating);
  }
};

const HealthCheckDetails = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Map<string, Diagnosis>;
}) => {
  return (
    <div className="entryBox">
      {entry.date} <MedicalServicesIcon />
      <br />
      <i>{entry.description}</i>
      <br />
      <HealthRatingIcon rating={entry.healthCheckRating} />
      <br />
      <DiagnosisCodes entry={entry} diagnoses={diagnoses} />
      Diagnose by {entry.specialist}
    </div>
  );
};

const DiagnosisCodes = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Map<string, Diagnosis>;
}) => {
  if (!entry.diagnosisCodes) {
    return <></>;
  }

  return (
    <ul>
      {entry.diagnosisCodes.map((code) => {
        const name = diagnoses.get(code)?.name || 'unknown';
        return (
          <li key={code}>
            {code} {name}
          </li>
        );
      })}
    </ul>
  );
};

const EntryDetails = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Map<string, Diagnosis>;
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
