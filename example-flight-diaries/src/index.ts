import express from 'express';
import diaryRouter from './routes/diaries';
import cors from 'cors';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get('/ping', (_req, res) => {
  console.log('somebody pinged');
  res.send('pong');
});

app.use('/api/diaries', diaryRouter);

const PORT = 3009;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
