import axios from 'axios';
import { FlightDiary } from '../types';

const baseUrl = 'http://localhost:3009/api/diaries';

export const getAllDiaries = () => {
  return axios.get<FlightDiary[]>(baseUrl).then((response) => response.data);
};
