// Advanced Types - Conditional types, mapped types, utility types

// Conditional types
type IsString<T> = T extends string ? true : false;
type A = IsString<"hello">; // true
type B = IsString<42>; // false

// Extract type from union
type Extract<T, U> = T extends U ? T : never;
type StringOrNumber = string | number | boolean;
type OnlyString = Extract<StringOrNumber, string>; // string

// Exclude type from union
type Exclude<T, U> = T extends U ? never : T;
type OnlyNotString = Exclude<StringOrNumber, string>; // number | boolean

// Recursive conditional types
type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T;
type Nested = [[["hello"]]];
type FlattenedType = Flatten<Nested>; // string

// Mapped types - transforming each property
type Readonly2<T> = {
  readonly [K in keyof T]: T[K];
};

interface Student {
  name: string;
  age: number;
  email: string;
}

type ReadonlyStudent = Readonly2<Student>;
// Equivalent to:
// {
//   readonly name: string;
//   readonly age: number;
//   readonly email: string;
// }

// Getters mapped type
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type StudentGetters = Getters<Student>;
// Equivalent to:
// {
//   getName: () => string;
//   getAge: () => number;
//   getEmail: () => string;
// }

// Nullable mapped type
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

type NullableStudent = Nullable<Student>;
// Equivalent to:
// {
//   name: string | null;
//   age: number | null;
//   email: string | null;
// }

// Utility types
// Partial - make all properties optional
type PartialStudent = Partial<Student>;
const partialStudent: PartialStudent = { name: "Mesbah" };

// Required - make all properties required
type RequiredStudent = Required<PartialStudent>;
// const incompleteStudent: RequiredStudent = { name: "Mesbah" }; // Error

// Pick - select specific properties
type StudentPreview = Pick<Student, "name" | "email">;
const preview: StudentPreview = { name: "Mesbah", email: "m@test.com" };

// Omit - exclude specific properties
type StudentSummary = Omit<Student, "email">;
const summary: StudentSummary = { name: "Mesbah", age: 25 };

// Record - create object with specific keys
type Role = "admin" | "user" | "guest";
type Permissions = Record<Role, string[]>;
const permissions: Permissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};

// ReturnType - extract return type of function
type GetSomething = () => string;
type ReturnVal = ReturnType<GetSomething>; // string

// InstanceType - extract constructor instance type
class Course {
  title: string;
  constructor(title: string) {
    this.title = title;
  }
}

type CourseInstance = InstanceType<typeof Course>; // Course
const course: CourseInstance = new Course("TypeScript");

// Template literal types
type Greeting<T extends string> = `Hello ${T}!`;
type WelcomeMessage = Greeting<"Mesbah">; // "Hello Mesbah!"

// Distributive conditional types
type Union = string | number;
type StringOrNumberToBoolean<T> = T extends string
  ? true
  : T extends number
    ? false
    : never;

type Result1 = StringOrNumberToBoolean<string>; // true
type Result2 = StringOrNumberToBoolean<number>; // false
type Result3 = StringOrNumberToBoolean<Union>; // true | false (distributed)

// Combining types with intersections
type Admin = { isAdmin: true; permissions: string[] };
type User2 = { userId: number; username: string };
type AdminUser = Admin & User2;

const adminUser: AdminUser = {
  isAdmin: true,
  permissions: ["delete", "ban"],
  userId: 1,
  username: "admin",
};

console.log(adminUser);
console.log(permissions);
console.log(preview);
console.log(summary);
