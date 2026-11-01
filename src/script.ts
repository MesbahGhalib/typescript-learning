const addTwo = (a: number, b: number) => {
  return a + b;
};
console.log(addTwo(2, 114));

const str = "Mesbahghalib";
const user: {
  name: string;
  age: number;
  isMarried: boolean;
  action: () => void;
  badges: String[];
} = {
  name: "Mesbah",
  age: 38,
  isMarried: true,
  action: () => console.log("hello"),
  badges: ["abc", "def"],
};
