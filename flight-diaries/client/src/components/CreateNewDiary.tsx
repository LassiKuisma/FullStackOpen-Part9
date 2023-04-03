import { useState } from 'react';
import { NewFlightDiary } from '../types';

interface DiaryCreationProps {
  addNewDiary: (diary: NewFlightDiary) => void;
}

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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Date
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          Visibility
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          Weather
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          Comment
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateNewDiary;
