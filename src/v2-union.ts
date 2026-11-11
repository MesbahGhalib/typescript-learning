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

const isAdmin = (user: User): user is Admin => user.role === "admin";
const users: User[] = [
  user,
  { id: 5678, role: "member", plans: ["starter"] },
];
const admins = users.filter(isAdmin);

console.log(admins.map((admin) => admin.privileges.length));

type UserRole = User["role"];
const allowedRoles: UserRole[] = ["admin", "member"];
console.log(allowedRoles);

interface Course {
  title: string;
  lessonCount: number;
}

const currentCourse: Course = { title: "TypeScript Basics", lessonCount: 6 };
console.log(`${currentCourse.title}: ${currentCourse.lessonCount} lessons`);

type Profile = { nickname?: string };
const displayNickname = (profile: Profile): string => profile.nickname ?? "Guest";
console.log(displayNickname({}));

type LookupResult =
  | { success: true; value: string }
  | { success: false; message: string };
const formatLookup = (result: LookupResult): string =>
  result.success ? result.value : result.message;
console.log(formatLookup({ success: false, message: "Course not found" }));
