export interface FlightDiary {
  id: number;
  visibility: string;
  weather: string;
  date: string;
  comment?: string;
}

export type NewFlightDiary = Omit<FlightDiary, 'id'>;

export type Err = { k: 'error'; message: string };
export type Ok<T> = { k: 'ok'; value: T };

export type Result<T> = Ok<T> | Err;
