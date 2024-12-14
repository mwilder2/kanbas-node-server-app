import enrollments from "../Database/enrollments.js";

export function findAllEnrollments() {
  return enrollments;
}


export function enrollUserInCourse(userId, courseId) {
  enrollments.push({ _id: Date.now().toString(), user: userId, course: courseId });
}

export function unenrollUserInCourse(userId, courseId) {
  const index = enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (index === -1) return false;
  enrollments.splice(index, 1);
  return true;
}
