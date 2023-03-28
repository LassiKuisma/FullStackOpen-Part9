export const calculateBmi = (height: number, weight: number): string => {
  const meters = height / 100;
  const bmi = weight / (meters * meters);

  const bmiCategories = [
    { name: 'Underweight (Severe thinness)', maxBmi: 16.0 },
    { name: 'Underweight (Moderate thinness)', maxBmi: 16.9 },
    { name: 'Underweight (Mild thinness)', maxBmi: 18.4 },
    { name: 'Normal range', maxBmi: 24.9 },
    { name: 'Overweight (Pre-obese)', maxBmi: 29.9 },
    { name: 'Obese (Class I)', maxBmi: 34.9 },
    { name: 'Obese (Class II)', maxBmi: 39.9 },
  ];
  const highest = { name: 'Obese (Class III)', maxBmi: 999.9 };

  for (const category of bmiCategories) {
    if (bmi < category.maxBmi) {
      return category.name;
    }
  }

  return highest.name;
};
