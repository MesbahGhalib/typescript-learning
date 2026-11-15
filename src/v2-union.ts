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

const courseLevels = ["beginner", "intermediate", "advanced"] as const;
type CourseLevel = (typeof courseLevels)[number];
const selectedLevel: CourseLevel = "beginner";
console.log(selectedLevel);

const getProperty = <T, K extends keyof T>(item: T, key: K): T[K] => item[key];
const courseTitle = getProperty(currentCourse, "title");
console.log(courseTitle);

type EnrollmentStatus = "active" | "completed" | "paused";
const enrollmentMessages: Record<EnrollmentStatus, string> = {
  active: "Enrollment is active",
  completed: "Course completed",
  paused: "Enrollment is paused",
};
console.log(enrollmentMessages["active"]);

const formatIdentifier = (identifier: string | number): string =>
  typeof identifier === "number" ? identifier.toString() : identifier.trim();
console.log(formatIdentifier(42));

type VideoLesson = { title: string; videoUrl: string };
type LiveLesson = { title: string; room: string };
type Lesson = VideoLesson | LiveLesson;
const describeLesson = (lesson: Lesson): string =>
  "videoUrl" in lesson
    ? `${lesson.title} is available at ${lesson.videoUrl}`
    : `${lesson.title} meets in ${lesson.room}`;
console.log(describeLesson({ title: "Union types", room: "Room 2" }));

type LessonLoadState =
  | { kind: "loading" }
  | { kind: "loaded"; lessons: string[] }
  | { kind: "failed"; message: string };
const assertNever = (value: never): never => {
  throw new Error(`Unexpected value: ${value}`);
};
const describeLoadState = (state: LessonLoadState): string => {
  switch (state.kind) {
    case "loading":
      return "Lessons are loading";
    case "loaded":
      return `${state.lessons.length} lessons loaded`;
    case "failed":
      return state.message;
    default:
      return assertNever(state);
  }
};
console.log(describeLoadState({ kind: "loaded", lessons: ["Unions"] }));

type OperationResult<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };
const formatCourseResult = (result: OperationResult<Course>): string =>
  result.ok ? result.value.title : result.error;
console.log(formatCourseResult({ ok: true, value: currentCourse }));

type NonAdminRole = Exclude<UserRole, "admin">;
const defaultMemberRole: NonAdminRole = "member";
console.log(defaultMemberRole);
