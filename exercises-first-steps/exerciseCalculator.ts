interface ExerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  hoursPerDay: number[],
  target: number
): ExerciseReport => {
  const periodLength = hoursPerDay.length;
  if (periodLength === 0) {
    return {
      periodLength,
      trainingDays: 0,
      success: false,
      rating: 1,
      ratingDescription: "You didn't do ANYTHING",
      target,
      average: 0,
    };
  }

  const totalHours = hoursPerDay.reduce((total, hours) => total + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= target;

  const ratings = [
    { rating: 1, description: 'you need to do more', minRatio: 0.0 },
    { rating: 2, description: 'not great, not terrible', minRatio: 0.6 },
    { rating: 3, description: 'truly above and beyond', minRatio: 1.0 },
  ];

  const ratio = average / target;

  let rating = ratings[0];
  for (const r of ratings) {
    if (ratio < r.minRatio) {
      break;
    }
    rating = r;
  }

  const trainingDays = hoursPerDay.filter((hours) => hours !== 0).length;

  return {
    periodLength,
    trainingDays,
    success,
    rating: rating.rating,
    ratingDescription: rating.description,
    target,
    average,
  };
};
