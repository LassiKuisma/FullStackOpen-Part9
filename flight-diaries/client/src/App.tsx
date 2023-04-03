import { useState, useEffect } from 'react';
import FlightDiaries from './components/FlightDiaries';
import CreateNewDiary from './components/CreateNewDiary';
import { createFlightDiary, getAllDiaries } from './services/diaryService';
import { FlightDiary, NewFlightDiary } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<FlightDiary[]>([]);

  useEffect(() => {
    getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  const addNewDiary = (diary: NewFlightDiary) => {
    createFlightDiary(diary).then((created) => {
      setDiaries(diaries.concat(created));
    });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <CreateNewDiary addNewDiary={addNewDiary} />
      <h2>Diary entries</h2>
      <FlightDiaries flightDiaries={diaries} />
    </div>
  );
};

export default App;
