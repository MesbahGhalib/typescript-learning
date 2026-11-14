// Decorators - Adding metadata and modifying behavior of classes and properties

// Enable experimental decorators in tsconfig.json for this to work

// Class decorator
const Deprecated = (target: any) => {
  console.log(`${target.name} is deprecated`);
};

@Deprecated
class OldFeature {
  execute(): string {
    return "executing old feature";
  }
}

// Method decorator
const Timer = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const start = Date.now();
    const result = originalMethod.apply(this, args);
    const end = Date.now();
    console.log(`${propertyKey} took ${end - start}ms`);
    return result;
  };
  return descriptor;
};

class Calculator {
  @Timer
  add(a: number, b: number): number {
    return a + b;
  }

  @Timer
  multiply(a: number, b: number): number {
    return a * b;
  }
}

const calc = new Calculator();
console.log(calc.add(5, 3));
console.log(calc.multiply(4, 2));

// Property decorator
const Readonly = (target: any, propertyKey: string) => {
  let value: any;
  const getter = () => value;
  const setter = (newVal: any) => {
    console.log(`Cannot set ${propertyKey}, it is readonly`);
  };
  Object.defineProperty(target, propertyKey, { get: getter, set: setter });
};

class User {
  name: string;

  @Readonly
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user = new User("Mesbah", 101);
console.log(user.id);

// Parameter decorator
const Validate = (target: any, propertyKey: string, parameterIndex: number) => {
  console.log(`Validating parameter at index ${parameterIndex}`);
};

class Logger {
  log(@Validate message: string): void {
    console.log(message);
  }
}

const logger = new Logger();
logger.log("Hello World");

// Decorator factory with arguments
const Role = (role: string) => {
  return (target: any) => {
    target.role = role;
    console.log(`Class assigned role: ${role}`);
  };
};

@Role("Admin")
class AdminUser {
  username: string;
  constructor(username: string) {
    this.username = username;
  }
}

// Composition of decorators
const Validate2 = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = function (value: any) {
    if (value === null || value === undefined) {
      throw new Error("Value cannot be null");
    }
    return originalMethod.apply(this, [value]);
  };
  return descriptor;
};

const Secure = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`Secure access to ${propertyKey}`);
    return originalMethod.apply(this, args);
  };
  return descriptor;
};

class SecureUser {
  @Validate2
  @Secure
  setPassword(pwd: string): void {
    console.log(`Password set: ${pwd.length} chars`);
  }
}

const secureUser = new SecureUser();
secureUser.setPassword("secret123");
