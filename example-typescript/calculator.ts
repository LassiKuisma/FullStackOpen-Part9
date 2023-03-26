type Operation = 'multiply' | 'add' | 'divide';

type Result = string | number;

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case 'multiply':
      return a * b;
    case 'divide':
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case 'add':
      return a + b;
    default:
      throw new Error('Operation is not multiply, add or divide!');
  }
};

try {
  console.log('2+4 =', calculator(2, 4, 'add'));
  console.log('7/0 =', calculator(7, 0, 'divide'));
} catch (error) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}
