// Define the Person type
export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }
  
  // Define the Student type, which extends Person
  interface Student extends Person {
    studentId: string;
    enrolledClassrooms: Classroom[];
  }
  
  // Define the Teacher type, which extends Person
  interface Teacher extends Person {
    teacherId: string;
    teachingClassrooms: Classroom[];
  }
  
  // Define the Classroom type
  export interface Classroom {
    id: number;
    name: string;
    description: string;
    classroomCode: string;
    students: Student[];
    teacher: Teacher;
    posts: Post[];
  }
  
  // Define the Post type (could be an assignment or note)
  interface Post {
    id: number;
    title: string;
    content: string;
    author: Person; // This can be either a Student or a Teacher
    createdAt: Date;
  }
  
  // Example usage:
  
  const student1: Student = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    studentId: "ST12345",
    enrolledClassrooms: [],
    phoneNumber: "1234567890"
  };
  
  const teacher1: Teacher = {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    teacherId: "T12345",
    teachingClassrooms: [],
    phoneNumber: "1234567890",
  };
  
  export const EXAMPLE_CLASSROOM_1: Classroom = {
    id: 101,
    name: "Algebra 101",
    description: "Major topics of study include: evaluation of algebraic equations, exponent rules and manipulation, polynomials, solving and graphing linear equations, solving and graphing two variable inequalities, solving systems of equations, radicals, word problems, solving and graphing quadratic equations, and factoring.",
    classroomCode: "MATHALG101",
    students: [student1],
    teacher: teacher1,
    posts: [],
  };

  export const EXAMPLE_CLASSROOM_2: Classroom = {
    id: 102,
    name: "Statistics for Dummies",
    description: "Topics discussed include displaying and describing data, the normal curve, regression, probability, statistical inference, confidence intervals, and hypothesis tests with applications in the real world. Students also have the opportunity to analyze data sets using technology.",
    classroomCode: "STATS4DUMMIES",
    students: [student1],
    teacher: teacher1,
    posts: [],
  };

  export const EXAMPLE_CLASSROOM_3: Classroom = {
    id: 103,
    name: "Biology Lab",
    description: "This course examines science as a process to understand basic biological concepts of cells, genetics, evolution, and ecology. Students will examine current biological research and how that impacts their lives and the future of humankind.",
    classroomCode: "JOINBIOTODAY",
    students: [student1],
    teacher: teacher1,
    posts: [],
  };

  export const EXAMPLE_CLASSROOM_4: Classroom = {
    id: 104,
    name: "Data Structures Class",
    description: "An overview of data structure concepts, arrays, stack, queues, trees, and graphs. Discussion of various implementations of these data objects, programming styles, and run-time representations. Course also examines algorithms for sorting, searching and some graph algorithms.",
    classroomCode: "CSISCOOL",
    students: [student1],
    teacher: teacher1,
    posts: [],
  };

  export const EXAMPLE_CLASSES = [
    EXAMPLE_CLASSROOM_1,
    EXAMPLE_CLASSROOM_2,
    EXAMPLE_CLASSROOM_3,
    EXAMPLE_CLASSROOM_4
  ]
  
  const assignment1: Post = {
    id: 201,
    title: "Homework 1",
    content: "Complete exercises 1-5 by next week.",
    author: teacher1,
    createdAt: new Date(),
  };
  