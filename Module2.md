tsc --init

Project-এর TypeScript configuration তৈরি করে।

Output: tsconfig.json

tsc

TypeScript code check ও compile করে। সাধারণ setup-এ JavaScript ফাইল তৈরি করে।

tsc --watch

ফাইলের পরিবর্তন লক্ষ্য করে। Save করলে আবার TypeScript check ও compile করে।
ধরো, তুমি ১০০ বার code পরিবর্তন করবে।

প্রতিবার কি npx tsc লিখবে?

না। এই সমস্যার সমাধান হলো:

Dependency Map কী?
Dependency Map হলো একটি Project-এর কোন File অন্য কোন File-এর ওপর নির্ভর করে, সেটা দেখানোর একটি চিত্র বা তালিকা।

ধরো, তুমি একটি TypeScript Project বানাচ্ছ। সেখানে তিনটি File আছে:

app.ts — Main File

math.ts — যোগ-বিয়োগের Function

user.ts — User-এর তথ্য

এবার app.ts-এর কাজ করতে math.ts এবং user.ts থেকে Function প্রয়োজন।

তীর চিহ্ন দেখাচ্ছে app.ts কোন File-এর ওপর নির্ভরশীল।
বাস্তব Code দিয়ে বোঝো
math.ts

export function add(a: number, b: number) {
return a + b;
}

app.ts

import { add } from "./math";

console.log(add(10, 20));

এখানে app.ts কাজ করার জন্য math.ts থেকে add Function import করেছে।

তাই:

app.ts → depends on → math.ts

এই সম্পর্কগুলো একসঙ্গে দেখানোই Dependency Map।

Dependency Map কেন প্রয়োজন?
কোন File কোথা থেকে Function বা Data পাচ্ছে, বুঝতে।

একটি File পরিবর্তন করলে অন্য কোন File প্রভাবিত হতে পারে, বুঝতে।

বড় Project-এর Structure বুঝতে।

Circular Dependency (দুটি Module একে অপরের ওপর নির্ভর করা) খুঁজতে।

TypeScript-এর সঙ্গে সম্পর্ক কী?
TypeScript Compiler (tsc) তোমার Project-এর Module import সম্পর্কগুলো বুঝে প্রয়োজনীয় File খুঁজে পায় এবং Type Check করে।

তবে Dependency Map কোনো TypeScript Command নয়। এটি Project-এর dependency relationship বোঝানোর একটি ধারণা।

Golden Rule:

Dependency = কার ওপর নির্ভর করছে।

Map = সেই নির্ভরতার চিত্র।

Dependency Map = কে কার ওপর নির্ভর করছে, তার চিত্র।
