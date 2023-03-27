const calculateBmi = (height: number, weight: number): string => {
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

interface Measurements {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): Measurements | Error => {
  if (args.length > 4) return new Error('Too many arguments');
  if (args.length < 4) return new Error('Not enough arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight)) {
    return new Error('Provided values were not numbers');
  }

  return {
    height,
    weight,
  };
};

const bmiArgs = parseBmiArguments(process.argv);

if (bmiArgs instanceof Error) {
  console.log('Something went wrong:', bmiArgs.message);
} else {
  console.log(
    `Bmi for ${bmiArgs.height}cm, ${bmiArgs.weight}kg is:`,
    calculateBmi(bmiArgs.height, bmiArgs.weight)
  );
}
