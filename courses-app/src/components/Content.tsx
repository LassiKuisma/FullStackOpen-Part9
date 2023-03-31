import { CoursePart } from '../App';
import Part from './Part';

interface ContentProps {
  parts: Array<CoursePart>;
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.name} course={part} />
      ))}
    </div>
  );
};

export default Content;
