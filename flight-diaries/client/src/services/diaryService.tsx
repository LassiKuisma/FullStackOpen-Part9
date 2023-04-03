import axios from 'axios';
import { FlightDiary, NewFlightDiary } from '../types';

const baseUrl = 'http://localhost:3009/api/diaries';

export const getAllDiaries = () => {
  return axios.get<FlightDiary[]>(baseUrl).then((response) => response.data);
};

export const createFlightDiary = (diary: NewFlightDiary) => {
  return axios
    .post<FlightDiary>(baseUrl, diary)
    .then((response) => response.data);
};
