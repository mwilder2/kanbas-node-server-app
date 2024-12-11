import courses from "../Database/courses.js";
import model from "./model.js";

export function findAllCourses() {
  return model.find(); // Retrieve all courses from the database
}

export function createCourse(course) {
  delete course._id; // Ensure the client doesn't send an ID
  return model.create(course); // Insert the new course
}


export function deleteCourse(courseId) {
  return model.deleteOne({ _id: courseId });
}

export function updateCourse(courseId, courseUpdates) {
  return model.updateOne({ _id: courseId }, { $set: courseUpdates });
}
