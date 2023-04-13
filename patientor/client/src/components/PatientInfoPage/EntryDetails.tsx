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

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <div className="entryBox">
      {entry.date} <HealingIcon />
      <br />
      <i>{entry.description}</i>
      <div>Hospital</div>
      <br />
      Diagnose by {entry.specialist}
    </div>
  );
};

const OccupationalEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <div className="entryBox">
      {entry.date} <WorkIcon /> {entry.employerName}
      <br />
      <i>{entry.description}</i>
      <br />
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

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <div className="entryBox">
      {entry.date} <MedicalServicesIcon />
      <br />
      <i>{entry.description}</i>
      <br />
      <HealthRatingIcon rating={entry.healthCheckRating} />
      <br />
      Diagnose by {entry.specialist}
    </div>
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
      return <HospitalEntryDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalEntryDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    default:
      return assertNever(entry);
  }

  /*const codes = (
    <ul>
      {entry.diagnosisCodes?.map((code) => {
        const name = diagnoses.get(code)?.name || 'unknown';
        return (
          <li key={code}>
            {code} {name}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="entryBox">
      {entry.date}
      <br />
      <i>{entry.description}</i>
      {codes}
    </div>
  );*/
};

export default EntryDetails;
