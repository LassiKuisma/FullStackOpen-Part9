import { useState } from 'react';
import { NewFlightDiary } from '../types';

interface DiaryCreationProps {
  addNewDiary: (diary: NewFlightDiary) => void;
}

const DateRow = ({
  date,
  setDate,
  columnsInTable,
}: {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  columnsInTable: number;
}) => (
  <tr>
    <td>Date</td>
    <td colSpan={columnsInTable}>
      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
    </td>
  </tr>
);

const VisibilityRow = ({
  visibility,
  setVisibility,
  values,
}: {
  visibility: string;
  setVisibility: React.Dispatch<React.SetStateAction<string>>;
  values: string[];
}) => (
  <tr>
    <td>Visibility</td>
    {values.map((value) => (
      <td key={value}>
        <label htmlFor={value}>{value}</label>
        <input
          type="radio"
          id={value}
          name="visibility"
          value={value}
          onChange={(event) => {
            setVisibility(event.target.value);
          }}
          checked={visibility === value}
        />
      </td>
    ))}
  </tr>
);

const WeatherRow = ({
  weather,
  setWeather,
  values,
}: {
  weather: string;
  setWeather: React.Dispatch<React.SetStateAction<string>>;
  values: string[];
}) => (
  <tr>
    <td>Weather</td>
    {values.map((value) => (
      <td key={value}>
        <label htmlFor={value}>{value}</label>
        <input
          type="radio"
          id={value}
          name="weather"
          value={value}
          onChange={(event) => {
            setWeather(event.target.value);
          }}
          checked={weather === value}
        />
      </td>
    ))}
  </tr>
);

const CommentRow = ({
  comment,
  setComment,
  columnsInTable,
}: {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  columnsInTable: number;
}) => (
  <tr>
    <td>Comment</td>
    <td colSpan={columnsInTable}>
      <input
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
    </td>
  </tr>
);

const CreateNewDiary = (props: DiaryCreationProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary: NewFlightDiary = {
      visibility,
      weather,
      date,
      comment,
    };

    props.addNewDiary(newDiary);

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  const visibilityValues = ['great', 'good', 'ok', 'poor'];
  const weatherValues = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
  const columnsInTable = Math.max(
    visibilityValues.length,
    weatherValues.length
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <table border={0}>
          <tbody>
            <DateRow
              date={date}
              setDate={setDate}
              columnsInTable={columnsInTable}
            />
            <VisibilityRow
              visibility={visibility}
              setVisibility={setVisibility}
              values={visibilityValues}
            />
            <WeatherRow
              weather={weather}
              setWeather={setWeather}
              values={weatherValues}
            />
            <CommentRow
              comment={comment}
              setComment={setComment}
              columnsInTable={columnsInTable}
            />
          </tbody>
        </table>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateNewDiary;
