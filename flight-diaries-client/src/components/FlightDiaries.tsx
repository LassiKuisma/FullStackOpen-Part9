import { FlightDiary } from '../types';

interface DiariesProps {
  flightDiaries: FlightDiary[];
}

const Diary = ({ diary }: { diary: FlightDiary }) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <div>Visibility: {diary.visibility}</div>
      <div>Weather: {diary.weather}</div>
    </div>
  );
};

const FlightDiaries = (props: DiariesProps) => {
  return (
    <div>
      {props.flightDiaries.map((diary) => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default FlightDiaries;
