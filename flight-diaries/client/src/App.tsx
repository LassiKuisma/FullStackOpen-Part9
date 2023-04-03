import { useState, useEffect } from 'react';
import FlightDiaries from './components/FlightDiaries';
import CreateNewDiary from './components/CreateNewDiary';
import { createFlightDiary, getAllDiaries } from './services/diaryService';
import { FlightDiary, NewFlightDiary } from './types';
import Notification from './components/Notification';

const App = () => {
  const [diaries, setDiaries] = useState<FlightDiary[]>([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  const addNewDiary = (diary: NewFlightDiary) => {
    createFlightDiary(diary).then((result) => {
      if (result.k === 'ok') {
        const created = result.value;
        setDiaries(diaries.concat(created));
      } else {
        setNotification(result.message);
        setTimeout(() => {
          setNotification('');
        }, 10000);
      }
    });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={notification} />
      <CreateNewDiary addNewDiary={addNewDiary} />
      <h2>Diary entries</h2>
      <FlightDiaries flightDiaries={diaries} />
    </div>
  );
};

export default App;
