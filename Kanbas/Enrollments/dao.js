import model from "./model.js";

// Find courses a user is enrolled in
export async function findCoursesForUser(userId) {
  const enrollments = await model.find({ user: userId }).populate("course"); // Populate course details
  return enrollments.map((enrollment) => enrollment.course); // Extract courses
}

// Find users enrolled in a course
export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user"); // Populate user details
  return enrollments.map((enrollment) => enrollment.user); // Extract users
}

// Enroll a user in a course
export function enrollUserInCourse(user, course) {
  return model.create({ user, course }); // Create an enrollment record
}

// Unenroll a user from a course
export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course }); // Remove the enrollment record
}
