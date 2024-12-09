import enrollments from "../Database/enrollments.js";

export function findAllEnrollments() {
  return enrollments;
}

export function enrollUser(userId, courseId) {
  const newEnrollment = { _id: Date.now().toString(), user: userId, course: courseId };
  enrollments.push(newEnrollment);
  return newEnrollment;
}

export function unenrollUser(userId, courseId) {
  const index = enrollments.findIndex(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (index === -1) return false;
  enrollments.splice(index, 1);
  return true;
}
