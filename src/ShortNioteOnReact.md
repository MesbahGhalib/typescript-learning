React — Lifting State Up (Complete Notes)
১. Lifting State Up আসলে কী?
Lifting State Up হলো React-এর একটি technique, যেখানে দুই বা তার বেশি Component-এর একই State প্রয়োজন হলে সেই State তাদের সবচেয়ে কাছের Common Parent Component-এ রাখা হয়।

ধরো, তোমার তিনটি Component আছে:

- Parent — মূল Component।
- CounterDisplay — Count দেখাবে।
- IncreaseButton — Button click করলে Count বাড়াবে।
  এখানে একটি Component Count দেখাচ্ছে, অন্যটি Count পরিবর্তন করছে।

তাহলে State কোথায় রাখবে?
Parent

const [count, setCount] = useState(0)

Shared State এখানে থাকবে

CounterDisplay

State receive করে

IncreaseButton

Function receive করে

মনে রাখবে: State Parent-এ থাকবে। Parent প্রয়োজন অনুযায়ী Child-কে State ও Function পাঠাবে।
২. প্রথমে Parent Component তৈরি করব
Parent.jsx
import { useState } from "react";
import CounterDisplay from "./CounterDisplay";
import IncreaseButton from "./IncreaseButton";

export default function Parent() {
// Step 1: State
const [count, setCount] = useState(0);

// Step 2: Handler function
const handleIncrease = (amount) => {
setCount(prev => prev + amount);
};

// Step 3: Props পাঠানো
return (
<>
<CounterDisplay count={count} />
<IncreaseButton onIncrease={handleIncrease} />
</>
);
}

এখানে তিনটি কাজ হয়েছে:
Step কী করেছি? কেন?
1 useState(0) State তৈরি করেছি
2 handleIncrease() State update করার function
3 Props পাঠিয়েছি Child-কে Data ও Function দিয়েছি

খেয়াল করো:
<CounterDisplay count={count} />

এখানে count হলো Prop-এর নাম এবং {count} হলো Parent-এর State-এর বর্তমান value।

অন্যদিকে:
<IncreaseButton onIncrease={handleIncrease} />

এখানে onIncrease হলো Prop-এর নাম এবং handleIncrease হলো Parent-এর function।
৩. Child Component Function Receive করবে
IncreaseButton.jsx
export default function IncreaseButton({ onIncrease }) {
return (
<button onClick={() => onIncrease(1)}>
Increase
</button>
);
}

এখানে:

প্রথম অংশ:
function IncreaseButton({ onIncrease })

Parent থেকে পাঠানো onIncrease Prop-টি destructuring করে গ্রহণ করছি।

দ্বিতীয় অংশ:
onClick={() => onIncrease(1)}

Button-এ click করলে Parent-এর handleIncrease function call হবে এবং 1 argument হিসেবে পাঠাবে।

তৃতীয় অংশ:

Parent-এর এই Function:
const handleIncrease = (amount) => {
setCount(prev => prev + amount);
};

Child থেকে পাঠানো 1 এখন amount parameter-এর মধ্যে আসবে।

অর্থাৎ:

amount = 1

তারপর Count বাড়বে।
৪. অন্য Child Updated State দেখাবে
CounterDisplay.jsx
export default function CounterDisplay({ count }) {
return <h2>Count: {count}</h2>;
}

CounterDisplay নিজে State তৈরি করছে না। সে Parent থেকে State-এর বর্তমান value Prop হিসেবে পাচ্ছে।

এখন নিচে পুরো বিষয়টা live example দিয়ে দেখো।
Lifting State Up — Live Example
Interactive

Parent State
0
count

CounterDisplay
0
Count receive করে

IncreaseButton
Increase
Handler call করে

Button click → Parent State update → Display update
Reset

৫. Function কে call করছে এবং Parameter কীভাবে যাচ্ছে?
এটি তোমার নোটের সবচেয়ে গুরুত্বপূর্ণ অংশ।
Child: IncreaseButton

onClick={() => onIncrease(1)}

Click করলে 1 পাঠাচ্ছে

Parent: handleIncrease

handleIncrease(amount)

এখানে amount = 1

State Update

setCount(prev => prev + 1)

Parent আবার Render → Child নতুন Count পায়

৬. () => কেন ব্যবহার করেছি?
তোমার নোটে যে Arrow Function-এর কথা লিখেছ, সেখানে এই পার্থক্যটি জানা জরুরি।
Syntax কী ঘটে?
onClick={onIncrease} Click করলে function call হবে
onClick={() => onIncrease(1)} Click করলে 1 argument দিয়ে function call হবে
onClick={onIncrease(1)} Render-এর সময়ই function call হয়ে যাবে — এই ক্ষেত্রে ভুল

অর্থাৎ Argument পাঠাতে চাইলে সাধারণত Arrow Function দিয়ে wrap করি। Argument না পাঠালে সরাসরি function reference ব্যবহার করা যায়।
৭. তোমার নোটের ভুলগুলো সংশোধন
তোমার নোটের ধারণা সঠিক Concept
State Parent-এ declare করি ঠিক, যখন Child-দের shared state প্রয়োজন
Handler একই Page-এ তৈরি করতে হয় ভুল। আলাদা File-এও থাকতে পারে
Function Prop দিয়ে Child-এ পাঠাই ঠিক
Child-এ Destructuring করতে হয় Optional, props.onIncrease দিয়েও access করা যায়
দুটি Handler Function প্রয়োজন সবসময় নয়, একটি Parent Handler-ই যথেষ্ট হতে পারে
Arrow Function দিয়ে wrap করতে হয় Argument পাঠাতে চাইলে সাধারণত প্রয়োজন
Child Parent-এর State বদলায় Child Parent-এর Handler call করে, Handler State update করে
Parent-এর সব Child Function পায় ভুল। যাকে Prop পাঠাবে, সে-ই পাবে

৮. Lifting State Up কখন ব্যবহার করবে?
Situation State কোথায় রাখবে?
শুধু একটি Child-এর State প্রয়োজন সেই Child-এ
দুটি Sibling-এর একই State প্রয়োজন Common Parent-এ
Child State update করবে, অন্য Child result দেখাবে Common Parent-এ
অনেক দূরের Component-এর একই State প্রয়োজন Common Parent, Context বা অন্য State-management পদ্ধতি বিবেচনা করবে

আর মনে রাখবে, একই ফাইলে Component থাকলেই Parent–Child হয় না। JSX-এ একটি Component অন্য Component render করলে তাদের মধ্যে Parent–Child সম্পর্ক তৈরি হয়।

Final Golden Notes — খাতায় এই অংশটুকু লিখে রাখো
Lifting State Up = Shared State-কে Common Parent-এ রাখা।

1. Parent-এর মধ্যে useState দিয়ে State declare করব।
2. Parent-এ State update করার Handler Function তৈরি করব।
3. Parent থেকে প্রয়োজনীয় Child-কে State এবং Handler Props হিসেবে পাঠাব।
4. Child Destructuring বা props দিয়ে সেগুলো receive করবে।
5. Child Event ঘটলে Parent-এর Handler call করবে।
6. Handler setState দিয়ে Parent-এর State update করবে।
7. Parent Re-render হলে Child নতুন Prop পাবে এবং UI update হবে।

State নিচে যায় ↓ Props দিয়ে

Child উপরে জানায় ↑ ... important Callback Function call করে

সবচেয়ে গুরুত্বপূর্ণ পার্থক্য: Child থেকে Parent-এর Function call করাকে Callback Props pattern বলা যায়। আর সেই pattern ব্যবহার করে যখন State-কে Common Parent-এ রাখা হয়, তখন সেটি Lifting State Up। দুটো সম্পর্কিত, কিন্তু এক জিনিস নয়।
