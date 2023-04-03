export interface FlightDiary {
  id: number;
  visibility: string;
  weather: string;
  date: string;
  comment?: string;
}

export type NewFlightDiary = Omit<FlightDiary, 'id'>;
