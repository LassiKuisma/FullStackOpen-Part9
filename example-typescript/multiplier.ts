interface MultiplyValues {
  value1: number;
  value2: number;
}
const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const first = Number(args[2]);
  const second = Number(args[3]);

  if (isNaN(first) || isNaN(second)) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    value1: first,
    value2: second,
  };
};

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(value1, value2, `${value1} * ${value2} =`);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
