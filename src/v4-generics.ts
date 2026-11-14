// Generics - Creating reusable and flexible components

// Generic function with type parameter
const createArray = <T>(value: T, length: number): T[] => {
  return Array(length).fill(value);
};

const numberArray = createArray(42, 3);
console.log(numberArray); // [42, 42, 42]

const stringArray = createArray("hello", 2);
console.log(stringArray); // ["hello", "hello"]

// Generic constraints
const getLength = <T extends { length: number }>(item: T): number => {
  return item.length;
};

console.log(getLength("TypeScript")); // 10
console.log(getLength([1, 2, 3])); // 3

// Generic interface
interface Repository<T> {
  items: T[];
  add(item: T): void;
  remove(item: T): void;
  getAll(): T[];
}

class UserRepository implements Repository<string> {
  items: string[] = [];

  add(item: string): void {
    this.items.push(item);
  }

  remove(item: string): void {
    this.items = this.items.filter((u) => u !== item);
  }

  getAll(): string[] {
    return [...this.items];
  }
}

const userRepo = new UserRepository();
userRepo.add("Alice");
userRepo.add("Bob");
console.log(userRepo.getAll()); // ["Alice", "Bob"]

// Generic class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2
console.log(numberStack.peek()); // 1

// Multiple type parameters
const createTuple = <T, U>(first: T, second: U): [T, U] => [first, second];
const pair = createTuple("hello", 42);
console.log(pair); // ["hello", 42]

// Generic with default type
type Maybe<T = string> = T | null;
const optionalString: Maybe = "value";
const optionalNumber: Maybe<number> = 123;
console.log(optionalString, optionalNumber);

// Keyof constraint
const getObjectKey = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
const course = { title: "TypeScript", duration: 30 };
const courseTitle = getObjectKey(course, "title");
console.log(courseTitle);
