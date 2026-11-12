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
