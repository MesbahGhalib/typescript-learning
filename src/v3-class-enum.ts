class Student {
  constructor(public name: string) {}

  introduce(): string {
    return `Hello, I'm ${this.name}`;
  }
}

const student = new Student("Mesbah");
console.log(student.introduce());

enum CourseStatus {
  NotStarted = "not started",
  InProgress = "in progress",
  Completed = "completed",
}

const status: CourseStatus = CourseStatus.InProgress;
console.log(`Course status: ${status}`);

class Mentor extends Student {
  constructor(name: string, public subject: string) {
    super(name);
  }

  teach(): string {
    return `${this.name} teaches ${this.subject}`;
  }
}

const mentor = new Mentor("Alex", "TypeScript");
console.log(mentor.teach());

const describePerson = (person: Student): string => {
  if (person instanceof Mentor) {
    return person.teach();
  }
  return person.introduce();
};

console.log(describePerson(student));
console.log(describePerson(mentor));
