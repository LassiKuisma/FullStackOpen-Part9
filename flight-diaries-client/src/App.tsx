import { useState, useEffect } from 'react';
import FlightDiaries from './components/FlightDiaries';
import { getAllDiaries } from './services/diaryService';
import { FlightDiary } from './types';

const App = () => {
  const [diaries, setDiaries] = useState<FlightDiary[]>([]);

  useEffect(() => {
    getAllDiaries().then((diaries) => setDiaries(diaries));
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      <FlightDiaries flightDiaries={diaries} />
    </div>
  );
};

export default App;
