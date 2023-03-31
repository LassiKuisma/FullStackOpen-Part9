interface Course {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  parts: Array<Course>;
}

const Total = (props: TotalProps) => {
  const total = props.parts.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  );
};

export default Total;
