// export {};
// const greetings = () => {
//   console.log("Hello Mesbah kheya");
// };

// greetings();

type Admin = { id: number; role: "admin"; privileges: string[] };
type Member = { id: number; role: "member"; plans: string[] };
type User = Admin | Member;

const user: User = { id: 1234, privileges: ["cola", "sprite"], role: "admin" };
