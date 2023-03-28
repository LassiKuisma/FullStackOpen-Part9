import express from 'express';
import diagnosisRouter from './routes/diagnoses';

const app = express();
app.use(express.json());

app.get('/api/ping', (_req, res) => {
  console.log('ping');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
