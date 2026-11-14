// Modules and Namespaces - Organizing code into reusable units

// This file demonstrates module/namespace concepts
// In real projects, these would typically be in separate files

// ==== NAMESPACES ====
namespace Geometry {
  export interface Shape {
    area(): number;
  }

  export class Circle implements Shape {
    constructor(public radius: number) {}

    area(): number {
      return Math.PI * this.radius * this.radius;
    }
  }

  export class Rectangle implements Shape {
    constructor(public width: number, public height: number) {}

    area(): number {
      return this.width * this.height;
    }
  }

  export const calculateTotalArea = (shapes: Shape[]): number => {
    return shapes.reduce((sum, shape) => sum + shape.area(), 0);
  };
}

const circle = new Geometry.Circle(5);
const rectangle = new Geometry.Rectangle(4, 6);
console.log(`Circle area: ${circle.area()}`);
console.log(`Rectangle area: ${rectangle.area()}`);
console.log(
  `Total area: ${Geometry.calculateTotalArea([circle, rectangle])}`
);

// ==== NESTED NAMESPACES ====
namespace Utils {
  export namespace Math {
    export const add = (a: number, b: number): number => a + b;
    export const subtract = (a: number, b: number): number => a - b;
    export const multiply = (a: number, b: number): number => a * b;
  }

  export namespace String {
    export const toUpperCase = (str: string): string => str.toUpperCase();
    export const toLowerCase = (str: string): string => str.toLowerCase();
    export const reverse = (str: string): string =>
      str.split("").reverse().join("");
  }
}

console.log(`5 + 3 = ${Utils.Math.add(5, 3)}`);
console.log(`"Hello" reversed = "${Utils.String.reverse("Hello")}"`);

// ==== MODULE-LIKE PATTERNS (using export/import) ====

// Export individual items
export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

// Export interface
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Validating inputs
export const validate = (email: string, password: string): ValidationResult => {
  const errors: string[] = [];

  if (!validateEmail(email)) {
    errors.push("Invalid email format");
  }

  if (!validatePassword(password)) {
    errors.push("Password must be at least 8 characters");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

const validationTest = validate("user@example.com", "secure123");
console.log(validationTest);

const validationTest2 = validate("invalid", "short");
console.log(validationTest2);

// ==== BARREL EXPORT PATTERN ====
// This is how you'd structure multiple modules
export namespace Database {
  export interface Connection {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    query<T>(sql: string): Promise<T[]>;
  }

  export class MySQLConnection implements Connection {
    async connect(): Promise<void> {
      console.log("Connecting to MySQL...");
    }

    async disconnect(): Promise<void> {
      console.log("Disconnecting from MySQL...");
    }

    async query<T>(sql: string): Promise<T[]> {
      console.log(`Executing: ${sql}`);
      return [] as T[];
    }
  }

  export class PostgresConnection implements Connection {
    async connect(): Promise<void> {
      console.log("Connecting to PostgreSQL...");
    }

    async disconnect(): Promise<void> {
      console.log("Disconnecting from PostgreSQL...");
    }

    async query<T>(sql: string): Promise<T[]> {
      console.log(`Executing: ${sql}`);
      return [] as T[];
    }
  }
}

// Usage
const conn = new Database.MySQLConnection();
conn.connect();
conn.query<{ id: number; name: string }>("SELECT * FROM users");
conn.disconnect();

// ==== AMBIENT DECLARATIONS ====
// Declaring types for external libraries
declare global {
  interface Window {
    myCustomApi: {
      getData(): Promise<any>;
    };
  }
}

// ==== NAMESPACES WITH SHARING ====
namespace Logger {
  export enum LogLevel {
    Debug = 0,
    Info = 1,
    Warn = 2,
    Error = 3,
  }

  export interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: Date;
  }

  export class ConsoleLogger {
    private logs: LogEntry[] = [];

    log(level: LogLevel, message: string): void {
      const entry: LogEntry = {
        level,
        message,
        timestamp: new Date(),
      };
      this.logs.push(entry);
      console.log(`[${LogLevel[level]}] ${message}`);
    }

    getLogs(): LogEntry[] {
      return [...this.logs];
    }
  }
}

const logger = new Logger.ConsoleLogger();
logger.log(Logger.LogLevel.Info, "Application started");
logger.log(Logger.LogLevel.Error, "An error occurred");
console.log(logger.getLogs());
