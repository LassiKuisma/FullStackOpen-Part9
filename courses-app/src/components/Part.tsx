import {
  CoursePart,
  CoursePartBackground,
  CoursePartBasic,
  CoursePartGroup,
  CoursePartSpecial,
} from '../App';

const BasicCourse = (course: CoursePartBasic) => (
  <div>
    <i>{course.description}</i>
  </div>
);

const BackgroundCourse = (course: CoursePartBackground) => (
  <div>
    {course.description}
    <br />
    Submit to: {course.backgroundMaterial}
  </div>
);

const GroupCourse = (course: CoursePartGroup) => (
  <div>Project exercises: {course.groupProjectCount} </div>
);

const SpecialCourse = (course: CoursePartSpecial) => (
  <div>Required skills: {course.requirements.join(',')}</div>
);

const CourseDetails = (course: CoursePart) => {
  switch (course.kind) {
    case 'basic':
      return BasicCourse(course);
    case 'background':
      return BackgroundCourse(course);
    case 'group':
      return GroupCourse(course);
    case 'special':
      return SpecialCourse(course);
    default:
      return assertNever(course);
  }
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface PartProps {
  course: CoursePart;
}

const Part = (props: PartProps) => {
  const course = props.course;

  return (
    <div>
      <p>
        <b>
          {course.name} {course.exerciseCount}
        </b>
      </p>
      {CourseDetails(course)}
    </div>
  );
};

export default Part;
