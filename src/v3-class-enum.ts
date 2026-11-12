class Student {
  constructor(public name: string) {}

  introduce(): string {
    return `Hello, I'm ${this.name}`;
  }
}

const student = new Student("Mesbah");
console.log(student.introduce());
