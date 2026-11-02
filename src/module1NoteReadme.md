TypeScript Master Study Notes

Beginner → Intermediate | বাংলা ব্যাখ্যা | Based on 20 handwritten pages

Scope: তোমার নোটের বিষয়গুলোকে সাজানো হয়েছে। নিচের “সংশোধন” অংশগুলোতে ভুল বা অসম্পূর্ণ ধারণা ঠিক করা হয়েছে। অতিরিক্ত React উদাহরণগুলো শেখার সুবিধার জন্য সংযোজন।

1. TypeScript কী ও কেন

TypeScript হলো JavaScript-এর উপর তৈরি একটি ভাষা, যেখানে static type checking আছে। TypeScript compiler সাধারণত JavaScript output তৈরি করে। ভুল type ব্যবহার করলে কোড চালানোর আগেই অনেক সমস্যা ধরা যায়।

let age: number = 25;
// age = "hello"; // Type error

মনে রাখো: TypeScript সব bug আটকায় না; runtime validation আলাদাভাবে দরকার হতে পারে।

2. Type Inference: Implicit বনাম Explicit

Implicit: TypeScript value দেখে type অনুমান করে। Explicit: তুমি নিজে type লিখে দাও।

let age = 25; // inferred number
let name: string = "Ghalib"; // explicit

মনে রাখো: সাধারণ local variable-এ inference ভালো কাজ করে; public API ও parameter-এ স্পষ্ট type উপকারী।

3. Primitive Types

string = লেখা, number = সংখ্যা, boolean = true/false, bigint = বড় integer, symbol = unique identifier। null ও undefined-ও গুরুত্বপূর্ণ type।

let title: string = "Hello";
let count: number = 10;
let active: boolean = true;
let big: bigint = 100n;

মনে রাখো: TypeScript-এ lowercase string/number/boolean ব্যবহার করো।

4. Arrays এবং Union

Array একই ধরনের বহু value রাখতে পারে। Union (|) মানে একটি value একাধিক নির্ধারিত type-এর যেকোনো একটি হতে পারে।

const names: string[] = ["Ghalib", "Keya"];
let id: string | number = 123;
const mixed: (string | number)[] = ["A", 1];

মনে রাখো: string[] এবং Array<string> একই ধরনের array type লেখার দুটি উপায়।

5. Tuple ও Readonly Tuple

Tuple-এ প্রতিটি position-এর type নির্দিষ্ট করা যায়। readonly tuple-এ TypeScript সরাসরি element বদলাতে বাধা দেয়।

let point: [number, number] = [23.8, 90.4];
const fixed: readonly [number, number] = [1, 2];
// fixed[0] = 9; // Type error

মনে রাখো: Tuple length ও position গুরুত্বপূর্ণ। readonly runtime freeze নয়।

6. Function Parameter ও Return Type

Parameter-এর type লিখে input নিয়ন্ত্রণ করা যায়; return type দিয়ে output-এর প্রত্যাশিত type প্রকাশ করা যায়।

function add(a: number, b: number): number {
return a + b;
}

মনে রাখো: Function-এর return type অনেক সময় TypeScript নিজেই infer করতে পারে।

7. Optional ও Default Parameter

Optional parameter (?) না দিলেও function call করা যায়। Default parameter (=) argument বাদ দিলে বা undefined দিলে fallback value নেয়।

function greet(name: string, title?: string) { return title ? title + name : name; }
function welcome(name: string = "Guest") { return name; }

মনে রাখো: Default parameter-এর type সাধারণত default value থেকে infer হয়।

8. Rest Parameter ও reduce

Rest parameter (...items) অনেক argument-কে একটি array-তে সংগ্রহ করে। reduce array-কে accumulator দিয়ে একটি result-এ রূপান্তর করে।

function sum(...numbers: number[]): number {
return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3); // 6

মনে রাখো: Rest parameter অবশ্যই শেষ parameter। reduce-এ 0 হলো যোগফলের initial accumulator।

9. Tuple Rest Elements

Tuple-এ নির্দিষ্ট শুরু বা শেষের সঙ্গে variable-length অংশ রাখা যায়।

type Entry = [string, ...number[]];
const entry: Entry = ["scores", 10, 20];

মনে রাখো: Rest tuple element এবং function rest parameter সম্পর্কিত কিন্তু এক নয়।

10. void, any, unknown, never

void: return value ব্যবহার করার প্রত্যাশা নেই। any: type checking অনেকটা বন্ধ করে। unknown: আগে type narrow করতে হয়। never: কোনো value সম্ভব নয় (যেমন সবসময় throw করা function)।

function log(): void { console.log("Hi"); }
let data: unknown = "Hi";
if (typeof data === "string") console.log(data.toUpperCase());
function fail(): never { throw new Error("Failed"); }

মনে রাখো: সংশোধন: void মানে “কখনো return করা যাবে না” নয়; never ও void এক নয়। unknown এবং any-ও সমান নয়।

11. Optional Chaining (?.)

কোনো property null বা undefined হলে error না দিয়ে undefined পাওয়া যায়।

type User = { profile?: { city: string } };
const user: User = {};
console.log(user.profile?.city); // undefined

মনে রাখো: ?. অনুপস্থিত value সামলায়; সব ধরনের error সামলায় না।

12. Literal Types

কোনো type-কে নির্দিষ্ট value-তে সীমাবদ্ধ করা যায়।

type Status = "loading" | "success" | "error";
let status: Status = "loading";

মনে রাখো: UI state ও API status-এর জন্য উপকারী।

13. Type Alias

type দিয়ে primitive, union, tuple, object, function type এবং বিভিন্ন combination-এর নাম দেওয়া যায়।

type ID = string | number;
type Person = { name: string; age: number };

মনে রাখো: Type alias একই scope-এ একই নামে আবার declare করা যায় না।

14. Interface

interface মূলত object-এর shape ও callable/construct signatures বর্ণনা করতে ব্যবহৃত হয়।

interface Person { name: string; age: number }
const person: Person = { name: "Ghalib", age: 25 };

মনে রাখো: React props-এর জন্য interface বা type—দুটিই ব্যবহার করা যায়।

15. extends ও Intersection (&)

interface extends দিয়ে অন্য object type-এর property গ্রহণ করতে পারে। Intersection (&) একাধিক type-এর শর্ত একসঙ্গে মিলিয়ে দেয়।

interface Person { name: string }
interface Developer extends Person { skill: string }
type Staff = Person & { role: string };

মনে রাখো: Conflict থাকলে extends error দিতে পারে; intersection কখনও অসম্ভব property type (never) তৈরি করতে পারে।

16. Declaration Merging

একই নামের compatible interface declaration একত্র হতে পারে। Type alias এভাবে merge হয় না।

interface User { name: string }
interface User { age: number }
const u: User = { name: "A", age: 20 };

মনে রাখো: সংশোধন: merging শুধু “same name” হলেই নির্বিচারে হয় না; member types compatible হতে হবে।

17. Type Alias বনাম Interface — সিদ্ধান্ত

Object contract-এ interface সুবিধাজনক; union, tuple, literal, mapped/conditional type-এ type প্রয়োজন বা বেশি স্বাভাবিক।

type Mode = "light" | "dark";
interface Props { title: string; mode: Mode }

মনে রাখো: কোনোটিই সর্বক্ষেত্রে শ্রেষ্ঠ নয়; project consistency গুরুত্বপূর্ণ।

18. React Props typing [অতিরিক্ত ব্যবহারিক প্রয়োগ]

Component-এর props-এর shape interface বা type দিয়ে নির্ধারণ করা যায়।

type ButtonProps = { label: string; disabled?: boolean };
function Button({ label, disabled = false }: ButtonProps) {
return <button disabled={disabled}>{label}</button>;
}

মনে রাখো: এই JSX উদাহরণটি .tsx file-এর জন্য।

19. Export: Named বনাম Default

Named export-এর নাম import করার সময় braces লাগে; default export সাধারণত braces ছাড়া import করা হয়।

// math.ts: export const add = (a: number,b: number) => a+b;
// import { add } from "./math";
// App.tsx: export default function App() { return null; }

মনে রাখো: এক module-এ একাধিক named export, কিন্তু সর্বোচ্চ একটি default export।

20. Tooling: CLI, tsconfig, watch, NVM

tsc TypeScript check/compile করে। tsconfig.json compiler options নির্ধারণ করে। --watch file change হলে পুনরায় check/compile করে। NVM Node version manage করে।

npx tsc --init
npx tsc --noEmit
npx tsc --watch
nvm list
nvm use 22

মনে রাখো: সংশোধন: TypeScript নিজে Node version manager নয়; NVM আলাদা tool। rootDir/outDir project structure অনুযায়ী ঠিক করতে হয়।

### Golden Comparison Table

| বিষয়                      | Interface             | Type Alias         |
| ------------------------- | --------------------- | ------------------ |
| Object shape              | হ্যাঁ                 | হ্যাঁ              |
| Primitive / Union / Tuple | সরাসরি নয়             | হ্যাঁ              |
| Extension                 | `extends`             | `&` (intersection) |
| Declaration merging       | হ্যাঁ, compatible হলে | না                 |
| Function signatures       | হ্যাঁ                 | হ্যাঁ              |
| Generics                  | হ্যাঁ                 | হ্যাঁ              |
| React Props               | হ্যাঁ                 | হ্যাঁ              |

Quick Revision — 10 Golden Rules

TypeScript types compile-time-এ check হয়; runtime validation আলাদা।

Inference value দেখে type ধরে; annotation তুমি লেখো।

Union = যেকোনো একটি; intersection = সব শর্ত একসঙ্গে।

Tuple = position অনুযায়ী type; array = collection।

readonly = compile-time mutation restriction।

unknown ব্যবহারের আগে narrow করো; any এড়িয়ে চলো।

void ও never এক নয়।

Optional chaining null/undefined-এর ক্ষেত্রে নিরাপদ access।

interface declaration merge হতে পারে; type alias পারে না।

Rest parameter arguments সংগ্রহ করে; reduce array-এর result বানায়।

### Self-check — উত্তর

1. **`string[]` এবং `[string, number]` পার্থক্য কী?**  
   `string[]`-এ যেকোনো সংখ্যক string থাকতে পারে। `[string, number]` হলো tuple—এতে ঠিক দুটি element থাকে: প্রথমটি string, দ্বিতীয়টি number।

2. **`unknown` কেন `any`-এর চেয়ে নিরাপদ?**  
   `unknown` value ব্যবহার করার আগে type check বা narrow করতে হয়। `any`-তে এই check এড়িয়ে যাওয়া যায়, তাই ভুল ব্যবহারের ঝুঁকি বেশি।

3. **`void` এবং `never`-এর একটি করে উদাহরণ দাও।**  
   `void` function স্বাভাবিকভাবে শেষ হয়, কিন্তু অর্থপূর্ণ value return করে না: `function log(): void { console.log("Hi"); }`। `never` function কখনো স্বাভাবিকভাবে শেষ হয় না: `function fail(): never { throw new Error("Failed"); }`।

4. **Rest parameter এবং spread syntax-এর পার্থক্য কী?**  
   Rest parameter (`...args`) function-এ একাধিক argument-কে array হিসেবে সংগ্রহ করে। Spread syntax (`...items`) array বা iterable-এর element-গুলোকে আলাদা argument বা element হিসেবে ছড়িয়ে দেয়।

5. **React props-এর জন্য `interface` ও `type`—কখন কোনটি নেবে?**  
   সাধারণ object-shaped props-এর জন্য দুটোই উপযুক্ত। Project convention মেনে চলো; props-এ union বা অন্য type composition দরকার হলে `type` সুবিধাজনক, আর interface extension বা declaration merging দরকার হলে `interface` বেছে নাও।
