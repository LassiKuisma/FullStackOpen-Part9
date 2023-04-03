import axios from 'axios';
import { FlightDiary, NewFlightDiary, Ok, Result } from '../types';

const baseUrl = 'http://localhost:3009/api/diaries';

export const getAllDiaries = () => {
  return axios.get<FlightDiary[]>(baseUrl).then((response) => response.data);
};

export const createFlightDiary = (
  diary: NewFlightDiary
): Promise<Result<FlightDiary>> => {
  return axios
    .post<FlightDiary>(baseUrl, diary)
    .then((response) => {
      const ok: Ok<FlightDiary> = { k: 'ok', value: response.data };
      return ok;
    })
    .catch((error) => {
      let message = 'Something went wrong';
      if (axios.isAxiosError(error)) {
        if (error.response) {
          message = error.response.data;
        }
      }
      return { k: 'error', message };
    });
};
