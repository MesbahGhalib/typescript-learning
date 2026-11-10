// export {};
// const greetings = () => {
//   console.log("Hello Mesbah kheya");
// };

// greetings();

type Admin = { id: number; role: "admin"; privileges: string[] };
type Member = { id: number; role: "member"; plans: string[] };
type User = Admin | Member;

const user: User = { id: 1234, privileges: ["cola", "sprite"], role: "admin" };

const describeUser = (user: User): string => {
  if (user.role === "admin") {
    return `Admin ${user.id} has ${user.privileges.length} privileges`;
  }

  return `Member ${user.id} has ${user.plans.length} plans`;
};

console.log(describeUser(user));

const getFirstItem = <T>(items: T[]): T | undefined => items[0];

const firstTopic = getFirstItem(["String types", "Union types"]);
console.log(firstTopic);
